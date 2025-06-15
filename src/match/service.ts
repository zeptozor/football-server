import { prisma } from '@/shared/prisma'
import { MatchDTO } from './dto'
import { League } from '@prisma/client'
import { ApiError } from '@/shared/api-error'
import { ethers } from 'ethers'
import { config } from '@/shared/config'

class MatchService {
  async getLeagues(): Promise<League[]> {
    const leagues = await prisma.league.findMany()
    return leagues
  }
  async getUpcomings(leagueId: number): Promise<MatchDTO[]> {
    const matches = await prisma.match.findMany({
      where: { league: isNaN(leagueId) ? undefined : leagueId, status: 'upcoming' },
      include: {
        awayPlayers: true,
        homePlayers: true,
        homeScorers: true,
        awayScorers: true,
        _count: { select: { participations: true } },
        winners: { include: { user: { select: { username: true } } } },
      },
    })
    const dtos = matches.map((match) => new MatchDTO(match))
    return dtos
  }
  async getMatch(matchId: number): Promise<MatchDTO> {
    if (isNaN(matchId)) throw ApiError.BadRequest('matchId must be an integer')
    const match = await prisma.match.findFirst({
      where: { id: matchId },
      include: {
        awayPlayers: true,
        homePlayers: true,
        homeScorers: true,
        awayScorers: true,
        _count: { select: { participations: true } },
        winners: { include: { user: { select: { username: true } } } },
      },
    })
    if (!match) throw ApiError.BadRequest('match not found')
    const dto = new MatchDTO(match)
    return dto
  }

  async ratePlayers(matchId: number, playerRatings: { playerId: number; rating: number }[]) {
    const match = await prisma.match.findFirst({
      where: { id: matchId },
      include: {
        homePlayers: true,
        awayPlayers: true,
        participations: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!match) throw ApiError.BadRequest('match not found')

    const allMatchPlayers = [...match.homePlayers, ...match.awayPlayers]
    const matchPlayerIds = allMatchPlayers.map((p) => p.id)

    let updatedCount = 0

    for (const { playerId, rating } of playerRatings) {
      if (!matchPlayerIds.includes(playerId)) {
        throw ApiError.BadRequest(`Player ${playerId} did not participate in this match`)
      }

      if (rating < 1 || rating > 10) {
        throw ApiError.BadRequest(`Rating must be between 1 and 10, got ${rating} for player ${playerId}`)
      }

      const currentPlayer = await prisma.player.findFirst({
        where: { id: playerId },
        include: {
          _count: {
            select: {
              matchesAway: true,
              matchesHome: true,
            },
          },
        },
      })

      if (!currentPlayer) {
        throw ApiError.BadRequest(`Player ${playerId} not found`)
      }

      const currentRating = currentPlayer.rating
      const newRating = Math.round(
        (currentRating + rating) / (currentPlayer._count.matchesHome + currentPlayer._count.matchesAway + 1),
      )

      await prisma.player.update({
        where: { id: playerId },
        data: { rating: newRating },
      })

      updatedCount++
    }

    for (const participation of match.participations) {
      const homePlayerIds = participation.homePlayers
      const awayPlayerIds = participation.awayPlayers
      const selectedPlayerIds = [...homePlayerIds, ...awayPlayerIds]

      const selectedPlayers = await prisma.player.findMany({
        where: {
          id: {
            in: selectedPlayerIds,
          },
        },
      })

      if (selectedPlayers.length > 0) {
        const rating = Math.round(selectedPlayers.reduce((sum, player) => sum + player.rating, 0))

        await prisma.participation.update({
          where: { id: participation.id },
          data: { rating },
        })
      }
    }

    const topParticipations = await prisma.participation.findMany({
      where: { matchId },
      include: {
        user: true,
      },
      orderBy: {
        rating: 'desc',
      },
      take: 3,
    })

    await prisma.match.update({
      where: { id: matchId },
      data: {
        winners: {
          connect: topParticipations.map((p) => ({ id: p.id })),
        },
      },
    })

    if (topParticipations.length > 0) {
      // await this.distributePrizes(topParticipations)
    }

    return {
      message: `Successfully updated ratings for ${updatedCount} players and ${match.participations.length} participations. Prizes distributed to top ${topParticipations.length} participants.`,
      updatedPlayers: updatedCount,
      updatedParticipations: match.participations.length,
      prizeWinners: topParticipations.map((p) => ({ userId: p.userId, rating: p.rating })),
    }
  }

  private async distributePrizes(topParticipations: any[]) {
    try {
      const contractAddress = config.USD1_CONTRACT_ADDRESS
      const privateKey = config.PRIVATE_KEY
      const rpcUrl = config.RPC_URL

      if (!contractAddress || !privateKey || !rpcUrl) {
        console.error('Missing blockchain configuration')
        return
      }

      const provider = new ethers.JsonRpcProvider(rpcUrl)
      const signer = new ethers.Wallet(privateKey, provider)

      const usd1ABI = [
        {
          inputs: [
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
          ],
          name: 'transfer',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ]

      const usd1Contract = new ethers.Contract(contractAddress, usd1ABI, signer)

      const prizeAmounts = [ethers.parseUnits('100', 18), ethers.parseUnits('50', 18), ethers.parseUnits('25', 18)]

      for (let i = 0; i < topParticipations.length && i < 3; i++) {
        const winner = topParticipations[i]
        const amount = prizeAmounts[i]

        const tx = await usd1Contract.transfer(winner.user.wallet, amount)
        await tx.wait()

        await prisma.participation.update({
          where: { id: winner.id },
          data: {
            earned: parseInt(ethers.formatUnits(amount, 18)),
          },
        })

        console.log(`Transferred ${ethers.formatUnits(amount, 18)} USD1 to ${winner.user.wallet}`, tx.hash)
      }

      console.log('USD1 prizes distributed successfully')
    } catch (error) {
      console.error('Error distributing USD1 prizes:', error)
    }
  }
}

export const matchService = new MatchService()

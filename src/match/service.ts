import { prisma } from '@/shared/prisma'
import { MatchDTO } from './dto'
import { League } from '@prisma/client'
import { ApiError } from '@/shared/api-error'

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
        winners: true,
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
        winners: true,
      },
    })
    if (!match) throw ApiError.BadRequest('match not found')
    const dto = new MatchDTO(match)
    return dto
  }
}

export const matchService = new MatchService()

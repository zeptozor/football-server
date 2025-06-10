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
    if (isNaN(leagueId)) throw ApiError.BadRequest('leageId must be an integer')
    const matches = await prisma.match.findMany({
      where: { league: leagueId, status: 'upcoming' },
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
}

export const matchService = new MatchService()

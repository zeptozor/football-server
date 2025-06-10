import { ApiError } from '@/shared/api-error'
import { prisma } from '@/shared/prisma'
import { ParticipationDTO } from './dto'

class ParticipationService {
  async participate(matchId: number, userId: string, homePlayers: number[], awayPlayers: number[]): Promise<ParticipationDTO> {
    if (isNaN(matchId) || typeof userId != 'string' || !userId.trim())
      throw ApiError.BadRequest('matchId must be an integer and userId must be a string')
    const match = await prisma.match.findFirst({ where: { id: matchId }, include: { homePlayers: true, awayPlayers: true } })
    if (!match) throw ApiError.BadRequest('match not found')
    const user = await prisma.user.findFirst({ where: { id: userId } })
    if (!user) throw ApiError.Unauthorized()
    const exisitingParticipation = await prisma.participation.findFirst({ where: { matchId, userId } })
    if (exisitingParticipation) throw ApiError.BadRequest('You are already participating in this match')
    const rating = [...homePlayers, ...awayPlayers].reduce(
      (sum, id) =>
        sum + (match.homePlayers.find((p) => p.id == id)?.rating || match.awayPlayers.find((p) => p.id == id)?.rating || 0),
      0,
    )
    const participation = await prisma.participation.create({ data: { awayPlayers, homePlayers, matchId, userId, rating } })
    const dto = new ParticipationDTO(Object.assign(participation, { user }))
    return dto
  }
  async getPaticipants(matchId: number): Promise<ParticipationDTO[]> {
    if (isNaN(matchId)) throw ApiError.BadRequest('matchId must be an integer')
    const match = await prisma.match.findFirst({ where: { id: matchId } })
    if (!match) throw ApiError.BadRequest('match not found')
    const participants = await prisma.participation.findMany({ where: { matchId }, include: { user: true } })
    const dtos = participants.map((p) => new ParticipationDTO(Object.assign(p, { user: p.user })))
    return dtos
  }
}

export const participationService = new ParticipationService()

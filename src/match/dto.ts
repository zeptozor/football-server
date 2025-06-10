import { Match, MatchStatus, Participation, Player } from '@prisma/client'

export class MatchDTO {
  id: number
  date: Date
  status: MatchStatus
  leagueId: number
  home: {
    id: number
    name: string
    players: Player[]
    scorers: Player[]
    goals: number
  }
  away: {
    id: number
    name: string
    players: Player[]
    scorers: Player[]
    goals: number
  }
  participants: number
  winners: Participation[]

  constructor(
    match: Match & {
      homePlayers: Player[]
      awayPlayers: Player[]
      homeScorers: Player[]
      awayScorers: Player[]
      _count: { participations: number }
      winners: Participation[]
    },
  ) {
    this.id = match.id
    this.date = new Date(match.date)
    this.status = match.status
    this.leagueId = match.league
    this.home = {
      id: match.homeId,
      goals: match.homeScorers.length,
      name: match.homeName,
      players: match.homePlayers,
      scorers: match.homeScorers,
    }
    this.away = {
      id: match.awayId,
      goals: match.awayScorers.length,
      name: match.awayName,
      players: match.awayPlayers,
      scorers: match.awayScorers,
    }
    this.participants = match._count.participations
    this.winners = match.winners
  }
}

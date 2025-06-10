import { Participation, User } from '@prisma/client'

export class ParticipationDTO {
  id: number
  earned: number
  username: string
  rating: number
  homePlayers: number[]
  awayPlayers: number[]

  constructor(participation: Participation & { user: User }) {
    this.id = participation.id
    this.earned = participation.earned
    this.username = participation.user.username
    this.rating = participation.rating
    this.awayPlayers = participation.awayPlayers
    this.homePlayers = participation.homePlayers
  }
}

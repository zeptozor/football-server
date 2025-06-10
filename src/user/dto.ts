import { Participation, User } from '@prisma/client'

export class UserDTO {
  id: string
  username: string
  wallet: string
  createdAt: Date
  participated: number
  earned: number

  constructor(user: User & { participations: Participation[] }) {
    this.id = user.id
    this.username = user.username
    this.wallet = user.wallet
    this.createdAt = new Date(user.createdAt)
    this.participated = user.participations.length
    this.earned = user.participations.reduce((sum, participation) => sum + participation.earned, 0)
  }
}

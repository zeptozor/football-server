import { ApiError } from '@/shared/api-error'
import { prisma } from '@/shared/prisma'
import { UserDTO } from '@/user/dto'

class AuthService {
  async walletExists(wallet: string): Promise<boolean> {
    if (typeof wallet != 'string' || !wallet.trim()) throw ApiError.BadRequest('wallet must be a string')
    const existingUser = await prisma.user.findFirst({ where: { wallet } })
    return Boolean(existingUser)
  }
  private async usernameTaken(username: string): Promise<boolean> {
    if (typeof username != 'string' || !username.trim()) throw ApiError.BadRequest('username must be a string')
    const existingUser = await prisma.user.findFirst({ where: { username } })
    return Boolean(existingUser)
  }
  async authorize(wallet: string, username: string): Promise<{ session: string; user: UserDTO }> {
    const isAuthorized = await this.walletExists(wallet)
    if (isAuthorized) {
      const session = crypto.randomUUID()
      const user = await prisma.user.update({ where: { wallet }, data: { session }, include: { participations: true } })
      const dto = new UserDTO(user)
      return { user: dto, session }
    }
    const isUsernameTaken = await this.usernameTaken(username)
    if (isUsernameTaken) throw ApiError.BadRequest('username is taken')
    const session = crypto.randomUUID()
    const user = await prisma.user.create({ data: { wallet, username, session }, include: { participations: true } })
    const dto = new UserDTO(user)
    return { user: dto, session }
  }
  async refresh(session: string) {
    if (typeof session != 'string' || !session.trim()) throw ApiError.BadRequest('session is expired')
    const existingUser = await prisma.user.findFirst({ where: { session } })
    if (!existingUser) throw ApiError.BadRequest('session is expired')
    const newSession = crypto.randomUUID()
    const user = await prisma.user.update({
      where: { id: existingUser.id },
      data: { session: newSession },
      include: { participations: true },
    })
    const dto = new UserDTO(user)
    return { user: dto, session: newSession }
  }
}

export const authService = new AuthService()

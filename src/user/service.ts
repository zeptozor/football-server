import { ApiError } from '@/shared/api-error'
import { prisma } from '@/shared/prisma'
import { Participation } from '@prisma/client'

class UserService {
  async getDashboard(userId: string): Promise<Participation[]> {
    if (typeof userId != 'string' || !userId.trim()) throw ApiError.Unauthorized()
    const user = await prisma.user.findFirst({ where: { id: userId } })
    if (!user) throw ApiError.Unauthorized()
    const participations = await prisma.participation.findMany({
      where: { userId },
      include: {
        match: {
          select: { date: true, status: true, homeName: true, awayName: true },
        },
      },
    })
    return participations
  }
}

export const userService = new UserService()

import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../api-error'

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw ApiError.Unauthorized()

    if (req.user.role !== 'ADMIN') throw ApiError.Unauthorized('Admin access required')

    next()
  } catch (error) {
    next(error)
  }
}

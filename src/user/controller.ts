import { NextFunction, Request, Response } from 'express'
import { userService } from './service'

class UserController {
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const participations = await userService.getDashboard(req.user.id)
      res.json(participations)
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController()

import { NextFunction, Request, Response } from 'express'
import { authService } from './service'

class AuthController {
  async walletExists(req: Request, res: Response, next: NextFunction) {
    try {
      const { wallet } = req.body
      const walletExists = await authService.walletExists(wallet)
      res.json(walletExists)
    } catch (error) {
      next(error)
    }
  }
  async authorize(req: Request, res: Response, next: NextFunction) {
    try {
      const { wallet, username } = req.body
      const { session, user } = await authService.authorize(wallet, username)
      res.cookie('session', session, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const session = req.cookies.session
      const { session: newSession, user } = await authService.refresh(session)
      res.cookie('session', newSession, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
}

export const authController = new AuthController()

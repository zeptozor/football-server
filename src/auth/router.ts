import { Router } from 'express'
import { authController } from './controller'
import { unauthorized } from '@/shared/middlewares'

export const authRouter = Router()

authRouter.post('/wallet', unauthorized, authController.walletExists)
authRouter.post('/authorize', unauthorized, authController.authorize)
authRouter.get('/refersh', authController.refresh)

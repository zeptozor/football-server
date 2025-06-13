import { Router } from 'express'
import { authController } from './controller'
import { unauthorized } from '@/shared/middlewares'

export const authRouter = Router()

authRouter.post('/wallet', authController.walletExists)
authRouter.post('/', authController.authorize)
authRouter.get('/refresh', authController.refresh)

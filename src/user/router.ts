import { authorized } from '@/shared/middlewares'
import { Router } from 'express'
import { userController } from './controller'

export const userRouter = Router()

userRouter.get('/dashboard', authorized, userController.getDashboard)

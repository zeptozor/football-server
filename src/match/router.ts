import { authorized } from '@/shared/middlewares'
import { Router } from 'express'
import { matchController } from './controller'

export const matchRouter = Router()

matchRouter.get('/leagues', authorized, matchController.getLeagues)
matchRouter.get('/upcomings/:leageId', authorized, matchController.getUpcomings)
matchRouter.get('/:matchId', authorized, matchController.getMatch)

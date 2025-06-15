import { Router } from 'express'
import { authorized, adminOnly } from '@/shared/middlewares'
import { matchController } from './controller'

export const matchRouter = Router()

matchRouter.get('/leagues', authorized, matchController.getLeagues)
matchRouter.get('/upcomings/:leagueId', authorized, matchController.getUpcomings)
matchRouter.get('/:matchId', authorized, matchController.getMatch)
matchRouter.post('/:matchId/rate-players', authorized, adminOnly, matchController.ratePlayers)

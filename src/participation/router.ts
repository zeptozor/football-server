import { authorized } from '@/shared/middlewares'
import { Router } from 'express'
import { participationController } from './controller'

export const participationRouter = Router()

participationRouter.post('/', authorized, participationController.participate)
participationRouter.get('/:matchId', authorized, participationController.getParticipants)

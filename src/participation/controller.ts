import { NextFunction, Request, Response } from 'express'
import { participationService } from './service'

class ParticipationController {
  async participate(req: Request, res: Response, next: NextFunction) {
    try {
      const { matchId, homePlayers, awayPlayers } = req.body
      const participation = await participationService.participate(matchId, req.user.id, homePlayers, awayPlayers)
      res.json(participation)
    } catch (error) {
      next(error)
    }
  }
  async getParticipants(req: Request, res: Response, next: NextFunction) {
    try {
      const { matchId } = req.params
      const participations = await participationService.getPaticipants(parseInt(matchId || 'NaN'))
      res.json(participations)
    } catch (error) {
      next(error)
    }
  }
}

export const participationController = new ParticipationController()

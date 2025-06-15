import { NextFunction, Request, Response } from 'express'
import { matchService } from './service'

class MatchController {
  async getLeagues(req: Request, res: Response, next: NextFunction) {
    try {
      const leagues = await matchService.getLeagues()
      res.json(leagues)
    } catch (error) {
      next(error)
    }
  }
  async getUpcomings(req: Request, res: Response, next: NextFunction) {
    try {
      const { leagueId } = req.params
      const upcomings = await matchService.getUpcomings(parseInt(leagueId || 'NaN'))
      res.json(upcomings)
    } catch (error) {
      next(error)
    }
  }
  async getMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { matchId } = req.params
      const match = await matchService.getMatch(parseInt(matchId || 'NaN'))
      res.json(match)
    } catch (error) {
      next(error)
    }
  }
  async ratePlayers(req: Request, res: Response, next: NextFunction) {
    try {
      const { matchId } = req.params
      const { playerRatings } = req.body
      const result = await matchService.ratePlayers(parseInt(matchId || 'NaN'), playerRatings)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}

export const matchController = new MatchController()

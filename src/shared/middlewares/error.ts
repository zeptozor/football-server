import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../api-error'

export function error(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ApiError) {
    res.status(error.status).json({ message: error.message, status: error.status })
  } else {
    console.error(error, req.originalUrl)
    res.status(500).json({ message: 'Unexpected server error occured', status: 500 })
  }
}

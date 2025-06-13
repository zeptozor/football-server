import express from 'express'
import cors from 'cors'
import { config } from './shared/config'
import cookieParser from 'cookie-parser'
import { authRouter } from './auth/router'
import { error } from './shared/middlewares'
import { matchRouter } from './match/router'
import { participationRouter } from './participation/router'
import { userRouter } from './user/router'
import { initializeScheduler } from './jobs/scheduler'
import { fetchUpcomings } from './jobs/daily-job'

const app = express()
app.use(cors({ origin: config.CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/match', matchRouter)
app.use('/participation', participationRouter)
app.use('/user', userRouter)

app.use(error)

initializeScheduler()
// fetchUpcomings()

app.listen(config.PORT, () => console.log('Running on port ' + config.PORT))

import express from 'express'
import cors from 'cors'
import { config } from './shared/config'
import cookieParser from 'cookie-parser'
import { authRouter } from './auth/router'
import { error } from './shared/middlewares'
import { matchRouter } from './match/router'
import { participationRouter } from './participation/router'
import { userRouter } from './user/router'

const app = express()
app.use(cors({ origin: config.CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/match', matchRouter)
app.use('/participation', participationRouter)
app.use('/user', userRouter)

app.use(error)

app.listen(() => console.log('Running on port ' + config.PORT))

import axios from 'axios'
import { config } from './config'

export const api = axios.create({
  baseURL: 'https://v3.football.api-sports.io/',
  headers: {
    'x-apisports-key': config.FOOTBALL_API_KEY,
  },
}).get

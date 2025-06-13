import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://v3.football.api-sports.io/',
  headers: {
    'x-apisports-key': '2f112103d7729b53d64a2b4a07f23ff4',
  },
}).get

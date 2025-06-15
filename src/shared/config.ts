export const config = {
  PORT: parseInt(process.env.PORT || '3000'),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  FOOTBALL_API_KEY: process.env.FOOTBALL_API_KEY || '',
  USD1_CONTRACT_ADDRESS: process.env.USD1_CONTRACT_ADDRESS || '',
  PRIVATE_KEY: process.env.PRIVATE_KEY || '',
  RPC_URL: process.env.RPC_URL || '',
} as const

if (!config.FOOTBALL_API_KEY) throw new Error('Missing Football API Key')
if (!config.USD1_CONTRACT_ADDRESS) throw new Error('Missing USD1 Contract Address')
if (!config.PRIVATE_KEY) throw new Error('Missing Private Key')
if (!config.RPC_URL) throw new Error('Missing RPC URL')

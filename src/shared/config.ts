export const config = {
  PORT: parseInt(process.env.PORT || '3000'),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
} as const

import cron from 'node-cron'
import { fetchUpcomings } from './daily-job'

export function initializeScheduler() {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily job at midnight...')
    try {
      await fetchUpcomings()
      console.log('Daily job completed successfully')
    } catch (error) {
      console.error('Daily job failed:', error)
    }
  })

  console.log('Job scheduler initialized')
}

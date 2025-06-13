import { api } from '@/shared/football-api'
import { prisma } from '@/shared/prisma'
import { Fixture, Lineup } from './types'

export async function fetchUpcomings() {
  const now = new Date()
  now.setMonth(now.getMonth() + 4)
  const yearAgo = new Date(now)
  yearAgo.setFullYear(now.getFullYear() - 1)
  const oneMonthLater = new Date(yearAgo)
  oneMonthLater.setMonth(yearAgo.getMonth() + 1)

  const res = await api('/fixtures', {
    params: {
      league: 39,
      season: 2024,
      from: yearAgo.toISOString().split('T')[0],
      to: oneMonthLater.toISOString().split('T')[0],
    },
  })
  const matches = res.data.response as Fixture[]
  for (const match of matches) {
    await prisma.match.upsert({
      where: { id: match.fixture.id },
      update: {},
      create: {
        id: match.fixture.id,
        date: new Date(match.fixture.date),
        league: match.league.id,
        status: 'upcoming',
        awayId: match.teams.away.id,
        homeId: match.teams.home.id,
        awayName: match.teams.away.name,
        homeName: match.teams.home.name,
      },
    })
    const lineupsRes = await api('/fixtures/lineups', { params: { fixture: match.fixture.id } })
    const lineups = lineupsRes.data.response as Lineup[]
    const homeLineup = lineups.find((l) => l.team.id === match.teams.home.id)
    const awayLineup = lineups.find((l) => l.team.id === match.teams.away.id)
    if (!homeLineup || !awayLineup) continue
    for (const player of homeLineup.startXI) {
      await prisma.player.upsert({
        where: { id: player.player.id },
        update: {
          matchesHome: { connect: { id: match.fixture.id } },
        },
        create: {
          id: player.player.id,
          name: player.player.name,
          pos: player.player.pos,
          matchesHome: { connect: { id: match.fixture.id } },
        },
      })
    }
    for (const player of awayLineup.startXI) {
      await prisma.player.upsert({
        where: { id: player.player.id },
        update: {
          matchesAway: { connect: { id: match.fixture.id } },
        },
        create: {
          id: player.player.id,
          name: player.player.name,
          pos: player.player.pos,
          matchesAway: { connect: { id: match.fixture.id } },
        },
      })
    }
  }
}

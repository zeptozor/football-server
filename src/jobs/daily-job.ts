import { api } from '@/shared/football-api'
import { prisma } from '@/shared/prisma'
import { Fixture, Goal, Lineup } from './types'

const ongoingStatus = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'INT', 'LIVE']
const completedStatus = ['FT', 'AET', 'PEN', 'CANC']

export async function fetchUpcomings() {
  const now = new Date()
  now.setMonth(now.getMonth() + 4)
  const yearAgo = new Date(now)
  yearAgo.setFullYear(now.getFullYear() - 1)
  const twoWeeksLater = new Date(yearAgo)
  twoWeeksLater.setDate(yearAgo.getDate() + 14) // Add 14 days to yearAgo

  const res = await api('/fixtures', {
    params: {
      league: 39,
      season: 2024,
      from: yearAgo.toISOString().split('T')[0],
      to: twoWeeksLater.toISOString().split('T')[0],
    },
  })
  const matches = res.data.response as Fixture[]
  for (const match of matches) {
    if (
      match.fixture.status.short == 'TBD' ||
      (!ongoingStatus.includes(match.fixture.status.short) &&
        !completedStatus.includes(match.fixture.status.short) &&
        match.fixture.status.short != 'NS')
    ) {
      await prisma.match.deleteMany({ where: { id: match.fixture.id } })
      continue
    }
    const finished = Math.random() >= 0.8
    await prisma.match.upsert({
      where: { id: match.fixture.id },
      update: {},
      create: {
        id: match.fixture.id,
        date: new Date(match.fixture.date),
        league: match.league.id,
        // status: match.fixture.status.short == 'NS'
        //     ? 'upcoming'
        //     : ongoingStatus.includes(match.fixture.status.short)
        //       ? 'ongoing'
        //       : 'completed'
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
    if (!finished) continue
    const eventsRes = await api('/fixtures/events', { params: { fixture: match.fixture.id, type: 'goal' } })
    const goals = eventsRes.data.response as Goal[]
    // for (const goal of goals) {
    //   await prisma.player.upsert({
    //     where: { id: goal.player.id },
    //     update: {},
    //     create: {
    //       id: goal.player.id,
    //       name: goal.player.name,
    //       pos: 'Unknown',
    //     },
    //   })

    //   const isHomeGoal = goal.team.id == match.teams.home.id
    //   const updateData: any = {}

    //   if (isHomeGoal) {
    //     updateData.homeGoals = { connect: { id: match.fixture.id } }
    //   } else {
    //     updateData.awayGoals = { connect: { id: match.fixture.id } }
    //   }

    //   await prisma.player.update({
    //     where: { id: goal.player.id },
    //     data: updateData,
    //   })
    // }
  }
}

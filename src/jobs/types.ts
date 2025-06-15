const mockFixture = {
  fixture: {
    id: 1208099,
    referee: 'A. Madley',
    timezone: 'UTC',
    date: '2024-10-19T11:30:00+00:00',
    timestamp: 1729337400,
    periods: {
      first: 1729337400,
      second: 1729341000,
    },
    venue: {
      id: 593,
      name: 'Tottenham Hotspur Stadium',
      city: 'London',
    },
    status: {
      long: 'Match Finished',
      short: 'FT',
      elapsed: 90,
      extra: 8,
    },
  },
  league: {
    id: 39,
    name: 'Premier League',
    country: 'England',
    logo: 'https://media.api-sports.io/football/leagues/39.png',
    flag: 'https://media.api-sports.io/flags/gb-eng.svg',
    season: 2024,
    round: 'Regular Season - 8',
    standings: true,
  },
  teams: {
    home: {
      id: 47,
      name: 'Tottenham',
      logo: 'https://media.api-sports.io/football/teams/47.png',
      winner: true,
    },
    away: {
      id: 48,
      name: 'West Ham',
      logo: 'https://media.api-sports.io/football/teams/48.png',
      winner: false,
    },
  },
  goals: {
    home: 4,
    away: 1,
  },
  score: {
    halftime: {
      home: 1,
      away: 1,
    },
    fulltime: {
      home: 4,
      away: 1,
    },
    extratime: {
      home: null,
      away: null,
    },
    penalty: {
      home: null,
      away: null,
    },
  },
}

export type Fixture = typeof mockFixture

const mockLineup = {
  team: {
    id: 47,
    name: 'Tottenham',
    logo: 'https://media.api-sports.io/football/teams/47.png',
    colors: {
      player: {
        primary: 'ffffff',
        number: '001e6c',
        border: 'ffffff',
      },
      goalkeeper: {
        primary: 'a9f3ff',
        number: '131314',
        border: 'a9f3ff',
      },
    },
  },
  coach: {
    id: 548,
    name: 'A. Postecoglou',
    photo: 'https://media.api-sports.io/football/coachs/548.png',
  },
  formation: '4-3-3',
  startXI: [
    {
      player: {
        id: 31354,
        name: 'G. Vicario',
        number: 1,
        pos: 'G',
        grid: '1:1',
      },
    },
    {
      player: {
        id: 47519,
        name: 'Pedro Porro',
        number: 23,
        pos: 'D',
        grid: '2:4',
      },
    },
    {
      player: {
        id: 30776,
        name: 'C. Romero',
        number: 17,
        pos: 'D',
        grid: '2:3',
      },
    },
    {
      player: {
        id: 152849,
        name: 'M. van de Ven',
        number: 37,
        pos: 'D',
        grid: '2:2',
      },
    },
    {
      player: {
        id: 204039,
        name: 'D. Udogie',
        number: 13,
        pos: 'D',
        grid: '2:1',
      },
    },
    {
      player: {
        id: 30435,
        name: 'D. Kulusevski',
        number: 21,
        pos: 'M',
        grid: '3:3',
      },
    },
    {
      player: {
        id: 18968,
        name: 'Y. Bissouma',
        number: 8,
        pos: 'M',
        grid: '3:2',
      },
    },
    {
      player: {
        id: 18784,
        name: 'J. Maddison',
        number: 10,
        pos: 'M',
        grid: '3:1',
      },
    },
    {
      player: {
        id: 129711,
        name: 'B. Johnson',
        number: 22,
        pos: 'F',
        grid: '4:3',
      },
    },
    {
      player: {
        id: 18883,
        name: 'D. Solanke',
        number: 19,
        pos: 'F',
        grid: '4:2',
      },
    },
    {
      player: {
        id: 186,
        name: 'Son Heung-Min',
        number: 7,
        pos: 'F',
        grid: '4:1',
      },
    },
  ],
  substitutes: [
    {
      player: {
        id: 237129,
        name: 'P. Sarr',
        number: 29,
        pos: 'M',
        grid: null,
      },
    },
    {
      player: {
        id: 1166,
        name: 'T. Werner',
        number: 16,
        pos: 'F',
        grid: null,
      },
    },
    {
      player: {
        id: 2413,
        name: 'Richarlison',
        number: 9,
        pos: 'F',
        grid: null,
      },
    },
    {
      player: {
        id: 863,
        name: 'R. Bentancur',
        number: 30,
        pos: 'M',
        grid: null,
      },
    },
    {
      player: {
        id: 328089,
        name: 'A. Gray',
        number: 14,
        pos: 'M',
        grid: null,
      },
    },
    {
      player: {
        id: 347316,
        name: 'L. Bergvall',
        number: 15,
        pos: 'M',
        grid: null,
      },
    },
    {
      player: {
        id: 380690,
        name: 'M. Moore',
        number: 47,
        pos: 'M',
        grid: null,
      },
    },
    {
      player: {
        id: 162498,
        name: 'R. Drăgușin',
        number: 6,
        pos: 'D',
        grid: null,
      },
    },
    {
      player: {
        id: 18932,
        name: 'F. Forster',
        number: 20,
        pos: 'G',
        grid: null,
      },
    },
  ],
}

export type Lineup = typeof mockLineup

const mockGoal = {
  time: {
    elapsed: 25,
    extra: 0,
  },
  team: {
    id: 463,
    name: 'Aldosivi',
    logo: 'https://media.api-sports.io/football/teams/463.png',
  },
  player: {
    id: 6126,
    name: 'F. Andrada',
  },
  assist: {
    id: 0,
    name: '',
  },
  type: 'Goal',
  detail: 'Normal Goal',
}

export type Goal = typeof mockGoal

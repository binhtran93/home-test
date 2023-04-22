export default {
  title: 'fixture v1',
  type: 'object',
  required: [
    'id',
    'homeTeam',
    'awayTeam',
    'tournament',
    'state',
    'homeTeamScore',
    'awayTeamScore',
    'date',
  ],
  properties: {
    id: {
      type: 'string',
    },
    homeTeam: {
      type: 'object',
      required: ['id', 'name', 'logo'],
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        logo: {
          type: 'string',
        },
      },
    },
    awayTeam: {
      type: 'object',
      required: ['id', 'name', 'logo'],
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        logo: {
          type: 'string',
        },
      },
    },
    tournament: {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
    },
    state: {
      type: 'string',
      enum: ['live', 'FT', 'scheduled'],
    },
    homeTeamScore: {
      type: ['number', 'null'],
    },
    awayTeamScore: {
      type: ['number', 'null'],
    },
    date: {
      type: 'string',
    },
  },
};

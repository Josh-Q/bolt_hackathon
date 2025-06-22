import { Race, Dog, Bet, UserStats } from '../types/racing';

export const mockDogs: Dog[] = [
  {
    id: '1',
    name: 'Much Speed Doge',
    handler: 'Wow Handler',
    trainer: 'Such Trainer',
    age: 3,
    weight: 25,
    odds: '3-1',
    form: ['1', '2', '1', '3', '1'],
    wins: 8,
    races: 15,
    earnings: 245000,
    coat: { primary: '#F59E0B', secondary: '#FFFFFF' },
    personality: 'Very Fast • Much Zoom'
  },
  {
    id: '2',
    name: 'Wow Runner',
    handler: 'Such Handler',
    trainer: 'Very Trainer',
    age: 4,
    weight: 28,
    odds: '5-2',
    form: ['2', '1', '4', '1', '2'],
    wins: 12,
    races: 22,
    earnings: 380000,
    coat: { primary: '#DC2626', secondary: '#FEF3C7' },
    personality: 'Much Energy • So Athletic'
  },
  {
    id: '3',
    name: 'Golden Shibe',
    handler: 'Many Handler',
    trainer: 'Doge Trainer',
    age: 2,
    weight: 22,
    odds: '4-1',
    form: ['1', '1', '2', '1', '3'],
    wins: 6,
    races: 10,
    earnings: 195000,
    coat: { primary: '#F59E0B', secondary: '#FFFFFF' },
    personality: 'Such Golden • Very Shiny'
  },
  {
    id: '4',
    name: 'Storm Shiba',
    handler: 'Lightning Handler',
    trainer: 'Thunder Trainer',
    age: 5,
    weight: 30,
    odds: '8-1',
    form: ['3', '2', '1', '4', '2'],
    wins: 15,
    races: 35,
    earnings: 520000,
    coat: { primary: '#6B7280', secondary: '#FFFFFF' },
    personality: 'Much Storm • Very Power'
  },
  {
    id: '5',
    name: 'Fire Doge',
    handler: 'Blaze Handler',
    trainer: 'Flame Trainer',
    age: 3,
    weight: 26,
    odds: '6-1',
    form: ['2', '3', '1', '2', '1'],
    wins: 9,
    races: 18,
    earnings: 275000,
    coat: { primary: '#EF4444', secondary: '#FEF3C7' },
    personality: 'Such Fire • Very Hot'
  },
  {
    id: '6',
    name: 'Moon Shibe',
    handler: 'Space Handler',
    trainer: 'Rocket Trainer',
    age: 4,
    weight: 24,
    odds: '12-1',
    form: ['4', '2', '3', '1', '5'],
    wins: 7,
    races: 25,
    earnings: 185000,
    coat: { primary: '#8B5CF6', secondary: '#FFFFFF' },
    personality: 'To The Moon • Much Rocket'
  }
];

export const mockRaces: Race[] = [
  {
    id: '1',
    name: 'The Great Doge Derby',
    track: 'Wow Speedway',
    date: '2024-01-15',
    time: '15:30',
    distance: '400 meters',
    purse: 500000,
    status: 'upcoming',
    dogs: mockDogs.slice(0, 4)
  },
  {
    id: '2',
    name: 'Much Speed Championship',
    track: 'Such Track Arena',
    date: '2024-01-15',
    time: '16:15',
    distance: '350 meters',
    purse: 750000,
    status: 'live',
    dogs: mockDogs.slice(2, 6),
    progress: 75
  },
  {
    id: '3',
    name: 'Very Elite Shiba Stakes',
    track: 'Doge Racing Park',
    date: '2024-01-14',
    time: '17:00',
    distance: '500 meters',
    purse: 1000000,
    status: 'finished',
    dogs: mockDogs,
    results: [
      { position: 1, dogId: '2', time: '0:28.15', margin: '' },
      { position: 2, dogId: '1', time: '0:28.32', margin: '1¼' },
      { position: 3, dogId: '3', time: '0:28.45', margin: '½' }
    ]
  }
];

export const mockUserStats: UserStats = {
  totalBets: 24,
  totalWagered: 2400,
  totalWon: 2850,
  winRate: 42,
  currentBalance: 5450
};

export const mockBets: Bet[] = [
  {
    id: '1',
    raceId: '3',
    dogId: '2',
    amount: 100,
    odds: '5-2',
    type: 'win',
    status: 'won',
    payout: 250
  },
  {
    id: '2',
    raceId: '2',
    dogId: '4',
    amount: 50,
    odds: '8-1',
    type: 'win',
    status: 'pending'
  }
];
export interface Dog {
  id: string;
  name: string;
  handler: string;
  trainer: string;
  age: number;
  weight: number;
  odds: string;
  form: string[];
  wins: number;
  races: number;
  earnings: number;
  coat: {
    primary: string;
    secondary: string;
  };
  personality: string;
}

export interface Race {
  id: string;
  name: string;
  track: string;
  date: string;
  time: string;
  distance: string;
  purse: number;
  status: 'upcoming' | 'live' | 'finished';
  dogs: Dog[];
  results?: RaceResult[];
  progress?: number;
}

export interface RaceResult {
  position: number;
  dogId: string;
  time: string;
  margin: string;
}

export interface Bet {
  id: string;
  raceId: string;
  dogId: string;
  amount: number;
  odds: string;
  type: 'win' | 'place' | 'show';
  status: 'pending' | 'won' | 'lost';
  payout?: number;
}

export interface UserStats {
  totalBets: number;
  totalWagered: number;
  totalWon: number;
  winRate: number;
  currentBalance: number;
}
export const sports = ['Football', 'NBA', 'NFL', 'Baseball', 'Horse Racing'];
export const betTypes = ['Match Result', 'Both Teams to Score', 'Over/Under', 'Correct Score', 'First Goalscorer', 'Anytime Goalscorer'];

export const fixtures = [
  { teams: ['Manchester United', 'Liverpool'], date: '2023-12-16', time: '17:30' },
  { teams: ['Arsenal', 'Brighton'], date: '2023-12-17', time: '14:00' },
  { teams: ['Aston Villa', 'Brentford'], date: '2023-12-17', time: '14:00' },
  { teams: ['Fulham', 'West Ham'], date: '2023-12-17', time: '14:00' },
  { teams: ['Chelsea', 'Sheffield United'], date: '2023-12-16', time: '15:00' },
  { teams: ['Newcastle', 'Fulham'], date: '2023-12-16', time: '15:00' },
];

export const upcomingFixtures = [
  ...fixtures,
  { teams: ['Tottenham', 'Everton'], date: '2023-12-18', time: '20:00' },
  { teams: ['Crystal Palace', 'Burnley'], date: '2023-12-18', time: '15:00' },
  { teams: ['Leicester', 'Wolves'], date: '2023-12-19', time: '19:45' },
];

export const jackpots = {
  'Football': 1000000,
  'NBA': 750000,
  'NFL': 1250000,
  'Baseball': 500000,
  'Horse Racing': 350000,
};
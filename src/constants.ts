export const DAYS_OF_WEEK = new Set([
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
]);

export const NFL_TEAMS = new Map([
  // 1 Arizona Cardinals
  ['Arizona Cardinals', 'Arizona Cardinals'],
  ['Phoenix Cardinals', 'Arizona Cardinals'],
  ['St Louis Cardinals', 'Arizona Cardinals'],
  // 2 Atlanta Falcons
  ['Atlanta Falcons', 'Atlanta Falcons'],
  // 3 Baltimore Ravens
  ['Baltimore Ravens', 'Baltimore Ravens'],
  // 4 Buffalo Bills
  ['Buffalo Bills', 'Buffalo Bills'],
  // 5 Carolina Panthers
  ['Carolina Panthers', 'Carolina Panthers'],
  // 6 Chicago Bears
  ['Chicago Bears', 'Chicago Bears'],
  // 7 Cincinnati Bengals
  ['Cincinnati Bengals', 'Cincinnati Bengals'],
  // 8 Cleveland Browns
  ['Cleveland Browns', 'Cleveland Browns'],
  // 9 Dallas Cowboys
  ['Dallas Cowboys', 'Dallas Cowboys'],
  // 10 Denver Broncos
  ['Denver Broncos', 'Denver Broncos'],
  // 11 Detroit Lions
  ['Detroit Lions', 'Detroit Lions'],
  // 12 Green Bay Packers
  ['Green Bay Packers', 'Green Bay Packers'],
  // 13 Houston Texans
  ['Houston Texans', 'Houston Texans'],
  // 14 Indianapolis Colts
  ['Indianapolis Colts', 'Indianapolis Colts'],
  ['Baltimore Colts', 'Indianapolis Colts'],
  // 15 Jacksonville Jaguars
  ['Jacksonville Jaguars', 'Jacksonville Jaguars'],
  // 16 Kansas City Chiefs
  ['Kansas City Chiefs', 'Kansas City Chiefs'],
  // 17 Las Vegas Raiders
  ['Las Vegas Raiders', 'Las Vegas Raiders'],
  ['Los Angeles Raiders', 'Las Vegas Raiders'],
  ['Oakland Raiders', 'Las Vegas Raiders'],
  // 18 Los Angeles Chargers
  ['Los Angeles Chargers', 'Los Angeles Chargers'],
  ['San Diego Chargers', 'Los Angeles Chargers'],
  // 19 Los Angeles Rams
  ['Los Angeles Rams', 'Los Angeles Rams'],
  ['St Louis Rams', 'Los Angeles Rams'],
  // 20 Miami Dolphins
  ['Miami Dolphins', 'Miami Dolphins'],
  // 21 Minnesota Vikings
  ['Minnesota Vikings', 'Minnesota Vikings'],
  // 22 New England Patriots
  ['New England Patriots', 'New England Patriots'],
  // 23 New Orleans Saints
  ['New Orleans Saints', 'New Orleans Saints'],
  // 24 New York Giants
  ['New York Giants', 'New York Giants'],
  // 25 New York Jets
  ['New York Jets', 'New York Jets'],
  // 26 Philadelphia Eagles
  ['Philadelphia Eagles', 'Philadelphia Eagles'],
  // 27 Pittsburgh Steelers
  ['Pittsburgh Steelers', 'Pittsburgh Steelers'],
  // 28 San Francisco 49ers
  ['San Francisco 49ers', 'San Francisco 49ers'],
  // 29 Seattle Seahawks
  ['Seattle Seahawks', 'Seattle Seahawks'],
  // 30 Tampa Bay Buccaneers
  ['Tampa Bay Buccaneers', 'Tampa Bay Buccaneers'],
  // 31 Tennessee Titans
  ['Tennessee Titans', 'Tennessee Titans'],
  ['Tennessee Oilers', 'Tennessee Titans'],
  ['Houston Oilers', 'Tennessee Titans'],
  // 32 Washington Commanders
  ['Washington Commanders', 'Washington Commanders'],
  ['Washington Football Team', 'Washington Commanders'],
  ['Washington Redskins', 'Washington Commanders'],
]);

export const OrderBys = {
  Season: 'season',
  DayOfWeek: 'day_of_week',
  Date: 'game_date',
  Postseason: 'postseason',
  Location: 'game_loc',
  Favorite: 'current_favorite',
  FavoriteSeed: 'favorite_seed',
  Underdog: 'current_underdog',
  UnderdogSeed: 'underdog_seed',
  Spread: 'spread',
  SpreadResult: 'spread_res',
  FavoriteWon: 'favorite_won',
  Tie: 'tie',
  ScoreFavorite: 'score_favorite',
  ScoreUnderdog: 'score_underdog',
  Overtime: 'overtime',
} as const;

export const Sorts = {
  Asc: 'ASC',
  Desc: 'DESC',
} as const;

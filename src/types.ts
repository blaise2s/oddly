export type Location = 'FAVORITE' | 'UNDERDOG' | 'NEUTRAL';
export type SpreadResult = 'WIN' | 'LOSS' | 'PUSH';
export type OverUnderResult = 'OVER' | 'UNDER' | 'PUSH';

export interface HistoricalNFLGameOdds {
  season: number;
  dayOfWeek: string;
  date: Date;
  timeEastern: string;
  postseason: boolean;
  location: Location;
  favorite: string;
  currentFavorite: string;
  favoriteSeed?: number;
  underdog: string;
  currentUnderdog: string;
  underdogSeed?: number;
  scoreFavorite: number;
  scoreUnderdog: number;
  favoriteWon: boolean;
  tie: boolean;
  spread: number;
  spreadResult: SpreadResult;
  overUnder: number;
  overUnderResult: OverUnderResult;
  overtime: boolean;
  notes?: string;
}

export const OrderBys = {
  season: 'season',
  dayOfWeek: 'day_of_week',
  date: 'game_date',
  postseason: 'postseason',
  location: 'game_loc',
  favorite: 'current_favorite',
  favoriteSeed: 'favorite_seed',
  underdog: 'current_underdog',
  underdogSeed: 'underdog_seed',
  spread: 'spread',
  spreadResult: 'spread_res',
  favoriteWon: 'favorite_won',
  tie: 'tie',
  scoreFavorite: 'score_favorite',
  scoreUnderdog: 'score_underdog',
  overtime: 'overtime',
} as const;
export type OrderBy = keyof typeof OrderBys;

export const Sorts = {
  asc: 'ASC',
  desc: 'DESC',
} as const;
export type SortKey = keyof typeof Sorts;
export interface Order {
  by: OrderBy;
  sort: SortKey;
}

import { OrderBys, Sorts } from './constants';

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

export type OrderBy = keyof typeof OrderBys;
export type Sort = keyof typeof Sorts;
export interface Order {
  by: OrderBy;
  sort: Sort;
}

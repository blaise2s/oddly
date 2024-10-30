export type Location = 'FAVORITE' | 'UNDERDOG' | 'NEUTRAL';
export type SpreadResult = 'WIN' | 'LOSS' | 'PUSH';
export type OverUnderResult = 'OVER' | 'UNDER' | 'PUSH';

export interface HistoricalNFLGameOdds {
  dayOfWeek: string;
  date: Date;
  timeEastern: string;
  postseason: boolean;
  location: Location;
  favorite: string;
  underdog: string;
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

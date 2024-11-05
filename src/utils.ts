import { Location, OverUnderResult, SpreadResult } from './types';

export const determineLocation = (
  location1: string,
  location2: string,
): Location => {
  if (location1 === '@') {
    return 'FAVORITE';
  }

  if (location1 === 'N') {
    return 'NEUTRAL';
  }

  if (location2 === 'N') {
    return 'NEUTRAL';
  }

  return 'UNDERDOG';
};

export const getSpreadDetails = (
  fullSpread: string,
): { spread: number; spreadResult: SpreadResult } => {
  const [result, spread] = fullSpread.split(' ');
  const spreadResult =
    result === 'W' ? 'WIN' : result === 'L' ? 'LOSS' : 'PUSH';
  return {
    spreadResult,
    spread: spread === 'PK' ? 0 : parseFloat(spread),
  };
};

export const getScoreDetails = (
  fullScore: string,
): {
  favoriteWon: boolean;
  tie: boolean;
  scoreFavorite: number;
  scoreUnderdog: number;
  overtime: boolean;
} => {
  const [result, score, ot] = fullScore.split(' ');
  const [scoreFavoriteString, storeUnderdogString] = score.split('-');
  const scoreFavorite = parseInt(scoreFavoriteString);
  const scoreUnderdog = parseInt(storeUnderdogString);
  return {
    favoriteWon: result === 'W',
    tie: scoreFavorite === scoreUnderdog,
    scoreFavorite,
    scoreUnderdog,
    overtime: ot === '(OT)',
  };
};

export const getOverUnderDetails = (
  fullOverUnder: string,
): { overUnder: number; overUnderResult: OverUnderResult } => {
  const [overUnderString, overUnder] = fullOverUnder.split(' ');
  const overUnderResult =
    overUnderString === 'O'
      ? 'OVER'
      : overUnderString === 'U'
        ? 'UNDER'
        : 'PUSH';
  return {
    overUnderResult,
    overUnder: parseFloat(overUnder),
  };
};

export const getSeedingDetails = (
  fullFavorite: string,
  fullUnderdog: string,
) => {
  const splitOn = '(';
  const [favoriteUntrimmed, favoriteSeedString] = fullFavorite.split(splitOn);
  const [underdogUntrimmed, underdogSeedString] = fullUnderdog.split(splitOn);
  return {
    favorite: favoriteUntrimmed.trim(),
    favoriteSeed: parseInt(favoriteSeedString.replace(')', '')),
    underdog: underdogUntrimmed.trim(),
    underdogSeed: parseInt(underdogSeedString.replace(')', '')),
  };
};

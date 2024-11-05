import axios from 'axios';
import * as cheerio from 'cheerio';
import { DAYS_OF_WEEK, NFL_TEAMS } from './constants';
import { HistoricalNFLGameOdds } from './types';
import {
  determineLocation,
  getOverUnderDetails,
  getScoreDetails,
  getSeedingDetails,
  getSpreadDetails,
} from './utils';

const processHtml = (html: string, year: number): HistoricalNFLGameOdds[] => {
  const games: HistoricalNFLGameOdds[] = [];

  const $ = cheerio.load(html);

  $('table.soh1 tbody tr').each((_index, element) => {
    const dayOfWeek = $(element).find('td').eq(0).text().trim();
    const dayOfWeekPlayoffGame = $(element).find('td').eq(1).text().trim();

    const isRegularSeasonGame = DAYS_OF_WEEK.has(dayOfWeek);
    const isPostseasonGame = DAYS_OF_WEEK.has(dayOfWeekPlayoffGame);

    if (isRegularSeasonGame || isPostseasonGame) {
      let index = isRegularSeasonGame ? 1 : 2;
      const date = $(element).find('td').eq(index++).text().trim();
      const timeEastern = $(element).find('td').eq(index++).text().trim();
      const location1 = $(element).find('td').eq(index++).text().trim();
      const fullFavorite = $(element).find('td').eq(index++).text().trim();
      const fullScore = $(element).find('td').eq(index++).text().trim();
      const fullSpread = $(element).find('td').eq(index++).text().trim();
      const location2 = $(element).find('td').eq(index++).text().trim();
      const fullUnderdog = $(element).find('td').eq(index++).text().trim();
      const fullOverUnder = $(element).find('td').eq(index++).text().trim();
      const notes = isRegularSeasonGame
        ? $(element).find('td').eq(index++).text().trim()
        : '';

      const { spread, spreadResult } = getSpreadDetails(fullSpread);
      const { favoriteWon, tie, scoreFavorite, scoreUnderdog, overtime } =
        getScoreDetails(fullScore);
      const { overUnder, overUnderResult } = getOverUnderDetails(fullOverUnder);

      let favorite = fullFavorite;
      let favoriteSeed: number | undefined = undefined;
      let underdog = fullUnderdog;
      let underdogSeed: number | undefined = undefined;

      if (isPostseasonGame) {
        const {
          favorite: fav,
          favoriteSeed: favSeed,
          underdog: undrdg,
          underdogSeed: undrdgSeed,
        } = getSeedingDetails(fullFavorite, fullUnderdog);
        favorite = fav;
        favoriteSeed = favSeed;
        underdog = undrdg;
        underdogSeed = undrdgSeed;
      }

      games.push({
        season: year,
        dayOfWeek: isRegularSeasonGame ? dayOfWeek : dayOfWeekPlayoffGame,
        date: new Date(date),
        timeEastern,
        postseason: isPostseasonGame,
        location: determineLocation(location1, location2),
        favorite,
        currentFavorite: NFL_TEAMS.get(favorite) || favorite,
        favoriteSeed,
        underdog,
        currentUnderdog: NFL_TEAMS.get(underdog) || underdog,
        underdogSeed,
        spread,
        spreadResult,
        favoriteWon,
        tie,
        scoreFavorite,
        scoreUnderdog,
        overtime,
        overUnder,
        overUnderResult,
        notes,
      });
    }
  });
  return games;
};

export const scrapeHistoricalNFLGameOddsForYear = async (
  year = new Date().getFullYear(),
) => {
  try {
    const url = `https://www.sportsoddshistory.com/nfl-game-season/?y=${year}`;
    const { data: html } = await axios.get(url);
    return processHtml(html, year);
  } catch (error) {
    console.error(
      `Error scrapping historical NFL game odds by year for ${year}:`,
      error,
    );
  }
};

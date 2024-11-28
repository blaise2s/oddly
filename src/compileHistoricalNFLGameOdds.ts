import fs from 'fs';
import { setupDatabase } from '../db/utils';
import { scrapeHistoricalNFLGameOddsForYear } from './scrapers';
import { HistoricalNFLGameOdds } from './types';
import { addNFLGames } from '../db/nfl';

const START_YEAR = 1979;
const END_YEAR = new Date().getFullYear() - 1;

const COLLECTABLE_YEARS = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, index) => START_YEAR + index,
);

interface Params {
  years: number[];
  writeToFile?: string;
  writeToDatabase?: boolean;
}
const compileHistoricalNFLGameOdds = async (
  { years, writeToFile, writeToDatabase }: Params = {
    years: [new Date().getFullYear()],
  },
) => {
  if (!writeToFile && !writeToDatabase) {
    return;
  }

  if (writeToDatabase) {
    await setupDatabase();
  }

  const gamesByYear: { [key: number]: HistoricalNFLGameOdds[] } = {};

  for (let i = 0; i < years.length; i += 1) {
    const year = years[i];
    const games = await scrapeHistoricalNFLGameOddsForYear(year);

    if (games) {
      gamesByYear[year] = games;

      if (writeToDatabase) {
        addNFLGames(games, year);
      }
    }
  }

  if (writeToFile) {
    fs.writeFileSync(writeToFile, JSON.stringify(gamesByYear, null, 2));
  }
};

compileHistoricalNFLGameOdds({
  years: COLLECTABLE_YEARS,
  writeToDatabase: true,
  writeToFile: 'historical_nfl_game_odds_and_results.json',
});

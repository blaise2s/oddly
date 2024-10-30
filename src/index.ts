import fs from "fs";
import { addNFLGames, setupDatabase } from "../db/utils";
import { scrapeHistoricalNFLGameOddsForYear } from "./scrapers";
import { HistoricalNFLGameOdds } from "./types";

const START_YEAR = 1979;
const END_YEAR = new Date().getFullYear();
// const END_YEAR = 2023;

const COLLECTABLE_YEARS = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, index) => START_YEAR + index
);

interface Params {
  years: number[];
  writeToFile?: string;
  writeToDatabase?: boolean;
}
const compileHistoricalNFLGameOdds = async (
  { years, writeToFile, writeToDatabase }: Params = {
    years: [new Date().getFullYear()],
  }
) => {
  if (!writeToFile && !writeToDatabase) {
    return;
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

const main = async () => {
  await setupDatabase();

  // / Write to file...
  // compileHistoricalNFLGameOdds({
  //   years: COLLECTABLE_YEARS,
  //   writeToFile: "historical_nfl_game_odds_and_results.json",
  // });

  // / Write to DB...
  // compileHistoricalNFLGameOdds({
  //   years: COLLECTABLE_YEARS,
  //   writeToDatabase: true,
  // });
};

main();

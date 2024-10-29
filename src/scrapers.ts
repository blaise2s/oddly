import axios from "axios";
import * as cheerio from "cheerio";
import { HistoricalNFLGameOdds } from "./types";
import {
  determineLocation,
  getOverUnderDetails,
  getScoreDetails,
  getSpreadDetails,
} from "./utils";
import { DAYS_OF_WEEK } from "./constants";

export const scrapeHistoricalNFLGameOddsForYear = async (
  year = new Date().getFullYear()
) => {
  try {
    const url = `https://www.sportsoddshistory.com/nfl-game-season/?y=${year}`;
    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);
    const games: HistoricalNFLGameOdds[] = [];

    $("table.soh1 tbody tr").each((_index, element) => {
      const dayOfWeek = $(element).find("td").eq(0).text().trim();
      if (DAYS_OF_WEEK.has(dayOfWeek)) {
        const date = $(element).find("td").eq(1).text().trim();
        const timeEastern = $(element).find("td").eq(2).text().trim();
        const location1 = $(element).find("td").eq(3).text().trim();
        const favorite = $(element).find("td").eq(4).text().trim();
        const fullScore = $(element).find("td").eq(5).text().trim();
        const fullSpread = $(element).find("td").eq(6).text().trim();
        const location2 = $(element).find("td").eq(7).text().trim();
        const underdog = $(element).find("td").eq(8).text().trim();
        const fullOverUnder = $(element).find("td").eq(9).text().trim();
        const notes = $(element).find("td").eq(10).text().trim();

        const { spread, spreadResult } = getSpreadDetails(fullSpread);
        const { favoriteWon, tie, scoreFavorite, scoreUnderdog, overtime } =
          getScoreDetails(fullScore);
        const { overUnder, overUnderResult } =
          getOverUnderDetails(fullOverUnder);

        games.push({
          dayOfWeek,
          date: new Date(date),
          timeEastern,
          location: determineLocation(location1, location2),
          favorite,
          underdog,
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
  } catch (error) {
    console.error(
      `Error scrapping historical NFL game odds by year for ${year}:`,
      error
    );
  }
};

import SQL from 'sql-template-strings';
import { HistoricalNFLGameOdds } from '../src/types';
import { db, pgp } from './utils';

export const addNFLGame = async (game: HistoricalNFLGameOdds) => {
  const {
    dayOfWeek,
    date,
    timeEastern,
    postseason,
    location,
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
  } = game;

  const query = SQL`
    INSERT INTO nfl_games (
      day_of_week,
      game_date,
      time_eastern,
      postseason,
      game_loc,
      favorite,
      underdog,
      spread,
      spread_res,
      favorite_won,
      tie,
      score_favorite,
      score_underdog,
      overtime,
      over_under,
      over_under_res,
      notes
    ) VALUES (
      ${dayOfWeek},
      ${date},
      ${timeEastern},
      ${postseason},
      ${location},
      ${favorite},
      ${underdog},
      ${spread},
      ${spreadResult},
      ${favoriteWon},
      ${tie},
      ${scoreFavorite},
      ${scoreUnderdog},
      ${overtime},
      ${overUnder},
      ${overUnderResult},
      ${notes},
    )
    RETURNING id;
  `;

  try {
    const result = await db.one(query);
    console.info('Inserted game:', result);
  } catch (error) {
    console.error('Error inserting game:', error);
  }
};

export const addNFLGames = async (
  games: HistoricalNFLGameOdds[],
  year: number,
) => {
  const columns = new pgp.helpers.ColumnSet(
    [
      { name: 'day_of_week', prop: 'dayOfWeek' },
      { name: 'game_date', prop: 'date' },
      { name: 'time_eastern', prop: 'timeEastern' },
      { name: 'postseason', prop: 'postseason' },
      { name: 'game_loc', prop: 'location' },
      { name: 'favorite', prop: 'favorite' },
      { name: 'underdog', prop: 'underdog' },
      { name: 'score_favorite', prop: 'scoreFavorite' },
      { name: 'score_underdog', prop: 'scoreUnderdog' },
      { name: 'favorite_won', prop: 'favoriteWon' },
      { name: 'tie', prop: 'tie' },
      { name: 'spread', prop: 'spread' },
      { name: 'spread_res', prop: 'spreadResult' },
      { name: 'over_under', prop: 'overUnder' },
      { name: 'over_under_res', prop: 'overUnderResult' },
      { name: 'overtime', prop: 'overtime' },
      { name: 'notes', prop: 'notes' },
    ],
    {
      table: 'nfl_games',
    },
  );
  const query = pgp.helpers.insert(games, columns);

  try {
    await db.none(query);
    console.log(`Inserted games for year: ${year}`);
  } catch (error) {
    console.error('Error inserting games:', error);
  }
};

import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import { db } from '../db/utils';
import { Order, OrderBys, Sorts } from './types';

const corsOptions: CorsOptions = {
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Health check
app.get('/api/health', (_, res) => {
  res.json({ status: 'up' });
});

// Games
app.post<
  unknown,
  unknown,
  {
    seasons?: number[];
    teams?: string[];
    headToHead?: boolean;
    order?: Order[];
  }
>('/api/nfl/games', async (req, res) => {
  const {
    seasons = [new Date().getFullYear()],
    teams,
    headToHead,
    order: orders,
  } = req.body;

  try {
    let position = 1;
    const queryParts: string[] = [];
    const queryParams: (string[] | number[])[] = [];
    let orderPart = '';

    if (seasons) {
      queryParts.push(`g.season = ANY($${position}::int[])`);
      queryParams.push(seasons);
      position += 1;
    }

    if (teams) {
      queryParts.push(
        `(g.current_favorite = ANY($${position}::text[]) ${headToHead ? 'AND' : 'OR'} g.current_underdog = ANY($${position}::text[]))`,
      );
      queryParams.push(teams);
      position += 1;
    }

    if (orders) {
      const orderParts: string[] = [];
      orders.forEach(({ by, sort }) => {
        orderParts.push(`g.${OrderBys[by]} ${Sorts[sort]}`);
      });
      orderPart = 'ORDER BY ' + orderParts.join(', ');
    }

    const games = await db.any(
      [
        'SELECT * FROM nfl_games g WHERE',
        queryParts.join(' AND '),
        orderPart,
      ].join(' '),
      queryParams,
    );
    res.json(games);
  } catch (error) {
    console.error(`Error fetching games:`, error);
    res.status(500).json({
      error: `An error occurred while fetching games.`,
    });
  }
});

// Games for season
app.get('/api/nfl/games/:season', async (req, res) => {
  const { season } = req.params;
  try {
    const games = await db.any(
      'SELECT * FROM nfl_games g WHERE g.season = $1',
      [season],
    );
    res.json(games);
  } catch (error) {
    console.error(`Error fetching games for season ${season}:`, error);
    res.status(500).json({
      error: `An error occurred while fetching games for season ${season}.`,
    });
  }
});

// Games for season by team
app.get<
  { season: number; team: string },
  unknown,
  unknown,
  { favorite: string | undefined }
>('/api/nfl/games/:season/:team', async (req, res) => {
  const { season, team } = req.params;
  const { favorite } = req.query;
  const isFavorite = favorite && favorite.toLowerCase() === 'true';
  try {
    const favoriteOrUnderdog = isFavorite
      ? 'SELECT * FROM nfl_games g WHERE g.season = $1 AND g.current_favorite = $2'
      : 'SELECT * FROM nfl_games g WHERE g.season = $1 AND g.current_underdog = $2';
    const games = await db.any(
      favorite
        ? favoriteOrUnderdog
        : 'SELECT * FROM nfl_games g WHERE g.season = $1 AND (g.current_underdog = $2 OR g.current_favorite = $2)',
      [season, team],
    );
    res.json(games);
  } catch (error) {
    console.error(
      `Error fetching games for ${team} in season ${season}:`,
      error,
    );
    res.status(500).json({
      error: `An error occurred while fetching games for ${team} in season ${season}.`,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

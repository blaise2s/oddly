import path from 'path';
import pgPromise, { QueryFile } from 'pg-promise';

export const pgp = pgPromise();
export const db = pgp({
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'oddly',
  user: process.env.DB_USER || 'oddly',
  password: process.env.DB_PASSWORD || 'oddly',
});

const loadSqlFile = (file: string): QueryFile => {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
};

export const setupDatabase = async () => {
  try {
    const createTablesSql = loadSqlFile('oddly.sql');
    await db.none(createTablesSql);
    console.info('Tables created successfully or already exist.');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

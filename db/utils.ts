import path from 'path';
import pgPromise, { QueryFile } from 'pg-promise';

export const pgp = pgPromise();
export const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'oddly',
  user: 'oddly',
  password: 'oddly',
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

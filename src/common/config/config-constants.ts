export const server = {
  port: 3333,
};

export const database: Database = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
};

type Database = {
  type: 'postgres';
  host: string;
  port: number | string;
};

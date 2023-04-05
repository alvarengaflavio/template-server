export default (): Configuration => ({
  port: parseInt(process.env.PORT, 10) || 3333,
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    socketPath: process.env.SOCKET,
    synchronize: Boolean(process.env.RUN_MIGRATIONS),
  },
});

export const config: Configuration = {
  port: parseInt(process.env.PORT, 10) || 3333,
  database: {
    type: 'postgres',
    host: String(process.env.SOCKET) || String(process.env.POSTGRES_HOST),
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    database: String(process.env.POSTGRES_DATABASE),
    synchronize: Boolean(process.env.RUN_MIGRATIONS) || false,
  },
};

type Configuration = {
  port: number;
  database: Database;
};

type Database = {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  socketPath?: string;
  synchronize: boolean;
};

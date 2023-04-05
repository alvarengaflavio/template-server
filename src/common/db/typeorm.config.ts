import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: String(process.env.SOCKET) || String(process.env.POSTGRES_HOST),
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DATABASE),
  synchronize: Boolean(process.env.RUN_MIGRATIONS) || false,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
};

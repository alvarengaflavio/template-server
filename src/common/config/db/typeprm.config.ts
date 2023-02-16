import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { database } from '../config-constants';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: database.type,
  host: process.env.DB_HOSTNAME || database.host,
  port: (process.env.DB_PORT as any) || database.port,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: (process.env.TYPEORM_SYNC as any) || true,
};

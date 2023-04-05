import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getPing(): string {
    const port = this.getPort();

    return `Server is running! Go to http://localhost:${port}/api to see the API documentation. 🚀🚀🚀`;
  }

  getServerConfig(): Configuration {
    return {
      port: this.getPort(),
      database: this.getDatabase(),
    };
  }

  private getDatabase(): Database {
    const database = this.configService.get('database');

    return database;
  }

  private getPort(): number {
    const port: number = this.configService.get('port');

    return port;
  }
}

type Database = {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  socketPath: string;
  synchronize: boolean;
};

type Configuration = {
  port: number;
  database: Database;
};

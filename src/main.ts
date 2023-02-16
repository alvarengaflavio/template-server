import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { server } from './common/config/config-constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const port = server.port;

  await app.listen(port).then(() => {
    logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { server } from './common/config/config-constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const port = server.port;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Provao User API')
    .setDescription('API for managing users')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('server')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port).then(() => {
    logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();

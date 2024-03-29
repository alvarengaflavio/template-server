import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from './common/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const port = config.port;

  const configSwagger = new DocumentBuilder()
    .setTitle('Template Server')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .addTag('server')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(port).then(() => {
    logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();

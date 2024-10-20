import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { getAppConfig } from './configs/app.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const appConfig = getAppConfig();
  const logger = new Logger();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  app.enableCors({ origin: '*' });

  const documentConfig = new DocumentBuilder()
    .setTitle('Bitcoin Price Service')
    .setDescription('Documentation of bitcoin price service')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, documentConfig),
  );

  await app.listen(appConfig.port, '0.0.0.0', () => {
    logger.debug(`Bitcoin service available on port ${appConfig.port}`);
  });
}

bootstrap();

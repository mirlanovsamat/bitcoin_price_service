import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getAppConfig } from './configs/app.config';
import { Logger } from '@nestjs/common';

const appConfig = getAppConfig();
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  await app.listen(appConfig.port, '0.0.0.0', () => {
    logger.debug(`Bitcoin service available on port ${appConfig.port}`);
  });
}

bootstrap();

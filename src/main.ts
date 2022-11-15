import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { AppConfigService } from 'src/modules/app/app-config.services';
import { AppModule } from 'src/modules/app/app.module';
import { createExceptionFactory } from './common/core/exception-factory';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);
  const { port, url } = config.app;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: createExceptionFactory,
    }),
  );

  if (config.isProduction) {
    app.use(helmet());
  }

  if (config.isDevelopment) {
  }

  if (config.isLogging) {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  await app.listen(port, '0.0.0.0');
  logger.log(`Server at Port : ${port}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app/app.module';
import { AppConfigService } from 'src/modules/app/app-config.services';
import { Logger } from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);
  const { port, url } = config.app;


  if (config.isProduction) {
    app.use(helmet());
  }

  if (config.isDevelopment) {

  }

  if (config.isLogging) {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  

  await app.listen(port);
  logger.log(`Server at Port : ${port}`)
}
bootstrap();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const helmet_1 = require("helmet");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const app_config_services_1 = require("./modules/app/app-config.services");
const app_module_1 = require("./modules/app/app.module");
const exception_factory_1 = require("./common/core/exception-factory");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(app_config_services_1.AppConfigService);
    const { port, url } = config.app;
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: exception_factory_1.createExceptionFactory,
    }));
    app.enableCors();
    if (config.isProduction) {
        app.use((0, helmet_1.default)());
    }
    if (config.isDevelopment) {
    }
    if (config.isLogging) {
        app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    }
    await app.listen(port, '0.0.0.0');
    logger.log(`Server at Port : ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
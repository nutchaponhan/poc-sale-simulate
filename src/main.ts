import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

function createSwagger(
  app: INestApplication,
  configService: ConfigService,
): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API Documentation')
    .setVersion(configService.get<string>('app.apiVersion', '1.0'))
    .addBearerAuth()
    .build();

  return SwaggerModule.createDocument(app, config);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const httpAdapter = app.get(HttpAdapterHost);

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Global prefix
  app.setGlobalPrefix(configService.get<string>('app.apiPrefix', 'api'));

  // Enable CORS
  app.enableCors({
    origin: configService.get<string>('app.cors.origin', '*'),
  });

  // Global pipes and interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger setup
  const document = createSwagger(app, configService);

  SwaggerModule.setup(
    configService.get<string>('app.swaggerPath', 'docs'),
    app,
    document,
  );

  const port = configService.get<number>('app.port', 3000);
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();

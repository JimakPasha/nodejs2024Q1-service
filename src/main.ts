import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { generateSwaggerConfig } from './configs/swagger.config';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('doc', app, generateSwaggerConfig(app));

  await app.listen(PORT);
}
bootstrap();

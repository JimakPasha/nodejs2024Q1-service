import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const generateSwaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder().build();
  return SwaggerModule.createDocument(app, config);
};

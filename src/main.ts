import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from './commom/env.config';
import { validateConfig } from './commom/validate.config';
import * as dotenv from 'dotenv';

dotenv.config();
function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Gemini example')
    .setDescription('The Gemini API description')
    .setVersion('1.0')
    .addTag('google gemini')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // URL do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.useGlobalPipes(validateConfig);
  app.use(compression());
  setupSwagger(app);
  await app.listen(env.PORT);
}
bootstrap();

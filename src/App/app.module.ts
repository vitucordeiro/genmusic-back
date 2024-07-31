import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import { GeminiModule } from '../modules/gemini/gemini.module';
import { SpotifyModule } from 'src/modules/spotify/spotify.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';

export class JsonBodyParserMiddleware implements NestMiddleware {
  use = json({ limit: '100kb' });
}

export class UrlEncodedParserMiddleware implements NestMiddleware {
  use = urlencoded({ extended: true });
}
@Module({
  imports: [GeminiModule, SpotifyModule, ConfigModule, HttpModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(JsonBodyParserMiddleware, UrlEncodedParserMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}

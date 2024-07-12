import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import { GeminiModule } from '../modules/gemini/gemini.module';

export class JsonBodyParserMiddleware implements NestMiddleware {
  use = json({ limit: '100kb' });
}

export class UrlEncodedParserMiddleware implements NestMiddleware {
  use = urlencoded({ extended: true });
}
@Module({
  imports: [GeminiModule],
  controllers: [],
  providers: [],
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

import { Module } from '@nestjs/common';
import { GeminiService } from './services/gemini.service';

@Module({
  providers: [GeminiService],
  exports:[GeminiService]
})
export class GeminiModule {}

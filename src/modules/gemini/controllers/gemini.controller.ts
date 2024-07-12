import { Body, Controller, Get, Post } from '@nestjs/common';
import { createPlaylistRequestDto } from '../dtos/create-playlist.dto';
import { GeminiService } from '../services/gemini.service';

@Controller('gemini')
export class GeminiController {
  @Get()
  hello() {
    return 'opa';
  }

  @Post('create')
  async createPlaylist(
    @Body() prompt: createPlaylistRequestDto,
  ): Promise<string> {
    return new GeminiService().createPlaylist(prompt);
  }
}

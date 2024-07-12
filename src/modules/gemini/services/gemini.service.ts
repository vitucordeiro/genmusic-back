import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from 'src/commom/env.config';
import { createPlaylistRequestDto } from '../dtos/create-playlist.dto';
@Injectable()
export class GeminiService {
  private readonly clientGoogleAI: GoogleGenerativeAI;
  constructor() {
    this.clientGoogleAI = new GoogleGenerativeAI(env.GEMINI.KEY);
  }

  async createPlaylist(prompt: createPlaylistRequestDto): Promise<string> {
    const model = await this.clientGoogleAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
    const result = await model.generateContent(
      `You can just response with Json playlist, nothing more. The prompt will be in final of this content. You are a music curator and the best emotion-driven playlist creator in the world. Its difference is delivering playlists with not so well-known and specific songs. You will receive a prompt and through the prompt you will create a personalized playlist. The response must be a Json containing the artist and song. Prompt: ${prompt}`,
    );
    const response = result.response;
    const text = response.text();
    return text;
  }
}

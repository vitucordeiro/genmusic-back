import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from 'src/commom/env.config';
import { createPlaylistRequestDto } from '../dtos/create-playlist.dto';


@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly clientGoogleAI: GoogleGenerativeAI;

  constructor(

  ) {
    this.clientGoogleAI = new GoogleGenerativeAI(env.GEMINI.KEY);
  }

  public async createPlaylist(prompt: string): Promise<Record<string,string>> {
    const model = await this.clientGoogleAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
    const result = await model.generateContent(
      `Generate a playlist as a JSON object where the keys are song titles and the values are artist name. The prompt will be at the end of this content. You are a music curator and the best emotion-driven playlist creator in the world. Your specialty is delivering playlists with not so well-known and specific songs. Create a personalized playlist based on the following prompt: ${prompt}`,
    );
    const rawText = result.response.text();
  
    // Extract JSON using regex
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in the response');
    }
  
    const jsonString = jsonMatch[0].trim();
    
    // Parse the extracted JSON
    const playlist = JSON.parse(jsonString);
  
    return playlist;
  }
}


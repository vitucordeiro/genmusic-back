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
      `Generate a playlist as a JSON object where the keys are song titles and the values are artist name.
       The prompt will be at the end of this content. You are the best music curator in the world. All genres is accept.
        Create a personalized playlist based on the following prompt: ${prompt}`,
    );
    const rawText = result.response.text();
  
    try {
      const playlist = JSON.parse(rawText);
      this.logger.log('Playlist parsed successfully');
      return playlist;
    } catch (error) {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        this.logger.error('No valid JSON found in the response');
        this.logger.error('Raw response:', rawText);
        throw new Error('No valid JSON found in the response');
      }
      const jsonString = jsonMatch[0].trim();
      try {
        const playlist = JSON.parse(jsonString);
        this.logger.log('Playlist extracted and parsed successfully');
        return playlist;
      } catch (parseError) {
        this.logger.error('Failed to parse extracted JSON');
        this.logger.error('Extracted JSON:', jsonString);
        throw new Error('Failed to parse extracted JSON');
      }
    }
  }
}

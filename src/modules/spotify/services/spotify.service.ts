import { Injectable, Logger, Headers } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class SpotifyService {
    private readonly logger = new Logger(SpotifyService.name);

    constructor(
    ) {
    }
    getToken(token:string): string{
      return `Bearer ${token}`;
    }
    async checkPlaylistOnSpotify(token:string, playlist: Record<string, string>) {
      const results = [];

      for (const [artist, song] of Object.entries(playlist)) {
        try{

          const searchResponse = await axios.get(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(`${artist} ${song}`)}&type=track&limit=1`,
            {
              headers: {
                'Authorization': token
              }
            }
          )
          const track = searchResponse.data.tracks.items[0];
          if (track) {
            results.push({
              uri: track.uri,
              name: track.name,
              artist: track.artists[0].name,
              albumImage: track.album.images[0].url,
              previewUrl: track.preview_url
            });
          }
          
          
        } catch(error){
          if (axios.isAxiosError(error)){
            this.logger.error(`Error on request to API Spotify: ${error.message}`);
              if (error.response){
                this.logger.error(`Status: ${error.response.status}`);
                this.logger.error(`Data: ${JSON.stringify(error.response.data)}`)
              }
          }else{
            this.logger.error(`Unexpected error: ${error.message}`)
          }
          this.logger.error(`Artist and song doesn't exists`)
        }
      }
      return results;
    }
}
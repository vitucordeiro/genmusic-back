import { Injectable, Logger, Headers } from '@nestjs/common';

import axios from 'axios';
@Injectable()
export class SpotifyService {
    private readonly logger = new Logger(SpotifyService.name);

    constructor(
    ) {
    }
    
    async checkPlaylistOnSpotify(token: string, playlist: Record<string, string>) {
      const searchPromises = Object.entries(playlist).map(([artist, song]) =>
        axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(`${artist} ${song}`)}&type=track&limit=1`,
          { headers: { "Authorization": token } }
        ).then(response => {
          const track = response.data.tracks.items[0];
          if (track) {
            return {
              uri: track.uri,
              name: track.name,
              artist: track.artists[0].name,
              albumImage: track.album.images[0].url,
              previewUrl: track.preview_url
            };
          }
          return null;
        }).catch(error => {
          this.logger.error(`Error searching for "${artist} - ${song}": ${error.message}`);
          return null;
        })
      );
    
      const results = await Promise.all(searchPromises);
      return results.filter(result => result !== null);
    }
    
   
    async createPlaylistOnSpotify(token: string, uris: string[], playlistName: string) {
      const PLAYLIST_DESCRIPTION = 'Playlist generate by GenMusic.ai'
      try {
        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
          headers: { "Authorization":token }
        });
        const userId = userResponse.data.id;
    
        const createPlaylistResponse = await axios.post(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          { 
            name: playlistName, 
            description: PLAYLIST_DESCRIPTION, 
            public: false 
          },
          {
            headers: { "Authorization": token }
          }
        );
        const playlistId = createPlaylistResponse.data.id;
        const playlistUrl = createPlaylistResponse.data.external_urls.spotify;
        const playlistImage = createPlaylistResponse.data.images[0]?.url || null;
        
        await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          { uris: uris },
          { headers: { "Authorization": token } }
        );
    
        return [playlistUrl, playlistImage];

      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.error('Spotify API error:', e.response?.data);
          throw new Error(`Spotify API error: ${e.response?.data?.error?.message || e.message}`);
        }
        console.error('Unexpected error:', e);
        throw e;
      }
    }
    
}
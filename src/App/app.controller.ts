import { Body, Controller, Get, Post, Req, Headers } from "@nestjs/common";
import { GeminiService } from "src/modules/gemini/services/gemini.service";

import { SpotifyService } from "src/modules/spotify/services/spotify.service";

@Controller('/app')
export class AppController {
    logger: any;
    token: string;
    constructor(private readonly geminiService: GeminiService, private readonly spotifyService: SpotifyService){}
    @Post('/create')
    async create(@Body('prompt') prompt: string, @Headers() headers) {
        try {
            const playlist = await this.geminiService.createPlaylist(prompt);
            const rawToken = headers['authorization'];
            const checkedPlaylist = await this.spotifyService.checkPlaylistOnSpotify(rawToken, playlist);
            const jsonPlaylist = JSON.parse(JSON.stringify(checkedPlaylist));
            return jsonPlaylist;
        } catch (e) {
            console.error('Error in generate method:', e);
            throw new Error(`Failed to generate playlist: ${e.message}`);
        }
    }

    @Post('/generate')
    async generate(@Body('uris') uris:string[], @Body('playlistName') playlist:string, @Headers() headers) {
        console.log(playlist)
        try{
            const rawToken = headers['authorization'];
            const response = await this.spotifyService.createPlaylistOnSpotify(rawToken, uris, playlist);
            return JSON.parse(JSON.stringify(response));
        } catch(e){
            console.error(e)
        }
    }

}


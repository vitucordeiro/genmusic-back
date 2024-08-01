import { Body, Controller, Get, Post } from "@nestjs/common";
import { MusicItem } from "./DTOs/PlaylistGerenateDTO";
import { GeminiService } from "src/modules/gemini/services/gemini.service";
import { createPlaylistRequestDto } from "src/modules/gemini/dtos/create-playlist.dto";
import { validatePrompt } from "src/helpers/validatePrompt";
@Controller('/app')
export class AppController {
    constructor(private readonly geminiService: GeminiService){}
    @Post('/generate')
    async generate(@Body() prompt: string) {
        if(prompt = null) return null
        const playlist = await this.geminiService.createPlaylist(JSON.stringify(prompt));
        console.log(playlist[0])
        return playlist
    }
}


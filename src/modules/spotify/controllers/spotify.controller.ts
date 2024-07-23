import { Controller, Get } from '@nestjs/common';

@Controller('spotify')
export class SpotifyControllerTsController {
    @Get('music')
    async getMusic(){
        
    }
}

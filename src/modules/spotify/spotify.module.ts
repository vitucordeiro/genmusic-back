import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpotifyService } from './services/spotify.service';

@Module({
  providers:[SpotifyService],
  exports:[SpotifyService]
})
export class SpotifyModule {}

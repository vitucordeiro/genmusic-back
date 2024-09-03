import { Injectable, Logger } from '@nestjs/common';
import { env } from 'src/commom/env.config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger(PrismaService.name);
  prismaClient: PrismaClient;
  constructor(
    prismaClient: PrismaClient
  ) {
    super();
    this.prismaClient = new PrismaClient(); 
  }

  public async savePlaylistOnDatabase(data: Record<string, any>, userId: string): Promise<void> {
    const existsPlaylist = await this.prismaClient.playlist.findUnique({
      where: {
        userId: userId
      }, 
      select: {
        hasPlaylist: true
      }
    })
    if(existsPlaylist){
      await this.prismaClient.playlist.deleteMany({
        where: { 
          userId: userId
        }
      })
    }
    await this.prismaClient.playlist.create({
      data: {
        data: data,
        userId: userId,
        isGeneratedOnSpotify: false,
        hasPlaylist: true,
      }
    })
  }  
}


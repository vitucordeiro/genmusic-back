import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { env } from 'src/commom/env.config';
@Global()
@Module({
  providers: [PrismaService],
  exports:[PrismaService],
  imports: [
  ]
})
export class PrismaModule {}

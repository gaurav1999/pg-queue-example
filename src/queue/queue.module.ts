import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { PrismaService } from '../prisma.service';


@Module({
  imports: [],
  controllers: [],
  providers: [QueueService, PrismaService],
  exports: [QueueService]
})
export class QueueModule {}

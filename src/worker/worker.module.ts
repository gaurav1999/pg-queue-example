import { Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [
    QueueModule
  ],
  controllers: [],
  providers: [ConsumerService],
})
export class WorkerModule {}

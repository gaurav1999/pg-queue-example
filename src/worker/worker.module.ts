import { Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { ConsumerService } from './consumer.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    QueueModule,
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [ConsumerService],
})
export class WorkerModule {}

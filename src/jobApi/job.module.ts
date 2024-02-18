import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { QueueModule } from '../queue/queue.module';


@Module({
  imports: [QueueModule],
  controllers: [JobController],
  providers: [],
})
export class JobModule {}

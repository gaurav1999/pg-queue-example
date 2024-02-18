import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './jobApi/job.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    JobModule,
    QueueModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

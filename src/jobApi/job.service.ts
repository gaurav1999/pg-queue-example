import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { QueueStatus } from '@prisma/client';

@Injectable()
export class JobService {

  constructor(private queueService: QueueService) {}


  async getJobStatus(id: string): Promise<QueueStatus> {
    const jobStatus = await this.queueService.getJob({ id: Number(id) });
    return jobStatus;
  }

  async createJob(name: string): Promise<Number> {
    return this.queueService.createJob(name);
  }
}

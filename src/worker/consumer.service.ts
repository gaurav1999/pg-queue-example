import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class ConsumerService {

    private logger = new Logger(ConsumerService.name);

    constructor(private queueService: QueueService) {
        this.logger.log(`Worker booted up`);
        this.consumeEvents();
    }

    private async consumeEvents() {
        while (1) {
            const event = await this.queueService.getLatestJob();
            if(event) {
                this.logger.log(`Processing event -- id ${event.id} ---- ${event.name}`);
                await this.queueService.lockForProcessing(event.id);
                try {
                    await this.handler();
                } catch(error) {
                    await this.queueService.markFailed(event.id);
                    this.logger.error(`Job: ${event.id} Couldn't be processed --- ${error.message}`);
                }
                await this.queueService.markProcessed(event.id);
                this.logger.log(`Processing event done -- id ${event.id} ---- ${event.name}`);
            }
        }
    }

    private async handler() {
        //Your consuming logic, might be a heavy computation or time taking
        this.logger.log(`Starting to Consume`);
        await new Promise((res, rej) => { setTimeout(res, 2000) });
        this.logger.log(`Consumption Done`);
    }

    @Interval(10000) //Could be configured later on
    private  async cleanDeadJobs() {
        await this.queueService.cleanDeadJobs();
    }
}
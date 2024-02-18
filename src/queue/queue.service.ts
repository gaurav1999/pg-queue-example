import { Prisma, Queue, QueueStatus } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";


@Injectable()
export class QueueService {

    private logger = new Logger(QueueService.name);

    //EXPECTING A QUEUE JOB TO NOT TAKE MORE THAN 10 Minutes.
    //We can take this in constructor also, to make it more configurable
    private static JOB_QUEUE_TIME_OUT = 10;

    constructor (private prisma: PrismaService) {}

    async getJob(queueWhereUniqueInput: Prisma.QueueWhereUniqueInput): Promise<QueueStatus | null> {
        const job =  await this.prisma.queue.findUnique({ where: queueWhereUniqueInput } );
        if(job?.status) return job.status;
        else throw new BadRequestException("Job Not Exists");
    }

    async createJob(name: string): Promise<number> {
        return (await this.prisma.queue.create({ data: { name }})).id;
    }
    
    async getLatestJob(): Promise<Queue | null > {
        return this.prisma.queue.findFirst({ where: { status: QueueStatus.NEW }, orderBy: { id: "asc" }   });
    }

    async lockForProcessing(id: number): Promise<boolean> {
        const response = await this.prisma.queue.update({ where: { id, status: QueueStatus.NEW, isDead: false }, data: { status: QueueStatus.PROCESSING, processingAt: new Date() } });
        if(response)return true;
        return false;
    }

    async markProcessed(id: number): Promise<boolean> {
        const response = await this.prisma.queue.update({ where: { id, status: QueueStatus.PROCESSING, isDead: false }, data: { status: QueueStatus.DONE } });
        if(response)return true;
        return false;
    }

    async cleanDeadJobs() {
        const tenMinutesAgo = new Date(Date.now() - QueueService.JOB_QUEUE_TIME_OUT * 60 * 1000);
        const deadJobs = await this.prisma.queue.updateMany({ where: { processingAt: { lte: tenMinutesAgo }, isDead: false }, data: {  isDead: true } });
        this.logger.log(`Cleaned jobs which hanged up --> ${deadJobs.count}`)
    }




}

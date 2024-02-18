import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
 ApiTags,
 ApiResponse,
 ApiOperation,
 ApiBody,
 ApiParam
} from '@nestjs/swagger';
import { CreateJobDto } from './dto/create-job.dto';
import { QueueService } from '../queue/queue.service';

@Controller('v1')
export class JobController {
  constructor(private queueService: QueueService) {}

  @ApiTags('job')
  @ApiOperation({ summary: 'create a request to server that would reqiure some heavy processing to be done' })
  @Post('create')
  @ApiResponse({ status: 201, description: 'Returns a Job Id' })
  @ApiBody({ type: CreateJobDto, description: "Request body required to create a job" })
  create(@Body() body: CreateJobDto) {
    return this.queueService.createJob(body.name);
  }

  @ApiTags('job')
  @ApiOperation({ summary: 'Get Job Status' })
  @Get('status/:id')
  @ApiResponse({ status: 200, description: 'Get Job Status' })
  @ApiResponse({ status: 400, description: 'Job Not Found'  })
  @ApiParam({ type: String,  name: 'id', description: "Job Id" })
  status(@Param('id') jobId: string) {
    return this.queueService.getJob({ id: Number(jobId) });
  }
}

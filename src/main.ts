import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WorkerModule } from './worker/worker.module';

async function bootstrap() {

  const mode = process.env.MODE;

  if(mode !== "worker") {
    const app = await NestFactory.create(AppModule, { logger: console });
    const config = new DocumentBuilder()
      .setTitle('Postgres Queue Example')
      .setVersion('1.0')
      .addTag('example')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
  } else {

    const worker = await NestFactory.create(WorkerModule, { logger: console });
    await worker.listen(3001);

  }

  
}
bootstrap();

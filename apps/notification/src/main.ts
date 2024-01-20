import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('NOTIFICATION'));
  await app.startAllMicroservices();
}
bootstrap();

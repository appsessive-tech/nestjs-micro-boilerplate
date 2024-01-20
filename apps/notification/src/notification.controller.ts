import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.notificationService.getHello();
  }

  @EventPattern('user_created')
  async handleUserCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.notificationService.createLog(data);
    this.rmqService.ack(context);
  }

  @EventPattern('user_deleted')
  async handleUserDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    this.notificationService.deleteLog(data);
    this.rmqService.ack(context);
  }
}

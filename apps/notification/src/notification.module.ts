import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { RmqModule } from '@app/common';
import * as Joi from 'joi';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_NOTIFICATION_QUEUE: Joi.string().required(),
      }),
    }),
    HttpModule,
    RmqModule,
    TerminusModule
  ],
  controllers: [HealthCheckController, NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}

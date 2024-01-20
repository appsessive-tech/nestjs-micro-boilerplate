import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  getHello(): string {
    return 'NotificationService';
  }

  createLog(data: any) {
    this.logger.log('Created...', data);
  }

  deleteLog(data: any) {
    this.logger.log('Deleted...', data);
  }
}

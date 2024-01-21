import { Controller, Get } from "@nestjs/common";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MicroserviceHealthIndicator } from "@nestjs/terminus";

@Controller('notification')
export class HealthCheckController {
    constructor(
        private healthCheckService: HealthCheckService,
        private http: HttpHealthIndicator,
        private ms: MicroserviceHealthIndicator
    ){}

    @Get('health')
    @HealthCheck()
    checkHealth() {
        return this.healthCheckService.check([
            () => this.http.pingCheck('Self Check', 'http://localhost:3001'),
            () => this.ms.pingCheck<RmqOptions>('rmq', {
                transport: Transport.RMQ,
                options: { urls: ['amqp://localhost:5672']},
            })
        ]);
    }
}
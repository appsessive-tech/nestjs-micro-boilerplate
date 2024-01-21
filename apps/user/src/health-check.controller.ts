import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MongooseHealthIndicator } from "@nestjs/terminus";

@Controller('health')
export class HealthCheckController {
    constructor(
        private healthCheckService: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: MongooseHealthIndicator
    ){}

    @Get()
    @HealthCheck()
    checkHealth() {
        return this.healthCheckService.check([
            () => this.http.pingCheck('Self Check', 'http://localhost:3000/user'),
            () => this.db.pingCheck('mongoose')
        ]);
    }
}
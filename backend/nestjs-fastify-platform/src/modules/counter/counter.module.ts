import { Module } from "@nestjs/common"
import { CounterService } from "./counter.service.js"

@Module({
  providers: [CounterService],
  exports: [CounterService],
})
export class CounterModule {}

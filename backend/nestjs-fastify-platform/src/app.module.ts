import { Module } from "@nestjs/common"
import { ConnectModule } from "./core/connect/connect.module.js"
import { CounterModule } from "./features/counter/counter.module.js"

@Module({
    imports: [ConnectModule, CounterModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

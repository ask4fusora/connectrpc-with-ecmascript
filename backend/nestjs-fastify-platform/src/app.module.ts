import { Module } from "@nestjs/common"
import { RpcModule } from "./rpc/rpc.module.js"

@Module({
  imports: [RpcModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

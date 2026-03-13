import { fastifyConnectPlugin } from "@connectrpc/connect-fastify"
import { Module, type OnModuleInit } from "@nestjs/common"
// biome-ignore lint/style/useImportType: Dependency Injection.
import { HttpAdapterHost } from "@nestjs/core"
import type { FastifyInstance } from "fastify"
import { CounterService } from "@/gen/counter/v1alpha/counter_pb"
import { CounterModule } from "../modules/counter/counter.module.js"
import { CounterHandler } from "./handlers/counter.handler.js"

@Module({
  imports: [CounterModule],
  providers: [CounterHandler],
})
export class RpcModule implements OnModuleInit {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly counterHandler: CounterHandler,
  ) {}

  public async onModuleInit(): Promise<void> {
    const fastifyInstance = this.httpAdapterHost.httpAdapter.getInstance() as FastifyInstance

    await fastifyInstance.register(fastifyConnectPlugin, {
      routes: (router) => {
        router.service(CounterService, this.counterHandler.getServiceImpl())
      },
    })
  }
}

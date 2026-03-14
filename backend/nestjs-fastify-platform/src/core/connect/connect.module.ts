import { fastifyConnectPlugin } from "@connectrpc/connect-fastify"
import { Global, Module, type OnApplicationBootstrap } from "@nestjs/common"
import { HttpAdapterHost } from "@nestjs/core"
import type { FastifyInstance } from "fastify"

// Core dependencies only. No Business Feature imports allowed here.
import { RegistryService } from "./registry.service.js"

/**
 * The `ConnectModule` is a purely infrastructure-level (Core) module.
 * It is completely decoupled from business features (like the Counter feature).
 *
 * It uses the `RegistryService` (an Inversion of Control mechanism) to discover
 * and bind RPC Handlers dynamically at runtime, rather than statically importing
 * them at compile time.
 */
@Global()
@Module({
    providers: [RegistryService],
    exports: [RegistryService],
})
export class ConnectModule implements OnApplicationBootstrap {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly registryService: RegistryService,
    ) {}

    public async onApplicationBootstrap(): Promise<void> {
        const fastifyInstance =
            this.httpAdapterHost.httpAdapter.getInstance() as FastifyInstance

        await fastifyInstance.register(fastifyConnectPlugin, {
            routes: (router) => {
                // Iterate over all handlers dynamically registered by Feature Modules
                // and mount them against their respective Protobuf schemas.
                const handlers = this.registryService.getHandlers()

                for (const handlerData of handlers) {
                    router.service(
                        handlerData.schema,
                        handlerData.handler.getServiceImpl(),
                    )
                }
            },
        })
    }
}

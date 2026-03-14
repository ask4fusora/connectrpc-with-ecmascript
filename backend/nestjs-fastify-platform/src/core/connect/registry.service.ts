import type { DescService } from "@bufbuild/protobuf"
import { Injectable, Logger } from "@nestjs/common"
import type { RpcHandler } from "./rpc-handler.interface.js"

export interface RegisteredHandler<T extends DescService = DescService> {
    schema: T
    handler: RpcHandler<T>
}

/**
 * An Inversion of Control (IoC) registry for Connect-RPC handlers.
 *
 * Instead of the Core module importing every Feature module to mount its routes,
 * Feature modules inject this RegistryService and register themselves.
 * This fully decouples the generic infrastructure from the business logic domains.
 */
@Injectable()
export class RegistryService {
    private readonly logger = new Logger(RegistryService.name)
    private readonly handlers: RegisteredHandler[] = []

    /**
     * Registers a feature-specific RPC Handler against its Protobuf schema.
     *
     * @param schema The compiled Protobuf service schema (e.g., `CounterService`)
     * @param handler The NestJS DI-resolved handler implementing `RpcHandler`
     */
    public register<T extends DescService>(
        schema: T,
        handler: RpcHandler<T>,
    ): void {
        this.logger.debug(
            `Registering RPC Handler for schema: ${schema.typeName}`,
        )
        this.handlers.push({ schema, handler })
    }

    /**
     * Returns the list of all dynamically registered RPC handlers.
     * Consumed by the ConnectModule to mount the routes onto Fastify.
     */
    public getHandlers(): RegisteredHandler[] {
        return this.handlers
    }
}

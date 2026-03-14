import type { ServiceImpl } from "@connectrpc/connect"
import { Injectable } from "@nestjs/common"

// Core abstractions (Dependency Inversion).
import type { RpcHandler } from "@/core/connect/rpc-handler.interface.js"
import type { CounterService as CounterServiceSchema } from "@/gen/counter/v1alpha/counter_pb"

// IMPORTANT: Do not use `import type` here.
// NestJS Dependency Injection requires the physical value token at runtime
// via reflect-metadata to resolve the dependency.
import { CounterService } from "./counter.service.js"

/**
 * Maps the generated Connect-RPC schema to our internal NestJS Service logic.
 * This class implements the core `RpcHandler` interface to ensure strict
 * structural conformity across all feature modules.
 */
@Injectable()
export class CounterHandler implements RpcHandler<typeof CounterServiceSchema> {
    constructor(private readonly counterService: CounterService) { }

    /**
     * Generates the Connect-RPC service implementation payload.
     * This structure strictly adheres to the ServiceImpl type exported by
     * `@connectrpc/connect`.
     */
    public getServiceImpl(): Partial<ServiceImpl<typeof CounterServiceSchema>> {
        return {
            increaseCounter: (req) => {
                // Delegate to pure NestJS business logic which is now fully
                // typed against the ConnectRPC request and response schemas.
                return this.counterService.increaseCounter(req)
            },
        }
    }
}

import type { DescService } from "@bufbuild/protobuf"
import type { ServiceImpl } from "@connectrpc/connect"

/**
 * A standard interface representing an RPC Handler within the NestJS domain.
 * By enforcing this interface across all feature modules, the `ConnectModule`
 * can uniformly discover and register RPC schemas without tightly coupling
 * to specific feature implementations.
 *
 * @template T - The generated Protobuf Service Schema type (e.g., `typeof CounterService`)
 */
export interface RpcHandler<T extends DescService> {
    /**
     * Returns an object mapping the Protobuf RPC methods to their actual
     * NestJS business logic implementations.
     *
     * We use `Partial<ServiceImpl<T>>` to allow gradual implementation of
     * large service contracts during development without breaking the compiler.
     */
    getServiceImpl(): Partial<ServiceImpl<T>>
}

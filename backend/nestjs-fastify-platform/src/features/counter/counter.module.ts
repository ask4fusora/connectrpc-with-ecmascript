import { Module, type OnModuleInit } from "@nestjs/common"
import { RegistryService } from "@/core/connect/registry.service.js"
import { CounterService as CounterServiceSchema } from "@/gen/counter/v1alpha/counter_pb"
import { CounterHandler } from "./counter.rpc-handler.js"
import { CounterService } from "./counter.service.js"

@Module({
    providers: [CounterService, CounterHandler],
    exports: [CounterService, CounterHandler],
})
export class CounterModule implements OnModuleInit {
    constructor(
        // IMPORTANT: Import RegistryService and CounterHandler as values to
        // allow NestJS to resolve them via reflect-metadata.
        private readonly registryService: RegistryService,
        private readonly counterHandler: CounterHandler,
    ) {}

    public onModuleInit(): void {
        // Dynamically register the handler with the core Connect-RPC registry.
        // This achieves complete Inversion of Control (IoC): the core platform
        // knows nothing about the Counter feature until the feature registers
        // itself here.
        this.registryService.register(CounterServiceSchema, this.counterHandler)
    }
}

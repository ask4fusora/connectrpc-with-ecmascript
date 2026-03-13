import type { ServiceImpl } from "@connectrpc/connect"
import { Injectable } from "@nestjs/common"
import type { CounterService as CounterServiceSchema } from "@/gen/counter/v1alpha/counter_pb"
// biome-ignore lint/style/useImportType: Dependency Injection.
import { CounterService } from "../../modules/counter/counter.service"

@Injectable()
export class CounterHandler {
  constructor(private readonly counterService: CounterService) {}

  public getServiceImpl(): ServiceImpl<typeof CounterServiceSchema> {
    return this.counterService
  }
}

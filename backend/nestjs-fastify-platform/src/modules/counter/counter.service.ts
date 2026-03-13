import { create } from "@bufbuild/protobuf"
import type { ServiceImpl } from "@connectrpc/connect"
import { Injectable, Logger } from "@nestjs/common"
import {
  type CounterService as CounterServiceSchema,
  type IncreaseCounterRequest,
  type IncreaseCounterResponse,
  IncreaseCounterResponseSchema,
} from "@/gen/counter/v1alpha/counter_pb"

@Injectable()
export class CounterService implements ServiceImpl<typeof CounterServiceSchema> {
  private readonly logger = new Logger(CounterService.name)
  private currentCount: bigint = 0n

  public increaseCounter(req: IncreaseCounterRequest): IncreaseCounterResponse {
    const delta = BigInt(req.delta || 1)
    this.currentCount += delta

    this.logger.log(`Counter increased by ${delta}. New value: ${this.currentCount}`)

    return create(IncreaseCounterResponseSchema, {
      currentValue: this.currentCount,
    })
  }

  public getCurrentValue(): bigint {
    return this.currentCount
  }
}

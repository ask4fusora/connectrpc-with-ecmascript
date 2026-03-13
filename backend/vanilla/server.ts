import * as http from "node:http2"
import { connectNodeAdapter } from "@connectrpc/connect-node"
import { CounterService } from "@/gen/counter/v1alpha/counter_pb"

const DEFAULT_PORT = 4000

let currentCount: bigint = 0n

const handler = connectNodeAdapter({
  routes: (router): void => {
    router.service(CounterService, {
      increaseCounter: (req) => {
        const delta = BigInt(req.delta || 1)
        currentCount += delta
        console.table({ currentCount: currentCount, delta })
        return { currentValue: currentCount }
      },
    })
  },
})

const portString: string | undefined = Bun.env.PORT
const port: number = portString ? parseInt(portString, 10) : DEFAULT_PORT

http.createServer(handler).listen(port, () => {
  console.log(`\`counter-service\` initialized. Listening on port ${port}.`)
})

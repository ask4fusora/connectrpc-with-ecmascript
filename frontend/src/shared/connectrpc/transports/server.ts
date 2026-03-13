import "server-only"

import { createConnectTransport } from "@connectrpc/connect-node"

const BACKEND_URL = "http://localhost:4000"

const transport = createConnectTransport({
  baseUrl: BACKEND_URL,
  httpVersion: "2",
  useHttpGet: false,
  useBinaryFormat: true,
})

export { transport }

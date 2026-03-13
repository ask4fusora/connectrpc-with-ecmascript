import "client-only"

import { createConnectTransport } from "@connectrpc/connect-web"

const BACKEND_URL = "http://localhost:4000"

const transport = createConnectTransport({
  baseUrl: BACKEND_URL,
  useHttpGet: false,
  useBinaryFormat: true,
  fetch: (input, init): Promise<Response> => {
    return fetch(input, { ...init })
  },
})

export { transport }

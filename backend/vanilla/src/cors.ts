/**
 * Hey devs, let the security does this for you, no worry.
 */

import type { IncomingMessage, ServerResponse } from "node:http"
import { cors as connectCors } from "@connectrpc/connect"

const FRONTEND_ORIGIN = "http://localhost:3000"

/**
 * A standard CORS middleware wrapper for Node.js / Bun HTTP servers.
 * It injects the specific headers required by Connect-RPC and gRPC-Web
 * and automatically resolves browser preflight (OPTIONS) requests.
 *
 * @param handler The underlying request handler (e.g., `connectNodeAdapter`).
 * @returns A wrapped handler that processes CORS before executing the RPC.
 */
export function withCors(
  handler: (request: IncomingMessage, response: ServerResponse) => void,
): (request: IncomingMessage, response: ServerResponse) => void {
  return (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Access-Control-Allow-Origin", FRONTEND_ORIGIN)
    res.setHeader("Access-Control-Allow-Methods", connectCors.allowedMethods.join(", "))
    res.setHeader("Access-Control-Allow-Headers", connectCors.allowedHeaders.join(", "))
    res.setHeader("Access-Control-Expose-Headers", connectCors.exposedHeaders.join(", "))
    res.setHeader("Access-Control-Max-Age", "7200")

    if (req.method === "OPTIONS") {
      res.writeHead(204)
      res.end()
      return
    }

    handler(req, res)
  }
}

"use client"

import { ConnectError, createClient } from "@connectrpc/connect"
import { Suspense, use, useCallback, useEffect, useRef, useState } from "react"
import { CounterService } from "@/gen/counter/v1alpha/counter_pb"
import { transport } from "@/shared/connectrpc/transports/client"

interface LogEntry {
  id: string
  message: string
  type: "info" | "error" | "success"
}

// Instantiate the client outside the render tree to maintain a stable reference.
// Also, this shows that you can just create a connectrpc client on-the-fly, with a suitable
// service descriptor and transport (server for server-side, client for client-side).
const counterClient = createClient(CounterService, transport)

function CounterPageInner({ params }: Pick<PageProps<"/[delta]">, "params">) {
  const { delta: deltaStr } = use(params)

  // Application State.
  const [currentValue, setCurrentValue] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState<boolean>(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const logContainerRef = useRef<HTMLDivElement>(null)

  // Parameter Validation.
  // `int64` for the contract, thus `bigint`. We can use `int32` and use normal `number` though.
  let delta: bigint = 0n
  let parseError: Error | null = null

  try {
    delta = BigInt(deltaStr)
  } catch (e) {
    parseError = e instanceof Error ? e : new Error("invalid delta value")
  }

  // Logging Subsystem.
  const addLog = useCallback((message: string, type: LogEntry["type"] = "info") => {
    setLogs((prev) => [...prev, { id: crypto.randomUUID(), message, type }])
  }, [])

  const clearLogs = () => setLogs([])

  // Auto-scroll logic for the terminal.
  useEffect(() => {
    if (logContainerRef.current && logs.length) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs.length])

  // RPC Execution Handler
  const handleExecute = async () => {
    if (parseError) return

    setIsExecuting(true)
    addLog(`Executing \`increaseCounter\` with \`delta\`: ${delta.toString()}...`, "info")

    try {
      const response = await counterClient.increaseCounter({ delta })
      console.log(response)
      setCurrentValue(response.currentValue.toString())
      addLog(
        `Success: Counter increased. New value: ${response.currentValue.toString()}`,
        "success",
      )
    } catch (error) {
      console.log(error)
      if (error instanceof ConnectError) {
        addLog(`ConnectRPC Error [${error.code}]: ${error.message}`, "error")
      } else if (error instanceof Error) {
        addLog(`RPC Error: ${error.message}`, "error")
      }
    } finally {
      setIsExecuting(false)
    }
  }

  // UI Helpers.
  const getLogColorClass = (type: LogEntry["type"]) => {
    switch (type) {
      case "error":
        return "text-red-400"
      case "success":
        return "text-green-400"
      default:
        return "text-zinc-300"
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-12 font-sans sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="font-extrabold text-3xl text-zinc-900 tracking-tight">
            API Gateway Routing Physics Test
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-500">
            Testing Cross-Origin ConnectRPC integration through the gateway infrastructure.
          </p>
        </div>

        {/* Main Control Card */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex flex-col items-center p-6 sm:p-10">
            {/* Value Display */}
            <div className="mb-8 flex min-h-[120px] w-full flex-col items-center justify-center rounded-xl border border-zinc-300 border-dashed bg-zinc-50">
              {currentValue !== null ? (
                <>
                  <span className="mb-2 font-semibold text-xs text-zinc-500 uppercase tracking-widest">
                    Current Counter Value
                  </span>
                  <span className="font-black text-6xl text-indigo-600 tracking-tighter">
                    {currentValue}
                  </span>
                </>
              ) : (
                <span className="text-sm text-zinc-400 italic">
                  Run the RPC to fetch current value
                </span>
              )}
            </div>

            {/* Validation Warning */}
            {parseError && (
              <div className="mb-6 w-full rounded-r-md border-red-500 border-l-4 bg-red-50 p-4 text-red-700 text-sm">
                <p className="font-medium">Invalid URL Parameter</p>
                <p className="mt-1">
                  The path parameter <strong>{deltaStr}</strong> cannot be parsed as a valid number.
                  Please use a numeric route, e.g., <code>/counter/2</code>.
                </p>
                <div className="mt-3 rounded bg-red-100 p-3 font-mono text-red-800 text-xs shadow-sm">
                  <p className="mb-1 font-semibold text-[10px] text-red-900/70 uppercase tracking-wider">
                    Parsing Exception
                  </p>
                  {parseError.message}
                </div>
              </div>
            )}

            {/* Execute Button */}
            <button
              type="button"
              onClick={handleExecute}
              disabled={isExecuting || !!parseError}
              className={`relative inline-flex w-full items-center justify-center rounded-xl border border-transparent px-8 py-4 font-bold text-base text-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:w-auto ${isExecuting || !!parseError
                ? "cursor-not-allowed bg-indigo-300"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]"
                }`}
            >
              {isExecuting ? (
                <>
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white/80"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Executing Request...
                </>
              ) : (
                <>
                  Execute GetCounter RPC
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-indigo-500 px-2 py-0.5 font-mono text-xs">
                    +{!parseError ? delta.toString() : "?"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Terminal / Log Output */}
        <div className="flex h-80 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#0a0a0a] shadow-lg">
          <div className="flex select-none items-center justify-between border-zinc-800 border-b bg-zinc-900 px-4 py-3">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/20" />
              <div className="h-3 w-3 rounded-full border border-yellow-500/50 bg-yellow-500/20" />
              <div className="h-3 w-3 rounded-full border border-green-500/50 bg-green-500/20" />
              <span className="ml-2 font-mono text-xs text-zinc-500">gateway-stdout.log</span>
            </div>
            {logs.length > 0 && (
              <button
                type="button"
                onClick={clearLogs}
                className="font-medium text-xs text-zinc-500 transition-colors hover:text-zinc-300"
              >
                Clear Console
              </button>
            )}
          </div>

          <div
            ref={logContainerRef}
            className="flex-1 space-y-1.5 overflow-y-auto scroll-smooth p-4 font-mono text-sm"
          >
            {logs.length === 0 ? (
              <div className="mt-2 select-none text-center text-zinc-600 italic">
                System idle. Ready for RPC execution.
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className={`wrap-break-word ${getLogColorClass(log.type)}`}
                >
                  {log.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CounterPage({ params }: PageProps<"/[delta]">) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 font-sans">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      }
    >
      <CounterPageInner params={params} />
    </Suspense>
  )
}

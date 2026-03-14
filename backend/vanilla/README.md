# Vanilla Connect RPC Backend

A lightweight, framework-free backend implementation demonstrating the core mechanics of [Connect RPC](https://connectrpc.com/). This implementation provides a minimal yet complete example of how to build a production-ready RPC server using only standard libraries and the Connect RPC framework, without the overhead of a full-stack framework like NestJS.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Server](#running-the-server)
- [Server Configuration](#server-configuration)
- [Service Implementation](#service-implementation)
- [Middleware Development](#middleware-development)
- [Request/Response Pipeline](#requestresponse-pipeline)
- [Connect RPC Handlers](#connect-rpc-handlers)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [CORS Configuration](#cors-configuration)
- [Bun vs Node.js](#bun-vs-nodejs)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Extending the Backend](#extending-the-backend)
- [Best Practices](#best-practices)
- [Comparison with NestJS](#comparison-with-nestjs)
- [Further Reading](#further-reading)

## Overview

This backend implementation serves as a demonstration of the fundamental building blocks of Connect RPC servers. By using vanilla Node.js or Bun without a framework, we achieve maximum performance, minimal memory footprint, and complete control over the HTTP request lifecycle.

The vanilla implementation is ideal for scenarios where you need maximum performance, are building microservices with a small footprint, want to understand the inner workings of Connect RPC, or prefer a minimal dependencies approach to reduce security vulnerabilities and maintenance burden.

This implementation communicates using the Connect protocol over HTTP/1.1 and HTTP/2, supporting all RPC communication patterns including unary calls, server streaming, client streaming, and bidirectional streaming. The server can handle multiple concurrent connections and is designed to scale horizontally when deployed behind a load balancer.

## Features

This vanilla backend implementation includes numerous features that demonstrate best practices for building high-performance RPC servers:

### Core Features

- **Framework-Free Architecture**: Built directly on Node.js/Bun HTTP servers without framework abstractions, providing complete control over the request handling pipeline.
- **Connect RPC Protocol**: Full implementation of the Connect RPC protocol supporting unary, server streaming, client streaming, and bidirectional streaming RPCs.
- **HTTP/2 Support**: Native HTTP/2 support for improved performance with multiplexing, header compression, and server push capabilities.
- **Type Safety**: Complete TypeScript support with generated types from Protocol Buffer definitions, ensuring end-to-end type safety from the proto definitions to the server implementation.
- **Middleware Pipeline**: Customizable middleware system for request processing, including logging, CORS, compression, and custom business logic.
- **Hot Reload Development**: Development mode with automatic server restart on file changes using bun --watch or nodemon.

### Performance Features

- **Minimal Dependencies**: Only essential packages required, reducing attack surface and memory footprint compared to full-featured frameworks.
- **Direct Memory Access**: No framework overhead means direct control over memory allocation and garbage collection patterns.
- **Connection Keep-Alive**: HTTP keep-alive connections reduce TCP handshake overhead for repeated requests.
- **Request Streaming**: Support for streaming request and response bodies for efficient handling of large payloads.
- **Zero-Copy Operations**: Where possible, operations are optimized to minimize memory copies.

### Developer Experience Features

- **Comprehensive Logging**: Structured logging with configurable log levels for debugging and production monitoring.
- **Error Messages**: Detailed error messages and stack traces in development mode, sanitized errors in production.
- **Health Endpoints**: Built-in health check endpoints for container orchestration and load balancer probes.
- **Graceful Shutdown**: Proper handling of process signals for graceful shutdown and zero-downtime deployments.

### Production Features

- **Environment Configuration**: Environment-based configuration for different deployment scenarios.
- **Security Headers**: Configurable security headers including CORS, CSP, HSTS, and X-Frame-Options.
- **Request Validation**: Integration with Protocol Buffers for automatic request validation.
- **Rate Limiting**: Configurable rate limiting to protect against abuse and DDoS attacks.
- **Request ID Tracking**: Automatic request ID generation and correlation for distributed tracing.

## Architecture

The vanilla backend follows a layered architecture that separates concerns while maintaining simplicity:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HTTP Server Layer                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Request Handler                          │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │   │
│  │  │   CORS      │  │   Logging   │  │   Rate Limiting    │ │   │
│  │  │  Middleware │  │  Middleware  │  │    Middleware      │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                               │                                      │
│                               ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  Connect RPC Router                         │   │
│  │  ┌─────────────────────────────────────────────────────┐   │   │
│  │  │              Service Implementation                  │   │   │
│  │  │  ┌─────────────────────────────────────────────┐     │   │   │
│  │  │  │         CounterService Implementation      │     │   │   │
│  │  │  │  ┌───────────┐  ┌───────────┐  ┌────────┐ │     │   │   │
│  │  │  │  │ GetCounter│  │  Stream   │  │ Update │ │     │   │   │
│  │  │  │  │           │  │  Counter  │  │Counter │ │     │   │   │
│  │  │  │  └───────────┘  └───────────┘  └────────┘ │     │   │   │
│  │  │  └─────────────────────────────────────────────┘     │   │   │
│  │  └─────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Layer Descriptions

**HTTP Server Layer**: The foundation layer using either Bun's native HTTP server or Node.js's http/http2 modules. This layer handles TCP connections, TLS encryption, and HTTP protocol parsing.

**Middleware Layer**: A series of middleware functions that process each request before it reaches the Connect RPC router. Middleware can modify requests, responses, or reject requests early (e.g., CORS preflight).

**Connect RPC Router Layer**: The Connect RPC-specific request handling that routes incoming requests to the appropriate service implementation based on the RPC method and path.

**Service Implementation Layer**: The business logic implementation that implements the service interfaces defined in the Protocol Buffer definitions. This is where the actual application logic resides.

## Prerequisites

Before setting up the vanilla backend, ensure your development environment meets the following requirements:

### Required Software

- **Bun** (version 1.1 or later): Fast JavaScript runtime with native HTTP support.
  - Verify installation: `bun --version`
  - Installation: Visit [bun.sh](https://bun.sh/) for platform-specific instructions.

- **Node.js** (version 18 or later): Alternative runtime with http2 module support.
  - Verify installation: `node --version`
  - Recommended: Use nvm (Node Version Manager) for managing Node.js versions.

- **Buf** (version 1.20 or later): Protocol Buffer code generation tool.
  - Verify installation: `buf --version`
  - Installation: Visit [buf.build/install](https://buf.build/install)

- **Git**: Version control system.
  - Verify installation: `git --version`

### Generated Proto Code

The backend requires generated TypeScript code from Protocol Buffer definitions:

1. Ensure proto files exist in the `proto/` directory at the project root.
2. From the project root, run `buf generate` to generate the TypeScript server stubs.
3. Verify generated files exist in `src/generated/`.

### System Requirements

- **Operating System**: macOS, Linux, or Windows (with WSL2 recommended).
- **Memory**: Minimum 256MB RAM (the server has minimal memory overhead).
- **CPU**: Single core sufficient for development; multiple cores recommended for production.
- **Disk Space**: At least 100MB free space.

## Installation

Follow these steps to install all required dependencies:

### Step 1: Navigate to Backend Directory

```bash
cd backend/vanilla
```

### Step 2: Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Using npm (alternative)
npm install

# Using yarn (alternative)
yarn install
```

The installation process will install:
- `@connectrpc/connect`: Core Connect RPC library
- `@connectrpc/connect-node`: Node.js-specific Connect RPC adapters
- `@bufbuild/protobuf`: Protocol Buffer runtime
- `zod`: Runtime validation (optional, for request validation)
- Development dependencies for TypeScript and testing

### Step 3: Generate Proto Code (If Not Already Done)

From the project root:

```bash
# Navigate to project root
cd ../..

# Generate TypeScript code from proto definitions
buf generate
```

### Step 4: Environment Configuration

Create a `.env` file in the `backend/vanilla/` directory:

```bash
# Copy example environment file
cp .env.example .env.local
```

Edit `.env.local` with your preferred settings (see [Server Configuration](#server-configuration) section).

## Project Structure

The vanilla backend follows a minimal yet organized structure:

```
backend/vanilla/
├── src/
│   ├── server.ts                 # Main entry point - server initialization
│   ├── cors.ts                   # CORS middleware configuration
│   ├── logger.ts                 # Logging configuration and utilities
│   ├── config.ts                 # Environment configuration
│   ├── services/                 # Service implementations
│   │   ├── counter.service.ts   # Counter service business logic
│   │   └── index.ts            # Service exports
│   ├── handlers/                # Connect RPC handlers
│   │   ├── counter.handler.ts  # Counter RPC handler
│   │   └── index.ts            # Handler exports
│   ├── middleware/              # Custom middleware
│   │   ├── logging.ts          # Request logging middleware
│   │   ├── ratelimit.ts       # Rate limiting middleware
│   │   └── index.ts           # Middleware exports
│   ├── routes/                  # Route definitions
│   │   └── index.ts
│   ├── types/                   # Custom TypeScript types
│   │   └── index.ts
│   ├── utils/                   # Utility functions
│   │   └── index.ts
│   └── generated/               # Generated code from proto files
│       └── connectrpc/          # Generated Connect RPC code
│           ├── counter/
│           │   └── v1alpha/
│           │       ├── counter.pb.ts      # Protobuf message types
│           │       ├── counter.connect.ts # Connect RPC stubs
│           │       └── index.ts
│           └── index.ts
├── test/                        # Test files
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── e2e/                    # End-to-end tests
├── scripts/                     # Build and utility scripts
│   └── build.ts               # Build script
├── .env.example                # Example environment variables
├── .env.local                 # Local environment (git-ignored)
├── biome.jsonc                # Biome formatter/linter config
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
├── bun.lockb                  # Bun lock file
└── README.md                  # This file
```

### File Descriptions

**server.ts**: The main entry point that initializes the HTTP server, configures middleware, sets up the Connect RPC router, registers service implementations, and starts the server listening on the configured port.

**cors.ts**: CORS (Cross-Origin Resource Sharing) middleware configuration that handles preflight requests and sets appropriate CORS headers for cross-origin API access.

**logger.ts**: Logging utilities that provide structured logging with different log levels (debug, info, warn, error) and optional integration with external logging services.

**config.ts**: Environment-based configuration management that loads settings from environment variables with sensible defaults.

**services/**: Directory containing business logic implementations. Each service file implements the logic for RPC methods defined in the Protocol Buffer definitions.

**handlers/**: Connect RPC handler implementations that bridge the Connect RPC protocol to the business logic services. These implement the generated service interfaces.

**middleware/**: Custom middleware functions that process requests before they reach the RPC handlers. This is where cross-cutting concerns like logging, rate limiting, and authentication are implemented.

**generated/**: Auto-generated code from Protocol Buffer definitions. These files are created by `buf generate` and should not be manually edited.

## Running the Server

Start the vanilla backend server:

### Development Mode

```bash
# From the backend/vanilla directory
cd backend/vanilla

# Using Bun (recommended)
bun run dev

# Using npm
npm run dev
```

The development server will start on `http://localhost:3001` by default.

### Production Mode

```bash
# Build the TypeScript code
bun run build

# Start the production server
bun run start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run build` | Compile TypeScript to JavaScript |
| `bun run start` | Start production server |
| `bun run clean` | Clean build artifacts |
| `bun run lint` | Run Biome linter |
| `bun run format` | Format code with Biome |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run test` | Run tests |

### Custom Port

```bash
# Using environment variable
PORT=3005 bun run dev

# Using command line argument (if supported)
bun run dev --port 3005
```

## Server Configuration

Configure the server using environment variables:

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `HOST` | Server host | `0.0.0.0` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `CORS_ORIGIN` | Allowed CORS origins (comma-separated) | `*` |
| `LOG_LEVEL` | Logging level (debug/info/warn/error) | `info` |
| `REQUEST_TIMEOUT` | Request timeout in milliseconds | `30000` |
| `RATE_LIMIT_WINDOW` | Rate limit window in milliseconds | `60000` |
| `RATE_LIMIT_MAX` | Maximum requests per window | `100` |
| `ENABLE_HTTP2` | Enable HTTP/2 support | `true` |

### Configuration File

```typescript
// src/config.ts
import { z } from "zod";

const configSchema = z.object({
  port: z.coerce.number().default(3001),
  host: z.string().default("0.0.0.0"),
  nodeEnv: z.enum(["development", "production", "test"]).default("development"),
  corsOrigin: z.string().default("*"),
  logLevel: z.enum(["debug", "info", "warn", "error"]).default("info"),
  requestTimeout: z.coerce.number().default(30000),
  rateLimitWindow: z.coerce.number().default(60000),
  rateLimitMax: z.coerce.number().default(100),
  enableHttp2: z.boolean().default(true),
});

export const config = configSchema.parse(process.env);
```

## Service Implementation

Implement your service logic following the generated interface:

### Basic Service Implementation

```typescript
// src/services/counter.service.ts
import { Counter } from "../generated/connectrpc/counter/v1alpha/counter_pb";

export class CounterService {
  private counter: Counter = new Counter({
    id: 1n,
    value: 0n,
    label: "default",
  });

  async getCounter(): Promise<Counter> {
    return this.counter;
  }

  async incrementCounter(delta: bigint): Promise<Counter> {
    this.counter.value += delta;
    return this.counter;
  }

  async decrementCounter(delta: bigint): Promise<Counter> {
    this.counter.value -= delta;
    return this.counter;
  }

  async resetCounter(): Promise<Counter> {
    this.counter.value = 0n;
    return this.counter;
  }
}

export const counterService = new CounterService();
```

### Handler Implementation

```typescript
// src/handlers/counter.handler.ts
import { CounterService } from "@connectrpc/connect";
import {
  CounterServiceServer,
} from "../generated/connectrpc/counter/v1alpha/CounterService_connect";
import {
  GetCounterRequest,
  GetCounterResponse,
  IncrementCounterRequest,
  IncrementCounterResponse,
} from "../generated/connectrpc/counter/v1alpha/counter_pb";
import { counterService } from "../services/counter.service";

export class CounterHandler implements CounterServiceServer {
  async getCounter(
    request: GetCounterRequest
  ): Promise<GetCounterResponse> {
    const counter = await counterService.getCounter();
    return new GetCounterResponse({
      value: counter.value,
      requestId: request.requestId,
    });
  }

  async incrementCounter(
    request: IncrementCounterRequest
  ): Promise<IncrementCounterResponse> {
    const counter = await counterService.incrementCounter(request.delta);
    return new IncrementCounterResponse({
      value: counter.value,
      success: true,
    });
  }

  // Implement other methods from CounterServiceServer interface
}
```

## Middleware Development

Create custom middleware for request processing:

### Basic Middleware

```typescript
// src/middleware/logging.ts
import type { Request, Response, NextFunction } from "express";

export function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();

  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Capture response finish
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${duration}ms`
    );
  });

  next();
}
```

### CORS Middleware

```typescript
// src/cors.ts
import type { IncomingMessage, ServerResponse } from "http";

export interface CorsOptions {
  origin: string | string[];
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge?: number;
}

export function createCorsMiddleware(options: CorsOptions) {
  return function corsMiddleware(
    req: IncomingMessage,
    res: ServerResponse
  ): void {
    const origin = req.headers.origin;

    // Handle preflight
    if (req.method === "OPTIONS") {
      handlePreflight(res, origin);
      return;
    }

    // Set CORS headers for actual request
    if (origin && isOriginAllowed(origin, options.origin)) {
      (res as any).setHeader("Access-Control-Allow-Origin", origin);
    }

    if (options.credentials) {
      (res as any).setHeader("Access-Control-Allow-Credentials", "true");
    }

    if (options.exposedHeaders.length > 0) {
      (res as any).setHeader(
        "Access-Control-Expose-Headers",
        options.exposedHeaders.join(",")
      );
    }

    next();
  };

  function handlePreflight(res: ServerResponse, origin: string | undefined) {
    if (origin && isOriginAllowed(origin, options.origin)) {
      (res as any).setHeader("Access-Control-Allow-Origin", origin);
    }

    (res as any).setHeader(
      "Access-Control-Allow-Methods",
      options.methods.join(",")
    );

    (res as any).setHeader(
      "Access-Control-Allow-Headers",
      options.allowedHeaders.join(",")
    );

    if (options.credentials) {
      (res as any).setHeader("Access-Control-Allow-Credentials", "true");
    }

    if (options.maxAge) {
      (res as any).setHeader("Access-Control-Max-Age", options.maxAge.toString());
    }

    (res as any).statusCode = 204;
    res.end();
  }
}

function isOriginAllowed(origin: string, allowed: string | string[]): boolean {
  if (allowed === "*") return true;
  if (Array.isArray(allowed)) return allowed.includes(origin);
  return origin === allowed;
}
```

### Rate Limiting Middleware

```typescript
// src/middleware/ratelimit.ts
import type { IncomingMessage, ServerResponse } from "http";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private entries: Map<string, RateLimitEntry> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    // Cleanup old entries periodically
    setInterval(() => this.cleanup(), windowMs);
  }

  middleware() {
    return (req: IncomingMessage, res: ServerResponse): boolean => {
      const key = this.getClientKey(req);
      const now = Date.now();

      let entry = this.entries.get(key);

      if (!entry || now > entry.resetTime) {
        entry = { count: 0, resetTime: now + this.windowMs };
        this.entries.set(key, entry);
      }

      entry.count++;

      // Set rate limit headers
      (res as any).setHeader("X-RateLimit-Limit", this.maxRequests.toString());
      (res as any).setHeader(
        "X-RateLimit-Remaining",
        Math.max(0, this.maxRequests - entry.count).toString()
      );
      (res as any).setHeader(
        "X-RateLimit-Reset",
        new Date(entry.resetTime).toISOString()
      );

      if (entry.count > this.maxRequests) {
        (res as any).statusCode = 429;
        (res as any).setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            error: "Too Many Requests",
            message: "Rate limit exceeded",
            retryAfter: Math.ceil((entry.resetTime - now) / 1000),
          })
        );
        return false;
      }

      return true;
    };
  }

  private getClientKey(req: IncomingMessage): string {
    // Use IP address as client identifier
    return (
      req.headers["x-forwarded-for"] ||
      req.socket?.remoteAddress ||
      "unknown"
    );
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.entries) {
      if (now > entry.resetTime) {
        this.entries.delete(key);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();
```

## Request/Response Pipeline

Understanding and customizing the request/response pipeline:

### Pipeline Flow

```
Incoming Request
       │
       ▼
┌──────────────────┐
│ TCP Connection   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ TLS Termination  │ (if HTTPS)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ HTTP Parser      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ CORS Middleware  │──── OPTIONS/ Preflight
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Logging Middleware│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Rate Limit       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Body Parsing     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Connect RPC      │──── Route to Service
│ Router           │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Service Handler  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Response         │
└──────────────────┘
```

### Custom Pipeline Stage

```typescript
// Adding custom pipeline stage
function createCustomPipeline() {
  return [
    // Stage 1: Parse path
    (req: Request) => {
      req.url = req.url.replace(/^\/api/, "");
      return true;
    },

    // Stage 2: Add request ID
    (req: Request, res: Response) => {
      const requestId =
        req.headers["x-request-id"] ||
        crypto.randomUUID();
      (req as any).requestId = requestId;
      (res as any).setHeader("X-Request-Id", requestId);
      return true;
    },

    // Stage 3: Timing
    (req: Request, res: Response, next: NextFunction) => {
      (req as any).startTime = Date.now();
      res.on("finish", () => {
        const duration = Date.now() - (req as any).startTime;
        console.log(`Request completed in ${duration}ms`);
      });
      next();
    },
  ];
}
```

## Connect RPC Handlers

Implementing Connect RPC handlers with full protocol support:

### Unary Handler

```typescript
// Simple request-response RPC
async getCounter(
  req: GetCounterRequest
): Promise<GetCounterResponse> {
  const counter = await counterService.getCounter();
  return new GetCounterResponse({
    value: counter.value,
    requestId: req.requestId,
  });
}
```

### Server Streaming Handler

```typescript
// Stream responses to client
async *streamCounter(
  req: StreamCounterRequest
): AsyncIterable<Counter> {
  const counter = await counterService.getCounter();
  const startValue = req.startValue ?? 0n;

  for (let i = 0; i < 10; i++) {
    const value = startValue + BigInt(i);
    yield new Counter({
      id: counter.id,
      value,
      label: counter.label,
    });

    // Simulate delay between streams
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
```

### Client Streaming Handler

```typescript
// Receive multiple requests, send single response
async updateCounter(
  req: AsyncIterable<CounterUpdateRequest>
): Promise<CounterUpdateResponse> {
  let totalDelta = 0n;

  for await (const update of req) {
    totalDelta += update.delta;
  }

  const counter = await counterService.incrementCounter(totalDelta);
  return new CounterUpdateResponse({
    finalValue: counter.value,
    success: true,
  });
}
```

### Bidirectional Streaming Handler

```typescript
// Stream requests and responses
async *chat(
  req: AsyncIterable<ChatRequest>
): AsyncIterable<ChatResponse> {
  for await (const message of req) {
    // Process message
    const response = new ChatResponse({
      userId: message.userId,
      message: `Echo: ${message.message}`,
      timestamp: new Date(),
    });

    yield response;
  }
}
```

## Error Handling

Proper error handling ensures reliable service operation:

### ConnectError Usage

```typescript
import { ConnectError, Code } from "@connectrpc/connect";

function handleError(error: unknown): ConnectError {
  if (error instanceof ConnectError) {
    return error;
  }

  if (error instanceof Error) {
    return new ConnectError(error.message, Code.internal);
  }

  return new ConnectError("Unknown error", Code.unknown);
}
```

### Error Middleware

```typescript
function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("Error:", err);

  const connectError = handleError(err);

  (res as any).statusCode = getHttpStatus(connectError.code);
  (res as any).setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      code: connectError.code,
      message: connectError.message,
      details: connectError.details,
    })
  );
}

function getHttpStatus(code: Code): number {
  switch (code) {
    case Code.ok:
      return 200;
    case Code.invalidArgument:
      return 400;
    case Code.notFound:
      return 404;
    case Code.alreadyExists:
      return 409;
    case Code.permissionDenied:
      return 403;
    case Code.unauthenticated:
      return 401;
    case Code.resourceExhausted:
      return 429;
    case Code.internal:
      return 500;
    default:
      return 500;
  }
}
```

## Logging

Comprehensive logging for debugging and monitoring:

### Structured Logger

```typescript
// src/logger.ts
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

class Logger {
  private level: LogLevel;
  private levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(level: LogLevel = "info") {
    this.level = level;
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (this.levels[level] < this.levels[this.level]) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    };

    // Console output
    console.log(JSON.stringify(entry));
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log("debug", message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log("info", message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log("warn", message, context);
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.log("error", message, context);
  }
}

export const logger = new Logger(process.env.LOG_LEVEL as LogLevel || "info");
```

### Request Logger Middleware

```typescript
export function createRequestLogger(logger: Logger) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();

    logger.info("Request started", {
      method: req.method,
      url: req.url,
      headers: req.headers,
    });

    res.on("finish", () => {
      const duration = Date.now() - start;
      logger.info("Request completed", {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration,
      });
    });

    next();
  };
}
```

## CORS Configuration

Configure Cross-Origin Resource Sharing for browser clients:

### Basic CORS Setup

```typescript
// src/server.ts
import { createConnectHandler } from "@connectrpc/connect-node";
import { corsMiddleware } from "./cors";

// Create CORS middleware
const cors = createCorsMiddleware({
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3002"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
  exposedHeaders: ["X-Request-Id"],
  credentials: true,
  maxAge: 86400, // 24 hours
});

// Apply to server
server.on("request", cors);
```

### Production CORS

For production, explicitly list allowed origins:

```typescript
const productionOrigins = [
  "https://yourdomain.com",
  "https://app.yourdomain.com",
];

const cors = createCorsMiddleware({
  origin: process.env.NODE_ENV === "production" 
    ? productionOrigins 
    : "*",
  // ... other options
});
```

## Bun vs Node.js

Comparing Bun and Node.js for this implementation:

### Bun Advantages

- **Faster Startup**: Bun starts significantly faster than Node.js.
- **Native HTTP/2**: Built-in HTTP/2 support without additional configuration.
- **Better TypeScript**: Native TypeScript support without transpilation.
- **Smaller Bundle**: Produces smaller executables.
- **Top-Level Await**: Supports top-level await without additional setup.

### Node.js Advantages

- **Mature Ecosystem**: Larger community and more established packages.
- **Broader Support**: More hosting platforms and tools support Node.js.
- **HTTP/2 Module**: Stable http2 module with extensive documentation.
- **Debugging**: Excellent debugging tools and IDE integration.

### Runtime Detection

```typescript
// Detect runtime
const isBun = typeof Bun !== "undefined";
const isNode = typeof process !== "undefined" && process.versions?.node;

console.log(`Running on: ${isBun ? "Bun" : "Node.js"}`);
```

### HTTP Server Comparison

**Bun HTTP Server**:
```typescript
const server = Bun.serve({
  port: 3001,
  fetch(req, server) {
    // Handle request
  },
});
```

**Node.js HTTP Server**:
```typescript
import http from "http";

const server = http.createServer((req, res) => {
  // Handle request
});

server.listen(3001);
```

## Performance Optimization

Maximize server performance:

### Connection Settings

```typescript
// Optimize HTTP server
const server = http.createServer({
  // Enable HTTP keep-alive
  keepAlive: true,
  keepAliveTimeout: 60000,
  maxHeadersCount: 100,
  // Connection timeout
  timeout: 30000,
  // Request timeout
  requestTimeout: 30000,
});
```

### Request Body Handling

```typescript
// Stream request bodies for large payloads
function handleLargePayload(req: Request): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
```

### Response Compression

```typescript
// Add compression middleware
import compression from "compression";

const compress = compression({
  // Compression level (1-9)
  level: 6,
  // Threshold for compression
  threshold: 1024,
  // Filter function
  filter: (req) => {
    if (req.headers["content-encoding"]) return false;
    return true;
  },
});
```

### Memory Management

```typescript
// Monitor memory usage
setInterval(() => {
  const usage = process.memoryUsage();
  console.log({
    rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
  });
}, 30000);
```

## Testing

Comprehensive testing ensures reliability:

### Unit Testing

```typescript
// test/unit/counter.service.test.ts
import { describe, it, expect, beforeEach } from "bun:test";
import { CounterService } from "../../src/services/counter.service";

describe("CounterService", () => {
  let service: CounterService;

  beforeEach(() => {
    service = new CounterService();
  });

  it("should return initial counter value", async () => {
    const counter = await service.getCounter();
    expect(counter.value).toBe(0n);
  });

  it("should increment counter", async () => {
    const counter = await service.incrementCounter(5n);
    expect(counter.value).toBe(5n);
  });

  it("should decrement counter", async () => {
    await service.incrementCounter(10n);
    const counter = await service.decrementCounter(3n);
    expect(counter.value).toBe(7n);
  });

  it("should reset counter", async () => {
    await service.incrementCounter(100n);
    const counter = await service.resetCounter();
    expect(counter.value).toBe(0n);
  });
});
```

### Integration Testing

```typescript
// test/integration/server.test.ts
import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { fetch } from "bun";

const BASE_URL = "http://localhost:3001";

describe("Server Integration", () => {
  let server: any;

  beforeAll(async () => {
    // Start server for testing
    server = await startTestServer();
  });

  afterAll(() => {
    server.stop();
  });

  it("should respond to health check", async () => {
    const response = await fetch(`${BASE_URL}/health`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.status).toBe("ok");
  });

  it("should handle RPC requests", async () => {
    // Test RPC call
    const response = await fetch(
      `${BASE_URL}/connectrpc.counter.v1alpha.CounterService/GetCounter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/connect+proto",
        },
      }
    );
    expect(response.status).toBe(200);
  });
});
```

### Load Testing

```bash
# Using autocannon for load testing
bunx autocannon -c 100 -d 20 http://localhost:3001/health
```

## Deployment

Deploy to various platforms:

### Docker

```dockerfile
# Dockerfile
FROM oven/bun:1.1

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Generate proto code
RUN buf generate

# Build
RUN bun run build

# Expose port
EXPOSE 3001

# Start server
CMD ["bun", "run", "start"]
```

### Docker Compose

```yaml
# docker-compose.yaml
version: '3.8'
services:
  vanilla-backend:
    build: ./backend/vanilla
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - CORS_ORIGIN=https://yourdomain.com
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Kubernetes

```yaml
# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vanilla-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vanilla-backend
  template:
    metadata:
      labels:
        app: vanilla-backend
    spec:
      containers:
      - name: server
        image: your-registry/vanilla-backend:latest
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 3
          periodSeconds: 5
```

### Serverless

For serverless deployment (AWS Lambda, Vercel, etc.):

```typescript
// serverless.ts
export default {
  handler: "index.handler",
  events: [
    {
      http: {
        method: "any",
        path: "/{proxy+",
        cors: true,
      },
    },
  ],
};
```

## Security

Secure your backend:

### Security Headers

```typescript
function securityHeaders(req: Request, res: Response, next: NextFunction): void {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");

  // XSS protection
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // HSTS (only enable in production with proper domain)
  if (process.env.NODE_ENV === "production") {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  // Content Security Policy
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'"
  );

  next();
}
```

### Input Validation

```typescript
import { z } from "zod";

const counterRequestSchema = z.object({
  delta: z.bigint().min(1n).max(1000n),
  label: z.string().max(100).optional(),
});

function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    throw new ConnectError(
      "Invalid request",
      Code.invalidArgument,
      undefined,
      undefined,
      error instanceof z.ZodError ? error.errors : undefined
    );
  }
}
```

### Rate Limiting

See the Rate Limiting Middleware section for implementation details.

## Monitoring

Monitor server health and performance:

### Health Checks

```typescript
// Health endpoint
function healthCheck(req: Request, res: Response): void {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(health));
}

// Readiness check
function readinessCheck(req: Request, res: Response): void {
  // Check dependencies (database, etc.)
  const ready = checkDatabaseConnection();

  res.statusCode = ready ? 200 : 503;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ ready }));
}
```

### Metrics

```typescript
// Simple metrics collection
const metrics = {
  requests: 0,
  errors: 0,
  totalLatency: 0,
};

function recordMetrics(req: Request, res: Response): void {
  metrics.requests++;
  const latency = Date.now() - (req as any).startTime;
  metrics.totalLatency += latency;

  if (res.statusCode >= 400) {
    metrics.errors++;
  }
}

// Metrics endpoint
function metricsEndpoint(req: Request, res: Response): void {
  const avgLatency =
    metrics.requests > 0 ? metrics.totalLatency / metrics.requests : 0;

  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      requests: metrics.requests,
      errors: metrics.errors,
      avgLatencyMs: avgLatency,
    })
  );
}
```

## Troubleshooting

Common issues and solutions:

### Connection Refused

**Problem**: Server fails to start with "Address already in use"

**Solution**:
1. Check if another process is using the port: `lsof -i :3001`
2. Kill the process or use a different port
3. Update the PORT environment variable

### CORS Errors

**Problem**: Browser CORS errors

**Solution**:
1. Verify CORS origin is correctly configured
2. Check that CORS headers are being set
3. Ensure preflight (OPTIONS) requests are handled

### Memory Leaks

**Problem**: Server memory usage grows over time

**Solution**:
1. Check for unclosed resources
2. Review middleware for memory accumulation
3. Use profiling tools to identify leaks
4. Implement proper cleanup in service implementations

### Proto Generation Issues

**Problem**: Generated code not found

**Solution**:
1. Run `buf generate` from project root
2. Verify buf.gen.yaml configuration
3. Check that proto files are syntactically correct

## Extending the Backend

Add new services and features:

### Adding a New Service

1. Create proto definition in `proto/`
2. Run `buf generate`
3. Implement service in `src/services/`
4. Create handler in `src/handlers/`
5. Register in `src/server.ts`

### Adding Middleware

Create middleware in `src/middleware/` and add to the pipeline in `server.ts`.

### Adding Database Integration

```typescript
// Example: Adding SQLite support
import Database from "bun:sqlite";

const db = new Database("counter.db");

// Use in service
async function getCounter(): Promise<Counter> {
  const row = db.query("SELECT * FROM counters WHERE id = ?").get(1);
  return new Counter(row);
}
```

## Best Practices

Follow these best practices for maintainable code:

### Code Organization

- Keep handlers thin, delegate to services
- Use dependency injection for testability
- Separate business logic from transport layer
- Use async/await for all asynchronous operations

### Error Handling

- Never let errors propagate unhandled
- Log errors with appropriate context
- Return meaningful error messages to clients
- Use ConnectError with appropriate error codes

### Performance

- Use streaming for large payloads
- Implement connection keep-alive
- Configure appropriate timeouts
- Monitor memory usage

### Security

- Validate all input
- Use HTTPS in production
- Implement rate limiting
- Set security headers

## Comparison with NestJS

| Aspect | Vanilla | NestJS |
|--------|---------|--------|
| Dependencies | Minimal | Many |
| Learning Curve | Low | Medium |
| Startup Time | Fast | Slower |
| Memory Usage | Low | Higher |
| Flexibility | Full | Opinionated |
| Testing | Manual | Built-in utilities |
| DI | Manual/Factory | Built-in |
| Modules | Manual | Built-in |

Choose vanilla for simplicity and performance, NestJS for larger applications requiring more structure.

## Further Reading

- [Connect RPC Documentation](https://connectrpc.com/docs/languages/typescript/)
- [Bun Documentation](https://bun.sh/docs)
- [Node.js HTTP Documentation](https://nodejs.org/api/http.html)
- [Node.js HTTP/2 Documentation](https://nodejs.org/api/http2.html)
- [Protocol Buffers Documentation](https://protobuf.dev/)
- [Buf Documentation](https://docs.buf.build/)
- [Best Practices for RPC API Design](https://cloud.google.com/apis/design)

---

*Last updated: March 2026*

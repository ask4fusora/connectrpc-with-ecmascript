# Backend Implementations

This directory contains different implementations of the Connect RPC backend services, showcasing the flexibility and power of using Connect RPC with TypeScript in various architectural styles. The backend implementations demonstrate how to build robust, scalable, and maintainable server-side applications using different approaches - from a feature-rich framework-based solution to a lightweight, minimal-dependency implementation.

## Table of Contents

- [Overview](#overview)
- [Architecture Philosophy](#architecture-philosophy)
- [Implementation Choices](#implementation-choices)
  - [Why Two Implementations?](#why-two-implementations)
  - [Shared Philosophy](#shared-philosophy)
- [Shared Components](#shared-components)
- [Getting Started with Backends](#getting-started-with-backends)
- [NestJS + Fastify Platform](#nestjs--fastify-platform)
  - [Detailed Overview](#detailed-overview)
  - [Key Features](#key-features-1)
  - [File Structure](#file-structure)
  - [How Connect RPC Integrates with NestJS](#how-connect-rpc-integrates-with-nestjs)
  - [Running the NestJS Backend](#running-the-nestjs-backend)
  - [Configuration](#configuration)
  - [Extending the NestJS Backend](#extending-the-nestjs-backend)
  - [Advanced Features](#advanced-features)
  - [Performance Tuning](#performance-tuning)
  - [Testing Strategy](#testing-strategy)
- [Vanilla Node.js / Bun](#vanilla-nodejs--bun)
  - [Detailed Overview](#detailed-overview-1)
  - [Key Features](#key-features-2)
  - [File Structure](#file-structure-1)
  - [How It Works](#how-it-works)
  - [Running the Vanilla Backend](#running-the-vanilla-backend)
  - [Configuration](#configuration-1)
  - [Extending the Vanilla Backend](#extending-the-vanilla-backend)
  - [Advanced Features](#advanced-features-1)
  - [Performance Tuning](#performance-tuning-1)
  - [Testing Strategy](#testing-strategy-1)
- [Performance Comparison](#performance-comparison)
  - [Benchmark Methodology](#benchmark-methodology)
  - [Startup Time](#startup-time)
  - [Memory Usage](#memory-usage)
  - [Request Latency](#request-latency)
  - [Throughput](#throughput)
  - [Scalability](#scalability)
  - [Development Speed](#development-speed)
  - [Learning Curve](#learning-curve)
- [When to Choose Which](#when-to-choose-which)
  - [Choose NestJS + Fastify if](#choose-nestjs--fastify-if)
  - [Choose Vanilla Node.js / Bun if](#choose-vanilla-nodejs--bun-if)
- [Architecture Patterns](#architecture-patterns)
  - [Service-Oriented Architecture](#service-oriented-architecture)
  - [Microservices Architecture](#microservices-architecture)
  - [Event-Driven Architecture](#event-driven-architecture)
  - [Layered Architecture](#layered-architecture)
  - [Hexagonal Architecture](#hexagonal-architecture)
- [Inter-Service Communication](#inter-service-communication)
  - [Synchronous Communication](#synchronous-communication)
  - [Asynchronous Communication](#asynchronous-communication)
  - [Service Discovery](#service-discovery)
- [Database Integration](#database-integration)
  - [TypeORM Integration](#typeorm-integration)
  - [Prisma Integration](#prisma-integration)
  - [Drizzle ORM Integration](#drizzle-orm-integration)
  - [NoSQL Integration](#nosql-integration)
- [Caching Strategies](#caching-strategies)
  - [In-Memory Caching](#in-memory-caching)
  - [Distributed Caching (Redis)](#distributed-caching-redis)
  - [HTTP Caching](#http-caching)
- [Rate Limiting and Throttling](#rate-limiting-and-throttling)
  - [Token Bucket Algorithm](#token-bucket-algorithm)
  - [Sliding Window Algorithm](#sliding-window-algorithm)
  - [Implementation Examples](#implementation-examples)
- [Circuit Breaker Patterns](#circuit-breaker-patterns)
  - [Why Circuit Breakers?](#why-circuit-breakers)
  - [Implementation](#implementation)
  - [Configuration](#configuration-2)
- [Authentication and Authorization](#authentication-and-authorization)
  - [JWT Authentication](#jwt-authentication)
  - [OAuth 2.0 Integration](#oauth-20-integration)
  - [Role-Based Access Control](#role-based-access-control)
- [API Versioning](#api-versioning)
  - [URL Path Versioning](#url-path-versioning)
  - [Header Versioning](#header-versioning)
  - [Query Parameter Versioning](#query-parameter-versioning)
- [Error Handling and Logging](#error-handling-and-logging)
  - [Error Handling Strategies](#error-handling-strategies)
  - [Logging Best Practices](#logging-best-practices)
  - [Log Aggregation](#log-aggregation)
- [Monitoring and Observability](#monitoring-and-observability)
  - [Metrics Collection](#metrics-collection)
  - [Distributed Tracing](#distributed-tracing)
  - [Health Checks](#health-checks)
  - [Graceful Shutdown](#graceful-shutdown)
- [Extending the Backends](#extending-the-backends)
  - [Adding Middleware](#adding-middleware)
  - [Adding Authentication/Authorization](#adding-authenticationauthorization)
  - [Database Integration](#database-integration-1)
  - [Logging Enhancements](#logging-enhancements)
  - [Monitoring and Metrics](#monitoring-and-metrics)
- [Testing Backend Services](#testing-backend-services)
  - [NestJS Testing](#nestjs-testing)
  - [Vanilla Testing](#vanilla-testing)
  - [Common Testing Practices](#common-testing-practices)
  - [Contract Testing](#contract-testing)
  - [Load Testing](#load-testing)
- [Deployment Considerations](#deployment-considerations)
  - [Containerization (Docker)](#containerization-docker)
  - [Environment Variables](#environment-variables)
  - [Reverse Proxy and Load Balancing](#reverse-proxy-and-load-balancing)
  - [Scaling Strategies](#scaling-strategies)
  - [Zero-Downtime Deployments](#zero-downtime-deployments)
  - [Rollback Strategies](#rollback-strateges)
- [Security Best Practices](#security-best-practices)
  - [Input Validation](#input-validation)
  - [Output Encoding](#output-encoding)
  - [Security Headers](#security-headers)
  - [TLS/HTTPS Configuration](#tlshttps-configuration)
  - [Rate Limiting](#rate-limiting)
- [Disaster Recovery](#disaster-recovery)
  - [Backup Strategies](#backup-strateges)
  - [Recovery Procedures](#recovery-procedures)
  - [High Availability Setup](#high-availability-setup)
- [Migration Guide](#migration-guide)
  - [From Express to Fastify](#from-express-to-fastify)
  - [From REST to Connect RPC](#from-rest-to-connect-rpc)
  - [Between Implementations](#between-implementations)
- [Comparison Matrix](#comparison-matrix)
- [Decision Framework](#decision-framework)
- [Future Enhancements](#future-enhancements)
- [Further Reading](#further-reading)

## Overview

This project provides two distinct backend implementation styles to demonstrate the flexibility of Connect RPC and TypeScript, each with its own strengths and ideal use cases. Whether you need the structured, opinionated approach of a full-featured framework or the lightweight, minimal-dependency approach of a vanilla implementation, this project has you covered.

The primary goal is to showcase how Connect RPC can be integrated into various architectural styles while maintaining type safety, performance, and developer experience. Both implementations share the same Protocol Buffer definitions, ensuring API consistency across different backend approaches.

## Architecture Philosophy

The architecture philosophy behind providing multiple implementations centers on flexibility and choice. Different projects have different requirements, and a one-size-fits-all approach rarely works in practice. By providing both a framework-based and vanilla implementation, we enable teams to choose the approach that best fits their specific needs.

The NestJS + Fastify implementation represents the "batteries included" philosophy, where the framework provides extensive built-in features for dependency injection, testing, modularization, and enterprise integrations. This approach reduces the amount of boilerplate code developers need to write and provides consistent patterns across large codebases.

The Vanilla implementation represents the "minimalist" philosophy, where only essential dependencies are used, giving developers maximum control over the request handling pipeline. This approach is ideal for microservices with specific performance requirements or teams that prefer to understand every aspect of their application.

## Implementation Choices

### Why Two Implementations?

By providing two different backend styles, we aim to:

- **Showcase Flexibility**: Demonstrate that Connect RPC works seamlessly with different backend architectures, from full-featured frameworks to minimal HTTP server implementations.

- **Educate**: Help developers understand the trade-offs between using a full-featured framework (NestJS) and a minimalist approach (Vanilla), enabling informed decisions about architecture.

- **Provide Options**: Give developers a starting point that matches their project's complexity and team's expertise, whether building a small microservice or a large enterprise application.

- **Enable Comparison**: Allow teams to benchmark and compare performance, development experience, and maintainability between the two approaches in their specific context.

- **Facilitate Migration**: Provide a clear migration path between implementations if project requirements change over time.

- **Demonstrate Best Practices**: Show how to apply Connect RPC in different contexts while following best practices for each architectural style.

### Shared Philosophy

Despite their differences, both implementations share core principles that ensure consistency and quality:

- **Type Safety**: End-to-end TypeScript types generated from Protocol Buffers ensure compile-time safety across the entire stack, from API definitions to service implementations.

- **Connect RPC Compliance**: Both implement the Connect RPC specification correctly, supporting unary, server streaming, client streaming, and bidirectional streaming RPCs.

- **Modularity**: Code is organized in a maintainable way, with clear separation of concerns regardless of the implementation style.

- **Best Practices**: Follow TypeScript and Node.js best practices for error handling, logging, configuration, and testing.

- **Performance**: Both implementations prioritize performance, though they achieve it through different means - NestJS through Fastify's optimization, Vanilla through minimal overhead.

- **Developer Experience**: Both implementations provide good developer experience with hot reload, clear error messages, and comprehensive logging.

## Shared Components

Both implementations share the following components located outside the `backend/` directory:

- **Protocol Buffer Definitions (`proto/`)**: The single source of truth for service contracts and message types. Both backends use identical proto definitions, ensuring API consistency.

- **Code Generation**: Both rely on `buf generate` to produce TypeScript stubs from the `.proto` files. The generated code is identical for both implementations.

- **Tooling Configuration**: Shared configurations for Buf (`buf.yaml`, `buf.gen.yaml`), Biome (`biome.jsonc`), and Task (`taskfile.yaml` at the root).

- **Testing Patterns**: While testing implementations differ, the testing philosophy and some test utilities are shared.

- **Documentation**: Common documentation about Protocol Buffers, Connect RPC, and general API design patterns.

This shared foundation ensures that regardless of which backend you choose, the API contract remains identical, and the frontend can interact with both without modification.

## Getting Started with Backends

To run either backend, follow these general steps:

1. **Ensure Prerequisites**: You need [Bun](https://bun.sh/) (or Node.js) and [Buf](https://buf.build/install) installed. Verify installations with `bun --version` and `buf --version`.

2. **Generate Code**: From the project root, run `buf generate` to generate the TypeScript stubs from proto definitions.

3. **Install Dependencies**: Navigate to the backend directory and run `bun install`.

4. **Start the Server**: Use the appropriate dev or start script (see individual READMEs for details).

> **Note**: The backends are designed to run independently. You can run one, both, or neither, depending on your testing needs. They use different ports (3000 for NestJS, 3001 for Vanilla) to avoid conflicts.

## NestJS + Fastify Platform

The NestJS backend represents a batteries-included, opinionated framework that provides extensive functionality out of the box, making it suitable for complex applications, enterprise projects, and teams that prefer convention over configuration.

### Detailed Overview

[NestJS](https://nestjs.com/) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript), and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

Under the hood, NestJS uses [Fastify](https://www.fastify.io/) as its default HTTP server adapter (though it can also use Express). Fastify is known for its high performance, low overhead, and strong focus on developer experience, making it an excellent choice for high-throughput applications.

The NestJS architecture is heavily inspired by Angular, providing a familiar structure for developers coming from that ecosystem while applying time-tested enterprise patterns to Node.js development.

### Key Features

- **Modular Architecture**: Organize code into reusable modules (e.g., `UserModule`, `OrderModule`) that encapsulate related controllers, services, and providers.

- **Dependency Injection (DI)**: Built-in DI container that manages the lifecycle and dependencies of classes, promoting loose coupling and testability.

- **Powerful CLI**: NestJS CLI (`nest`) helps generate modules, controllers, services, and more, following best practices.

- **Validation Pipes**: Automatically validate incoming requests using `class-validator` and `class-transformer` based on DTO (Data Transfer Object) classes.

- **Interceptors**: Use interceptors to add logic before/after method execution (e.g., logging, timing, transformation).

- **Guards**: Implement authentication and authorization logic that can be applied globally, to a controller, or to a specific route.

- **Middleware**: Seamlessly integrate middleware (like Fastify middleware) for request preprocessing.

- **Exception Handling**: Built-in exception filters and the ability to create custom ones for centralized error handling.

- **Dynamic Modules**: Create modules that can register and configure providers dynamically.

- **Testing Utilities**: Excellent support for unit, integration, and end-to-end testing with Jest.

- **Documentation**: Auto-generated OpenAPI (Swagger) documentation using `@nestjs/swagger`.

- **Configuration Management**: Robust configuration system with support for multiple environments.

- **Logging**: Integrated logger with support for various transport mechanisms (console, file, etc.).

- **WebSockets and Microservices**: Built-in support for WebSockets (via `@nestjs/websockets`) and microservice communication (via `@nestjs/microservices`).

- **GraphQL Support**: Native support for GraphQL with `@nestjs/graphql` and `@nestjs/apollo`.

- **TypeORM Integration**: First-party support for TypeORM with `@nestjs/typeorm`.

- **Health Checks**: Built-in support for health checks via `@nestjs/terminus`.

### File Structure

```
backend/nestjs-fastify-platform/
├── src/
│   ├── app.module.ts                  # Root module that imports all other modules
│   ├── main.ts                        # Entry point - creates the NestJS application instance
│   ├── app.controller.ts             # Root controller (if needed)
│   ├── config/                      # Configuration module
│   │   ├── configuration.ts         # Configuration factory
│   │   └── index.ts                # Configuration exports
│   ├── rpc/                        # Connect RPC-specific module and handlers
│   │   ├── rpc.module.ts          # Module that sets up Connect RPC within NestJS
│   │   ├── rpc.service.ts        # RPC service configuration
│   │   ├── rpc.controller.ts    # RPC controller handling Connect endpoints
│   │   ├── handlers/            # Contains the implementation of RPC services
│   │   │   ├── counter.handler.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── modules/                    # Feature-specific modules (domain-driven design)
│   │   ├── counter/              # Example module for the Counter service
│   │   │   ├── counter.module.ts
│   │   │   ├── counter.service.ts    # Contains the business logic
│   │   │   ├── counter.controller.ts # NestJS controller (less used with Connect RPC)
│   │   │   ├── dto/              # Data Transfer Objects for validation
│   │   │   │   ├── increment-counter.dto.ts
│   │   │   │   └── index.ts
│   │   │   └── entities/        # Domain entities (if using ORM)
│   │   │       ├── counter.entity.ts
│   │   │       └── index.ts
│   │   └── [other modules]      # Additional feature modules
│   ├── common/                    # Shared components
│   │   ├── decorators/          # Custom decorators
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── index.ts
│   │   ├── guards/              # Custom guards
│   │   │   ├── auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── index.ts
│   │   ├── interceptors/        # Custom interceptors
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── transform.interceptor.ts
│   │   │   ├── exception.interceptor.ts
│   │   │   └── index.ts
│   │   ├── pipes/               # Custom pipes
│   │   │   ├── validation.pipe.ts
│   │   │   └── index.ts
│   │   ├── filters/             # Exception filters
│   │   │   ├── http-exception.filter.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── config/                   # Configuration files and providers
│   │   └── index.ts            # Main configuration export
│   ├── types/                    # Custom TypeScript types and interfaces
│   │   └── index.ts
│   ├── utils/                    # Utility functions and helpers
│   │   └── index.ts
│   └── generated/                # Generated code from Buf (referenced, not in repo)
│       └── connectrpc/
│           └── counter/
│               └── v1alpha/
├── test/                         # Test directory
│   ├── unit/                     # Unit tests
│   │   ├── services/
│   │   │   └── counter.service.spec.ts
│   │   ├── controllers/
│   │   │   └── counter.controller.spec.ts
│   │   └── interceptors/
│   ├── integration/              # Integration tests
│   │   └── counter.e2e-spec.ts
│   └── e2e/                     # End-to-end tests (using SuperTest)
├── scripts/                      # Build and utility scripts
│   └── build.ts
├── .env.example                 # Example environment variables
├── .env.local                   # Local environment (git-ignored)
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── biome.jsonc                  # Biome configuration
├── nest-cli.json               # NestJS CLI configuration
├── tsconfig.build.json         # TypeScript build configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── bun.lockb                  # Bun lock file
└── README.md                   # This file (you're reading it)
```

### How Connect RPC Integrates with NestJS

In this implementation, Connect RPC is integrated as a NestJS module (`rpc.module.ts`). The module:

1. Creates a Connect RPC server using the `@connectrpc/connect-node` adapter.

2. Registers the generated service stubs (from `buf generate`) as NestJS providers.

3. Implements the service interfaces by delegating to the actual service classes (e.g., `CounterService`).

4. Exposes the Connect RPC handler as a NestJS controller that catches all requests to the `/connectrpc` path.

This approach allows you to mix Connect RPC endpoints with traditional REST endpoints (if needed) within the same NestJS application, providing flexibility for gradual migrations or supporting multiple API protocols.

### Running the NestJS Backend

```bash
# From the project root
cd backend/nestjs-fastify-platform

# Install dependencies (if not already done)
bun install

# Start in development mode (with hot reload via Bun)
bun run start:dev

# Alternative scripts:
bun run start          # Production mode (compiled)
bun run start:dev      # Development mode with ts-node-esm (if using Node.js)
bun run test           # Run unit tests
bun run test:e2e       # Run end-to-end tests
bun run test:cov      # Run tests with coverage report
bun run lint           # Run Biome linter
bun run format         # Format code with Biome
bun run build          # Compile TypeScript to JavaScript
```

The NestJS server will be available at `http://localhost:3000` by default.

### Configuration

Configuration is managed through environment variables and the `@nestjs/config` module. Key environment variables include:

- `PORT`: The port the server listens on (default: `3000`).

- `HOST`: The host address to bind to (default: `0.0.0.0`).

- `NODE_ENV`: Environment (`development`, `production`, `test`).

- `CORS_ORIGIN`: Comma-separated list of allowed origins for CORS.

- `LOG_LEVEL`: Logging level (`error`, `warn`, `info`, `debug`, `verbose`).

- `DATABASE_URL`: Database connection string (when using database).

- `JWT_SECRET`: Secret for JWT authentication (when using auth).

Create a `.env` file in the `backend/nestjs-fastify-platform/` directory to set these values locally.

### Extending the NestJS Backend

To add a new service:

1. Update the `.proto` files in `proto/` (e.g., add a new service under `proto/newservice/v1/`).

2. Run `buf generate` from the project root to update the generated code.

3. Create a new module: `nest g module modules/news` (using NestJS CLI) or manually create the directory structure.

4. Implement the service logic in `modules/news/news.service.ts`.

5. Implement the Connect RPC handler in `rpc/handlers/news.handler.ts` (or place it directly in the module if preferred).

6. Ensure the handler is provided in the RPC module and the service is provided in the feature module.

7. (Optional) Add validation pipes, guards, or interceptors as needed.

8. Write unit and integration tests for the new service.

### Advanced Features

The NestJS implementation supports numerous advanced features:

**GraphQL Coexistence**: You can add GraphQL support alongside Connect RPC using `@nestjs/graphql` and `@nestjs/apollo`, allowing clients to choose their preferred protocol.

**Microservices Transport**: NestJS supports various microservice transports (TCP, Redis, gRPC), enabling communication between services.

**WebSocket Gateway**: Add real-time functionality with `@nestjs/websockets` and `@nestjs/platform-socket.io`.

**CQRS Pattern**: Implement Command Query Responsibility Segregation using `@nestjs/cqrs` for complex domain logic.

**Event Emitters**: Use `@nestjs/event-emitter` for event-driven architectures.

### Performance Tuning

Optimize NestJS + Fastify performance:

- **Use Fastify Adapter**: Already configured, but ensure you're using `@nestjs/platform-fastify`.

- **Enable Compression**: Use `compression` middleware for response compression.

- **Configure Serialization**: Use serialization groups to control what data is sent to clients.

- **Enable Caching**: Use `@nestjs/cache-manager` for frequently accessed data.

- **Optimize Validation**: Use `transform: true` in validation pipes to enable transformation.

- **Connection Pooling**: Configure database connection pooling for optimal resource usage.

### Testing Strategy

The NestJS implementation leverages comprehensive testing utilities:

- **Unit Tests**: Use `Test.createTestingModule()` to create isolated test modules.

- **Integration Tests**: Test controller-service interactions with mocked dependencies.

- **E2E Tests**: Use SuperTest for full HTTP request testing.

- **Fixture Utilities**: Use `@nestjs/testing` utilities for common testing patterns.

## Vanilla Node.js / Bun

The Vanilla backend demonstrates how to use Connect RPC with minimal abstractions, giving you full control over the HTTP server and middleware while still benefiting from type-safe RPC.

### Detailed Overview

This implementation uses the [`@connectrpc/connect`](https://connectrpc.com/docs/languages/typescript/) and [`@connectrpc/connect-node`](https://connectrpc.com/docs/languages/typescript/#nodejs-server) packages directly, along with Bun's native HTTP server (or Node.js's `http2` module if you prefer). It represents the "closer to the metal" approach, ideal when you want to understand exactly how the RPC layer works or when building high-performance, lightweight services.

The vanilla implementation is perfect for microservices, serverless functions, edge computing, or any scenario where minimal dependencies and maximum control are priorities.

### Key Features

- **Full Control**: You manage the HTTP server, middleware, and routing directly.

- **Minimal Dependencies**: Only the essential Connect RPC packages and their peer dependencies are required.

- **Transparency**: It's easy to see exactly how requests are handled from the network to your service logic.

- **Performance**: Lower overhead due to the absence of a framework abstraction layer.

- **Flexibility**: Easy to integrate with other libraries or custom logic (e.g., WebSockets, GraphQL alongside RPC).

- **Learning Value**: Excellent for understanding the core concepts of Connect RPC and HTTP servers in Node.js.

- **Simple Deployment**: Straightforward to containerize or deploy to serverless environments.

- **Bundle Size**: Minimal package size, ideal for edge deployments.

- **Cold Start**: Fast cold start times for serverless and function-as-a-service platforms.

### File Structure

```
backend/vanilla/
├── src/
│   ├── server.ts                   # Entry point - sets up the HTTP server and Connect router
│   ├── cors.ts                     # CORS middleware configuration
│   ├── logger.ts                   # Logger configuration
│   ├── config.ts                   # Environment configuration
│   ├── services/                   # Service implementations
│   │   ├── counter.service.ts     # Counter service business logic
│   │   └── index.ts              # Service exports
│   ├── handlers/                  # Connect RPC handlers
│   │   ├── counter.handler.ts    # Counter RPC handler
│   │   └── index.ts              # Handler exports
│   ├── middleware/                # Custom middleware
│   │   ├── logging.ts           # Request logging middleware
│   │   ├── ratelimit.ts        # Rate limiting middleware
│   │   └── index.ts            # Middleware exports
│   ├── routes/                    # Route definitions
│   │   └── index.ts
│   ├── types/                     # Custom TypeScript types
│   │   └── index.ts
│   ├── utils/                     # Utility functions
│   │   └── index.ts
│   └── generated/                  # Directory for code generated by Buf (not committed to git)
│       └── connectrpc/            # Generated client and server stubs
│           ├── counter/v1alpha/    # Example: generated code for the Counter service
│           │   ├── counter.connect.ts  # Connect RPC client and server stubs
│           │   └── counter.pb.ts       # Protobuf message types
│           └── ...                 # Other generated files as per buf.gen.yaml
├── test/                          # Test files
│   ├── unit/                      # Unit tests
│   ├── integration/              # Integration tests
│   └── e2e/                      # End-to-end tests
├── scripts/                       # Build scripts
│   └── build.ts
├── .env.example                  # Example environment variables
├── .env.local                    # Local environment (git-ignored)
├── biome.jsonc                   # Biome configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
├── bun.lockb                     # Bun lock file
└── README.md                     # This file (you're reading it)
```

### How It Works

1. **Server Setup (`src/server.ts`)**:

   - Creates a Bun HTTP server (or Node.js HTTP/2 server).
   - Sets up middleware (like CORS, logging, etc.).
   - Creates a Connect RPC router using `createNodeHandler()` from `@connectrpc/connect-node`.
   - Implements the service interfaces by providing objects that match the generated service stubs.
   - Registers the service implementations with the Connect router.
   - Starts the server listening on a specified port.

2. **Service Implementation**:

   - The service logic is implemented directly in `src/server.ts` or in separate files imported into it.
   - Each method in the service implementation corresponds to an RPC method defined in the `.proto` file.
   - These methods receive the request message and return the response message (or a promise/async iterator for streaming).

3. **Middleware**:

   - Middleware functions are standard Node.js-style `(req, res, next)` or Bun-specific handlers.
   - The `cors.ts` file provides an example of a CORS middleware that can be plugged into the server.

### Running the Vanilla Backend

```bash
# From the project root
cd backend/vanilla

# Install dependencies (if not already done)
bun install

# Start in development mode
bun run start:dev

# Alternative scripts:
bun run start          # Start in production mode (compiled JavaScript)
bun run test           # Run tests
bun run lint           # Run Biome linter
bun run format         # Format code with Biome
bun run build          # Compile TypeScript to JavaScript
```

The vanilla server will be available at `http://localhost:3001` by default.

### Configuration

Configuration is typically done via environment variables or a simple configuration object. Key environment variables include:

- `PORT`: The port the server listens on (default: `3001` to avoid conflict with the NestJS backend).

- `HOST`: The host address to bind to (default: `0.0.0.0`).

- `NODE_ENV`: Environment (`development`, `production`, `test`).

- `CORS_ORIGIN`: Allowed origin for CORS (can be a string or comma-separated list).

- `LOG_ENABLED`: Set to `false` to disable request logging.

- `RATE_LIMIT_ENABLED`: Enable or disable rate limiting.

- `RATE_LIMIT_WINDOW_MS`: Time window for rate limiting in milliseconds.

- `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window.

Create a `.env` file in the `backend/vanilla/` directory to set these values locally.

### Extending the Vanilla Backend

To add a new service:

1. Update the `.proto` files in `proto/` (e.g., add a new service under `proto/newservice/v1/`).

2. Run `buf generate` from the project root to update the generated code in `src/generated/`.

3. Implement the new service logic:
   - Option A: Add the implementation directly in `src/server.ts` (suitable for simple services).
   - Option B: Create a new file (e.g., `src/services/newsService.ts`) and import it into `server.ts`.

4. In `server.ts`, create an instance of your service implementation.

5. Register the service with the Connect router using the generated stub (e.g., `router.use(newsService)`).

6. Ensure any necessary middleware is applied (e.g., CORS, logging).

7. Write tests for the new service logic.

### Advanced Features

The vanilla implementation can be extended with:

- **WebSocket Support**: Add WebSocket handling alongside Connect RPC.

- **HTTP/2**: Use Node.js HTTP/2 module for improved performance.

- **gRPC-web**: Add gRPC-web support for browser clients.

- **Metrics**: Add Prometheus metrics endpoint.

- **Tracing**: Add OpenTelemetry tracing.

### Performance Tuning

Optimize vanilla implementation performance:

- **HTTP Keep-Alive**: Enable keep-alive for connection reuse.

- **Request Body Streaming**: Stream large request bodies.

- **Compression**: Add response compression middleware.

- **Connection Pooling**: If using databases, implement connection pooling.

- **Zero-Copy**: Use zero-copy file serving where applicable.

### Testing Strategy

The vanilla implementation uses standard testing approaches:

- **Unit Tests**: Test service logic in isolation with Jest.

- **Integration Tests**: Start the actual HTTP server and test endpoints.

- **Mocking**: Mock dependencies (like database clients) directly in your service implementations.

## Performance Comparison

While performance can vary based on many factors (hardware, network, specific use cases), here's a general comparison of the two implementations:

### Benchmark Methodology

Benchmarks should be conducted in realistic conditions:
- Same hardware and operating system
- Same Node.js/Bun version
- Similar test scenarios
- Multiple runs to account for variance

### Startup Time

| Implementation | Startup Time |
|----------------|-------------|
| **NestJS + Fastify** | Slower (more modules to initialize, dependency injection container) |
| **Vanilla Node.js / Bun** | Faster (minimal initialization, no framework overhead) |

### Memory Usage

| Implementation | Memory Usage |
|----------------|-------------|
| **NestJS + Fastify** | Higher (more dependencies, DI container, framework features) |
| **Vanilla Node.js / Bun** | Lower (only essential packages, minimal abstraction) |

### Request Latency

| Implementation | Latency |
|----------------|---------|
| **NestJS + Fastify** | Very low (Fastify is highly optimized) |
| **Vanilla Node.js / Bun** | Very low (direct HTTP handling, minimal abstraction) |

### Throughput

| Implementation | Throughput |
|----------------|-----------|
| **NestJS + Fastify** | High (suitable for most applications) |
| **Vanilla Node.js / Bun** | Very high (minimal abstraction overhead) |

### Scalability

| Implementation | Scalability |
|----------------|-------------|
| **NestJS + Fastify** | Excellent (designed for large apps, built-in clustering) |
| **Vanilla Node.js / Bun** | Excellent (can be optimized further with custom code) |

### Development Speed

| Implementation | Development Speed |
|----------------|-------------------|
| **NestJS + Fastify** | Fast (CLI, built-in features, conventions) |
| **Vanilla Node.js / Bun** | Moderate (more boilerplate, fewer conventions) |

### Learning Curve

| Implementation | Learning Curve |
|----------------|----------------|
| **NestJS + Fastify** | Moderate (NestJS concepts to learn) |
| **Vanilla Node.js / Bun** | Low (plain Node.js/Bun + Connect RPC) |

**Note**: These are general tendencies. The actual performance difference in a real-world application might be negligible compared to factors like database queries or external API calls. Choose based on your team's expertise and project requirements rather than micro-optimizations.

## When to Choose Which

### Choose NestJS + Fastify if:

- You are building a large, complex application with multiple domains/bounded contexts.
- Your team is already familiar with NestJS or Angular (similar concepts).
- You want built-in support for features like validation, interception, guarding, and modularization.
- You plan to expose both RPC and REST endpoints in the same application.
- You value convention over configuration and want a structured, opinionated framework.
- You need advanced features like microservices, WebSockets, or built-in testing utilities.
- You are developing an enterprise application where long-term maintainability is critical.
- You want to leverage the extensive NestJS ecosystem of modules.
- You need features like automatic OpenAPI documentation.
- Your team prefers a more structured approach to application architecture.

### Choose Vanilla Node.js / Bun if:

- You are building a lightweight microservice or API with a small number of endpoints.
- Performance is absolutely critical and you want to minimize overhead.
- You prefer to have full control over the HTTP server and middleware chain.
- You want to avoid framework "magic" and see exactly how requests are processed.
- Your team prefers minimal dependencies and a closer-to-the-metal approach.
- You are learning Connect RPC and want to understand the underlying mechanics.
- You are building a serverless function or edge runtime where cold start time matters.
- You are creating a simple API that doesn't require the advanced features of a full framework.
- You need to deploy to edge runtimes with strict size limitations.
- You want maximum flexibility in your architecture choices.

## Architecture Patterns

Both backends support various architectural patterns:

### Service-Oriented Architecture

Organize services around business capabilities:

- Counter Service: Manages counting operations
- User Service: Handles user management
- Order Service: Processes orders

### Microservices Architecture

Split functionality into independent services:

- Each service has its own database (if needed)
- Services communicate via Connect RPC
- Independent deployment and scaling

### Event-Driven Architecture

Use events for loose coupling:

- Emit events on state changes
- Event handlers respond to changes
- Decouple producers from consumers

### Layered Architecture

Organize code in layers:

- **Presentation**: Controllers/Handlers
- **Business Logic**: Services
- **Data Access**: Repositories
- **Infrastructure**: Database/External APIs

### Hexagonal Architecture

Create ports and adapters:

- **Domain**: Core business logic
- **Ports**: Interfaces for input/output
- **Adapters**: Implementations (HTTP, Database)

## Inter-Service Communication

### Synchronous Communication

Direct RPC calls between services:

```typescript
// Call another service directly
const response = await userServiceClient.getUser(new GetUserRequest({ id: userId }));
```

### Asynchronous Communication

Event-based communication:

- Use message queues (RabbitMQ, Redis)
- Publish events for state changes
- Subscribe to events for reactions

### Service Discovery

For microservices:

- Use service registry (Consul, etcd)
- Implement client-side discovery
- Or use load balancer-side discovery

## Database Integration

### TypeORM Integration

```typescript
// NestJS with TypeORM
@Injectable()
export class CounterService {
  constructor(
    @InjectRepository(Counter)
    private counterRepo: Repository<Counter>,
  ) {}

  async findOne(id: number): Promise<Counter> {
    return this.counterRepo.findOne({ where: { id } });
  }
}
```

### Prisma Integration

```typescript
// NestJS with Prisma
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
```

### Drizzle ORM Integration

```typescript
// Vanilla with Drizzle
import { drizzle } from 'drizzle-orm/node-postgres';
import { counters } from './schema';

const db = drizzle(pool);

async function getCounter(id: number) {
  return db.select().from(counters).where(eq(counters.id, id));
}
```

### NoSQL Integration

For MongoDB or other NoSQL databases:

- Use appropriate drivers (mongodb, mongoose)
- Design schemas for document model
- Consider eventual consistency

## Caching Strategies

### In-Memory Caching

For single-instance deployments:

```typescript
// Simple in-memory cache
const cache = new Map<string, { value: any; expires: number }>();

function getCached(key: string): any | null {
  const entry = cache.get(key);
  if (entry && entry.expires > Date.now()) {
    return entry.value;
  }
  cache.delete(key);
  return null;
}
```

### Distributed Caching (Redis)

For multi-instance deployments:

```typescript
import { createClient } from 'redis';

const redis = createClient();
await redis.connect();

async function getCached(key: string): Promise<string | null> {
  return redis.get(key);
}
```

### HTTP Caching

Use appropriate cache headers:

```typescript
res.setHeader('Cache-Control', 'public, max-age=3600');
```

## Rate Limiting and Throttling

### Token Bucket Algorithm

```typescript
class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private capacity: number,
    private refillRate: number, // tokens per second
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  tryConsume(tokens: number = 1): boolean {
    this.refill();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}
```

### Sliding Window Algorithm

```typescript
class SlidingWindow {
  private requests: number[] = [];

  constructor(private maxRequests: number, private windowMs: number) {}

  tryConsume(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(t => now - t < this.windowMs);

    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    return false;
  }
}
```

### Implementation Examples

Apply rate limiting to Connect RPC handlers:

```typescript
// NestJS Guard
@Injectable()
export class RateLimitGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const key = context.switchToHttp().getRequest().ip;
    return rateLimiter.tryConsume(key);
  }
}

// Vanilla Middleware
function rateLimitMiddleware(req, res, next) {
  if (!rateLimiter.tryConsume(req.ip)) {
    res.statusCode = 429;
    res.end('Too Many Requests');
    return;
  }
  next();
}
```

## Circuit Breaker Patterns

### Why Circuit Breakers?

Circuit breakers prevent cascading failures:

- When a service fails repeatedly, "open" the circuit
- Fail fast instead of timing out
- After a timeout, "half-open" to test recovery
- Close circuit when service recovers

### Implementation

```typescript
class CircuitBreaker {
  private failures = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private lastFailureTime = 0;

  constructor(
    private threshold: number = 5,
    private timeout: number = 30000,
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.threshold) {
      this.state = 'open';
    }
  }
}
```

### Configuration

Configure circuit breaker for each external service:

```typescript
const userServiceCircuit = new CircuitBreaker({
  threshold: 5,
  timeout: 30000,
});
```

## Authentication and Authorization

### JWT Authentication

```typescript
// Generate token
import jwt from 'jsonwebtoken';

function generateToken(user: User): string {
  return jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Verify token
function verifyToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
}
```

### OAuth 2.0 Integration

Integrate with OAuth providers:

```typescript
// NestJS Passport
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

### Role-Based Access Control

```typescript
// Define roles
enum Role {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

// Guard for role checking
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
```

## API Versioning

### URL Path Versioning

Include version in URL path:

```
/api/v1/users
/api/v2/users
```

### Header Versioning

Use custom header:

```
Accept: application/vnd.myapp.v1+json
```

### Query Parameter Versioning

Pass version as query param:

```
/api/users?version=1
```

## Error Handling and Logging

### Error Handling Strategies

- Use ConnectError for RPC-specific errors
- Implement global exception filters
- Provide meaningful error messages
- Include error codes for programmatic handling

### Logging Best Practices

- Use structured JSON logging
- Include correlation IDs for tracing
- Log appropriate levels (debug, info, warn, error)
- Avoid logging sensitive data

### Log Aggregation

For production:

- Use ELK Stack (Elasticsearch, Logstash, Kibana)
- Or use cloud solutions (CloudWatch, Datadog, etc.)
- Or use modern solutions (Loki, Grafana)

## Monitoring and Observability

### Metrics Collection

Use Prometheus:

```typescript
import { Counter, Histogram } from 'prom-client';

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'status'],
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route'],
});
```

### Distributed Tracing

Use OpenTelemetry:

```typescript
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('my-service');

async function handleRequest(req, res) {
  const span = tracer.startSpan('handle-request');
  try {
    // Process request
  } finally {
    span.end();
  }
}
```

### Health Checks

Implement health endpoints:

```typescript
// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Detailed health check
app.get('/health/detailed', async (req, res) => {
  const dbHealthy = await checkDatabase();
  const cacheHealthy = await checkCache();
  
  res.json({
    status: dbHealthy && cacheHealthy ? 'ok' : 'degraded',
    checks: { database: dbHealthy, cache: cacheHealthy }
  });
});
```

### Graceful Shutdown

Handle process signals:

```typescript
// Handle shutdown signals
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down...');
  await server.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down...');
  await server.close();
  process.exit(0);
});
```

## Extending the Backends

### Adding Middleware

**NestJS**: Use the `@UseGuards()`, `@UseInterceptors()`, or `@UsePipes()` decorators, or register global middleware in `main.ts`.

**Vanilla**: Create middleware functions and apply them to the Bun server before the Connect handler.

### Adding Authentication/Authorization

**NestJS**: Create Auth Guards (`@nestjs/passport` is commonly used) and apply them via decorators or globally.

**Vanilla**: Implement authentication logic in middleware that runs before the Connect handler.

### Database Integration

**NestJS**: Use `@nestjs/typeorm`, `@nestjs/mikro-orm`, or create custom providers for your preferred database client.

**Vanilla**: Initialize your database client in `server.ts` and pass it to your service implementations.

### Logging Enhancements

**NestJS**: Use the built-in logger or integrate with libraries like `pino` or `winston`.

**Vanilla**: Use a logging library (e.g., `pino`) and create a middleware to log requests and responses.

### Monitoring and Metrics

**NestJS**: Use `@nestjs/terminus` for health checks, and integrate with Prometheus via `@willsoto/nestjs-prometheus`.

**Vanilla**: Expose metrics endpoints manually or use a library like `prom-client`.

## Testing Backend Services

### NestJS Testing

- **Unit Tests**: Test services, controllers, and pipes in isolation using Jest. Mock dependencies as needed.

- **Integration Tests**: Test controllers with real services (but possibly mocked databases or external services) using NestJS's testing utilities.

- **End-to-End Tests**: Test the full HTTP stack using SuperTest to make real requests to the running NestJS server.

- **Testing Utilities**: NestJS provides `Test.createTestingModule()` to create a testing module that mimics the real module system.

### Vanilla Testing

- **Unit Tests**: Test service logic and helper functions in isolation using Jest.

- **Integration Tests**: Start the actual HTTP server (or use a library like `supertest` with Bun) and test the endpoints.

- **Mocking**: Mock dependencies (like database clients) directly in your service implementations or use Jest mocking functions.

### Common Testing Practices

- Use factories or builders to create test data for protobuf messages.
- Test both unary and streaming RPCs.
- Validate error cases and edge conditions.
- For streaming tests, use async iterators and collect results.
- Ensure tests clean up resources (like closing database connections or servers).

### Contract Testing

Ensure compatibility between client and server:

```typescript
// Use generated types for contract tests
import { CounterService } from './generated/connectrpc/counter/v1alpha/CounterService_connect';

describe('Counter Service Contract', () => {
  it('should handle getCounter request/response', async () => {
    const client = new CounterService(transport);
    const request = new GetCounterRequest({});
    
    const response = await client.getCounter(request);
    
    expect(response).toBeInstanceOf(GetCounterResponse);
    expect(response).toHaveProperty('value');
  });
});
```

### Load Testing

Use tools like autocannon or k6:

```bash
# Using autocannon
autocannon -c 100 -d 20 http://localhost:3000/health

# Using k6
k6 run load-test.js
```

## Deployment Considerations

### Containerization (Docker)

Both backends can be easily containerized. Here are basic examples:

**NestJS Dockerfile**:
```dockerfile
FROM oven/bun:1.1 as builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build  # If you have a build step

FROM oven/bun:1.1
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb
EXPOSE 3000
CMD ["bun", "run", "start:prod"]
```

**Vanilla Dockerfile**:
```dockerfile
FROM oven/bun:1.1
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
EXPOSE 3001
CMD ["bun", "run", "start"]
```

### Environment Variables

Ensure that environment variables are properly set in your deployment environment (whether using Docker, Kubernetes, serverless platforms, or VMs).

### Reverse Proxy and Load Balancing

- Consider using a reverse proxy (like NGINX, Traefik, or Cloud Load Balancer) in front of your backend services for SSL termination, load balancing, and routing.
- Both backends work fine behind a proxy; ensure that headers like `X-Forwarded-Proto` are handled correctly if needed for redirect generation.

### Scaling Strategies

- **NestJS**: Can be scaled horizontally behind a load balancer. Consider using the cluster module or running multiple instances.
- **Vanilla**: Similarly, can be scaled horizontally. Due to its lower overhead, you might be able to run more instances on the same hardware.

### Zero-Downtime Deployments

Implement rolling updates:

```yaml
# Kubernetes rolling update
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

### Rollback Strategies

- Keep previous versions of Docker images
- Use deployment strategies that support rollback
- Monitor health after deployments

## Security Best Practices

### Input Validation

Always validate input:

```typescript
// Use class-validator in NestJS
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // Validate
  }
}
```

### Output Encoding

- Sanitize output to prevent XSS
- Use appropriate content types
- Set security headers

### Security Headers

```typescript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});
```

### TLS/HTTPS Configuration

Always use TLS in production:

```typescript
// Bun with TLS
Bun.serve({
  port: 3000,
  tls: {
    key: await Bun.file('key.pem').text(),
    cert: await Bun.file('cert.pem').text(),
  },
  fetch: handler,
});
```

### Rate Limiting

Implement rate limiting at the API gateway or application level.

## Disaster Recovery

### Backup Strategies

- Regular database backups
- Configuration backups
- Code repository backups

### Recovery Procedures

Document and test recovery procedures:

- Database restore process
- Configuration recovery
- Service restart procedures

### High Availability Setup

For production:

- Multiple availability zones
- Load balancing
- Database replication
- Caching layer

## Migration Guide

### From Express to Fastify

1. Install `@nestjs/platform-fastify`
2. Update main.ts to use Fastify adapter
3. Review middleware compatibility
4. Test all endpoints
5. Update performance testing

### From REST to Connect RPC

1. Define proto files for existing APIs
2. Generate Connect RPC code
3. Implement service handlers
4. Migrate clients incrementally
5. Remove REST endpoints when stable

### Between Implementations

Migrate from Vanilla to NestJS (or vice versa):

1. Keep proto definitions identical
2. Implement same service interfaces
3. Migrate business logic
4. Update deployment configuration
5. Test thoroughly

## Comparison Matrix

| Feature | NestJS + Fastify | Vanilla Node.js/Bun |
|---------|------------------|---------------------|
| Dependencies | Many | Minimal |
| Learning Curve | Moderate | Low |
| Startup Time | Slower | Faster |
| Memory Usage | Higher | Lower |
| Performance | Excellent | Excellent |
| Flexibility | Opinionated | Full |
| DI System | Built-in | Manual |
| Testing Utilities | Built-in | Manual |
| Module System | Built-in | Manual |
| HTTP/2 Support | Yes | Yes |
| WebSocket Support | Built-in | Manual |
| GraphQL Support | Built-in | Manual |
| Documentation | Auto-generate | Manual |
| Enterprise Features | Many | None |

## Decision Framework

Use this framework to choose an implementation:

1. **Team Size**: Large teams benefit from NestJS structure; small teams may prefer Vanilla.

2. **Project Complexity**: Complex projects benefit from NestJS modules; simple projects may use Vanilla.

3. **Performance Requirements**: Both meet most requirements; extreme performance needs may favor Vanilla.

4. **Timeline**: NestJS speeds up development with built-in features; Vanilla requires more setup.

5. **Future Maintenance**: Consider long-term maintenance; NestJS conventions help large codebases.

## Future Enhancements

Potential future additions:

- GraphQL support in both implementations
- WebSocket gateway
- gRPC reflection
- Service mesh integration
- Advanced caching strategies
- Rate limiting per-client

## Further Reading

- [Connect RPC Documentation](https://connectrpc.com/docs/languages/typescript/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Fastify Documentation](https://www.fastify.io/)
- [Bun Documentation](https://bun.sh/docs)
- [Node.js HTTP Documentation](https://nodejs.org/api/http.html)
- [Node.js HTTP/2 Documentation](https://nodejs.org/api/http2.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Protocol Buffers Language Guide](https://protobuf.dev/programming-guides/proto3/)
- [Buf Documentation](https://docs.buf.build/)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)

---

*Last updated: March 2026*

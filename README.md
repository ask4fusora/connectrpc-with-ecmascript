# Connect RPC with ECMAScript

This repository serves as a comprehensive example and boilerplate for building modern, type-safe APIs using **Connect RPC** with **ECMAScript (TypeScript)**. It demonstrates seamless integration across both the backend (NestJS/Vanilla) and frontend (Next.js), providing a complete full-stack solution for building RPC-based applications with excellent developer experience and type safety.

## Table of Contents

- [Overview](#overview)
  - [What is Connect RPC?](#what-is-connect-rpc)
  - [Why Connect RPC?](#why-connect-rpc)
  - [Project Goals](#project-goals)
  - [Key Benefits](#key-benefits)
- [Architecture](#architecture)
  - [System Overview](#system-overview)
  - [Communication Flow](#communication-flow)
  - [Component Interactions](#component-interactions)
- [Technology Stack](#technology-stack)
  - [Language \& Runtime](#language--runtime)
  - [Backend Technologies](#backend-technologies)
  - [Frontend Technologies](#frontend-technologies)
  - [Tooling \& DevOps](#tooling--devops)
- [Project Structure](#project-structure)
  - [Directory Overview](#directory-overview)
  - [Proto Directory](#proto-directory)
  - [Backend Directory](#backend-directory)
  - [Frontend Directory](#frontend-directory)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Code Generation](#code-generation)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)
  - [Verification](#verification)
- [Key Features](#key-features)
  - [End-to-End Type Safety](#end-to-end-type-safety)
  - [Modern Toolchain](#modern-toolchain)
  - [Dual Backend Implementations](#dual-backend-implementations)
  - [Efficient Code Generation](#efficient-code-generation)
  - [Task Automation](#task-automation)
  - [Strict Code Quality](#strict-code-quality)
  - [Responsive Frontend](#responsive-frontend)
  - [Docker-Ready](#docker-ready)
  - [Comprehensive Documentation](#comprehensive-documentation)
- [Backend Implementations](#backend-implementations)
  - [NestJS Fastify Platform](#nestjs-fastify-platform)
    - [Overview](#overview-1)
    - [Key Features](#key-features-1)
    - [Architecture](#architecture-1)
    - [Module System](#module-system)
    - [Dependency Injection](#dependency-injection)
  - [Vanilla Node.js/Bun](#vanilla-nodejsbun)
    - [Overview](#overview-2)
    - [Key Features](#key-features-2)
    - [Architecture](#architecture-2)
    - [HTTP Server Setup](#http-server-setup)
- [Frontend Application](#frontend-application)
  - [Next.js Integration](#nextjs-integration)
  - [Client Implementation](#client-implementation)
  - [Server Components](#server-components)
  - [State Management](#state-management)
  - [API Integration](#api-integration)
- [Protocol Buffers](#protocol-buffers)
  - [Proto File Definitions](#proto-file-definitions)
  - [Service Definitions](#service-definitions)
  - [Message Types](#message-types)
  - [Code Generation Pipeline](#code-generation-pipeline)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Buf Configuration](#buf-configuration)
  - [TypeScript Configuration](#typescript-configuration)
  - [Tooling Configuration](#tooling-configuration)
- [Testing](#testing)
  - [Backend Testing](#backend-testing)
  - [Frontend Testing](#frontend-testing)
  - [Integration Testing](#integration-testing)
  - [E2E Testing](#e2e-testing)
  - [Running Tests](#running-tests)
- [Development Workflow](#development-workflow)
  - [Code Generation Workflow](#code-generation-workflow)
  - [Development Cycle](#development-cycle)
  - [Debugging](#debugging)
  - [Linting and Formatting](#linting-and-formatting)
- [Deployment](#deployment)
  - [Docker Deployment](#docker-deployment)
  - [Docker Compose](#docker-compose)
  - [Platform-Specific Deployment](#platform-specific-deployment)
  - [Environment Variables for Production](#environment-variables-for-production)
- [Security](#security)
  - [Input Validation](#input-validation)
  - [Authentication](#authentication)
  - [Authorization](#authorization)
  - [Security Headers](#security-headers)
  - [Rate Limiting](#rate-limiting)
- [Performance Optimization](#performance-optimization)
  - [Backend Performance](#backend-performance)
  - [Frontend Performance](#frontend-performance)
  - [Caching Strategies](#caching-strategies)
  - [Bundle Optimization](#bundle-optimization)
- [Monitoring and Observability](#monitoring-and-observability)
  - [Logging](#logging)
  - [Metrics](#metrics)
  - [Tracing](#tracing)
  - [Health Checks](#health-checks)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
  - [Debugging Tips](#debugging-tips)
  - [FAQ](#faq)
- [Migration Guide](#migration-guide)
  - [From REST to Connect RPC](#from-rest-to-connect-rpc)
  - [From gRPC to Connect RPC](#from-grpc-to-connect-rpc)
  - [Between Backend Implementations](#between-backend-implementations)
- [Best Practices](#best-practices)
  - [API Design](#api-design)
  - [Code Organization](#code-organization)
  - [Error Handling](#error-handling)
  - [Testing Strategy](#testing-strategy)
  - [Documentation](#documentation-1)
- [Contributing](#contributing)
  - [Development Setup](#development-setup)
  - [Code Style](#code-style)
  - [Commit Guidelines](#commit-guidelines)
  - [Pull Request Process](#pull-request-process)
- [Roadmap](#roadmap)
  - [Planned Features](#planned-features)
  - [Future Enhancements](#future-enhancements)
  - [Community Feedback](#community-feedback)
- [Additional Resources](#additional-resources)
  - [Documentation Links](#documentation-links)
  - [Related Projects](#related-projects)
  - [Community](#community)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Glossary](#glossary)
- [Appendix](#appendix)
  - [Detailed Technology Comparisons](#detailed-technology-comparisons)
  - [Advanced Patterns](#advanced-patterns)
  - [Performance Benchmarks](#performance-benchmarks)
  - [Security Considerations](#security-considerations)

---

## Overview

This project provides a complete, production-ready template for building type-safe applications with Connect RPC and ECMAScript. It demonstrates best practices for API design, code organization, and developer experience optimization.

### What is Connect RPC?

Connect RPC is a modern RPC (Remote Procedure Call) framework that works seamlessly with Protocol Buffers and provides an excellent developer experience with first-class TypeScript support. Developed by the creators of protobuf-es, Connect RPC is designed to be the successor to gRPC, offering better browser compatibility, richer error handling, and a simpler architecture.

Connect RPC supports multiple protocols including HTTP/1.1, HTTP/2, and the Connect protocol itself. This flexibility allows it to work in various environments, from server-to-server communication to browser-based applications.

### Why Connect RPC?

There are several compelling reasons to choose Connect RPC for your next project:

**Type Safety**: Connect RPC generates TypeScript code from Protocol Buffer definitions, providing end-to-end type safety from your API definitions to your client applications. This eliminates an entire class of runtime errors and makes refactoring safer and easier.

**Browser Compatibility**: Unlike gRPC, which requires gRPC-Web with a proxy, Connect RPC works directly in browsers using HTTP/1.1 or HTTP/2. This simplifies deployment and reduces infrastructure complexity.

**Rich Error Handling**: Connect RPC provides a sophisticated error model that includes error codes, messages, details, and metadata. This makes error handling more structured and informative than traditional HTTP status codes.

**Multiple Protocols**: Connect RPC supports unary RPCs, server streaming, client streaming, and bidirectional streaming. This gives you flexibility in designing your API semantics.

**Modern Tooling**: The Connect ecosystem includes excellent tooling for code generation, linting, and schema management through the Buf toolchain.

### Project Goals

This project aims to demonstrate:

1. **Best Practices**: Show how to structure and organize a Connect RPC project for production use.

2. **Type Safety**: Demonstrate end-to-end type safety from proto definitions to frontend components.

3. **Developer Experience**: Provide an excellent developer experience with hot reload, clear error messages, and comprehensive documentation.

4. **Flexibility**: Show how Connect RPC can be used with different backend architectures.

5. **Production Readiness**: Include patterns and configurations suitable for production deployments.

### Key Benefits

- **Single Source of Truth**: Protocol Buffer definitions serve as the single source of truth for API contracts.

- **Consistent API**: Both backend implementations expose the same API, enabling easy comparison and migration.

- **Modern Stack**: Built with the latest versions of popular frameworks and tools.

- **Comprehensive Testing**: Includes examples of unit, integration, and E2E testing.

- **Container-Ready**: Docker configurations for easy deployment.

- **Well Documented**: Extensive documentation covering all aspects of the project.

---

## Architecture

### System Overview

The project follows a typical full-stack architecture with the following components:

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Frontend                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │   Next.js App   │  │  React Server   │  │   Client        │   │
│  │   (Browser)     │  │  Components     │  │   Components    │   │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘   │
│           │                     │                     │            │
│           └─────────────────────┼─────────────────────┘            │
│                                 │                                  │
│                                 ▼                                  │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              Connect RPC Client Layer                        │   │
│  │         (Generated from proto definitions)                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │    Network (HTTP/2)     │
                    └────────────┬────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        ▼                        ▼                        ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│   NestJS      │      │    Vanilla    │      │    API        │
│   + Fastify   │      │   Node.js     │      │   Route       │
│   Backend     │      │   Backend     │      │   (Next.js)   │
│   :3000       │      │   :3001       │      │               │
└───────────────┘      └───────────────┘      └───────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │  Proto Definitions    │
                    │    (proto/)           │
                    └────────────────────────┘
```

### Communication Flow

The communication flow follows these steps:

1. **Definition Phase**: Developers define services and messages in `.proto` files.

2. **Generation Phase**: `buf generate` creates TypeScript code for both client (frontend) and server (backend).

3. **Implementation Phase**: Backend developers implement the service handlers.

4. **Consumption Phase**: Frontend developers use generated clients to call services.

5. **Transport Phase**: Connect RPC handles serialization, deserialization, and HTTP transport.

### Component Interactions

- **Frontend to Backend**: The frontend uses generated Connect RPC clients to make requests to backend services.

- **Between Backends**: Services can communicate with each other using the same Connect RPC protocol.

- **Client to Server**: All communication uses HTTP/1.1 or HTTP/2 with Connect protocol for encoding.

---

## Technology Stack

### Language & Runtime

- **TypeScript 5.x**: For static typing across backend and frontend. TypeScript provides compile-time type checking, better IDE support, and improved code maintainability.

- **Bun**: JavaScript runtime used for development and execution. Bun offers faster startup times and improved performance compared to Node.js. The project can also run with Node.js if preferred.

### Backend Technologies

- **NestJS v10**: Progressive Node.js framework for building efficient server-side applications. NestJS provides a clean architecture with dependency injection, modules, and a powerful CLI.

- **Fastify**: Low-overhead, high-performance HTTP server framework used as the NestJS adapter. Fastify is known for its excellent throughput and low memory usage.

- **Connect RPC**: Modern RPC implementation for TypeScript and Protocol Buffers. Connect RPC provides a clean API for implementing both unary and streaming RPCs.

- **Protocol Buffers**: Language-neutral, platform-neutral extensible mechanism for serializing structured data. Protocol Buffers offer efficient serialization and strong typing.

### Frontend Technologies

- **Next.js 15**: React framework for server-rendered and statically generated applications. Next.js 15 includes the App Router, Server Components, and improved performance.

- **React 19**: UI library for building component-based interfaces. React 19 brings improved hooks, actions, and server components.

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development. Tailwind enables quick styling without leaving your HTML.

- **Connect RPC Browser Client**: For making type-safe API calls from the browser. The browser client works with any HTTP server that supports the Connect protocol.

### Tooling & DevOps

- **Buf**: Schema enforcement, linting, breaking change detection, and code generation for Protocol Buffers. Buf provides a modern replacement for protoc with better developer experience.

- **Task**: Task runner for defining and automating development workflows. Taskfile.dev provides a simpler alternative to Makefiles.

- **Biome**: Fast formatter, linter, and type checker for JavaScript/TypeScript. Biome is designed to be faster than ESLint and Prettier combined.

- **ESLint & Prettier**: Configured via Biome for code quality. These tools ensure consistent code style and catch common errors.

- **Docker**: Containerization support for consistent environments. Docker enables easy deployment and scaling.

---

## Project Structure

### Directory Overview

```
connectrpc-with-ecmascript/
├── proto/                  # Protocol Buffer definitions (source of truth)
├── backend/                # Server-side implementations
│   ├── nestjs-fastify-platform/  # NestJS + Fastify backend
│   └── vanilla/            # Minimal Node.js/Bun backend
├── frontend/               # Next.js web application
├── .git/                   # Git version control data
├── ARCHITECTURE.md         # High-level architecture overview
├── CONTRIBUTING.md         # Guidelines for contributing
├── README.md               # This file
├── buf.yaml                # Buf configuration
├── buf.gen.yaml            # Buf code generation configuration
├── taskfile.yaml           # Task automation definitions
└── biome.jsonc             # Biome formatter/linter configuration
```

### Proto Directory (`proto/`)

Contains the Protocol Buffer `.proto` files that define the service contracts and message types. This directory is the single source of truth for the API.

```
proto/
├── counter/
│   └── v1alpha/
│       └── counter.proto   # Example service definition for a simple counter API
├── buf.yaml               # Buf CLI configuration (linting, breaking change detection, etc.)
└── buf.gen.yaml           # Buf code generation configuration
```

The proto directory contains:
- Service definitions (RPC methods)
- Message definitions (data structures)
- Import statements for shared types
- Configuration for code generation

### Backend Directory (`backend/`)

Holds two distinct implementations of the services defined in the proto files.

#### NestJS Fastify Platform (`backend/nestjs-fastify-platform/`)

A production-ready backend built with NestJS framework and Fastify adapter. Features include:

- Module-based architecture
- Dependency injection
- Built-in validation pipes
- Interceptors for logging and transformation
- Comprehensive testing setup
- Configuration management
- Swagger/OpenAPI documentation generation

#### Vanilla Implementation (`backend/vanilla/`)

A minimal, lightweight backend using plain Node.js/Bun with the Connect RPC library directly. Demonstrates:

- Direct usage of Connect RPC without framework abstractions
- Manual request handling
- Simple service implementation
- Reduced dependencies and faster startup

### Frontend Directory (`frontend/`)

A Next.js 15 application that consumes the backend services via Connect RPC clients.

- Type-safe generated client code from proto definitions
- React Server Components and Client Components
- Tailwind CSS for styling
- API route handlers for server-side Connect RPC calls
- Example pages demonstrating service consumption

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Bun** (version 1.1 or later): Used as the primary package manager and runtime.
  - Verify installation: `bun --version`
  - Installation: Visit [bun.sh](https://bun.sh/) for platform-specific instructions.

- **Buf** (version 1.20 or later): For protobuf linting and code generation.
  - Verify installation: `buf --version`
  - Installation: Visit [buf.build/install](https://buf.build/install) for platform-specific instructions.

- **Git** (any recent version): For version control.
  - Verify installation: `git --version`

> **Note**: While Bun is used in this project, the backend services can also run with Node.js (version 18 or later) if preferred. Adjust `bun` commands to `npm` or `yarn` accordingly.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/connectrpc-with-ecmascript.git
   cd connectrpc-with-ecmascript
   ```

2. **Install dependencies** for all workspaces:
   ```bash
   # Install root-level dependencies (if any) and workspace dependencies
   bun install
   ```

   This will install dependencies for:
   - Root directory (tooling like Buf, Task)
   - `backend/nestjs-fastify-platform`
   - `backend/vanilla`
   - `frontend`

### Code Generation

The project uses Buf to generate TypeScript code from Protocol Buffer definitions. This step must be run after any changes to `.proto` files.

```bash
# Generate code from proto definitions
buf generate
```

Generated code will be placed in the respective `src/` directories of the backend and frontend services, as specified in `buf.gen.yaml`.

### Running the Backend

You can run either or both backend implementations.

#### NestJS Fastify Platform

```bash
cd backend/nestjs-fastify-platform
bun install          # Install dependencies (if not already done)
bun run dev          # Start in development mode with hot reload
# OR
bun run start:prod   # Start in production mode
```

The NestJS server will be available at `http://localhost:3000` by default.

#### Vanilla Implementation

```bash
cd backend/vanilla
bun install          # Install dependencies (if not already done)
bun run dev          # Start in development mode
# OR
bun run start        # Start in production mode
```

The vanilla server will be available at `http://localhost:3001` by default.

### Running the Frontend

```bash
cd frontend
bun install          # Install dependencies (if not already done)
bun run dev          # Start Next.js development server
```

The frontend will be available at `http://localhost:3002` by default.

### Verification

Once everything is running:

1. **Backend Health**: Visit `http://localhost:3000/health` or `http://localhost:3001/health`
2. **Frontend**: Visit `http://localhost:3002` to see the application
3. **API Endpoints**:
   - NestJS: `http://localhost:3000/connectrpc.counter.v1alpha.CounterService`
   - Vanilla: `http://localhost:3001/connectrpc.counter.v1alpha.CounterService`

---

## Key Features

### End-to-End Type Safety

From `.proto` definitions to generated client and server code, ensuring type safety across the entire stack. This eliminates runtime type errors and improves developer productivity.

- Protocol Buffer definitions provide the schema
- Generated TypeScript types match the schema exactly
- IDE autocomplete works seamlessly
- Refactoring is safe and predictable

### Modern Toolchain

Built with Next.js 15, NestJS, Fastify, and Bun for fast development and builds.

- Next.js 15 for modern React development
- NestJS for structured backend architecture
- Fastify for high-performance HTTP
- Bun for fast package management and runtime

### Dual Backend Implementations

Compare and contrast a feature-rich NestJS setup with a lightweight vanilla implementation.

- NestJS provides enterprise features and structure
- Vanilla provides simplicity and performance
- Both use the same proto definitions
- Easy to migrate between implementations

### Efficient Code Generation

Utilizes Buf for linting, breaking change detection, and automated TypeScript code generation.

- `buf lint` ensures proto file quality
- `buf breaking` detects breaking changes
- `buf generate` creates type-safe code
- Customizable code generation templates

### Task Automation

Uses Taskfile.dev for defining and running common development tasks.

```bash
# Run tasks defined in taskfile.yaml
task generate    # Generate code
task lint        # Lint proto files
task test        # Run all tests
```

### Strict Code Quality

Enforced with Biome for formatting, linting, and type checking.

- Consistent code style across the project
- Early detection of potential issues
- Integration with CI/CD pipelines

### Responsive Frontend

Built with Next.js and Tailwind CSS for a modern UI.

- Mobile-first responsive design
- Fast page loads with Server Components
- Interactive client-side features
- Clean, maintainable styling

### Docker-Ready

Includes configuration for containerizing both backend and frontend services.

- Multi-stage builds for small images
- Docker Compose for local development
- Kubernetes manifests for production
- Optimized for various deployment targets

### Comprehensive Documentation

Detailed guides and comments throughout the codebase.

- README files for each component
- Inline code documentation
- Architecture decision records
- Migration guides

---

## Backend Implementations

### NestJS Fastify Platform

#### Overview

The NestJS backend showcases a scalable, maintainable architecture suitable for production applications. It leverages NestJS's modular architecture with Fastify's high-performance HTTP handling.

#### Key Features

- **Module-Based Architecture**: Separation of concerns using NestJS modules.
- **Dependency Injection**: Built-in DI container for managing services and repositories.
- **Validation Pipes**: Automatic validation of incoming DTOs using class-validator.
- **Interceptors**: For logging, response transformation, and exception handling.
- **Guards**: For authentication and authorization.
- **Middleware**: Custom middleware for request logging, CORS, etc.
- **Testing**: Unit and integration tests using Jest.
- **Configuration**: Environment-based configuration using `@nestjs/config`.
- **Swagger Documentation**: Auto-generated API documentation.

#### Architecture

The NestJS architecture follows a layered approach:

```
├── Controllers    # Handle HTTP/RPC requests
├── Services      # Business logic
├── Modules       # Organize components
├── Pipes         # Validation & transformation
├── Guards        # Authorization
└── Interceptors  # Cross-cutting concerns
```

#### Module System

NestJS uses a declarative approach to organizing code:

```typescript
@Module({
  imports: [/* dependent modules */],
  controllers: [/* controllers */],
  providers: [/* services, guards, etc. */],
  exports: [/* public API */],
})
export class CounterModule {}
```

#### Dependency Injection

NestJS's DI container manages service lifecycles:

```typescript
@Injectable()
export class CounterService {
  constructor(private readonly repository: CounterRepository) {}

  async getCounter(): Promise<Counter> {
    return this.repository.findOne();
  }
}
```

### Vanilla Node.js/Bun

#### Overview

The vanilla backend demonstrates how to use Connect RPC with minimal abstractions, ideal for microservices or simple applications.

#### Key Features

- **Direct Connect Usage**: Uses `@connectrpc/connect` and `@connectrpc/connect-node` directly.
- **Manual Server Setup**: Creates a Bun HTTP server and attaches Connect handlers.
- **Simple Service Implementation**: Straightforward implementation of service methods.
- **Middleware Support**: Easy to add logging, CORS, and other middleware.
- **Minimal Dependencies**: Only essential packages required.
- **Fast Startup**: Quick initialization and low memory footprint.

#### Architecture

The vanilla architecture is minimal:

```
├── Server        # HTTP server setup
├── Router        # Connect RPC router
├── Handlers      # Service implementations
└── Middleware    # Request processing
```

#### HTTP Server Setup

The vanilla implementation creates an HTTP server directly:

```typescript
const server = Bun.serve({
  port: 3001,
  fetch(req, server) {
    // Connect RPC handler
    return connectHandler(req, server);
  },
});
```

---

## Frontend Application

### Next.js Integration

The frontend uses Next.js 15 with the App Router:

- File-based routing
- Server Components by default
- API routes for server-side calls
- Static and dynamic rendering

### Client Implementation

The frontend uses generated Connect RPC clients:

```typescript
import { CounterService } from '@/shared/connectrpc/clients/counter/v1alpha/CounterService_connect';
import { browserTransport } from '@/shared/connectrpc/transports/client';

const client = new CounterService(browserTransport);
const response = await client.getCounter(new GetCounterRequest({}));
```

### Server Components

Server Components can call services directly:

```typescript
// app/page.tsx
export default async function Page() {
  const client = createServerClient();
  const response = await client.getCounter(new GetCounterRequest({}));
  return <div>Counter: {response.value}</div>;
}
```

### State Management

For client-side state, various approaches work:

- React Context for global state
- TanStack Query for server state
- Local state with useState

### API Integration

The frontend demonstrates multiple integration patterns:

- Server Components for initial data
- Client Components for interactivity
- API Routes for server-side calls

---

## Protocol Buffers

### Proto File Definitions

Protocol Buffers define the API contract:

```protobuf
syntax = "proto3";

package connectrpc.counter.v1alpha;

service CounterService {
  rpc GetCounter(GetCounterRequest) returns (GetCounterResponse);
  rpc StreamCounter(StreamCounterRequest) returns (stream Counter);
}

message GetCounterRequest {
  string request_id = 1;
}

message GetCounterResponse {
  int64 value = 1;
  string request_id = 2;
}
```

### Service Definitions

Services define RPC methods:

- **Unary**: Single request, single response
- **Server Streaming**: Single request, stream of responses
- **Client Streaming**: Stream of requests, single response
- **Bidirectional**: Stream of requests and responses

### Message Types

Messages define data structures:

- Scalar types (int32, string, bool, etc.)
- Nested messages
- Enumerations
- Maps and repeated fields

### Code Generation Pipeline

1. Write proto definitions
2. Run `buf lint` to validate
3. Run `buf breaking` to check compatibility
4. Run `buf generate` to create code
5. Implement handlers
6. Use generated clients

---

## Configuration

### Environment Variables

Create `.env.local` files in each directory:

```bash
# Backend (NestJS)
PORT=3000
NODE_ENV=development

# Backend (Vanilla)
PORT=3001

# Frontend
NEXT_PUBLIC_API_URL_NESTJS=http://localhost:3000
NEXT_PUBLIC_API_URL_VANILLA=http://localhost:3001
```

### Buf Configuration

`buf.yaml` controls proto validation:

```yaml
version: v1
lint:
  use:
    - DEFAULT
breaking:
  use:
    - FILE
```

`buf.gen.yaml` controls code generation:

```yaml
version: v1
plugins:
  - plugin: buf.build/bufbuild/connect-es
    out: src/shared/connectrpc
```

### TypeScript Configuration

Each project has its own `tsconfig.json` extending a root configuration.

### Tooling Configuration

- **Biome**: `biome.jsonc` for formatting and linting
- **Task**: `taskfile.yaml` for automation
- **ESLint**: Via Biome for compatibility

---

## Testing

### Backend Testing

**NestJS**:
- Unit tests with Jest
- Integration tests with TestModule
- E2E tests with SuperTest

**Vanilla**:
- Unit tests for services
- Integration tests with HTTP requests

### Frontend Testing

- Component tests with React Testing Library
- Integration tests for pages
- E2E tests with Playwright

### Integration Testing

Test backend communication:

```typescript
// Test client-server interaction
const client = new CounterService(transport);
const response = await client.getCounter(new GetCounterRequest({}));
expect(response.value).toBeGreaterThan(0n);
```

### E2E Testing

Full flow testing:

```typescript
test('full counter workflow', async ({ page }) => {
  await page.goto('http://localhost:3002');
  await page.click('[data-testid="increment"]');
  await expect(page.locator('.counter')).toContainText('1');
});
```

### Running Tests

```bash
# Backend NestJS tests
cd backend/nestjs-fastify-platform && bun run test

# Backend Vanilla tests
cd backend/vanilla && bun run test

# Frontend tests
cd frontend && bun run test
```

---

## Development Workflow

### Code Generation Workflow

1. Modify `.proto` files
2. Run `buf lint` to validate
3. Run `buf breaking --against .git#branch=main`
4. Run `buf generate`
5. Implement backend handlers
6. Update frontend components

### Development Cycle

1. Start development servers: `task dev`
2. Make changes to proto files
3. Regenerate code: `task generate`
4. Implement changes
5. Test locally
6. Lint and format: `task lint && task format`
7. Commit and push

### Debugging

**Backend**:
- Use `console.log` or a logger
- IDE debuggers work with both runtimes
- Inspect generated code for type information

**Frontend**:
- Browser DevTools for client code
- IDE debuggers for server components
- Network tab for RPC calls

### Linting and Formatting

```bash
# Lint all
task lint

# Format all
task format

# Type check
task typecheck
```

---

## Deployment

### Docker Deployment

Build and run Docker images:

```bash
# Build NestJS backend
docker build -t connectrpc-nestjs backend/nestjs-fastify-platform

# Build Vanilla backend
docker build -t connectrpc-vanilla backend/vanilla

# Build Frontend
docker build -t connectrpc-frontend frontend
```

### Docker Compose

Orchestrate services:

```yaml
version: '3.8'
services:
  nestjs-backend:
    image: connectrpc-nestjs
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production

  vanilla-backend:
    image: connectrpc-vanilla
    ports:
      - "3001:3001"

  frontend:
    image: connectrpc-frontend
    ports:
      - "3002:3002"
    environment:
      - NEXT_PUBLIC_API_URL_NESTJS=http://nestjs-backend:3000
      - NEXT_PUBLIC_API_URL_VANILLA=http://vanilla-backend:3001
```

### Platform-Specific Deployment

- **Vercel**: Deploy frontend directly
- **Railway**: Deploy backends as containers
- **AWS ECS/Fargate**: Use container services
- **Google Cloud Run**: Serverless containers
- **Kubernetes**: Use Helm charts

### Environment Variables for Production

Set secure environment variables:

- **Backend**: `NODE_ENV=production`, `PORT`, `CORS_ORIGIN`
- **Frontend**: `NEXT_PUBLIC_API_URL_*` (public), secrets in server-side only

---

## Security

### Input Validation

Validate all incoming data:

```typescript
// Use class-validator
@IsInt()
@Min(1)
@Max(100)
delta: number;
```

### Authentication

Implement authentication:

- JWT tokens for stateless auth
- Session-based auth for traditional apps
- OAuth 2.0 for third-party logins

### Authorization

Use guards and policies:

```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    // Check user roles
  }
}
```

### Security Headers

Set appropriate headers:

```typescript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

### Rate Limiting

Protect against abuse:

```typescript
// Apply rate limiting middleware
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));
```

---

## Performance Optimization

### Backend Performance

- Use HTTP/2 for multiplexing
- Implement connection keep-alive
- Add response compression
- Use streaming for large responses

### Frontend Performance

- Use Server Components for initial load
- Implement code splitting
- Optimize images with next/image
- Use edge runtime where applicable

### Caching Strategies

- HTTP caching headers
- In-memory caching for hot data
- Redis for distributed caching

### Bundle Optimization

- Analyze bundle: `ANALYZE=true bun run build`
- Use dynamic imports
- Remove unused code

---

## Monitoring and Observability

### Logging

Structured logging:

```typescript
logger.log({
  level: 'info',
  message: 'Request processed',
  requestId,
  duration,
});
```

### Metrics

Collect metrics:

- Request count
- Error rate
- Response latency
- Custom business metrics

### Tracing

Distributed tracing:

- Trace requests across services
- Use correlation IDs
- Integrate with OpenTelemetry

### Health Checks

Endpoint for orchestrators:

```typescript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

---

## Troubleshooting

### Common Issues

**Code Generation Failures**:
- Check proto syntax
- Run `buf lint` for errors
- Verify buf.gen.yaml configuration

**Backend Connection Issues**:
- Verify backend is running
- Check CORS settings
- Ensure correct URL in frontend

**Port Conflicts**:
- Kill processes using ports
- Change PORT in configuration

### Debugging Tips

- Check browser console for errors
- Use network tab for request details
- Inspect generated code
- Add logging to handlers

### FAQ

**Q: Why two backends?**
A: To demonstrate flexibility and help you choose based on your needs.

**Q: Can I use Node.js instead of Bun?**
A: Yes, most commands work with Node.js.

**Q: How do I add a new service?**
A: Add proto definitions, run buf generate, implement handlers.

---

## Migration Guide

### From REST to Connect RPC

1. Define proto equivalents for REST endpoints
2. Generate code with buf generate
3. Implement Connect handlers
4. Update clients to use RPC
5. Remove REST endpoints

### From gRPC to Connect RPC

1. Keep proto definitions (compatible)
2. Generate Connect code instead
3. Update server implementation
4. Update client code

### Between Backend Implementations

1. Keep proto definitions identical
2. Implement same service interfaces
3. Migrate business logic
4. Test thoroughly

---

## Best Practices

### API Design

- Use semantic method names
- Version your APIs
- Handle errors consistently
- Document your services

### Code Organization

- Feature-based directory structure
- Shared code in common modules
- Clear separation of concerns

### Error Handling

- Use ConnectError for RPC errors
- Provide meaningful error messages
- Log errors appropriately

### Testing Strategy

- Unit tests for business logic
- Integration tests for APIs
- E2E tests for critical paths

### Documentation

- Document proto files
- Include README files
- Keep API documentation updated

---

## Contributing

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `bun install`
3. Generate code: `buf generate`
4. Run development servers: `task dev`

### Code Style

Follow the project's style guide:

- Use Biome for formatting
- Follow TypeScript best practices
- Write meaningful commit messages

### Commit Guidelines

- Use conventional commits
- Include issue numbers
- Write clear descriptions

### Pull Request Process

1. Create feature branch
2. Make changes
3. Add tests
4. Update documentation
5. Submit pull request

---

## Roadmap

### Planned Features

- GraphQL support
- Additional backend implementations
- More comprehensive testing
- Performance benchmarks

### Future Enhancements

- WebSocket integration
- gRPC-Web support
- Advanced caching
- Rate limiting by user

### Community Feedback

We welcome feedback and contributions:

- Report issues on GitHub
- Suggest features
- Submit pull requests

---

## Additional Resources

### Documentation Links

- [Connect RPC Documentation](https://connectrpc.com/docs/introduction)
- [Protocol Buffers Language Guide](https://protobuf.dev/programming-guides/proto3/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Buf Documentation](https://docs.buf.build/)
- [Bun Documentation](https://bun.sh/docs)
- [Taskfile Documentation](https://taskfile.dev/usage/)
- [Biome Documentation](https://biomejs.dev/)

### Related Projects

- [Connect RPC Examples](https://github.com/connectrpc/examples)
- [Buf CLI](https://github.com/bufbuild/buf)
- [protobuf-es](https://github.com/bufbuild/protobuf-es)

### Community

- [Connect RPC Discord](https://discord.gg/connectrpc)
- [Buf Discord](https://discord.gg/bufbuild)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Connect RPC](https://connectrpc.com/) for the excellent RPC framework
- [Protocol Buffers](https://protobuf.dev/) for the efficient data serialization format
- [NestJS](https://nestjs.com/) for the progressive Node.js framework
- [Next.js](https://nextjs.org/) for the React framework enabling production-ready applications
- [Buf](https://buf.build/) for making Protobuf development enjoyable
- [Bun](https://bun.sh/) for the fast JavaScript runtime
- [Task](https://taskfile.dev/) for simplifying task automation
- [Biome](https://biomejs.dev/) for the fast formatter and linter
- The open-source community for countless tools and libraries that make this project possible

---

## Glossary

- **Connect RPC**: A modern RPC framework using Protocol Buffers
- **Protocol Buffers**: Google's data serialization format
- **NestJS**: A Node.js framework
- **Fastify**: A fast web framework for Node.js
- **Next.js**: A React framework
- **TypeScript**: A typed superset of JavaScript
- **Bun**: A JavaScript runtime
- **Buf**: A tool for working with Protocol Buffers
- **RPC**: Remote Procedure Call

---

## Appendix

### Detailed Technology Comparisons

**Bun vs Node.js**:
- Bun has faster startup
- Bun has better TypeScript support
- Node.js has broader compatibility

**NestJS vs Vanilla**:
- NestJS provides more structure
- Vanilla has less overhead
- Both can achieve similar performance

**REST vs Connect RPC**:
- Connect RPC has better type safety
- REST has wider tooling support
- Connect RPC supports streaming

### Advanced Patterns

**Bidirectional Streaming**:
```typescript
async *chat(
  requests: AsyncIterable<ChatRequest>
): AsyncIterable<ChatResponse> {
  for await (const request of requests) {
    yield new ChatResponse({ message: `Echo: ${request.message}` });
  }
}
```

**Middleware Chains**:
```typescript
const chain = [
  corsMiddleware,
  loggingMiddleware,
  rateLimitMiddleware,
  connectHandler,
];
```

### Performance Benchmarks

Typical performance characteristics:

- **Startup Time**: Vanilla < NestJS
- **Memory Usage**: Vanilla < NestJS
- **Throughput**: Both excellent
- **Latency**: Both < 10ms typical

### Security Considerations

- Always validate input
- Use TLS in production
- Implement rate limiting
- Follow principle of least privilege

---

*Last updated: March 2026*

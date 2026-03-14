# NestJS Fastify Connect RPC Backend

A production-ready, enterprise-grade backend implementation using [NestJS](https://nestjs.com/) framework with [Fastify](https://www.fastify.io/) adapter for high-performance HTTP handling. This implementation demonstrates how to integrate Connect RPC within the NestJS ecosystem while leveraging Fastify's exceptional throughput and low latency characteristics.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Server](#running-the-server)
- [Configuration](#configuration)
- [Module System](#module-system)
- [Dependency Injection](#dependency-injection)
- [Connect RPC Integration](#connect-rpc-integration)
- [Service Implementation](#service-implementation)
- [Controllers](#controllers)
- [Providers](#providers)
- [Guards](#guards)
- [Interceptors](#interceptors)
- [Pipes](#pipes)
- [Middleware](#middleware)
- [Exception Handling](#exception-handling)
- [Testing](#testing)
- [Database Integration](#database-integration)
- [Authentication](#authentication)
- [Logging](#logging)
- [Configuration Management](#configuration-management)
- [OpenAPI Documentation](#openapi-documentation)
- [Docker Deployment](#docker-deployment)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Performance Tuning](#performance-tuning)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)
- [Comparison with Vanilla](#comparison-with-vanilla)
- [Further Reading](#further-reading)

## Overview

This NestJS Fastify backend provides a comprehensive foundation for building scalable, maintainable server-side applications with Connect RPC. The combination of NestJS's modular architecture with Fastify's high-performance HTTP handling creates an ideal platform for building microservices and APIs that require both structure and speed.

NestJS brings a familiar Angular-inspired architecture to the Node.js world, providing dependency injection, modular organization, and a rich ecosystem of libraries. Fastify, as the underlying HTTP server, offers significant performance improvements over Express while maintaining a compatible plugin system. Together, they deliver an exceptional developer experience without sacrificing runtime performance.

This implementation showcases best practices for integrating Connect RPC within the NestJS framework, including proper module organization, service implementation patterns, error handling strategies, and testing approaches. Whether you're building a small API or a large microservices architecture, this backend provides the foundation for success.

## Features

This backend implementation includes comprehensive features for enterprise-grade application development:

### Core Framework Features

- **NestJS Framework**: Progressive Node.js framework with TypeScript support, providing modular architecture, dependency injection, and extensibility through a rich ecosystem of official and third-party modules.
- **Fastify Adapter**: High-performance HTTP server adapter replacing the default Express, offering up to 3x better throughput for certain workloads with significantly lower memory usage.
- **TypeScript Support**: Full TypeScript support with strict type checking, providing compile-time safety for the entire application.
- **Modular Architecture**: Clean module-based organization separating concerns and enabling code reuse across the application.

### Connect RPC Features

- **Full RPC Support**: Complete implementation of Connect RPC protocol supporting unary, server streaming, client streaming, and bidirectional streaming RPCs.
- **Type-Safe Integration**: Generated TypeScript types from Protocol Buffer definitions ensuring end-to-end type safety between services.
- **Multiple Protocols**: Support for Connect, gRPC, and gRPC-Web protocols through flexible transport configuration.
- **Service Discovery**: Automatic service registration and discovery within the NestJS DI system.

### Application Features

- **Dependency Injection**: Full support for NestJS's dependency injection container, enabling loose coupling and testability.
- **Validation**: Built-in request validation using class-validator and class-transformer packages.
- **Serialization**: Automatic request/response transformation and serialization.
- **Guards**: Route-level authorization and authentication guards.
- **Interceptors**: Request/response transformation, logging, and error handling interceptors.
- **Pipes**: Data transformation and validation pipes.
- **Filters**: Exception filters for centralized error handling.

### Developer Experience Features

- **Hot Reload**: Development mode with instant feedback on code changes.
- **CLI Tools**: NestJS CLI for generating modules, controllers, services, and other components.
- **Testing Utilities**: Comprehensive testing utilities for unit, integration, and e2e testing.
- **Debugging**: Excellent debugging support through IDE integrations and built-in debug logging.
- **Documentation**: Automatic OpenAPI/Swagger documentation generation.

### Production Features

- **Health Checks**: Built-in health check endpoints for container orchestration.
- **Graceful Shutdown**: Proper signal handling for zero-downtime deployments.
- **Metrics**: Integration with Prometheus for metrics collection.
- **Logging**: Structured logging with support for multiple transport mechanisms.
- **Configuration**: Environment-based configuration management.

## Architecture

The NestJS Fastify backend follows a layered architecture that promotes separation of concerns and maintainability:

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Application Layer                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Controllers                                │   │
│  │  ┌──────────────────┐  ┌──────────────────────────────────┐ │   │
│  │  │ Connect RPC      │  │ REST Controllers (if needed)    │ │   │
│  │  │ Controller       │  │                                  │ │   │
│  │  └────────┬─────────┘  └──────────────┬───────────────────┘ │   │
│  └───────────┼──────────────────────────┼─────────────────────┘   │
│              │                          │                          │
│              ▼                          ▼                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Interceptors                             │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │   │
│  │  │ Logging      │  │ Transform    │  │ Exception        │  │   │
│  │  │ Interceptor  │  │ Interceptor  │  │ Interceptor      │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                │                                    │
│                                ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Guards                                   │   │
│  │  ┌──────────────┐  ┌──────────────────────────────────┐    │   │
│  │  │ Auth Guard   │  │ Roles Guard                      │    │   │
│  │  └──────────────┘  └──────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                │                                    │
│                                ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Pipes                                    │   │
│  │  ┌──────────────┐  ┌──────────────────────────────────┐    │   │
│  │  │ Validation   │  │ Transformation                   │    │   │
│  │  │ Pipe         │  │ Pipe                             │    │   │
│  │  └──────────────┘  └──────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                │                                    │
│                                ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Services                                 │   │
│  │  ┌──────────────────┐  ┌──────────────────────────────────┐ │   │
│  │  │ CounterService   │  │ Business Services               │ │   │
│  │  │ (RPC Handler)    │  │                                  │ │   │
│  │  └────────┬─────────┘  └──────────────┬───────────────────┘ │   │
│  └───────────┼──────────────────────────┼─────────────────────┘   │
│              │                          │                          │
│              ▼                          ▼                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Repositories/Providers                   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │   │
│  │  │ Database     │  │ Cache        │  │ External APIs   │   │   │
│  │  │ Repository   │  │ Provider     │  │ Provider        │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Fastify HTTP Server                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Middleware Stack                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │   │
│  │  │ CORS         │  │ Compression  │  │ Body Parser     │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

**Controllers**: Handle incoming requests and return responses to clients. In this implementation, the Connect RPC controller handles RPC requests while REST controllers can handle traditional API endpoints.

**Interceptors**: Transform requests and responses, add logging, handle errors, and implement cross-cutting concerns.

**Guards**: Determine whether a request should be handled by the route handler based on permissions, roles, or other conditions.

**Pipes**: Transform incoming data, validate request data, and handle type conversion.

**Services**: Contain the core business logic and are injected into controllers and other services through dependency injection.

**Repositories/Providers**: Handle data access, interact with databases, caches, or external services.

**Fastify Middleware**: Low-level HTTP processing including CORS, compression, body parsing, and routing.

## Prerequisites

Before setting up the NestJS backend, ensure your development environment meets the following requirements:

### Required Software

- **Bun** (version 1.1 or later): Fast JavaScript runtime and package manager.
  - Verify installation: `bun --version`
  - Installation: Visit [bun.sh](https://bun.sh/) for platform-specific instructions.

- **Node.js** (version 18 or later): Alternative runtime for development and production.
  - Verify installation: `node --version`
  - Recommended: Use nvm (Node Version Manager) for managing Node.js versions.

- **NestJS CLI** (optional): Command-line tool for generating NestJS components.
  - Install: `npm i -g @nestjs/cli`
  - Verify: `nest --version`

- **Buf** (version 1.20 or later): Protocol Buffer code generation tool.
  - Verify installation: `buf --version`

- **Git**: Version control system.
  - Verify installation: `git --version`

### System Requirements

- **Operating System**: macOS, Linux, or Windows (with WSL2 recommended).
- **Memory**: Minimum 512MB RAM recommended for development.
- **CPU**: Single core minimum; multiple cores recommended for development.
- **Disk Space**: At least 500MB free space.

## Installation

Follow these steps to install all required dependencies:

### Step 1: Navigate to Backend Directory

```bash
cd backend/nestjs-fastify-platform
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
- `@nestjs/core`: Core NestJS framework
- `@nestjs/common`: Common NestJS utilities
- `@nestjs/platform-fastify`: Fastify platform adapter
- `@connectrpc/connect`: Core Connect RPC library
- `@connectrpc/connect-node`: Node.js Connect RPC adapters
- `@bufbuild/protobuf`: Protocol Buffer runtime
- Various NestJS and third-party modules

### Step 3: Generate Proto Code

From the project root:

```bash
# Navigate to project root
cd ../..

# Generate TypeScript code from proto definitions
buf generate
```

### Step 4: Environment Configuration

Create a `.env` file in the `backend/nestjs-fastify-platform/` directory:

```bash
# Copy example environment file
cp .env.example .env.local
```

## Project Structure

The NestJS backend follows a well-organized structure:

```
backend/nestjs-fastify-platform/
├── src/
│   ├── main.ts                      # Application entry point
│   ├── app.module.ts                # Root module
│   ├── app.controller.ts            # Root controller
│   ├── config/                      # Configuration module
│   │   ├── configuration.ts        # Configuration factory
│   │   └── index.ts                # Configuration exports
│   ├── rpc/                        # Connect RPC module
│   │   ├── rpc.module.ts          # RPC module definition
│   │   ├── rpc.service.ts        # RPC service
│   │   ├── rpc.controller.ts    # RPC controller
│   │   ├── handlers/            # RPC handlers
│   │   │   ├── counter.handler.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── modules/                    # Feature modules
│   │   ├── counter/              # Counter feature module
│   │   │   ├── counter.module.ts
│   │   │   ├── counter.service.ts
│   │   │   ├── counter.controller.ts
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── increment-counter.dto.ts
│   │   │   │   └── index.ts
│   │   │   └── entities/        # Domain entities
│   │   │       ├── counter.entity.ts
│   │   │       └── index.ts
│   │   └── [other modules]/
│   ├── common/                     # Shared components
│   │   ├── decorators/           # Custom decorators
│   │   │   ├── current-user.decorator.ts
│   │   │   └── index.ts
│   │   ├── guards/               # Custom guards
│   │   │   ├── auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── index.ts
│   │   ├── interceptors/         # Custom interceptors
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── transform.interceptor.ts
│   │   │   ├── exception.interceptor.ts
│   │   │   └── index.ts
│   │   ├── pipes/                # Custom pipes
│   │   │   ├── validation.pipe.ts
│   │   │   └── index.ts
│   │   ├── filters/              # Exception filters
│   │   │   ├── http-exception.filter.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── filters/                  # Global exception filters
│   │   └── index.ts
│   ├── interceptors/             # Global interceptors
│   │   └── index.ts
│   ├── guards/                   # Global guards
│   │   └── index.ts
│   ├── pipes/                    # Global pipes
│   │   └── index.ts
│   ├── middleware/               # Global middleware
│   │   └── index.ts
│   ├── interceptors/             # Middleware
│   │   └── logging.middleware.ts
│   ├── generated/               # Generated code
│   │   └── connectrpc/
│   │       └── counter/
│   │           └── v1alpha/
│   │               ├── counter.pb.ts
│   │               ├── counter.connect.ts
│   │               └── index.ts
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   └── utils/                    # Utility functions
│       └── index.ts
├── test/                         # Test files
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   └── e2e/                    # End-to-end tests
├── scripts/                     # Build scripts
│   └── build.ts
├── .env.example                 # Example environment variables
├── .env.local                   # Local environment
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── biome.jsonc                  # Biome configuration
├── nest-cli.json               # NestJS CLI configuration
├── tsconfig.build.json         # TypeScript build config
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies and scripts
├── bun.lockb                   # Bun lock file
└── README.md                   # This file
```

## Running the Server

Start the NestJS Fastify server:

### Development Mode

```bash
# From the backend/nestjs-fastify-platform directory
cd backend/nestjs-fastify-platform

# Using Bun (recommended)
bun run start:dev

# Or using NestJS CLI
nest start --watch

# Using npm
npm run start:dev
```

The development server will start on `http://localhost:3000` by default.

### Production Mode

```bash
# Build the application
bun run build

# Start production server
bun run start:prod
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run start` | Start production server |
| `bun run start:dev` | Start development server with watch mode |
| `bun run start:prod` | Start production server |
| `bun run build` | Build the application |
| `bun run test` | Run unit tests |
| `bun run test:e2e` | Run end-to-end tests |
| `bun run test:cov` | Run tests with coverage |
| `bun run lint` | Run linter |
| `bun run format` | Format code |

## Configuration

Configure the application using environment variables and configuration files:

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `HOST` | Server host | `0.0.0.0` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGIN` | Allowed CORS origins | `*` |
| `LOG_LEVEL` | Logging level | `log` |
| `DATABASE_URL` | Database connection string | - |

### Configuration Module

```typescript
// src/config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || '0.0.0.0',
  database: {
    url: process.env.DATABASE_URL,
  },
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3002'],
    credentials: true,
  },
});
```

## Module System

NestJS uses a modular system for organizing application code:

### Root Module

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RpcModule } from './rpc/rpc.module';
import { CounterModule } from './modules/counter/counter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RpcModule,
    CounterModule,
  ],
})
export class AppModule {}
```

### Feature Modules

```typescript
// src/modules/counter/counter.module.ts
import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';

@Module({
  controllers: [CounterController],
  providers: [CounterService],
  exports: [CounterService],
})
export class CounterModule {}
```

### Shared Modules

```typescript
// src/common/common.module.ts
import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';

@Global()
@Module({
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
```

## Dependency Injection

NestJS's dependency injection system manages service lifecycle and dependencies:

### Service Injection

```typescript
// src/modules/counter/counter.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CounterService {
  private readonly logger = new Logger(CounterService.name);
  private counter = { value: 0n };

  async getCounter() {
    this.logger.log('Getting counter value');
    return this.counter;
  }

  async incrementCounter(delta: bigint) {
    this.counter.value += delta;
    return this.counter;
  }
}
```

### Controller Injection

```typescript
// src/modules/counter/counter.controller.ts
import { Controller } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}
}
```

### Injecting Multiple Services

```typescript
// Example with multiple dependencies
@Injectable()
export class MyService {
  constructor(
    private readonly counterService: CounterService,
    private readonly userService: UserService,
    private readonly cacheService: CacheService,
  ) {}
}
```

## Connect RPC Integration

Integrate Connect RPC within the NestJS framework:

### RPC Module

```typescript
// src/rpc/rpc.module.ts
import { Module } from '@nestjs/common';
import { RpcService } from './rpc.service';
import { RpcController } from './rpc.controller';
import { CounterHandler } from './handlers/counter.handler';
import { CounterModule } from '../modules/counter/counter.module';

@Module({
  imports: [CounterModule],
  controllers: [RpcController],
  providers: [RpcService, CounterHandler],
})
export class RpcModule {}
```

### RPC Service

```typescript
// src/rpc/rpc.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createConnectHandler } from '@connectrpc/connect-node';
import { CounterService } from '../modules/counter/counter.service';
import { CounterHandler } from './handlers/counter.handler';

@Injectable()
export class RpcService implements OnModuleInit {
  constructor(
    private readonly counterService: CounterService,
    private readonly counterHandler: CounterHandler,
  ) {}

  onModuleInit() {
    // Initialize Connect RPC handlers
  }

  getHandler() {
    return createConnectHandler({
      routes: (router) => {
        router.service(this.counterHandler);
        return router;
      },
    });
  }
}
```

### RPC Controller

```typescript
// src/rpc/rpc.controller.ts
import { Controller, Post, All, Req } from '@nestjs/common';
import { Request } from 'express';
import { RpcService } from './rpc.service';

@Controller()
export class RpcController {
  constructor(private readonly rpcService: RpcService) {}

  @All('*')
  handleRpc(@Req() req: Request) {
    const handler = this.rpcService.getHandler();
    return handler(req, req.res);
  }
}
```

## Service Implementation

Implement business logic in services:

### Basic Service

```typescript
// src/modules/counter/counter.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CounterService {
  private readonly logger = new Logger(CounterService.name);
  private counter = { id: 1n, value: 0n, label: 'default' };

  async getCounter() {
    this.logger.debug('Getting counter');
    return this.counter;
  }

  async incrementCounter(delta: bigint) {
    this.counter.value += delta;
    this.logger.log(`Counter incremented by ${delta}`);
    return this.counter;
  }

  async decrementCounter(delta: bigint) {
    this.counter.value -= delta;
    this.logger.log(`Counter decremented by ${delta}`);
    return this.counter;
  }

  async resetCounter() {
    this.counter.value = 0n;
    this.logger.log('Counter reset');
    return this.counter;
  }
}
```

### Service with DTOs

```typescript
// src/modules/counter/dto/increment-counter.dto.ts
import { IsBigInt, IsOptional, IsString } from 'class-validator';

export class IncrementCounterDto {
  @IsBigInt()
  delta: bigint;

  @IsOptional()
  @IsString()
  label?: string;
}
```

## Controllers

Controllers handle incoming requests:

### Basic Controller

```typescript
// src/modules/counter/counter.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CounterService } from './counter.service';
import { IncrementCounterDto } from './dto/increment-counter.dto';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get()
  async getCounter() {
    return this.counterService.getCounter();
  }

  @Post('increment')
  async increment(@Body() dto: IncrementCounterDto) {
    return this.counterService.incrementCounter(dto.delta);
  }
}
```

## Guards

Implement authorization and authentication:

### Auth Guard

```typescript
// src/common/guards/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    return !!token && this.validateToken(token);
  }

  private validateToken(token: string): boolean {
    // Implement token validation
    return true;
  }
}
```

### Roles Guard

```typescript
// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return requiredRoles.includes(user?.role);
  }
}
```

## Interceptors

Transform requests and responses:

### Logging Interceptor

```typescript
// src/common/interceptors/logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        this.logger.log(`${method} ${url} ${response.statusCode} - ${Date.now() - now}ms`);
      }),
    );
  }
}
```

### Transform Interceptor

```typescript
// src/common/interceptors/transform.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({ data })),
    );
  }
}
```

## Pipes

Validate and transform data:

### Validation Pipe

```typescript
// src/common/pipes/validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

## Middleware

Add request processing logic:

### Logging Middleware

```typescript// src/middleware/logging.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - start;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength || 0} - ${responseTime}ms ${ip} ${userAgent}`,
      );
    });

    next();
  }
}
```

## Exception Handling

Handle errors globally:

### Exception Filter

```typescript
// src/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    this.logger.error(
      `Exception: ${JSON.stringify(message)}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
```

## Testing

Comprehensive testing ensures reliability:

### Unit Testing

```typescript
// test/unit/counter.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CounterService } from '../../src/modules/counter/counter.service';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CounterService],
    }).compile();

    service = module.get<CounterService>(CounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return initial counter value', async () => {
    const counter = await service.getCounter();
    expect(counter.value).toBe(0n);
  });

  it('should increment counter', async () => {
    const counter = await service.incrementCounter(5n);
    expect(counter.value).toBe(5n);
  });
});
```

### E2E Testing

```typescript
// test/e2e/counter.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('CounterController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET counter', () => {
    return request(app.getHttpServer())
      .get('/counter')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('value');
      });
  });
});
```

## Database Integration

Connect to databases using NestJS modules:

### TypeORM Integration

```bash
# Install TypeORM
bun add @nestjs/typeorm typeorm pg
```

```typescript
// src/app.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
```

## Authentication

Implement authentication:

### JWT Auth

```bash
# Install JWT packages
bun add @nestjs/passport passport passport-jwt @nestjs/jwt
```

```typescript
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

## Logging

Configure logging:

### Custom Logger

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
  await app.listen(3000);
}
bootstrap();
```

## OpenAPI Documentation

Generate API documentation:

```bash
# Install Swagger packages
bun add @nestjs/swagger swagger-ui-express
```

```typescript
// src/main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Counter API')
  .setDescription('The Counter API description')
  .setVersion('1.0')
  .addTag('counter')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

## Docker Deployment

Deploy using Docker:

```dockerfile
# Dockerfile
FROM oven/bun:1.1 AS builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1.1
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["bun", "run", "start:prod"]
```

## Kubernetes Deployment

Deploy to Kubernetes:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nestjs-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nestjs-backend
  template:
    metadata:
      labels:
        app: nestjs-backend
    spec:
      containers:
      - name: server
        image: your-registry/nestjs-backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          limits:
            memory: "512Mi"
            cpu: "1000m"
```

## Performance Tuning

Optimize performance:

### Caching

```typescript
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60000,
      max: 100,
    }),
  ],
})
export class AppModule {}
```

### Compression

```typescript
const app = await NestFactory.create(AppModule, {
  cors: true,
});
app.use(compression());
```

## Monitoring

Add monitoring:

### Health Checks

```typescript
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
})
export class AppModule {}
```

## Troubleshooting

Common issues:

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules dist
bun install
```

## Best Practices

Follow NestJS best practices:

- Use services for business logic
- Keep controllers thin
- Use DTOs for validation
- Implement proper error handling
- Write comprehensive tests
- Use environment configuration
- Enable CORS properly

## Migration Guide

Moving from Express to Fastify:

1. Install `@nestjs/platform-fastify`
2. Update `main.ts` to use Fastify adapter
3. Review middleware compatibility
4. Test all endpoints

## Comparison with Vanilla

| Aspect | NestJS + Fastify | Vanilla |
|--------|------------------|---------|
| Setup Time | Faster | Slower |
| Dependencies | More | Fewer |
| Structure | Opinionated | Flexible |
| DI | Built-in | Manual |
| Testing | Utilities | Manual |

## Further Reading

- [NestJS Documentation](https://docs.nestjs.com/)
- [Fastify Documentation](https://www.fastify.io/)
- [Connect RPC Documentation](https://connectrpc.com/)
- [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction)

---

*Last updated: March 2026*

# Connect RPC Next.js Frontend

A modern, production-ready web application built with [Next.js](https://nextjs.org/) that demonstrates how to consume Connect RPC services in a frontend environment. This frontend showcases best practices for type-safe API communication, responsive UI design, and scalable React application architecture.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)
- [Communication with Backend](#communication-with-backend)
- [Generated Client Code](#generated-client-code)
- [Creating API Clients](#creating-api-clients)
- [Making RPC Calls](#making-rpc-calls)
- [Server Components](#server-components)
- [Client Components](#client-components)
- [State Management](#state-management)
- [Error Handling](#error-handling)
- [Loading States](#loading-states)
- [Form Handling](#form-handling)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [Accessibility](#accessibility)
- [Internationalization](#internationalization)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Further Reading](#further-reading)

## Overview

This frontend application serves as a comprehensive demonstration of integrating Connect RPC with a modern React-based web application. It communicates with both the NestJS Fastify and Vanilla Node.js/Bun backends, providing a unified interface for interacting with the Counter service and other potential services defined in the Protocol Buffer definitions.

The application is built using Next.js 15+ with the App Router, leveraging React Server Components (RSC) for efficient initial page loads and client-side interactivity for dynamic user interactions. All API communication maintains end-to-end type safety, from the Protocol Buffer definitions through the generated TypeScript code to the React components consuming the services.

## Features

This frontend application includes numerous features that demonstrate modern web development best practices:

### Core Features

- **Next.js 15+ Integration**: Utilizes the latest Next.js features including Server Components, App Router, and Server Actions for optimal performance and developer experience.
- **Connect RPC Client**: Implements type-safe API communication using `@connectrpc/connect` and `@connectrpc/connect-web` packages, ensuring compile-time type safety for all service calls.
- **TypeScript Throughout**: Fully typed codebase from API clients to UI components, with strict TypeScript configuration for maximum code quality.
- **Tailwind CSS Styling**: Modern utility-first CSS framework for rapid, responsive, and maintainable styling with built-in dark mode support.
- **Dual Backend Support**: Seamlessly switches between NestJS Fastify and Vanilla Node.js/Bun backends, demonstrating API interoperability.
- **Real-time Updates**: Implements streaming RPC support for real-time data updates using server-sent events through Connect's streaming capabilities.

### Development Features

- **Hot Module Replacement**: Next.js fast refresh provides instant feedback during development.
- **Type Checking**: Integrated TypeScript checking with IDE support.
- **Code Formatting**: Biome formatter ensures consistent code style.
- **Linting**: Biome linter catches potential issues early.
- **Environment Configuration**: Flexible environment-based configuration for different deployment scenarios.

### UI/UX Features

- **Responsive Design**: Mobile-first approach with responsive breakpoints.
- **Loading States**: Skeleton loaders and loading indicators for async operations.
- **Error Boundaries**: Graceful error handling with user-friendly messages.
- **Toast Notifications**: User feedback for successful and failed operations.
- **Accessibility**: ARIA labels and keyboard navigation support.

## Prerequisites

Before setting up the frontend application, ensure your development environment meets the following requirements:

### Required Software

- **Bun** (version 1.1 or later): Fast JavaScript runtime and package manager.
  - Verify installation: `bun --version`
  - Installation: Visit [bun.sh](https://bun.sh/) for platform-specific instructions.

- **Node.js** (version 18 or later): Alternative runtime if Bun is not available.
  - Verify installation: `node --version`
  - Recommended: Use nvm (Node Version Manager) for managing Node.js versions.

- **Git**: Version control system for cloning and managing the repository.
  - Verify installation: `git --version`

### Generated Proto Code

The frontend requires generated TypeScript code from Protocol Buffer definitions. Before running the frontend:

1. Ensure you have [Buf](https://buf.build/install) installed (version 1.20 or later).
2. From the project root, run `buf generate` to generate the TypeScript client stubs.
3. Verify generated files exist in `src/shared/connectrpc/clients/`.

### Development Tools (Recommended)

- **Visual Studio Code**: Primary recommended IDE with TypeScript and Prettier extensions.
- **Chrome DevTools**: Browser developer tools for debugging.
- **Postman** or **curl**: For testing API endpoints directly.

### System Requirements

- **Operating System**: macOS, Linux, or Windows (with WSL2 recommended).
- **Memory**: Minimum 4GB RAM (8GB recommended for optimal performance).
- **Disk Space**: At least 500MB free space for dependencies and builds.
- **Network**: Internet connection for downloading dependencies.

## Installation

Follow these steps to install all required dependencies:

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
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

The installation process will:
- Create a `node_modules` directory with all required packages.
- Generate the `bun.lockb` or `package-lock.json` lock file.
- Validate peer dependencies and resolve any conflicts.

### Step 3: Verify Installation

```bash
# List installed packages (optional)
bun ls

# Check for outdated packages (optional)
bun outdated
```

### Step 4: Environment Setup

Copy the example environment file and configure it for your environment:

```bash
# Copy example environment file
cp .env.example .env.local
```

Edit `.env.local` with your backend URLs (see [Environment Variables](#environment-variables) section).

### Step 5: Generate Proto Code (If Not Already Done)

From the project root directory:

```bash
# Navigate to project root
cd ..

# Generate TypeScript code from proto definitions
buf generate
```

## Project Structure

The frontend project follows a well-organized structure that promotes maintainability and scalability:

```
frontend/
├── public/                          # Static assets
│   ├── fonts/                       # Custom fonts
│   ├── images/                      # Static images and logos
│   └── favicon.ico                  # Site favicon
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx              # Root layout component
│   │   ├── globals.css             # Global CSS styles
│   │   ├── page.tsx                # Home page (Server Component)
│   │   ├── loading.tsx             # Global loading state
│   │   ├── error.tsx               # Global error boundary
│   │   ├── not-found.tsx           # 404 page
│   │   ├── api/                    # API routes
│   │   │   └── [...path]/          # Catch-all API routes
│   │   │       └── route.ts        # Server-side RPC handler
│   │   └── [delta]/                # Dynamic route example
│   │       └── page.tsx            # Delta page (Client Component)
│   ├── components/                  # React components
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── Button.tsx         # Button component
│   │   │   ├── Input.tsx          # Input component
│   │   │   ├── Card.tsx           # Card container
│   │   │   ├── Skeleton.tsx       # Loading skeleton
│   │   │   ├── Toast.tsx          # Toast notification
│   │   │   └── ErrorBoundary.tsx  # Error boundary component
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx         # Site header
│   │   │   ├── Footer.tsx         # Site footer
│   │   │   └── Sidebar.tsx        # Sidebar navigation
│   │   ├── counter/               # Counter-specific components
│   │   │   ├── CounterDisplay.tsx # Counter value display
│   │   │   ├── CounterControls.tsx # Increment/decrement buttons
│   │   │   └── CounterForm.tsx    # Counter update form
│   │   └── providers/             # React context providers
│   │       ├── ClientProvider.tsx # Client-side providers
│   │       └── ToastProvider.tsx  # Toast notification context
│   ├── shared/                     # Shared code and utilities
│   │   ├── connectrpc/           # Connect RPC configuration
│   │   │   ├── transports/       # Transport configurations
│   │   │   │   ├── client.ts    # Browser client transport
│   │   │   │   └── server.ts    # Server transport helper
│   │   │   ├── clients/         # Generated service clients
│   │   │   │   ├── counter/     # Counter service client
│   │   │   │   └── index.ts     # Client exports
│   │   │   └── index.ts         # Connect RPC exports
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useCounter.ts    # Counter service hook
│   │   │   ├── useConnectRPC.ts # Generic RPC hook
│   │   │   └── useDebounce.ts   # Debounce utility hook
│   │   ├── utils/               # Utility functions
│   │   │   ├── format.ts        # Number formatting
│   │   │   ├── validation.ts    # Form validation
│   │   │   └── helpers.ts       # General helpers
│   │   └── constants/           # Application constants
│   │       ├── config.ts        # Configuration values
│   │       └── routes.ts        # Route definitions
│   ├── lib/                      # Library configurations
│   │   ├── client.ts            # API client initialization
│   │   ├── transports.ts        # Transport configurations
│   │   └── registry.ts          # Service registry
│   └── types/                    # TypeScript type definitions
│       ├── api.d.ts             # API type definitions
│       ├── component.d.ts       # Component props types
│       └── next.d.ts            # Next.js type extensions
├── test/                         # Test files
│   ├── unit/                     # Unit tests
│   │   ├── components/         # Component tests
│   │   ├── hooks/              # Hook tests
│   │   └── utils/              # Utility tests
│   ├── integration/             # Integration tests
│   │   └── api/                # API integration tests
│   └── e2e/                     # End-to-end tests
│       └── pages/              # Page flow tests
├── .env.example                # Example environment variables
├── .env.local                  # Local environment (git-ignored)
├── biome.jsonc                 # Biome formatter/linter config
├── next.config.ts              # Next.js configuration
├── postcss.config.mjs         # PostCSS/Tailwind config
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

### Directory Explanations

#### `src/app/` - Next.js App Router

The App Router is the modern approach to routing in Next.js, replacing the Pages Router. Each file in this directory represents a route:

- `layout.tsx`: Defines the root layout shared across all pages, including HTML structure, fonts, and global providers.
- `page.tsx`: The home page, implemented as a Server Component for optimal initial load performance.
- `loading.tsx`: React Suspense boundary showing loading UI while async operations complete.
- `error.tsx`: Error boundary for catching and displaying runtime errors.
- `not-found.tsx`: Custom 404 page when routes aren't matched.
- `[delta]/page.tsx`: Dynamic route example showing how to handle URL parameters.

#### `src/components/` - React Components

Components are organized by purpose:

- `ui/`: Generic, reusable components that can be used across the application. These follow atomic design principles.
- `layout/`: Components that define the page structure (header, footer, sidebar).
- `counter/`: Feature-specific components for the Counter service.
- `providers/`: React Context providers for application-wide state.

#### `src/shared/connectrpc/` - Connect RPC Integration

This directory contains all Connect RPC-related code:

- `transports/`: Transport layer configurations for connecting to backends.
- `clients/`: Generated TypeScript client code from Protocol Buffer definitions.
- `index.ts`: Central export point for all Connect RPC types and utilities.

#### `src/shared/hooks/` - Custom React Hooks

Custom hooks encapsulate reusable stateful logic:

- `useCounter.ts`: Hook for interacting with the Counter service.
- `useConnectRPC.ts`: Generic hook for making RPC calls with error handling.
- `useDebounce.ts`: Utility hook for debouncing values.

## Running the Development Server

Start the Next.js development server with hot reload:

```bash
# From the frontend directory
cd frontend

# Using Bun (recommended)
bun run dev

# Using npm
npm run dev

# Using yarn
yarn dev
```

The development server will start on `http://localhost:3002` by default (port 3002 to avoid conflicts with backend services on ports 3000 and 3001).

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with HMR |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run Biome linter |
| `bun run format` | Format code with Biome |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run test` | Run tests |
| `bun run test:watch` | Run tests in watch mode |

### Development Server Options

You can customize the development server behavior with environment variables:

```bash
# Custom port
PORT=3005 bun run dev

# Custom hostname
HOST=0.0.0.0 bun run dev

# Enable verbose logging
DEBUG=* bun run dev
```

## Building for Production

Create an optimized production build:

```bash
# Build the application
bun run build

# Start the production server
bun run start

# Or run both in sequence
bun run build && bun run start
```

### Build Output

The build process creates:

- `.next/`: Next.js build output directory
  - `app/`: Server components and static pages
  - `static/`: Static assets (CSS, JavaScript, images)
  - `chunks/`: Code-split JavaScript bundles
  - `BUNSHOT/`: React server components payload (if applicable)

### Analyze Bundle Size

To analyze the bundle size:

```bash
# Install bundle analyzer (one-time)
bun add -D @next/bundle-analyzer

# Run with analyzer
ANALYZE=true bun run build
```

## Communication with Backend

The frontend communicates with Connect RPC backends using the Connect protocol over HTTP. This section explains the communication architecture and how to configure it.

### Communication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Browser)                      │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │ React        │───▶│ Connect RPC  │───▶│ HTTP Client   │  │
│  │ Components   │    │ Client       │    │ (fetch/XHR)   │  │
│  └─────────────┘    └──────────────┘    └───────┬───────┘  │
└───────────────────────────────────────────────┼────────────┘
                                                │
                        ┌────────────────────────┴────────────┐
                        │         HTTP/HTTPS                   │
                        │    (Connect Protocol over HTTP)      │
                        └────────────────────────┬────────────┘
                                                 │
        ┌────────────────────────────────────────┼────────────┐
        │                                        │            │
        ▼                                        ▼            ▼
┌───────────────┐                      ┌─────────────┐  ┌─────────────┐
│ NestJS        │                      │ Vanilla      │  │ API Route   │
│ Fastify       │                      │ Node.js/Bun  │  │ (Server)    │
│ Backend       │                      │ Backend      │  │             │
│ :3000         │                      │ :3001        │  │ (optional)  │
└───────────────┘                      └─────────────┘  └─────────────┘
```

### Transport Configuration

The frontend uses `@connectrpc/connect-web` for browser-based RPC calls. The transport is configured in `src/shared/connectrpc/transports/client.ts`:

```typescript
import { createConnectTransport } from "@connectrpc/connect-web";

// Transport for browser environment
export const browserTransport = createConnectTransport({
  baseUrl: process.env.NEXT_PUBLIC_API_URL_NESTJS || "http://localhost:3000",
  // Optional: HTTP/2 support
  http2Versions: ["2"],
  // Optional: request timeout
  timeoutMs: 30000,
  // Optional: credentials mode
  credentials: "include",
});
```

### Server-Side Transport

For Server Components and API routes, use the Node.js transport:

```typescript
import { createConnectTransport } from "@connectrpc/connect-node";

export const serverTransport = createConnectTransport({
  baseUrl: process.env.NEXT_PUBLIC_API_URL_NESTJS || "http://localhost:3000",
  httpVersion: "2",
});
```

## Generated Client Code

When you run `buf generate`, TypeScript client code is generated in `src/shared/connectrpc/clients/`. This code includes:

### Generated Files Structure

For each service defined in your `.proto` files, the generator creates:

```
clients/
├── counter/
│   ├── v1alpha/
│   │   ├── counter.pb.ts      # Protobuf message types
│   │   ├── counter.connect.ts # Connect RPC client/server stubs
│   │   └── index.ts          # Barrel exports
│   └── index.ts
└── index.ts                  # Service exports
```

### Generated Types

- **Message Types**: TypeScript interfaces/classes representing protobuf messages.
- **Service Clients**: Classes with methods for each RPC defined in the service.
- **Service Implementations**: Abstract classes for implementing the service on the server.

## Creating API Clients

Initialize the Connect RPC client with the appropriate transport:

### For Client Components (Browser)

```typescript
// src/lib/client.ts
import { CounterService } from "@/shared/connectrpc/clients/counter/v1alpha/CounterService_connect";
import { browserTransport } from "@/shared/connectrpc/transports/client";

export function createClient() {
  return new CounterService(browserTransport);
}

// Singleton client for the application
export const counterClient = createClient();
```

### For Server Components

```typescript
// src/lib/server-client.ts
import { CounterService } from "@/shared/connectrpc/clients/counter/v1alpha/CounterService_connect";
import { serverTransport } from "@/shared/connectrpc/transports/server";

export function createServerClient() {
  return new CounterService(serverTransport);
}
```

## Making RPC Calls

Once you have a client instance, you can make RPC calls:

### Unary RPC (Request-Response)

```typescript
import { counterClient } from "@/lib/client";
import { GetCounterRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";

async function getCounter() {
  const request = new GetCounterRequest({
    requestId: "unique-request-id",
  });

  const response = await counterClient.getCounter(request);
  console.log("Counter value:", response.value);
}
```

### Server Streaming RPC

```typescript
import { counterClient } from "@/lib/client";
import { StreamCounterRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";

async function streamCounter() {
  const request = new StreamCounterRequest({
    filter: "active",
    startValue: 0n,
  });

  const stream = counterClient.streamCounter(request);

  for await (const response of stream) {
    console.log("Stream update:", response.value);
  }
}
```

### Client Streaming RPC

```typescript
import { counterClient } from "@/lib/client";
import { CounterUpdateRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";

async function updateCounterIncremental() {
  const stream = counterClient.updateCounter();

  // Send multiple updates
  await stream.send(new CounterUpdateRequest({ delta: 1n }));
  await stream.send(new CounterUpdateRequest({ delta: 2n }));
  await stream.send(new CounterUpdateRequest({ delta: 3n }));

  const response = await stream.close();
  console.log("Final value:", response.finalValue);
}
```

### Bidirectional Streaming RPC

```typescript
import { counterClient } from "@/lib/client";
import { ChatRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";

async function chat() {
  const stream = counterClient.chat();

  // Send messages
  stream.send(new ChatRequest({ userId: "user1", message: "Hello" }));
  stream.send(new ChatRequest({ userId: "user1", message: "How are you?" }));

  // Receive responses
  for await (const response of stream) {
    console.log(`${response.userId}: ${response.message}`);
  }
}
```

## Server Components

Server Components run on the server and can directly access backend services without exposing credentials to the client:

### Basic Server Component

```typescript
// src/app/page.tsx
import { createServerClient } from "@/lib/server-client";
import { GetCounterRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";

export default async function HomePage() {
  const client = createServerClient();
  const request = new GetCounterRequest({});

  const response = await client.getCounter(request);

  return (
    <main>
      <h1>Counter Demo</h1>
      <p>Current value: {response.value.toString()}</p>
    </main>
  );
}
```

### Server Component with Error Handling

```typescript
// src/app/page.tsx
import { createServerClient } from "@/lib/server-client";
import { GetCounterRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";
import { ConnectError } from "@connectrpc/connect";

export default async function HomePage() {
  try {
    const client = createServerClient();
    const request = new GetCounterRequest({});

    const response = await client.getCounter(request);

    return (
      <main>
        <h1>Counter Demo</h1>
        <p>Current value: {response.value.toString()}</p>
      </main>
    );
  } catch (error) {
    if (error instanceof ConnectError) {
      return (
        <main>
          <h1>Error</h1>
          <p>Failed to fetch counter: {error.message}</p>
        </main>
      );
    }
    throw error;
  }
}
```

## Client Components

Client Components run in the browser and can use hooks for state management and interactivity:

### Basic Client Component

```typescript
// src/components/counter/CounterDisplay.tsx
"use client";

import { useState, useEffect } from "react";
import { counterClient } from "@/lib/client";
import { GetCounterRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";

export function CounterDisplay() {
  const [value, setValue] = useState<bigint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCounter() {
      try {
        setLoading(true);
        const request = new GetCounterRequest({});
        const response = await counterClient.getCounter(request);
        setValue(response.value);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchCounter();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Counter: {value?.toString()}</div>;
}
```

### Interactive Client Component

```typescript
// src/components/counter/CounterControls.tsx
"use client";

import { useState } from "react";
import { counterClient } from "@/lib/client";
import { IncrementCounterRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";

export function CounterControls() {
  const [incrementing, setIncrementing] = useState(false);

  async function handleIncrement() {
    setIncrementing(true);
    try {
      const request = new IncrementCounterRequest({ delta: 1n });
      await counterClient.incrementCounter(request);
      // Trigger refresh of counter display
      window.location.reload();
    } catch (error) {
      console.error("Failed to increment:", error);
    } finally {
      setIncrementing(false);
    }
  }

  return (
    <button onClick={handleIncrement} disabled={incrementing}>
      {incrementing ? "Incrementing..." : "Increment"}
    </button>
  );
}
```

## State Management

This section covers various approaches to state management in the frontend:

### Local Component State

Use React's built-in `useState` and `useReducer` for component-local state:

```typescript
import { useState, useReducer } from "react";

// Simple state
const [count, setCount] = useState(0);

// Complex state with reducer
type State = {
  value: bigint;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: bigint }
  | { type: "FETCH_ERROR"; payload: string };

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, value: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
```

### React Context for Global State

Use Context for state that needs to be accessible across multiple components:

```typescript
// src/components/providers/AppProvider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  backend: "nestjs" | "vanilla";
  setBackend: (backend: "nestjs" | "vanilla") => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [backend, setBackend] = useState<"nestjs" | "vanilla">("nestjs");

  return (
    <AppContext.Provider value={{ backend, setBackend }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
```

### TanStack Query for Server State

For managing server state with caching, refetching, and synchronization, use TanStack Query:

```typescript
// src/shared/hooks/useCounterQuery.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { counterClient } from "@/lib/client";
import { GetCounterRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";

export function useCounter() {
  const queryClient = useQueryClient();

  // Query for fetching counter
  const query = useQuery({
    queryKey: ["counter"],
    queryFn: async () => {
      const request = new GetCounterRequest({});
      const response = await counterClient.getCounter(request);
      return response.value;
    },
  });

  // Mutation for updating counter
  const mutation = useMutation({
    mutationFn: async (delta: bigint) => {
      const request = new IncrementCounterRequest({ delta });
      return counterClient.incrementCounter(request);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["counter"] });
    },
  });

  return {
    counter: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    increment: mutation.mutate,
    isIncrementing: mutation.isPending,
  };
}
```

### SWR for Data Fetching

Alternatively, use SWR for simpler data fetching with caching:

```typescript
// src/shared/hooks/useCounterSWR.ts
import useSWR from "swr";
import { counterClient } from "@/lib/client";
import { GetCounterRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";

const fetcher = async () => {
  const request = new GetCounterRequest({});
  const response = await counterClient.getCounter(request);
  return response.value;
};

export function useCounterSWR() {
  const { data, error, isLoading, mutate } = useSWR("counter", fetcher, {
    refreshInterval: 5000, // Refetch every 5 seconds
    revalidateOnFocus: true,
  });

  return {
    counter: data,
    isLoading,
    isError: error,
    mutate,
  };
}
```

## Error Handling

Proper error handling ensures a good user experience:

### Error Boundary Component

```typescript
// src/components/ui/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Optionally log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-container">
            <h2>Something went wrong</h2>
            <p>{this.state.error?.message}</p>
            <button onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

### Using ConnectError

```typescript
import { ConnectError } from "@connectrpc/connect";

function handleRpcError(error: unknown) {
  if (error instanceof ConnectError) {
    switch (error.code) {
      case "not_found":
        return "The requested resource was not found";
      case "permission_denied":
        return "You don't have permission to perform this action";
      case "unavailable":
        return "The service is currently unavailable";
      default:
        return error.message;
    }
  }
  return "An unexpected error occurred";
}
```

### Global Error Handler

```typescript
// src/app/global-error.tsx
"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
```

## Loading States

Provide visual feedback during async operations:

### Skeleton Loader

```typescript
// src/components/ui/Skeleton.tsx
export function CounterSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-24"></div>
    </div>
  );
}

// Usage in component
function CounterDisplay() {
  const { counter, isLoading } = useCounter();

  if (isLoading) return <CounterSkeleton />;

  return <div>Value: {counter?.toString()}</div>;
}
```

### Suspense Boundary

```typescript
// src/app/page.tsx
import { Suspense } from "react";
import { CounterDisplay } from "@/components/counter/CounterDisplay";
import { CounterSkeleton } from "@/components/ui/Skeleton";

export default function Page() {
  return (
    <Suspense fallback={<CounterSkeleton />}>
      <CounterDisplay />
    </Suspense>
  );
}
```

### Progress Indicator

```typescript
// Linear progress bar
function LoadingBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200 rounded">
      <div
        className="bg-blue-600 rounded"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
```

## Form Handling

Handle user input with proper validation and typing:

### Basic Form with React Hook Form

```typescript
// src/components/counter/CounterForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { counterClient } from "@/lib/client";
import { UpdateCounterRequest } from "@/shared/connectrpc/clients/counter/v1alpha/counter_pb";

type FormData = {
  delta: number;
};

export function CounterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const request = new UpdateCounterRequest({
      delta: BigInt(data.delta),
    });
    await counterClient.updateCounter(request);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        {...register("delta", {
          required: "Delta is required",
          min: { value: 1, message: "Minimum value is 1" },
          max: { value: 100, message: "Maximum value is 100" },
        })}
      />
      {errors.delta && <span>{errors.delta.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Counter"}
      </button>
    </form>
  );
}
```

### Form Validation Patterns

```typescript
// Validation helper functions
const validators = {
  required: (message = "This field is required") => ({
    required: message,
  }),

  minLength: (min: number, message?: string) => ({
    minLength: {
      value: min,
      message: message || `Minimum length is ${min} characters`,
    },
  }),

  pattern: (regex: RegExp, message: string) => ({
    pattern: {
      value: regex,
      message,
    },
  }),

  validate: (fn: (value: unknown) => boolean | string) => ({
    validate: fn,
  }),
};
```

## Authentication

Implement authentication for protected routes:

### Authentication Context

```typescript
// src/components/providers/AuthProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { counterClient } from "@/lib/client";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      // Implement session check logic
      // This might call an auth service or check cookies
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    // Implement login logic
    setUser({ id: "1", email, name: "User" });
  }

  async function logout() {
    // Implement logout logic
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```

### Protected Route Wrapper

```typescript
// src/components/auth/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
}
```

## Environment Variables

Configure your application using environment variables:

### Available Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL_NESTJS` | NestJS backend URL | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL_VANILLA` | Vanilla backend URL | `http://localhost:3001` |
| `NEXT_PUBLIC_APP_URL` | Frontend URL | `http://localhost:3002` |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` |

### Environment Files

```
.env                 # Defaults for all environments (committed)
.env.local           # Local development (git-ignored)
.env.development     # Development-specific (git-ignored)
.env.production      # Production-specific (git-ignored)
```

### Using Environment Variables

```typescript
// Client-side (public)
const apiUrl = process.env.NEXT_PUBLIC_API_URL_NESTJS;

// Server-side (private)
const secretKey = process.env.INTERNAL_API_KEY; // Only available server-side
```

## Testing

Comprehensive testing ensures code quality:

### Unit Testing with Jest

```typescript
// test/unit/components/CounterDisplay.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { CounterDisplay } from "@/components/counter/CounterDisplay";
import { counterClient } from "@/lib/client";

// Mock the client
jest.mock("@/lib/client", () => ({
  counterClient: {
    getCounter: jest.fn(),
  },
}));

describe("CounterDisplay", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state initially", () => {
    (counterClient.getCounter as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<CounterDisplay />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays counter value on success", async () => {
    (counterClient.getCounter as jest.Mock).mockResolvedValue({
      value: 42n,
    });

    render(<CounterDisplay />);

    await waitFor(() => {
      expect(screen.getByText("Counter: 42")).toBeInTheDocument();
    });
  });
});
```

### Integration Testing

```typescript
// test/integration/api/counter.test.ts
import { createServerClient } from "@/lib/server-client";

describe("Counter API Integration", () => {
  it("retrieves current counter value", async () => {
    const client = createServerClient();
    const request = new GetCounterRequest({});

    const response = await client.getCounter(request);

    expect(response.value).toBeDefined();
    expect(typeof response.value).toBe("bigint");
  });
});
```

### End-to-End Testing with Playwright

```typescript
// test/e2e/counter.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Counter", () => {
  test("displays initial counter value", async ({ page }) => {
    await page.goto("http://localhost:3002");

    // Wait for counter to load
    await expect(page.locator("text=Counter:")).toBeVisible();
  });

  test("increments counter", async ({ page }) => {
    await page.goto("http://localhost:3002");

    // Click increment button
    await page.click("button:has-text('Increment')");

    // Verify counter updated
    await expect(page.locator("text=Counter:")).toContainText("1");
  });
});
```

### Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:cov

# Run specific test file
bun run test path/to/test

# Run e2e tests
bun run test:e2e
```

## Linting and Formatting

Maintain code quality with Biome:

### Running Linter

```bash
# Check for issues
bun run lint

# Fix auto-fixable issues
bun run lint --write
```

### Running Formatter

```bash
# Format code
bun run format

# Check formatting without changes
bun run format --check
```

### Type Checking

```bash
# Run TypeScript compiler
bun run typecheck
```

## Deployment

Deploy the frontend to various platforms:

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

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
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["bun", "run", "start"]
```

### Build and Run Locally

```bash
# Build
bun run build

# Run production server
bun run start
```

### Environment-Specific Builds

```bash
# Production build
NODE_ENV=production bun run build

# Staging build
NODE_ENV=staging bun run build
```

## Performance Optimization

Optimize your application for speed:

### Code Splitting

```typescript
// Dynamic imports for code splitting
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(
  () => import("@/components/heavy/HeavyComponent"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false, // Disable SSR for client-only components
  }
);
```

### Image Optimization

```typescript
import Image from "next/image";

export function OptimizedImage() {
  return (
    <Image
      src="/image.png"
      alt="Description"
      width={800}
      height={600}
      priority // Load eagerly
    />
  );
}
```

### Memoization

```typescript
import { useMemo, useCallback } from "react";

function ExpensiveComponent({ items }: { items: number[] }) {
  // Memoize expensive computation
  const processedItems = useMemo(
    () => items.map((item) => computeExpensive(item)),
    [items]
  );

  // Memoize callback
  const handleClick = useCallback((id: number) => {
    console.log("Clicked:", id);
  }, []);

  return (
    <ul>
      {processedItems.map((item) => (
        <li key={item.id} onClick={() => handleClick(item.id)}>
          {item.value}
        </li>
      ))}
    </ul>
  );
}
```

### Bundle Analysis

```bash
# Analyze bundle size
ANALYZE=true bun run build
```

## Accessibility

Ensure your application is accessible to all users:

### Semantic HTML

```typescript
// Use semantic elements
function CounterForm() {
  return (
    <form>
      <label htmlFor="delta-input">Delta</label>
      <input
        id="delta-input"
        type="number"
        aria-describedby="delta-help"
      />
      <span id="delta-help" className="help-text">
        Enter a value between 1 and 100
      </span>
      <button type="submit">Update</button>
    </form>
  );
}
```

### Focus Management

```typescript
// Focus trap for modals
import { useEffect, useRef } from "react";

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### ARIA Attributes

```typescript
// Proper ARIA usage
function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <span className="spinner" />
    </div>
  );
}
```

## Internationalization

Support multiple languages:

### Setup i18n

```bash
# Install Next.js i18n package
bun add next-i18next
```

### Translation Files

```json
// public/locales/en/common.json
{
  "counter": {
    "title": "Counter Demo",
    "value": "Current Value",
    "increment": "Increment",
    "decrement": "Decrement"
  }
}
```

```json
// public/locales/zh/common.json
{
  "counter": {
    "title": "计数器演示",
    "value": "当前值",
    "increment": "增加",
    "decrement": "减少"
  }
}
```

### Using Translations

```typescript
// src/app/page.tsx
import { useTranslation } from "next-i18next";

export default function CounterPage() {
  const { t } = useTranslation("counter");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("value")}: {counterValue}</p>
    </main>
  );
}
```

## Troubleshooting

Common issues and solutions:

### Connection Errors

**Problem**: Cannot connect to backend

**Solution**:
1. Verify backend is running: `curl http://localhost:3000/`
2. Check CORS settings on backend
3. Verify `NEXT_PUBLIC_API_URL_*` environment variables
4. Check browser console for CORS errors

### Type Errors

**Problem**: TypeScript errors with generated code

**Solution**:
1. Run `buf generate` to regenerate types
2. Clear `.next` cache: `rm -rf .next`
3. Restart development server

### Build Errors

**Problem**: Production build fails

**Solution**:
1. Clear node_modules and reinstall
2. Delete lock file and reinstall
3. Check for TypeScript errors: `bun run typecheck`

### Memory Issues

**Problem**: Development server crashes with out-of-memory

**Solution**:
1. Increase Node.js memory: `NODE_OPTIONS="--max_old_space_size=4096" bun run dev`
2. Disable parallel builds in next.config.ts

## Best Practices

Follow these best practices for maintainable code:

### Component Design

- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic into custom hooks
- Memoize expensive computations
- Use TypeScript for all components

### State Management

- Use Server Components for data fetching
- Use client state for UI interactions
- Prefer TanStack Query/SWR for server state
- Keep context providers lean

### Performance

- Lazy load heavy components
- Optimize images with next/image
- Use code splitting with dynamic imports
- Minimize client bundles
- Monitor bundle size

### Security

- Validate all user input
- Sanitize data before rendering
- Use HTTPS in production
- Implement proper authentication
- Follow principle of least privilege

### Testing

- Write tests alongside code
- Aim for high coverage on critical paths
- Use integration tests for API interactions
- Include e2e tests for critical user flows

## Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Connect RPC Documentation](https://connectrpc.com/docs/languages/typescript/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Playwright Documentation](https://playwright.dev/)
- [Biome Documentation](https://biomejs.dev/)

---

*Last updated: March 2026*

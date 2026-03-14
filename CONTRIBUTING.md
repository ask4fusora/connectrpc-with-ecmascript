# Contributing Guidelines

Thank you for your interest in contributing to this project!

## Development Environment Setup

### Prerequisites

- [Bun](https://bun.sh/) (preferred) or Node.js
- [Buf CLI](https://buf.build/docs/installation) for proto code generation
- [Task](https://taskfile.dev/installation/) (optional but recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd connectrpc-with-ecmascript
   ```

2. Generate code from proto:
   ```bash
   buf generate
   ```

3. Install dependencies and run projects:
   - **Frontend**: `cd frontend && bun install && bun dev`
   - **Backend (NestJS)**: `cd backend/nestjs-fastify-platform && bun install && bun start:dev`

## Project Structure

- `proto/`: Contains service definitions.
- `backend/`: Server implementations.
- `frontend/`: Client implementations.

## Workflow

1.  **Branching**: Create a feature branch from `main`.
2.  **Linting**: Run `bun lint` (using Biome) before committing.
3.  **Testing**: Ensure all tests pass.
4.  **Pull Requests**: Descriptive PR title and summary of changes.

## Code Standards

-   Use TypeScript for all new code.
-   Follow the existing code style managed by [Biome](https://biomejs.dev/).

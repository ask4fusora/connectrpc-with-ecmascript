# Contributing Guidelines

Thank you for your interest in contributing to this Connect-RPC project!

## Development Environment Setup

### Prerequisites

- [Bun](https://bun.sh/) (version 1.1+)
- [Buf CLI](https://buf.build/docs/installation) (version 1.20+) for proto code generation

### Installation & Running

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd connectrpc-with-ecmascript
   ```

2. Install dependencies (run inside the specific project directories):
   ```bash
   bun install
   ```

3. Generate TypeScript code from `.proto` schemas:
   ```bash
   buf generate
   ```

4. Start the applications:
   - **Frontend**:
     ```bash
     cd frontend
     bun run dev
     ```
   - **Backend (NestJS Fastify)**:
     ```bash
     cd backend/nestjs-fastify-platform
     bun run start
     ```
   - **Backend (Vanilla Node.js/Bun)**:
     ```bash
     cd backend/vanilla
     bun run start
     ```
   _(Note: Do not run both backends simultaneously as they both default to port 4000 to serve the
   frontend requests)._

## Project Structure

- `proto/`: Contains the `.proto` schemas (the single source of truth for the API).
- `backend/`: Contains the dual server implementations (NestJS and Vanilla).
- `frontend/`: Contains the Next.js application, featuring interactive Client Components.

## Workflow

1. **Branching**: Create a feature branch from `main`.
2. **Schema Changes**: If you modify any `.proto` files, you **must** run `buf generate` and commit
   the resulting changes in the respective `src/gen/` directories.
3. **Dual Backend Compatibility**: If modifying the core RPC contract, ensure both the NestJS and
   Vanilla backends are updated to successfully fulfill the new schema.
4. **Linting & Formatting**: Ensure your code conforms to the project's
   [Biome](https://biomejs.dev/) configuration.
5. **Pull Requests**: Provide a descriptive PR title and fill out the provided PR template outlining
   your verification steps.

## Code Standards

- Use strictly typed TypeScript for all new code.
- Avoid `any` types; derive your request and response types directly from the generated Buf
  `ServiceImpl` generic or the `create()` schema functions.
- Ensure all new RPC logic correctly serializes according to the Connect protocol over HTTP/1.1 (for
  browser compatibility).

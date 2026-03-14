# Protocol Buffer Definitions

This directory contains the source-of-truth definitions for our services and messages using [Protocol Buffers](https://protobuf.dev/), also known as protobuf. Protocol Buffers are a language-neutral, platform-neutral, extensible mechanism for serializing structured data – think XML, but smaller, faster, and simpler. You define how you want your data to be structured once, then you can use special generated source code to easily write and read your structured data to and from a variety of data streams and using a variety of languages.

## Table of Contents

- [Overview](#overview)
- [What are Protocol Buffers?](#what-are-protocol-buffers)
- [Why Use Protocol Buffers?](#why-use-protocol-buffers)
- [Directory Structure](#directory-structure)
- [Proto File Syntax](#proto-file-syntax)
  - [Basic Syntax](#basic-syntax)
  - [Message Definitions](#message-definitions)
  - [Field Types](#field-types)
  - [Field Rules](#field-rules)
  - [Enumerations](#enumerations)
  - [Nested Types](#nested-types)
  - [Packages](#packages)
  - [Imports](#imports)
  - [Options](#options)
- [Service Definitions](#service-definitions)
  - [Unary RPCs](#unary-rpcs)
  - [Server Streaming RPCs](#server-streaming-rpcs)
  - [Client Streaming RPCs](#client-streaming-rpcs)
  - [Bidirectional Streaming RPCs](#bidirectional-streaming-rpcs)
- [Well-Known Types](#well-known-types)
  - [Timestamp](#timestamp)
  - [Duration](#duration)
  - [Any](#any)
  - [Struct](#struct)
  - [Wrappers](#wrappers)
  - [Empty](#empty)
- [Advanced Patterns](#advanced-patterns)
  - [Oneofs](#oneofs)
  - [Maps](#maps)
  - [Packed Arrays](#packed-arrays)
  - [Reserved Fields](#reserved-fields)
  - [Default Values](#default-values)
- [Code Generation](#code-generation)
  - [Buf Toolchain](#buf-toolchain)
  - [Generation Process](#generation-process)
  - [Generated Code Types](#generated-code-types)
  - [Custom Plugins](#custom-plugins)
- [Buf Configuration](#buf-configuration)
  - [buf.yaml](#bufyaml)
  - [buf.gen.yaml](#bufgenyaml)
  - [buf.work.yaml](#bufworkyaml)
- [Buf Tooling](#buf-tooling)
  - [Linting](#linting)
  - [Breaking Change Detection](#breaking-change-detection)
  - [Formatting](#formatting)
  - [Dependency Management](#dependency-management)
  - [Workspace Management](#workspace-management)
- [Versioning and Compatibility](#versioning-and-compatibility)
  - [Semantic Versioning](#semantic-versioning)
  - [Breaking Changes](#breaking-changes)
  - [Compatibility Rules](#compatibility-rules)
  - [Deprecation Strategy](#deprecation-strategy)
- [Adding New Services](#adding-new-services)
- [Best Practices](#best-practices)
  - [Naming Conventions](#naming-conventions)
  - [File Organization](#file-organization)
  - [Field Management](#field-management)
  - [Documentation](#documentation)
  - [Testing](#testing)
- [Schema Registry (BSR)](#schema-registry-bsr)
  - [Publishing Modules](#publishing-modules)
  - [Dependency Management](#dependency-management)
  - [Access Control](#access-control)
- [gRPC and Connect RPC](#grpc-and-connect-rpc)
  - [Protocol Comparison](#protocol-comparison)
  - [Transcoding](#transcoding)
  - [Protocol Selection](#protocol-selection)
- [JSON Mapping](#json-mapping)
  - [JSON to Protobuf Mapping](#json-to-protobuf-mapping)
  - [Custom JSON Options](#custom-json-options)
- [Performance Optimization](#performance-optimization)
  - [Serialization Performance](#serialization-performance)
  - [Message Size Optimization](#message-size-optimization)
  - [Schema Design for Performance](#schema-design-for-performance)
- [Security Considerations](#security-considerations)
  - [Input Validation](#input-validation)
  - [Schema Security](#schema-security)
  - [Rate Limiting](#rate-limiting)
- [Testing Strategies](#testing-strategies)
  - [Unit Testing](#unit-testing)
  - [Contract Testing](#contract-testing)
  - [Compatibility Testing](#compatibility-testing)
- [Migration Guide](#migration-guide)
  - [From JSON to Protobuf](#from-json-to-protobuf)
  - [From gRPC to Connect RPC](#from-grpc-to-connect-rpc)
  - [Schema Evolution](#schema-evolution)
- [Troubleshooting](#troubleshooting)
  - [Common Errors](#common-errors)
  - [Debugging Tips](#debugging-tips)
  - [Performance Issues](#performance-issues)
- [Example Projects](#example-projects)
  - [User Service](#user-service)
  - [Order Service](#order-service)
  - [Notification Service](#notification-service)
- [Tooling Integration](#tooling-integration)
  - [IDE Support](#ide-support)
  - [Build Systems](#build-systems)
  - [CI/CD Integration](#cicd-integration)
- [Further Reading](#further-reading)
- [Appendix](#appendix)
  - [Proto3 Language Specification](#proto3-language-specification)
  - [Standard Options](#standard-options)
  - [Glossary](#glossary)

## Overview

In this project, Protocol Buffers serve as the contract between the frontend and backend services, as well as between microservices within the backend architecture. By defining our API contracts in `.proto` files, we ensure strong typing across all services, efficient data serialization, and seamless evolution of our APIs over time.

This documentation provides comprehensive coverage of Protocol Buffers, from basic syntax to advanced patterns, along with the Buf toolchain that simplifies working with protobuf in modern development workflows. Whether you're new to protobuf or looking to deepen your understanding, this guide will help you effectively use Protocol Buffers in your project.

The Protocol Buffer system has been developed by Google and offers significant advantages over traditional data interchange formats like JSON, XML, or YAML. The binary serialization format is more compact and faster to parse, while the schema-based approach provides compile-time type safety and enables powerful code generation tools.

## What are Protocol Buffers?

Protocol Buffers (protobuf) are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data. While similar to JSON or XML in purpose, Protocol Buffers are significantly more compact, faster to parse, and provide strong typing and schema enforcement.

The key components of the Protocol Buffer system include:

**The Interface Definition Language (IDL)**: Protocol Buffers define their schemas using a dedicated language that is designed to be both human-readable and machine-parseable. The `.proto` files serve as the single source of truth for data structures and service definitions.

**The Compiler (protoc)**: The Protocol Buffer compiler reads `.proto` files and generates code in various programming languages. This generated code provides efficient serialization, deserialization, and access to the defined data structures.

**The Runtime Libraries**: Each supported language has a runtime library that handles the actual serialization and deserialization of messages. These libraries are optimized for performance and memory efficiency.

**The Schema Evolution System**: Protocol Buffers are designed to support schema evolution – the ability to change your schema over time without breaking existing clients or servers. This is achieved through careful rules about what changes are backward and forward compatible.

## Why Use Protocol Buffers?

There are several compelling reasons to choose Protocol Buffers for your project's data serialization needs:

**Efficiency**: Protocol Buffers serialize data to a compact binary format that is typically 3-10 times smaller than JSON and 10-20 times faster to serialize and deserialize. This translates to reduced bandwidth usage, faster API responses, and lower infrastructure costs.

**Type Safety**: Unlike JSON, which is essentially schemaless, Protocol Buffers enforce strict typing at compile time. The generated code catches type errors before runtime, reducing bugs and improving developer productivity.

**Language Agnostic**: A single `.proto` definition can generate code for dozens of programming languages. This makes it easy to build polyglot microservices or ensure consistency across client and server code.

**Schema Documentation**: The `.proto` files serve as self-documenting API contracts. They clearly define what fields exist, what types they are, and what they mean – all in a format that's easy to read and understand.

**Strong Tooling**: The Protocol Buffer ecosystem includes powerful tools for linting, code generation, documentation generation, and breaking change detection. The Buf toolchain in particular provides an excellent developer experience.

**Backward/Forward Compatibility**: Protocol Buffers are designed to support schema evolution. You can add new fields, remove old ones, and change field types in carefully controlled ways without breaking existing deployments.

## Directory Structure

The proto directory is organized to support multiple services and versions:

```
proto/
├── buf.yaml                       # Buf configuration (linting, breaking changes)
├── buf.gen.yaml                   # Buf code generation configuration
├── buf.work.yaml                  # Buf workspace configuration (if needed)
├── counter/                       # Counter service
│   └── v1alpha/                   # Version 1 alpha
│       ├── counter.proto          # Counter service and messages
│       └── test.proto             # Test messages
├── user/                         # User service
│   ├── v1/                       # Version 1 (stable)
│   │   ├── user.proto
│   │   └── user.connect.ts (generated)
│   └── v2/                       # Version 2 (newer)
│       ├── user.proto
│       └── user.connect.ts (generated)
├── order/                        # Order service
│   └── v1/
│       ├── order.proto
│       ├── line_item.proto
│       └── order.connect.ts (generated)
├── common/                       # Common/shared types
│   └── v1/
│       ├── pagination.proto      # Pagination messages
│       ├── error.proto           # Error messages
│       └── metadata.proto        # Common metadata
├── google/                       # Google protobuf imports (reference)
│   └── protobuf/
│       ├── timestamp.proto
│       ├── duration.proto
│       ├── empty.proto
│       └── ...
└── README.md                     # This file
```

This structure follows several key organizational principles:

**Service-Based Organization**: Each service gets its own top-level directory, making it easy to locate and work with related proto files.

**Versioned APIs**: Within each service directory, versions are organized as subdirectories (v1, v1alpha, v2, etc.). This supports API versioning strategies and allows for controlled migrations.

**Shared Types**: Common types that are used across multiple services are placed in a dedicated `common/` directory. This avoids duplication and ensures consistency.

**Generated Files**: Generated code (from running `buf generate`) is typically placed in the `src/` directories of the consuming services, not in the proto directory itself.

## Proto File Syntax

This section provides comprehensive coverage of Protocol Buffer syntax, from basic concepts to advanced patterns.

### Basic Syntax

Every proto file begins with a syntax declaration:

```protobuf
// First line must be the syntax declaration
syntax = "proto3";

// Package declaration (recommended)
package myapp.service.v1;

// Optional: File-level options
option java_multiple_files = true;
option go_package = "gen/go/myapp/service/v1;service";
```

The `syntax = "proto3";` declaration is required and must be the first statement in the file. Proto3 is the current major version of Protocol Buffers and simplifies many aspects of proto2.

### Message Definitions

Messages are the primary way to define structured data:

```protobuf
// A simple message
message User {
  string id = 1;
  string name = 2;
  string email = 3;
  int32 age = 4;
  bool active = 5;
}

// Message with all field types
message AllTypes {
  // Numeric types
  double double_field = 1;
  float float_field = 2;
  int64 int64_field = 3;
  uint64 uint64_field = 4;
  int32 int32_field = 5;
  uint32 uint32_field = 6;
  fixed32 fixed32_field = 7;
  fixed64 fixed64_field = 8;
  sint32 sint32_field = 9;
  sint64 sint64_field = 10;
  
  // Other types
  string string_field = 11;
  bytes bytes_field = 12;
  bool bool_field = 13;
  
  // Nested message
  NestedMessage nested = 14;
  
  // Enum
  Status status = 15;
  
  // Repeated (list)
  repeated string tags = 16;
  
  // Map
  map<string, string> metadata = 17;
}

// Nested message definition
message NestedMessage {
  string value = 1;
}

// Enum definition
enum Status {
  STATUS_UNSPECIFIED = 0;
  STATUS_ACTIVE = 1;
  STATUS_INACTIVE = 2;
  STATUS_PENDING = 3;
}
```

### Field Types

Protocol Buffers support a comprehensive set of scalar types:

**Integer Types**:
- `int32`: Signed 32-bit integer, more efficient for small positive numbers
- `int64`: Signed 64-bit integer
- `uint32`: Unsigned 32-bit integer
- `uint64`: Unsigned 64-bit integer
- `sint32`: Signed 32-bit integer, more efficient for negative numbers
- `sint64`: Signed 64-bit integer
- `fixed32`: Unsigned 32-bit integer, always 4 bytes
- `fixed64`: Unsigned 64-bit integer, always 8 bytes
- `sfixed32`: Signed 32-bit integer, always 4 bytes
- `sfixed64`: Signed 64-bit integer, always 8 bytes

**Floating Point Types**:
- `float`: IEEE 754 single-precision floating point
- `double`: IEEE 754 double-precision floating point

**Other Types**:
- `bool`: Boolean value (true or false)
- `string`: UTF-8 or ASCII text string
- `bytes`: Arbitrary sequence of bytes

### Field Rules

Fields can have modifiers that change their behavior:

```protobuf
// Optional field (proto3 default for all fields)
optional string name = 1;

// Repeated field (zero or more values)
repeated string emails = 2;
repeated User friends = 3;

// Map field (associative array)
map<string, Project> projects = 4;
map<int64, string> id_to_name = 5;
```

In proto3, all fields are implicitly optional. The `optional` keyword is still allowed for clarity and to enable explicit presence checking in some languages.

### Enumerations

Enumerations define a set of named values:

```protobuf
enum OrderStatus {
  // Must start with 0
  ORDER_STATUS_UNSPECIFIED = 0;
  ORDER_STATUS_PENDING = 1;
  ORDER_STATUS_PROCESSING = 2;
  ORDER_STATUS_SHIPPED = 3;
  ORDER_STATUS_DELIVERED = 4;
  ORDER_STATUS_CANCELLED = 5;
}

// Enum with aliases (multiple names for same value)
enum AliasStatus {
  option allow_alias = true;
  
  STATUS_UNKNOWN = 0;
  STATUS_ACTIVE = 1;
  STATUS_RUNNING = 1;  // Alias for STATUS_ACTIVE
  STATUS_INACTIVE = 2;
}

// Enum used in message
message Order {
  string id = 1;
  OrderStatus status = 2;
  double total = 3;
}
```

### Nested Types

Messages can contain nested message and enum definitions:

```protobuf
message OuterMessage {
  string outer_field = 1;
  
  // Nested message
  message InnerMessage {
    string inner_field = 1;
  }
  
  // Reference to nested message
  InnerMessage inner = 2;
  
  // Nested enum
  enum InnerEnum {
    VALUE_A = 0;
    VALUE_B = 1;
  }
  
  InnerEnum enum_field = 3;
}

// Nested types can be referenced from outside using OuterMessage.InnerMessage
message Container {
  OuterMessage.InnerMessage inner = 1;
  OuterMessage.InnerEnum enum_value = 2;
}
```

### Packages

Packages help prevent name conflicts between different proto files:

```protobuf
// In user.proto
package myapp.user.v1;

// In order.proto
package myapp.order.v1;

// References to other packages
import "myapp/common/v1/error.proto";

message UserResponse {
  myapp.common.v1.Error error = 1;
  User user = 2;
}
```

### Imports

Imports allow referencing definitions from other proto files:

```protobuf
// Import Google protobuf well-known types
import "google/protobuf/timestamp.proto";
import "google/protobuf/duration.proto";
import "google/protobuf/empty.proto";

// Import from same project
import "myapp/common/v1/pagination.proto";

// Import with prefix (rarely needed)
import public "myapp/shared/v1/shared.proto";
```

### Options

Options customize the behavior of the protocol buffer compiler:

```protobuf
// File-level options
option go_package = "gen/go/myapp/user/v1;user";
option java_package = "com.myapp.user.v1";
option java_multiple_files = true;
option java_outer_classname = "UserProto";
option objc_class_prefix = "UP";

// Message-level options
message User {
  option (my_custom_option) = true;
  
  string id = 1;
}

// Field-level options
message Config {
  string api_key = 1 [(field_option) = "sensitive"];
}

// Custom options (require extension definition)
import "google/protobuf/descriptor.proto";

extend google.protobuf.FieldOptions {
  string field_option = 50000;
}
```

## Service Definitions

Services define RPC endpoints that can be called by clients:

### Unary RPCs

Unary RPCs are the simplest form – a single request receives a single response:

```protobuf
// Counter service with unary RPC
service CounterService {
  // Get current counter value
  rpc GetCounter(GetCounterRequest) returns (GetCounterResponse);
  
  // Increment counter
  rpc IncrementCounter(IncrementCounterRequest) returns (IncrementCounterResponse);
  
  // Reset counter
  rpc ResetCounter(ResetCounterRequest) returns (ResetCounterResponse);
}

message GetCounterRequest {
  // Request ID for tracing
  string request_id = 1;
}

message GetCounterResponse {
  int64 value = 1;
  string request_id = 2;
}

message IncrementCounterRequest {
  int64 delta = 1;
}

message IncrementCounterResponse {
  int64 new_value = 1;
  bool success = 2;
}

message ResetCounterRequest {}

message ResetCounterResponse {
  int64 previous_value = 1;
}
```

### Server Streaming RPCs

Server streaming sends multiple responses to a single request:

```protobuf
service StockService {
  // Stream price updates for a symbol
  rpc StreamPrices(StreamPricesRequest) returns (stream PriceUpdate);
}

message StreamPricesRequest {
  string symbol = 1;
  // Start from timestamp (optional)
  google.protobuf.Timestamp start_time = 2;
}

message PriceUpdate {
  string symbol = 1;
  double price = 2;
  google.protobuf.Timestamp timestamp = 3;
  int64 volume = 4;
}
```

### Client Streaming RPCs

Client streaming sends multiple requests and receives a single response:

```protobuf
service AnalyticsService {
  // Upload multiple events, receive aggregated results
  rpc UploadEvents(stream Event) returns (UploadEventsResponse);
}

message Event {
  string event_type = 1;
  string user_id = 2;
  map<string, string> properties = 3;
  google.protobuf.Timestamp timestamp = 4;
}

message UploadEventsResponse {
  int32 events_received = 1;
  int32 events_processed = 2;
  bool success = 3;
}
```

### Bidirectional Streaming RPCs

Bidirectional streaming allows both client and server to send multiple messages:

```protobuf
service ChatService {
  // Real-time chat between users
  rpc Chat(stream ChatMessage) returns (stream ChatMessage);
}

message ChatMessage {
  string message_id = 1;
  string sender_id = 2;
  string room_id = 3;
  string content = 4;
  google.protobuf.Timestamp sent_at = 5;
}
```

## Well-Known Types

Google provides a set of well-known types that solve common problems:

### Timestamp

Represents a point in time:

```protobuf
import "google/protobuf/timestamp.proto";

message Event {
  string id = 1;
  google.protobuf.Timestamp start_time = 2;
  google.protobuf.Timestamp end_time = 3;
  google.protobuf.Timestamp created_at = 4;
}
```

### Duration

Represents a span of time:

```protobuf
import "google/protobuf/duration.proto";

message Session {
  string id = 1;
  google.protobuf.Timestamp started_at = 2;
  google.protobuf.Duration duration = 3;
}
```

### Any

Holds arbitrary serialized messages:

```protobuf
import "google/protobuf/any.proto";

message ErrorDetail {
  string code = 1;
  string message = 2;
}

message ApiResponse {
  int32 status = 1;
  google.protobuf.Any details = 2;
}
```

### Struct

Holds arbitrary JSON-like values:

```protobuf
import "google/protobuf/struct.proto";

message JsonPayload {
  google.protobuf.Struct data = 1;
  string format_version = 2;
}
```

### Wrappers

Wrapper types for primitive types (allows null values):

```protobuf
import "google/protobuf/wrappers.proto";

message UserProfile {
  string user_id = 1;
  google.protobuf.StringValue display_name = 2;
  google.protobuf.Int32Value age = 3;
  google.protobuf.BoolValue is_active = 4;
}
```

### Empty

Represents an empty message:

```protobuf
import "google/protobuf/empty.proto";

service HealthService {
  rpc Check(google.protobuf.Empty) returns (HealthStatus);
  rpc Watch(google.protobuf.Empty) returns (stream HealthStatus);
}

message HealthStatus {
  bool healthy = 1;
  string service = 2;
}
```

## Advanced Patterns

### Oneofs

Oneofs specify that only one field from a set can be present at a time:

```protobuf
message Result {
  oneof result {
    string message = 1;
    int32 error_code = 2;
    User user_data = 3;
  }
}

// Usage
message Response {
  Result result = 1;
  // Can set result.message, result.error_code, or result.user_data
  // Setting one clears the others
}
```

### Maps

Maps provide associative array functionality:

```protobuf
message UserPreferences {
  map<string, string> settings = 1;
  map<string, int64> counters = 2;
  map<string, User> user_map = 3;
}

// Usage
message GetPreferencesRequest {
  string user_id = 1;
}
```

### Packed Arrays

Packed repeated fields use more efficient encoding:

```protobuf
// All repeated numeric fields are automatically packed in proto3
message Data {
  repeated int32 scores = 1;  // Automatically packed
  repeated string names = 2;  // Not packed (strings)
}

// Explicit packing (proto2, rarely needed in proto3)
message ExplicitPacked {
  repeated int32 values = 1 [packed = true];
}
```

### Reserved Fields

Reserved fields prevent field number/name reuse:

```protobuf
message OldMessage {
  reserved 1, 2, 5 to 10;
  reserved "deprecated_field";
  
  string new_field = 3;
  // Cannot use field numbers 1, 2, 5-10
  // Cannot use field name "deprecated_field"
}
```

### Default Values

Proto3 has specific default values for each type:

| Type | Default Value |
|------|---------------|
| string | Empty string |
| bytes | Empty bytes |
| bool | false |
| numeric types | 0 |
| enums | First enum value (usually unspecified = 0) |
| messages | null (language-dependent) |

## Code Generation

### Buf Toolchain

Buf provides a modern replacement for the protoc CLI:

```bash
# Install Buf
brew install bufbuild/buf/buf
# or
cargo install buf

# Verify installation
buf --version
```

### Generation Process

Running code generation:

```bash
# Generate code for all proto files
buf generate

# Generate for specific path
buf generate path/to/proto

# Generate with specific template
buf generate --template buf.gen.yaml
```

### Generated Code Types

The code generator produces:

**Message Types**: Language-specific classes/structs for each message:

```typescript
// Generated TypeScript
interface User {
  id: string;
  name: string;
  email: string;
}
```

**Service Clients**: Client classes for calling RPCs:

```typescript
// Generated client interface
interface CounterServiceClient {
  getCounter(request: GetCounterRequest): Promise<GetCounterResponse>;
  streamCounter(request: StreamCounterRequest): AsyncIterable<Counter>;
}
```

**Service Servers**: Abstract classes for implementing services:

```typescript
// Generated server interface
abstract class CounterServiceBase {
  abstract getCounter(request: GetCounterRequest): Promise<GetCounterResponse>;
  // ...
}
```

### Custom Plugins

You can create custom code generation plugins:

```yaml
# buf.gen.yaml with custom plugin
version: v1
plugins:
  - plugin: buf.build/protocolbuffers/ts:v1
    out: src/generated
    opt:
      - target=ts
  - plugin: my-custom-plugin
    out: src/custom
    path: path/to/plugin
```

## Buf Configuration

### buf.yaml

The main Buf configuration file:

```yaml
# buf.yaml
version: v1
name: buf.build/myorg/myrepo

lint:
  use:
    - DEFAULT
    - PACKAGE_NO_IMPORT_CYCLE
  except:
    - PACKAGE_VERSION_SUFFIX
  disallow_comment_ignores: true

breaking:
  use:
    - FILE
  except:
    - CUSTOM_OPTION_VALUE_NUMBER

deps:
  - buf.build/googleapis/googleapis
  - buf.build/grpc/grpc

# Organize imports
lint:
  import_path_prefix: github.com/myorg/myrepo
```

### buf.gen.yaml

Code generation configuration:

```yaml
# buf.gen.yaml
version: v1
plugins:
  # TypeScript for Connect RPC
  - plugin: buf.build/bufbuild/connect-es:v0.13.0
    out: src/shared/connectrpc
    opt:
      - target=ts
  # TypeScript for protobuf messages
  - plugin: buf.build/bufbuild/protobuf-es:v1.4.0
    out: src/shared/connectrpc
    opt:
      - target=ts
  # Go for backend
  - plugin: buf.build/protocolbuffers/go:v1.33.0
    out: gen/go
    opt:
      - paths=source_relative
  # Python
  - plugin: buf.build/protocolbuffers/python:v1.33.0
    out: gen/python
```

### buf.work.yaml

Workspace configuration for monorepos:

```yaml
# buf.work.yaml
version: v1
directories:
  - proto/user
  - proto/order
  - proto/common
```

## Buf Tooling

### Linting

Run linting to ensure proto files follow best practices:

```bash
# Lint all proto files
buf lint

# Lint specific file
buf lint proto/user/v1/user.proto

# Output as JSON
buf lint --format json

# List available lint rules
buf lint --listlinters
```

### Breaking Change Detection

Detect breaking changes before deploying:

```bash
# Compare against main branch
buf breaking --against .git#branch=main

# Compare against specific commit
buf breaking --against 1a2b3c4d

# Compare against remote
buf breaking --against https://github.com/user/repo.git#branch=main

# Output as JSON
buf breaking --against .git#branch=main --format json
```

### Formatting

Format proto files automatically:

```bash
# Format in place
buf format -w

# Check formatting without modifying
buf format --diff

# Write to different location
buf format -o ./formatted/
```

### Dependency Management

Manage proto dependencies:

```bash
# Add dependency
buf dep update buf.yaml

# List dependencies
buf dep list

# Resolve dependencies
buf dep resolve
```

### Workspace Management

Work with multiple proto directories:

```bash
# Create workspace
buf work create

# List workspaces
buf work list

# Update workspace
buf work update
```

## Versioning and Compatibility

### Semantic Versioning

Use directory names for version indicators:

- `v1`: Stable, production-ready
- `v1alpha`: Alpha (experimental)
- `v1beta`: Beta (stable but may change)
- `v2`: Major version update

### Breaking Changes

Breaking changes include:

- Removing a field
- Changing a field number
- Changing a field type
- Changing field names
- Removing or changing enum values
- Changing service method signatures

### Compatibility Rules

Safe changes (non-breaking):

- Adding new fields
- Adding new services
- Adding new enum values (with unknown handling)
- Removing optional/repeated from fields

### Deprecation Strategy

Deprecate fields gracefully:

```protobuf
message User {
  string id = 1;
  
  // Use name instead
  string display_name = 2 [deprecated = true];
  
  string name = 3;
}
```

## Adding New Services

Step-by-step guide to adding a new service:

1. **Create proto file**:

```protobuf
// proto/product/v1/product.proto
syntax = "proto3";

package myapp.product.v1;

message GetProductRequest {
  string product_id = 1;
}

message GetProductResponse {
  Product product = 1;
}

message Product {
  string id = 1;
  string name = 2;
  double price = 3;
}

service ProductService {
  rpc GetProduct(GetProductRequest) returns (GetProductResponse);
}
```

2. **Run linting**:

```bash
buf lint proto/product/v1/product.proto
```

3. **Check breaking changes**:

```bash
buf breaking --against .git#branch=main --path proto/product/v1/product.proto
```

4. **Generate code**:

```bash
buf generate
```

5. **Implement backend**:

```typescript
// In your backend service
import { ProductService } from './generated/connectrpc/product/v1/ProductService_connect';
import { ProductServiceBase } from './generated/connectrpc/product/v1/ProductService_connect';

class ProductHandler extends ProductServiceBase {
  async getProduct(req: GetProductRequest): Promise<GetProductResponse> {
    // Implement logic
    return new GetProductResponse({
      product: new Product({ id: req.productId, name: 'Test', price: 9.99 })
    });
  }
}
```

6. **Use in frontend**:

```typescript
import { ProductService } from './shared/connectrpc/clients/product/v1/ProductService_connect';

const client = new ProductService(transport);
const response = await client.getProduct(new GetProductRequest({ productId: '123' }));
```

## Best Practices

### Naming Conventions

Follow these naming conventions for consistency:

- **Files**: Use `snake_case.proto` (e.g., `user_service.proto`)
- **Messages**: Use `CamelCase` (e.g., `UserProfile`)
- **Fields**: Use `snake_case` (e.g., `user_id`)
- **Services**: Use `CamelCase` with Service suffix (e.g., `UserService`)
- **Methods**: Use `CamelCase` (e.g., `GetUser`)
- **Enums**: Use `CAPS_WITH_UNDERSCORES` (e.g., `STATUS_ACTIVE`)
- **Enum Values**: Use `CAPS_WITH_UNDERSCORES` (e.g., `USER_TYPE_ADMIN`)

### File Organization

Organize proto files for maintainability:

- One service per file (when possible)
- Group related messages
- Use clear directory structure by service/version
- Keep files focused and manageable size

### Field Management

Manage fields properly:

- Never reuse field numbers
- Reserve deprecated field numbers
- Use appropriate field types for the data
- Document non-obvious field meanings

### Documentation

Document your proto files:

```protobuf
// Represents a user in the system.
// Users can authenticate and perform actions based on their role.
message User {
  // Unique identifier for the user.
  // Assigned automatically upon user creation.
  string id = 1;
  
  // User's display name.
  // Required, must be 1-100 characters.
  string display_name = 2;
  
  // User's email address.
  // Used for authentication and notifications.
  string email = 3;
  
  // User's role in the system.
  // Determines permissions and access levels.
  UserRole role = 4;
}

// User role enumeration
enum UserRole {
  // Default role, limited permissions
  USER_ROLE_UNSPECIFIED = 0;
  USER_ROLE_ADMIN = 1;
  USER_ROLE_USER = 2;
  USER_ROLE_GUEST = 3;
}
```

### Testing

Test your protobuf schemas:

```typescript
// Unit test for message serialization
import { User, UserRole } from './generated/user_pb';

describe('User', () => {
  it('should serialize and deserialize correctly', () => {
    const user = new User({
      id: '123',
      displayName: 'John Doe',
      email: 'john@example.com',
      role: UserRole.USER_ROLE_ADMIN,
    });

    // Serialize to bytes
    const bytes = user.serialize();

    // Deserialize
    const deserialized = User.deserialize(bytes);

    expect(deserialized.id).toBe(user.id);
    expect(deserialized.displayName).toBe(user.displayName);
  });
});
```

## Schema Registry (BSR)

The Buf Schema Registry provides dependency management and module distribution:

### Publishing Modules

```bash
# Create BSR token (one-time)
buf registry login

# Push module to BSR
buf push

# Make public
buf registry config visible public
```

### Dependency Management

Reference dependencies in `buf.yaml`:

```yaml
version: v1
name: buf.build/myorg/myrepo
deps:
  - buf.build/googleapis/googleapis
  - buf.build/grpc/grpc
  - buf.build/myorg/common
```

### Access Control

Configure module visibility:

```bash
# Make module public
buf registry module visibility public myorg/mymodule

# Add collaborator
buf registry user add myorg my collaborator
```

## gRPC and Connect RPC

### Protocol Comparison

| Aspect | gRPC | Connect RPC |
|--------|------|-------------|
| Protocol | HTTP/2 | HTTP/1.1, HTTP/2 |
| Serialization | Protobuf | Protobuf, JSON |
| Browser Support | Limited | Full |
| Error Handling | Status codes | Rich error model |
| Streaming | Bi-directional | All modes |

### Transcoding

Convert between REST and gRPC:

```yaml
# OpenAPI annotations for REST exposure
import "google/api/http.proto";
import "google/api/annotations.proto";

service UserService {
  rpc GetUser(GetUserRequest) returns (User) {
    option (google.api.http) = {
      get: "/v1/users/{id}"
    };
  }
  
  rpc CreateUser(CreateUserRequest) returns (User) {
    option (google.api.http) = {
      post: "/v1/users"
      body: "*"
    };
  }
}
```

### Protocol Selection

Choose the right protocol:

- **Connect RPC**: Best for web clients, HTTP/1.1 compatibility
- **gRPC**: Best for service-to-service, high performance
- **gRPC-Web**: Legacy browser support

## JSON Mapping

### JSON to Protobuf Mapping

Protocol Buffers define specific JSON mapping rules:

| Protobuf | JSON | Example |
|----------|------|---------|
| message | object | `{"id": "1"}` |
| string | string | `"hello"` |
| int32, fixed32 | number | `42` |
| int64, fixed64 | string | `"42"` |
| bool | boolean | `true` |
| bytes | base64 string | `"SGVsbG8="` |
| enum | string | `"ACTIVE"` |
| repeated | array | `[1, 2, 3]` |
| map | object | `{"key": "value"}` |

### Custom JSON Options

Configure JSON parsing:

```typescript
// Parse JSON to protobuf with options
const user = User.fromJsonString(jsonString, {
  ignoreUnknownFields: true,
  // Custom type resolver for Any fields
  typeRegistry: [MyMessage],
});

// Serialize to JSON
const json = user.toJsonString({
  // Emit default values
  emitDefaultValues: true,
  // Use proto field names
  useProtoFieldName: false,
});
```

## Performance Optimization

### Serialization Performance

Optimize serialization:

- Use appropriate numeric types (int32 vs fixed32)
- Avoid unnecessary nested messages for hot paths
- Use bytes for large binary data
- Consider compression for network transfer

### Message Size Optimization

Reduce message sizes:

- Use appropriate field numbers (smaller = more efficient)
- Prefer int32 over string for small integers
- Use packed repeated fields for numeric arrays
- Avoid maps when simple repeated is sufficient

### Schema Design for Performance

Design for efficiency:

- Denormalize for read-heavy workloads
- Batch related data in single messages
- Use streaming for large data sets
- Consider pagination for lists

## Security Considerations

### Input Validation

Always validate input:

```typescript
import { validate } from 'class-validator';

async function validateRequest(request: GetUserRequest) {
  const errors = await validate(request);
  if (errors.length > 0) {
    throw new ConnectError('Invalid request', Code.invalidArgument);
  }
}
```

### Schema Security

Protect sensitive data:

```protobuf
message SecureConfig {
  // Publicly visible
  string app_name = 1;
  
  // Private, never expose to clients
  string api_secret = 2 [(field_option) = "sensitive"];
}
```

### Rate Limiting

Implement rate limiting at API gateway level.

## Testing Strategies

### Unit Testing

Test message behavior:

```typescript
describe('User', () => {
  it('should handle default values', () => {
    const user = new User();
    expect(user.role).toBe(UserRole.USER_ROLE_UNSPECIFIED);
  });
  
  it('should serialize correctly', () => {
    const user = new User({ name: 'test' });
    expect(user.toJsonString()).toContain('test');
  });
});
```

### Contract Testing

Ensure compatibility:

```typescript
describe('Contract Tests', () => {
  it('should be backward compatible with v1', () => {
    const v2User = new User({ 
      id: '1', 
      name: 'Test',
      newField: 'value'  // New field in v2
    });
    
    // Deserialize as v1 (should ignore unknown fields)
    const v1User = User.fromJsonString(v2User.toJsonString());
    expect(v1User.id).toBe('1');
  });
});
```

### Compatibility Testing

Test across generated code versions:

```bash
# Run breaking check in CI
buf breaking --against .git#branch=main --fail-on-breaking-changes
```

## Migration Guide

### From JSON to Protobuf

1. Identify JSON structures
2. Design proto messages
3. Generate code
4. Create migration layer
5. Deploy incrementally

### From gRPC to Connect RPC

1. Update service definitions (compatible)
2. Generate new code with connect-es plugin
3. Update server implementation
4. Update client code
5. Test all endpoints

### Schema Evolution

Add field safely:

```protobuf
message User {
  string id = 1;
  string name = 2;
  
  // Add new field (non-breaking)
  string nickname = 3;
  
  // Deprecate old field
  string display_name = 4 [deprecated = true];
}
```

Remove field safely:

```protobuf
message User {
  reserved 5;  // Reserve old field number
  reserved "old_field_name";
  
  // Use new field instead
  string new_field = 6;
}
```

## Troubleshooting

### Common Errors

**"File not found"**:
- Check import paths
- Verify buf.yaml includes the directory

**"Field number used"**:
- Use unique field numbers
- Check for reserved fields

**"Breaking change detected"**:
- Review the breaking change rules
- Consider backward compatibility

### Debugging Tips

```bash
# Validate proto file syntax
buf lint --verbose

# Check generated code
ls -la src/generated/

# Test serialization
node -e "const {User} = require('./generated/user_pb'); console.log(new User().toJsonString());"
```

### Performance Issues

- Profile serialization/deserialization
- Check message sizes
- Review field type choices

## Example Projects

### User Service

A complete user service example:

```protobuf
// proto/user/v1/user.proto
syntax = "proto3";

package myapp.user.v1;

import "google/protobuf/timestamp.proto";
import "google/protobuf/empty.proto";

service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);
  rpc UpdateUser(UpdateUserRequest) returns (UpdateUserResponse);
  rpc DeleteUser(DeleteUserRequest) returns (google.protobuf.Empty);
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);
}

message GetUserRequest {
  string user_id = 1;
}

message GetUserResponse {
  User user = 1;
}

message CreateUserRequest {
  string email = 1;
  string name = 2;
}

message CreateUserResponse {
  User user = 1;
}

message UpdateUserRequest {
  string user_id = 1;
  string name = 2;
}

message UpdateUserResponse {
  User user = 1;
}

message DeleteUserRequest {
  string user_id = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
}

message ListUsersResponse {
  repeated User users = 1;
  string next_page_token = 2;
}

message User {
  string id = 1;
  string email = 2;
  string name = 3;
  google.protobuf.Timestamp created_at = 4;
  google.protobuf.Timestamp updated_at = 5;
}
```

### Order Service

An order service with line items:

```protobuf
// proto/order/v1/order.proto
syntax = "proto3";

package myapp.order.v1;

import "google/protobuf/timestamp.proto";

service OrderService {
  rpc CreateOrder(CreateOrderRequest) returns (Order);
  rpc GetOrder(GetOrderRequest) returns (Order);
  rpc ListOrders(ListOrdersRequest) returns (ListOrdersResponse);
  rpc UpdateOrderStatus(UpdateOrderStatusRequest) returns (Order);
}

message CreateOrderRequest {
  string user_id = 1;
  repeated LineItem items = 2;
}

message GetOrderRequest {
  string order_id = 1;
}

message ListOrdersRequest {
  string user_id = 1;
  int32 page_size = 2;
  string page_token = 3;
}

message ListOrdersResponse {
  repeated Order orders = 1;
  string next_page_token = 2;
}

message UpdateOrderStatusRequest {
  string order_id = 1;
  OrderStatus status = 2;
}

message Order {
  string id = 1;
  string user_id = 2;
  repeated LineItem items = 3;
  double total = 4;
  OrderStatus status = 5;
  google.protobuf.Timestamp created_at = 6;
  google.protobuf.Timestamp updated_at = 7;
}

message LineItem {
  string product_id = 1;
  string product_name = 2;
  int32 quantity = 3;
  double unit_price = 4;
  double subtotal = 5;
}

enum OrderStatus {
  ORDER_STATUS_UNSPECIFIED = 0;
  ORDER_STATUS_PENDING = 1;
  ORDER_STATUS_CONFIRMED = 2;
  ORDER_STATUS_SHIPPED = 3;
  ORDER_STATUS_DELIVERED = 4;
  ORDER_STATUS_CANCELLED = 5;
}
```

### Notification Service

A notification service with streaming:

```protobuf
// proto/notification/v1/notification.proto
syntax = "proto3";

package myapp.notification.v1;

import "google/protobuf/timestamp.proto";

service NotificationService {
  rpc SendNotification(SendNotificationRequest) returns (SendNotificationResponse);
  rpc GetNotification(GetNotificationRequest) returns (Notification);
  rpc StreamNotifications(StreamNotificationsRequest) returns (stream Notification);
  rpc Subscribe(SubscribeRequest) returns (stream Notification);
}

message SendNotificationRequest {
  string user_id = 1;
  string title = 2;
  string body = 3;
  NotificationType type = 4;
}

message SendNotificationResponse {
  string notification_id = 1;
  bool success = 2;
}

message GetNotificationRequest {
  string notification_id = 1;
}

message StreamNotificationsRequest {
  string user_id = 1;
  NotificationType type = 2;
}

message SubscribeRequest {
  string user_id = 1;
}

message Notification {
  string id = 1;
  string user_id = 2;
  string title = 3;
  string body = 4;
  NotificationType type = 5;
  bool read = 6;
  google.protobuf.Timestamp created_at = 7;
}

enum NotificationType {
  NOTIFICATION_TYPE_UNSPECIFIED = 0;
  NOTIFICATION_TYPE_INFO = 1;
  NOTIFICATION_TYPE_WARNING = 2;
  NOTIFICATION_TYPE_ERROR = 3;
  NOTIFICATION_TYPE_SUCCESS = 4;
}
```

## Tooling Integration

### IDE Support

**VS Code**:
- Install "Protocol Buffer" extension
- Configure `buf.yaml` in workspace

**IntelliJ IDEA**:
- Install "Protocol Buffer" plugin

### Build Systems

**Bun**:

```bash
# Generate on build
"scripts": {
  "generate": "buf generate",
  "prebuild": "buf generate"
}
```

**npm**:

```bash
# Add to package.json
"scripts": {
  "prebuild": "buf generate"
}
```

### CI/CD Integration

**GitHub Actions**:

```yaml
name: Proto Check
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: bufbuild/buf-setup-action@v1
      - name: Lint
        run: buf lint
      - name: Breaking Change Check
        run: buf breaking --against .git#branch=main
```

## Further Reading

- [Protocol Buffers Documentation](https://protobuf.dev/overview/)
- [Proto3 Language Guide](https://protobuf.dev/programming-guides/proto3/)
- [Buf Documentation](https://docs.buf.build/)
- [Buf Schema Registry](https://buf.build/bsr)
- [Connect RPC Documentation](https://connectrpc.com/docs/languages/typescript/)
- [Google Protobuf Style Guide](https://developers.google.com/protocol-buffers/docs/style)
- [API Improvement Proposals (AIPs)](https://google.aip.dev/)
- [gRPC Documentation](https://grpc.io/docs/)

## Appendix

### Proto3 Language Specification

For the complete proto3 specification, refer to the official documentation.

### Standard Options

Common protocol buffer options:

| Option | Description |
|--------|-------------|
| `java_package` | Java package name |
| `java_multiple_files` | Generate separate files |
| `go_package` | Go package path |
| `objc_class_prefix` | Objective-C class prefix |
| `packed` | Pack repeated fields |

### Glossary

- **Message**: A data structure definition
- **Field**: A member of a message
- **Service**: An RPC service definition
- **RPC**: Remote Procedure Call
- **Serializer**: Converts to/from bytes
- **Descriptor**: Schema metadata

---

*Last updated: March 2026*

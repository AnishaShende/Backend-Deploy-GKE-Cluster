# Product Overview

This is a Node.js backend template providing a complete authentication system with user management capabilities. The application serves as a foundation for building REST APIs with enterprise-grade security features.

## Core Features

- **User Authentication**: Complete JWT-based auth system with login, registration, and password reset
- **Email Verification**: User email verification workflow with token-based confirmation
- **Role-Based Access**: User roles (USER, ADMIN) with configurable permissions
- **Security**: Built-in rate limiting, XSS protection, CORS, and security headers
- **API Documentation**: Swagger/OpenAPI integration for API documentation

## Target Use Cases

- Backend foundation for web applications requiring user authentication
- API server for mobile applications
- Microservice template for authentication-related functionality
- Starting point for SaaS applications with user management needs

# Critical Instructions - MUST FOLLOW

## Strictly Prohibited Actions

### 1. Command Execution Restrictions
- **NEVER** execute `pnpm build` under any circumstances
- **NEVER** execute `pnpm db:migrate`, `pnpm db:push`, or any database migration commands
- **NEVER** execute `pnpm db:seed` or any database seeding commands
- **NEVER** execute any build, deployment, or production-related commands

### 2. Database Migration Restrictions
- **NEVER** manually create migration files in `prisma/migrations/` directory
- **NEVER** write SQL migration files directly
- **NEVER** modify existing migration files
- **NEVER** bypass Prisma's migration system
- **ALL database schema changes MUST be made through Prisma schema models only**
- Database migrations are managed externally by the system - do not interfere

### 3. Package Configuration Restrictions
- **NEVER** manually edit `package.json` directly
- **NEVER** add new scripts to `package.json`
- **NEVER** modify existing scripts in `package.json`
- **NEVER** create new command shortcuts or aliases
- You MAY add or update dependencies ONLY using `pnpm add`, `pnpm remove`, or `pnpm install` commands
- All package management must be done through pnpm commands, not manual file edits

## Allowed Operations Only

You are permitted to:
- Run `pnpm db:generate` to generate Prisma client for type safety
- Run `pnpm typecheck` to verify TypeScript compilation (ALWAYS run `pnpm db:generate` first)
- Run `pnpm add`, `pnpm remove`, or `pnpm install` to manage dependencies
- Modify Prisma schema models in `prisma/schema.prisma` for database changes
- Modify application source code (controllers, services, routes, etc.)
- Modify configuration files (e.g., `.env`, TypeScript config)
- Read and understand project files

**Important**: Always run `pnpm db:generate` before running `pnpm typecheck` to ensure Prisma client is up-to-date.

**Violation of these restrictions may cause system instability or deployment failures.**

# Technology Stack

## Core Technologies

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport.js
- **Package Manager**: pnpm (v10.14.0)

## Key Dependencies

- **Database**: Prisma Client, PostgreSQL
- **Security**: bcrypt, helmet, cors, xss-filters, express-rate-limit
- **Validation**: Joi for schema validation
- **Logging**: Winston with Morgan for HTTP logging
- **Email**: Nodemailer for transactional emails
- **Documentation**: Swagger (swagger-jsdoc, swagger-ui-express)

## Development Tools

- **TypeScript**: Strict mode enabled with modern ES features
- **Nodemon**: Auto-restart during development
- **Prettier**: Code formatting
- **Docker**: Database containerization support

## Common Commands

```bash
# Development
pnpm dev                    # Start development server with hot reload

# Type Safety (ALWAYS run db:generate before typecheck)
pnpm db:generate           # Generate Prisma client
pnpm typecheck             # Type check the code
```

**CRITICAL - STRICTLY PROHIBITED COMMANDS**: 
- **NEVER** run `pnpm build` - Build commands are strictly forbidden
- **NEVER** run `pnpm db:migrate` or any migration commands - Migrations are managed externally
- **NEVER** run `pnpm db:seed` or any seeding commands - Database seeding is prohibited
- **ONLY** run `pnpm db:generate` to generate Prisma client for type safety
- **ONLY** run `pnpm typecheck` to verify TypeScript types

## Build Configuration

- **TypeScript**: Targets ESNext with Node.js module resolution
- **Output**: Compiled to `./build` directory
- **Environment**: Uses cross-env for cross-platform environment variables

# Project Structure

## Root Level Organization

```
├── src/                    # Main application source code
├── prisma/                 # Database schema and migrations
├── generated/              # Auto-generated Prisma client (do not edit)
├── .env                    # Environment variables (local)
└── .env.example            # Environment template
```

## Source Code Architecture (`src/`)

The application follows a layered architecture pattern:

### Core Application Files

- `index.ts` - Application entry point with server setup
- `app.ts` - Express app configuration and middleware setup
- `client.ts` - Prisma database client instance

### Layer Structure

```
src/
├── config/          # Configuration and setup
├── controllers/     # HTTP request handlers
├── services/        # Business logic layer
├── middlewares/     # Express middleware functions
├── routes/          # API route definitions
├── validations/     # Request validation schemas
├── utils/           # Utility functions and helpers
├── types/           # TypeScript type definitions
├── docs/            # API documentation setup
└── db/              # Database connection and setup
```

## Key Architectural Patterns

### Controller-Service Pattern

- **Controllers**: Handle HTTP requests/responses, delegate to services
- **Services**: Contain business logic, interact with database
- **Validation**: Joi schemas validate incoming requests

### Middleware Chain

1. Security headers (helmet)
2. Request parsing (express.json, urlencoded)
3. XSS sanitization
4. CORS handling
5. Authentication (Passport JWT)
6. Rate limiting (production only)
7. Route handlers
8. Error handling

### Database Layer

- **Prisma Schema**: `prisma/schema.prisma` defines data models
- **Migrations**: `prisma/migrations/` contains database version history
- **Generated Client**: `generated/prisma/` contains auto-generated client code
- **Seeder**: `prisma/seed.ts` contains seed data for the database

## File Naming Conventions

- **Controllers**: `*.controller.ts` (e.g., `auth.controller.ts`)
- **Services**: `*.service.ts` (e.g., `user.service.ts`)
- **Validations**: `*.validation.ts` (e.g., `auth.validation.ts`)
- **Middlewares**: Descriptive names (e.g., `auth.ts`, `rateLimiter.ts`)
- **Utils**: Descriptive names (e.g., `ApiError.ts`, `catchAsync.ts`)

## Import/Export Patterns

- Use barrel exports in `index.ts` files for clean imports
- Import generated Prisma types from `../generated/prisma`
- Use default exports for main module functionality
- Use named exports for utility functions and multiple exports

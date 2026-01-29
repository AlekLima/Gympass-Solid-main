# Gympass-Solid Project - General Overview

## 📋 Project Summary

This is a **backend REST API** built with **Node.js and TypeScript** that simulates a gym membership and check-in system, inspired by the Gympass application. The project serves as a practical demonstration of **SOLID principles**, **Clean Architecture**, and **Test-Driven Development (TDD)** best practices.

## 🎯 Purpose & Vision

The primary goal of this project is to create a well-architected backend system that:
- Implements business rules for gym memberships and check-ins
- Demonstrates clean code practices and architectural patterns
- Provides a reference implementation for SOLID principles
- Maintains separation of concerns across application layers
- Enables easy testing and maintainability

## 🏗️ Architectural Overview

### Architecture Pattern: Clean Architecture

The project follows **Clean Architecture** principles with clear separation into distinct layers:

```
┌─────────────────────────────────────────────┐
│          HTTP Layer (Interface)             │
│    Fastify Controllers & Routes             │
├─────────────────────────────────────────────┤
│       Application Layer (Use Cases)         │
│    Business Logic & Orchestration           │
├─────────────────────────────────────────────┤
│       Domain Layer (Entities)               │
│    Core Business Rules & Interfaces         │
├─────────────────────────────────────────────┤
│    Infrastructure Layer (Repositories)      │
│    Prisma ORM & Database Implementation     │
└─────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Dependency Inversion**: Domain layer defines repository interfaces; infrastructure implements them
2. **Factory Pattern**: Use case factories enable dependency injection and loose coupling
3. **Repository Pattern**: Abstract data access with dual implementations (Prisma + In-Memory)
4. **Error Handling**: Custom error classes for domain-specific exceptions
5. **Validation**: Zod schemas for request validation at the HTTP layer

## 🏢 Domain Model

### Core Entities

The system is built around three main entities:

#### 1. User
- **Attributes**: id, name, email, password_hash, role (ADMIN/MEMBER), created_at
- **Business Rules**:
  - Unique email addresses
  - Password encryption using bcrypt
  - Role-based access control (RBAC)

#### 2. Gym
- **Attributes**: id, title, description, phone, latitude, longitude
- **Business Rules**:
  - Geographic coordinates for distance calculations
  - Only admins can register gyms

#### 3. CheckIn
- **Attributes**: id, created_at, validated_at, user_id, gym_id
- **Business Rules**:
  - One check-in per user per day maximum
  - Must be within 100m of the gym location
  - Can only be validated within 20 minutes of creation
  - Only admins can validate check-ins

### Entity Relationships

```
User (1) ──────< CheckIn >────── (1) Gym
        has many         belongs to
```

## ⚙️ Core Features & Use Cases

### User Management
- **Register User**: Create new user accounts with encrypted passwords
- **Authenticate User**: JWT-based authentication
- **Get User Profile**: Retrieve logged-in user information
- **Refresh Token**: Renew JWT tokens

### Gym Management
- **Create Gym**: Register new gym locations (admin only)
- **Search Gyms**: Find gyms by name
- **Fetch Nearby Gyms**: Find gyms within 10km radius using geolocation

### Check-In Management
- **Create Check-In**: User checks into a gym
- **Validate Check-In**: Admin validates a check-in (within 20-minute window)
- **Fetch User Check-In History**: Retrieve all user check-ins with pagination
- **Get User Metrics**: Calculate total check-ins for a user

### Business Rules Implementation

| Rule | Implementation |
|------|----------------|
| Unique email per user | Database constraint + validation |
| 1 check-in/day/user | Query for existing check-ins on same date |
| 100m maximum distance | Haversine formula for coordinate distance |
| 20-minute validation window | Date comparison logic |
| Admin-only operations | Role-based middleware |

## 🛠️ Technology Stack

### Core Dependencies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Runtime** | Node.js | - | JavaScript runtime |
| **Language** | TypeScript | 4.9.5 | Type-safe development |
| **Framework** | Fastify | 4.13.0 | Fast HTTP server |
| **Database** | PostgreSQL | - | Relational database |
| **ORM** | Prisma | 4.10.1 | Type-safe database access |
| **Authentication** | @fastify/jwt | 6.7.0 | JWT token handling |
| **Encryption** | bcryptjs | 2.4.3 | Password hashing |
| **Validation** | Zod | 3.20.6 | Schema validation |
| **Testing** | Vitest | 0.28.5 | Unit & integration testing |
| **E2E Testing** | Supertest | 6.3.4 | HTTP endpoint testing |
| **Build** | tsup | 6.6.3 | TypeScript bundler |
| **Linting** | ESLint | 8.34.0 | Code quality |

### Infrastructure

- **Docker Compose**: PostgreSQL container setup
- **Prisma Migrations**: Database schema versioning
- **Environment Variables**: Configuration management

## 🧪 Testing Strategy

The project implements a comprehensive three-tier testing approach:

### 1. Unit Tests (`src/use-cases/*.spec.ts`)
- **Focus**: Business logic in isolation
- **Method**: In-memory repository implementations
- **Coverage**: All use cases
- **Command**: `npm test`

### 2. Integration/E2E Tests (`src/http/controllers/**/*.spec.ts`)
- **Focus**: Full HTTP request/response cycle
- **Method**: Supertest + Fastify app
- **Coverage**: All API endpoints
- **Command**: `npm run test:e2e`

### 3. Test Infrastructure
- **In-Memory Repositories**: Fast, isolated unit tests
- **Custom Vitest Environment**: Prisma test database setup
- **Code Coverage**: Available via `npm run test:coverage`
- **Test UI**: Interactive testing with `npm run test:ui`

## 📂 Project Structure

```
gympass-teste/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Database schema definition
│   └── vitest-environment-prisma/  # Custom test environment
├── src/
│   ├── @types/             # TypeScript type definitions
│   ├── env/                # Environment configuration
│   ├── http/               # HTTP layer (controllers, routes, middleware)
│   │   ├── controllers/
│   │   │   ├── check-ins/  # Check-in endpoints
│   │   │   ├── gyms/       # Gym endpoints
│   │   │   └── users/      # User endpoints
│   │   └── middlewares/    # Auth & validation middleware
│   ├── lib/                # External library initialization
│   ├── repositories/       # Data access layer
│   │   ├── in-memory/      # Test implementations
│   │   ├── prisma/         # Production implementations
│   │   └── *.ts            # Repository interfaces
│   ├── use-cases/          # Business logic
│   │   ├── factories/      # Dependency injection factories
│   │   └── *.ts            # Use case implementations
│   ├── utils/              # Helper functions
│   ├── app.ts              # Fastify app configuration
│   └── server.ts           # Server entry point
├── .env.example            # Environment variables template
├── docker-compose.yml      # PostgreSQL container setup
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vitest configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- Docker & Docker Compose (for PostgreSQL)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gympass-teste
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start PostgreSQL with Docker**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run test:ui` | Open interactive test UI |

## 🔐 Non-Functional Requirements

The project implements several important non-functional requirements:

1. **Security**
   - Password encryption using bcrypt
   - JWT-based authentication
   - Role-based access control (RBAC)

2. **Data Persistence**
   - PostgreSQL database for production
   - Prisma ORM for type-safe data access
   - Database migrations for schema versioning

3. **Pagination**
   - All list endpoints support pagination
   - Default: 20 items per page

4. **Performance**
   - Fastify framework for high throughput
   - Connection pooling via Prisma
   - Efficient geolocation queries

## 📝 API Overview

### User Endpoints
- `POST /users` - Register new user
- `POST /sessions` - Authenticate user
- `PATCH /token/refresh` - Refresh JWT token
- `GET /me` - Get user profile (authenticated)

### Gym Endpoints
- `POST /gyms` - Create gym (admin only)
- `GET /gyms/search` - Search gyms by name
- `GET /gyms/nearby` - Find nearby gyms

### Check-In Endpoints
- `POST /gyms/:gymId/check-ins` - Create check-in
- `PATCH /check-ins/:checkInId/validate` - Validate check-in (admin only)
- `GET /check-ins/history` - User check-in history
- `GET /check-ins/metrics` - User check-in metrics

## 🎓 Learning Outcomes

This project demonstrates:

1. **SOLID Principles**
   - Single Responsibility: Each class has one reason to change
   - Open/Closed: Open for extension, closed for modification
   - Liskov Substitution: Repository implementations are interchangeable
   - Interface Segregation: Small, focused interfaces
   - Dependency Inversion: Depend on abstractions, not concretions

2. **Clean Architecture**
   - Framework independence
   - Testability
   - Database independence
   - UI independence

3. **Test-Driven Development**
   - Write tests first
   - Implement minimal code to pass
   - Refactor with confidence

4. **Modern Backend Practices**
   - Type safety with TypeScript
   - Schema validation with Zod
   - JWT authentication
   - RESTful API design
   - Comprehensive testing

## 🔮 Future Enhancements

Potential areas for expansion:
- GraphQL API layer
- Real-time notifications for check-ins
- Payment integration
- Mobile app integration
- Analytics dashboard
- Multi-language support
- Rate limiting
- API documentation with Swagger/OpenAPI

## 📚 References

- Original Project: [AlekLima/Gympass-Solid-main](https://github.com/AlekLima/Gympass-Solid-main)
- Clean Architecture: Robert C. Martin
- SOLID Principles: Robert C. Martin
- Domain-Driven Design: Eric Evans

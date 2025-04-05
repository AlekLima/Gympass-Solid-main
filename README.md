🧠 Project Overview
This is a backend API built with Node.js + TypeScript, practicing SOLID principles, Clean Architecture, and Test-Driven Development (TDD).

 it's simulating a gym membership system, inspired by the Gympass app. (No free workout included, unfortunately.)

📁 Folder Structure (src/)
🪓 @prisma/
Contains the auto-generated Prisma files.

client.ts: Initializes Prisma Client – your gateway to the database.

Yes, it's boilerplate, but it’s your ORM BFF.

🧠 domain/
This is where your core business logic lives.

entities/
You’ve got classic DDD-style entities like:

User

Gym

CheckIn

These entities are rich with business rules and exist independently of infrastructure.

repositories/ Only interfaces live here. You’re defining the contracts (UsersRepository, CheckInsRepository, etc.) so the domain doesn’t depend on any database tech.

🛠 infra/
This is the infrastructure layer—real implementations of the repository interfaces.

prisma/

Implements repositories using Prisma.

PrismaUsersRepository, PrismaGymsRepository, etc.

Keeps the domain layer database-agnostic. 👌

🤹‍♂️ use-cases/
Here’s where the application logic lives—use cases like:

RegisterUseCase

AuthenticateUseCase

CheckInUseCase

Each use case has:

Its own execute() method.

Input/output types.

Dependency injection of repositories.

💡 These are classic clean architecture moves.

🧪 tests/
A treasure trove of Vitest tests written for every use case:

Unit tests for core features like check-ins, registrations, etc.

Uses in-memory repos to isolate logic from the database. Smart.

 doing TDD right: write a test, watch it fail, build just enough to make it pass. Then cry a little. Then refactor.

🔥 Key Concepts Practiced
SOLID Principles (especially Dependency Inversion and Single Responsibility)

Clean Architecture – separation of domain, application, and infra.

TDD – you're writing tests first, like a responsible dev with trust issues.

Prisma – type-safe ORM that makes SQL bearable.

In-memory Repos – clean way to write tests without touching a real DB.




Gympass-Solid Project
Backend application for software that simulates GymPass!
🛠️ Technologies Used
Vitest – For unit and end-to-end tests

Fastify – Backend framework

ESLint – Code quality enforcement

Zod – Schema validation

Knex – SQL query builder

SQLite – Database

📦 Models
User
Name

Email

Role

Password

Check-in
user_id

gym_id

created_at

validated_at

Gym
Title

Description

Phone

Latitude

Longitude

📌 Application Requirements (Routes)
/users
 Should be possible to create a user

 Should be possible to authenticate a user

 Should be possible to retrieve the profile of the logged-in user

Additional constraints:

 A user should not be able to register with a duplicate email

 Total count of off-diet meals

 Best streak of on-diet meals

 A user can only view, edit, and delete meals they created

(Note: The last 3 items seem related to a diet tracker and might have been copied from another project.)

/check-ins
 Should be possible to retrieve the number of check-ins made by the logged-in user

 Should be possible for a user to get their check-in history

 Should be possible for a user to check into a gym

 Should be possible to validate a user's check-in

 A user cannot perform more than one check-in per day

 A user cannot check-in unless they are within 100m of the gym

 A check-in can only be validated up to 20 minutes after creation

 Only administrators can validate a check-in

/gyms
 Should be possible to register a gym

 Should be possible for users to search for nearby gyms (within 10km)

 Should be possible for users to search gyms by name

 Only administrators can register gyms

🔒 Non-Functional Requirements (NFRs)
 User passwords must be encrypted

 Application data must be persisted in a PostgreSQL database

 All data lists must be paginated with 20 items per page

 Users must be identified using JWT (JSON Web Token)


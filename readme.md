# ElyNext - Modern Full Stack Starter

A simple starter fullstack todos app built with [Next.js](https://nextjs.org/) and [ElysiaJS](https://elysiajs.com/) using [Bun](https://bun.sh/). This project is purposefully kept minimal to serve as a starting point for beginner to intermediate developers.

## 💻 Client

Uses the following tech stack:

- 🌐 Web Framework: [Next.js](https://nextjs.org/) (React)
- 🖌️ UI: [NextUI](https://nextui.org/)
- 🎨 Styling: [TailwindCSS](https://tailwindcss.com/)
- 🛠️ Icons: [Heroicons](https://heroicons.com/)
- 🔧 Tooling: [Bun](https://bun.sh/)

## 🌐 Server

Uses the following tech stack:

- 🏃 Runtime: [Bun](https://bun.sh/)
- 🌐 Server Framework: [Elysia](https://elysiajs.com/)
- 🗄️ DB: [SQLite](https://www.sqlite.org/)
- 🛠️ ORM: [Drizzle](https://github.com/drizzle-team/drizzle-orm)
- ✅ Validation: [Typebox](https://github.com/sinclairzx81/typebox)
- 🔄 End-to-End Type Safety: [Eden](https://github.com/elysiajs/eden)

## 📋 Features

- 📝 Backend Unit Tests: Comprehensive unit tests for backend routes
- 💾 Drizzle Kit Integration: Seamless database migrations and schema management.
- 📖 Swagger Documentation: Auto-generated API documentation with Swagger for easy API exploration and testing.

## 🚀 Usage

### 📦 Installing Dependencies

Run this command from the root directory:

```sh
bun install
```

### 🟣 Starting Backend

To start the Elysia server, run this command from the root directory:

```sh
bun dev:backend
```

### 🔵 Starting Frontend

To start the Next.js dev server, run this command from the root directory:

```sh
bun dev:web
```

### 🖥 Running Backend and Frontend in Split Window

To run both the backend and frontend in split windows, you need to have `tmux` installed. Use the following command from the root directory:

```sh
bun dev
```

<img width="962" alt="image" src="https://github.com/user-attachments/assets/44018181-6231-4ef8-bb53-96dd75813e3d">

## 🧪 Backend Unit Tests

To run the backend unit tests, use the following command in backend directory:

```sh
bun test
```

## 🔧 Drizzle Kit Integration

To run database migrations using Drizzle Kit, use the following commands:

- **Generate migration:**

  ```sh
  drizzle-kit generate:migration
  ```

- **Run migrations:**

  ```sh
  drizzle-kit migrate
  ```

## 📖 Swagger Documentation

The Swagger documentation is auto-generated and can be accessed at:

```
http://localhost:4000/swagger
```

## 👨‍💻 Show your Support

Give a ⭐️ if this project helped you!


# E-Commerce

This repository contains a full-stack e-commerce application with a TypeScript Node backend and a modern frontend built with Vite + React/TypeScript. It includes integrations for payments (Stripe, PayPal), authentication, email, Redis, Kafka, and more.

**Project Layout**

- **Backend/**: Node + TypeScript API, services, integrations, and webhooks.
- **Frontend/**: Vite + React + TypeScript single-page app.

## Tech Stack

- Backend: Node.js, TypeScript, Express, MongoDB, Redis
- Frontend: React, TypeScript, Vite
- Integrations: Stripe, PayPal, Firebase, Twilio, Kafka
- Dev tooling: ESLint, Prettier, Docker

## Prerequisites

# 🛍️ E-Commerce (Monorepo)

- Node.js (v16+ recommended)
- npm or yarn
  **🗂️ Project Layout**
- MongoDB instance (local, Docker or managed)

## 🧩 Tech Stack

This project can use Yarn 4 (Berry) via Corepack. To set up Yarn 4 for this repository:

## ⚙️ Prerequisites

````bash
# ensure Corepack is available (Node >=16.10 includes Corepack)
## 🚀 Quickstart

# prepare & activate Yarn 4 for this project
## 🔐 Environment Variables

# verify

## 🗄️ Database Migrations / Seeding

- Backend contains `migrations/` — check `Backend/src/migrations` for scripts to migrate or seed products. Run them with `ts-node` or the npm scripts provided in `Backend/package.json`.

After activating Yarn 4 at the repo root, install dependencies per package:
- Build and run containers (if Dockerfiles and compose are configured):

```bash
cd Backend
docker-compose -f docker-compose.yml up --build -d
````

## 🐳 Running with Docker (production preview)

```bash
cd Backend
## ✅ Tests

cd ../Frontend
## 🎨 Linting & Formatting
```

- Provide CI/CD that sets required environment variables in the deployment environment.

- **Deployment Notes**

- Provide CI/CD that sets required environment variables in the deployment environment.
- For production, ensure secrets are stored in secure vaults and HTTPS is enforced.

## Quickstart

## 🤝 Contributing

1. Clone repository

- Backend main entry: `Backend/src/index.ts` and `Backend/src/app.ts`

## 📁 Where to find things

- Backend main entry: `Backend/src/index.ts` and `Backend/src/app.ts`
- Frontend main entry: `Frontend/src/main.tsx`

## 📄 File

- [README.md](README.md)
  git clone https://github.com/Trongsangvu/e-commerce.git
  cd e-commerce

````

2. Backend - install dependencies

```bash
cd Backend
npm install
# or: yarn
````

Create environment file for the backend (see `.env.example` below). You can copy and edit:

```bash
cp .env.example .env
```

3. Frontend - install dependencies

```bash
cd ../Frontend
npm install
# or: yarn
```

Create environment file for the frontend (see `.env.example` below):

```bash
cp .env.example .env
```

4. Start services with Docker Compose (optional)

If you prefer running MongoDB/Redis via Docker, use the backend's docker-compose:

```bash
cd Backend
docker-compose up -d
```

5. Run in development

Backend (watch / hot-reload)

```bash
cd Backend
npm run dev
# or: yarn dev
```

Frontend (Vite dev server)

```bash
cd Frontend
npm run dev
# or: yarn dev
```

## Environment Variables

Place sensitive keys in environment variables. Example templates below — adjust according to `Backend/src/configs` and `Frontend` usage.

Backend `.env` (example)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
...
```

Frontend `.env` (Vite uses `VITE_` prefix)

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
...
```

## Database Migrations / Seeding

- Backend contains `migrations/` — check `Backend/src/migrations` for scripts to migrate or seed products. Run them with `ts-node` or the npm scripts provided in `Backend/package.json`.

## Running with Docker (production preview)

- Build and run containers (if Dockerfiles and compose are configured):

```bash
cd Backend
docker-compose -f docker-compose.yml up --build -d
```

## Tests

- If the project has test scripts, run them from each package:

```bash
cd Backend
npm test

cd ../Frontend
npm test
```

## Linting & Formatting

- Backend

```bash
cd Backend
npm run lint
npm run format
```

- Frontend

```bash
cd Frontend
npm run lint
npm run format
```

## Deployment Notes

- Provide CI/CD that sets required environment variables in the deployment environment.
- For production, ensure secrets are stored in secure vaults and HTTPS is enforced.

## Contributing

- Fork the repository, create branches per feature/issue, and open PRs with clear descriptions.

## Where to find things

- Backend main entry: `Backend/src/index.ts` and `Backend/src/app.ts`
- Frontend main entry: `Frontend/src/main.tsx`

## File

- [README.md](README.md)

---

If you want, I can: add `.env.example` files in `Backend` and `Frontend`, add npm scripts to `package.json` if missing, or run a quick repo scan to extract exact env var names used by the code. Which would you like next?

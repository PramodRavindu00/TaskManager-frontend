# Taskium — Frontend

> **Work in progress** — This frontend is under active development. Authentication, routing, layout, and project creation work end-to-end. Dashboards, task management, work boards, and profile pages are mostly UI scaffolding.

React single-page application for **Taskium**, a personal and project-based task management platform. Users sign in, navigate by role, create projects, and will eventually manage personal tasks and project tasks from dedicated work boards.

## Overview

Taskium separates work into two contexts:

| Context | Description | Route (planned) |
|---------|-------------|-----------------|
| **Personal** | Tasks not tied to any project | `/work-board/personal` |
| **Project** | Tasks belonging to a shared project | `/work-board/projects`, `/work-board/projects/:projectId` |

The frontend mirrors the backend task model: **Personal** tasks have no `projectId`; **Project** tasks require a project selection.

## User levels

Routing and navigation are gated by the authenticated user's system role.

| Role | Default route | Access |
|------|---------------|--------|
| **User** | `/dashboard` | Dashboard, work boards, tasks, projects |
| **Admin** | `/admin/dashboard` | Admin dashboard, profile |

Project-level roles (Admin, Manager, Member) are enforced by the API. The UI does not yet expose member management or role assignment screens.

## Features

### Working today

- **Login & signup** — Form validation with React Hook Form + Zod
- **Session handling** — Token refresh on load, axios interceptors, HTTP-only refresh cookies
- **Role-based routing** — `ProtectedRoute` and `PublicRoute` components
- **Layout & navigation** — Sidebar, app bar, footer, collapsible menu
- **Theme** — Light / dark mode with localStorage persistence
- **Project creation** — Modal form connected to `POST /project` via React Query
- **Toast notifications** — Sonner for success and error feedback

### UI scaffolded (not fully wired)

| Area | Status |
|------|--------|
| User dashboard | Placeholder component |
| Admin dashboard | Placeholder component |
| Work boards (personal / project) | Routes exist; render placeholder dashboard |
| Task list | Page header only; no API integration |
| Task form | Form UI + validation schema; submit not connected |
| Project list | Create modal works; list/table not implemented |
| Profile | Placeholder component |

## Tech stack

| Layer | Technology |
|-------|------------|
| UI | React 19, TypeScript 5.9 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4, DaisyUI |
| State | Redux Toolkit (auth, user, theme) |
| Server state | TanStack React Query |
| Routing | React Router 7 |
| Forms | React Hook Form, Zod |
| HTTP | Axios (interceptors, credentials) |
| Icons / UX | React Icons, React Spinners, Sonner |

## Run locally

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- Taskium backend running (see [backend README](../backend/README.md))

### Setup

```bash
cd frontend
pnpm install
```

Create `.env` in the `frontend` directory:

```env
VITE_SERVER_URL=http://localhost:5000
APP_PORT=3000
```

| Variable | Description |
|----------|-------------|
| `VITE_SERVER_URL` | Backend API URL |
| `APP_PORT` | Vite dev server port (default `3000`) |

### Development

```bash
pnpm dev
```

App URL: `http://localhost:3000`

### Production build

```bash
pnpm build
pnpm preview
```

## Routes

### Public

| Path | Page |
|------|------|
| `/` | Role-based redirect |
| `/login` | Login |
| `/signup` | Sign up |
| `/unauthorized` | Access denied |
| `*` | 404 |

### User (`User` role)

| Path | Page | Status |
|------|------|--------|
| `/dashboard` | Dashboard | Placeholder |
| `/work-board/personal` | Personal board | Placeholder |
| `/work-board/projects` | Project board | Placeholder |
| `/work-board/projects/:projectId` | Project detail board | Placeholder |
| `/tasks` | Task list | Partial |
| `/tasks/new` | Create task | Form UI only |
| `/tasks/:taskId` | Edit task | Form UI only |
| `/projects` | Project list | Create works; list pending |

### Admin (`Admin` role)

| Path | Page | Status |
|------|------|--------|
| `/admin/dashboard` | Admin dashboard | Placeholder |

### Shared (`Admin` + `User`)

| Path | Page | Status |
|------|------|--------|
| `/profile` | User profile | Placeholder |

## Authentication flow

1. `AuthWrapper` attempts token refresh on app load.
2. Login stores the access token in Redux and fetches the logged-in user.
3. Axios request interceptor attaches `Authorization: Bearer <token>`.
4. On `401`, the response interceptor refreshes the token and retries.
5. Logout clears auth state and the refresh cookie.

## Project structure

```
frontend/
├── src/
│   ├── components/     # Shared UI (Sidebar, AuthWrapper, forms, etc.)
│   ├── layouts/        # UserLayout
│   ├── pages/
│   │   ├── admin/
│   │   ├── common/
│   │   ├── public/
│   │   └── user/       # task/, project/, Dashboard
│   ├── service/        # API services (auth, project)
│   └── utils/          # axios, redux, validations, helpers
├── vite.config.ts
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Type-check and production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## Related

- [Backend API](../backend/README.md) — REST API, data model, and local setup

## License

Private — part of the Taskium application suite.

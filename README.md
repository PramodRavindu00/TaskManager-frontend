# Task Manager Frontend

A modern, full-featured task and project management application built with React, TypeScript, and Vite. This frontend application provides a comprehensive interface for managing tasks and projects with role-based access control, authentication, and a beautiful dark/light theme.

## 🚀 Features

### Authentication & Authorization
- **User Authentication**: Secure login and signup with form validation
- **Role-Based Access Control**: Support for Admin and User roles
- **Protected Routes**: Automatic route protection based on authentication status and user roles
- **Token Management**: Automatic token refresh with axios interceptors
- **Session Persistence**: Maintains user session across page refreshes

### Task Management
- **Task List View**: View and manage all tasks
- **Task Creation & Editing**: Create new tasks and edit existing ones
- **Task Organization**: Organize tasks by projects

### Project Management
- **Project List View**: View and manage all projects
- **Project Creation & Editing**: Create new projects and edit existing ones
- **Project Details**: Detailed project views with associated tasks

### User Interface
- **Dark/Light Theme**: Toggle between dark and light themes with system preference detection
- **Responsive Design**: Modern, responsive UI built with Tailwind CSS
- **Sidebar Navigation**: Intuitive navigation with collapsible menu items
- **Toast Notifications**: User-friendly notifications using Sonner
- **Loading States**: Spinner components for better UX during async operations

### Dashboard
- **User Dashboard**: Personalized dashboard for regular users
- **Admin Dashboard**: Specialized dashboard for administrators
- **Work Board**: Visual board for managing personal and project-based work

## 🛠️ Tech Stack

### Core
- **React 19.1.1**: Latest React with modern features
- **TypeScript 5.9.3**: Type-safe development
- **Vite 7.1.7**: Fast build tool and dev server

### State Management
- **Redux Toolkit 2.10.1**: Modern Redux with simplified API
- **React Redux 9.2.0**: React bindings for Redux

### Routing
- **React Router DOM 7.9.5**: Client-side routing

### Styling
- **Tailwind CSS 4.1.16**: Utility-first CSS framework
- **Custom CSS Variables**: Theme-aware color system

### Forms & Validation
- **React Hook Form 7.66.0**: Performant form library
- **Zod 4.1.12**: Schema validation
- **@hookform/resolvers 5.2.2**: Zod integration for React Hook Form

### HTTP Client
- **Axios 1.13.1**: Promise-based HTTP client with interceptors

### UI Components
- **React Icons 5.5.0**: Icon library
- **React Spinners 0.17.0**: Loading spinners
- **Sonner 2.0.7**: Toast notifications

### Development Tools
- **ESLint 9.36.0**: Code linting
- **TypeScript ESLint 8.45.0**: TypeScript-specific linting rules
- **@vitejs/plugin-react-swc 4.1.0**: Fast React refresh with SWC

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Appbar.tsx
│   │   ├── AuthWrapper.tsx
│   │   ├── BackButton.tsx
│   │   ├── Footer.tsx
│   │   ├── PageHeader.tsx
│   │   ├── PaginatedTable.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── RootRedirect.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SidebarItem.tsx
│   │   └── Spinner.tsx
│   ├── layouts/           # Layout components
│   │   └── UserLayout.tsx
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin-specific pages
│   │   ├── common/        # Shared pages
│   │   ├── public/        # Public pages (login, signup)
│   │   └── user/          # User-specific pages
│   │       ├── project/
│   │       └── task/
│   ├── service/           # API service layer
│   │   └── auth.service.ts
│   ├── utils/             # Utility functions and configurations
│   │   ├── axios/         # Axios configuration
│   │   ├── constants/     # Constants and types
│   │   ├── formValidations/ # Form validation schemas
│   │   ├── helpers/       # Helper functions
│   │   └── redux/         # Redux store and slices
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── .gitignore
├── eslint.config.js
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🚦 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **pnpm**: Package manager (or npm/yarn)

### Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_SERVER_URL=http://localhost:5000
APP_PORT=3000
```

- `VITE_SERVER_URL`: Backend API URL (default: `http://localhost:5000`)
- `APP_PORT`: Development server port (default: `3000`)

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000` (or the port specified in `APP_PORT`).

### Build

Build for production:

```bash
pnpm build
```

The production build will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

### Linting

Run ESLint to check for code issues:

```bash
pnpm lint
```

## 🔐 Authentication Flow

1. **Initial Load**: The `AuthWrapper` component checks for an existing session by attempting to refresh the token
2. **Login**: User submits credentials, receives access token, and user data is fetched
3. **Token Refresh**: Axios interceptor automatically refreshes expired tokens
4. **Logout**: Clears authentication state and redirects to login

## 🎨 Theming

The application supports both light and dark themes:

- **System Preference**: Automatically detects system theme preference
- **Manual Toggle**: Users can manually toggle between themes
- **Persistence**: Theme preference is saved to localStorage
- **CSS Variables**: Theme-aware color system using CSS custom properties

## 🛣️ Routing

### Public Routes
- `/` - Root redirect
- `/login` - Login page
- `/signup` - Signup page
- `/unauthorized` - Unauthorized access page
- `*` - 404 Not Found page

### Protected User Routes
- `/dashboard` - User dashboard
- `/work-board/personal` - Personal work board
- `/work-board/projects` - Projects work board
- `/work-board/projects/:projectId` - Specific project work board
- `/tasks` - Task list
- `/tasks/new` - Create new task
- `/tasks/:taskId` - Edit task
- `/projects` - Project list
- `/projects/new` - Create new project
- `/projects/:projectId` - Edit project
- `/profile` - User profile

### Protected Admin Routes
- `/admin/dashboard` - Admin dashboard
- `/profile` - User profile

## 🔧 Redux Store Structure

```typescript
{
  auth: {
    accessToken: string | null,
    isLoading: boolean,
    isAuthenticated: boolean
  },
  user: {
    data: User | null
  },
  theme: "light" | "dark"
}
```

### Redux Slices

- **authSlice**: Manages authentication state and token
- **userSlice**: Manages logged-in user data
- **themeSlice**: Manages theme preference

## 📡 API Integration

The application uses Axios with custom interceptors:

- **Request Interceptor**: Automatically adds Bearer token to authenticated requests
- **Response Interceptor**: Handles token refresh on 401 errors
- **Base URL**: Configurable via `VITE_SERVER_URL` environment variable
- **Credentials**: Cookies are sent with requests (`withCredentials: true`)

### API Services

- `authService`: Handles authentication-related API calls
  - `signup()`: User registration
  - `login()`: User login
  - `refresh()`: Token refresh
  - `getLoggedUser()`: Get current user data
  - `logout()`: User logout

## 🎯 Key Features Implementation

### Protected Routes
Routes are protected using the `ProtectedRoute` component which:
- Checks authentication status
- Validates user roles
- Shows loading spinner during auth initialization
- Redirects unauthorized users appropriately

### Form Validation
Forms use React Hook Form with Zod schemas for:
- Type-safe form data
- Client-side validation
- Error handling and display

### Error Handling
Centralized error handling via `handleApiError` utility that:
- Parses API errors
- Displays user-friendly toast notifications
- Handles different error types appropriately

## 🧪 Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Use path aliases for imports (`@/`, `@components/`, etc.)

### Component Structure
- Keep components focused and reusable
- Extract logic into custom hooks when needed
- Use TypeScript interfaces for props and state

### State Management
- Use Redux for global state (auth, user, theme)
- Use local state for component-specific data
- Use selectors for accessing Redux state

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🤝 Contributing

1. Follow the existing code style and structure
2. Ensure TypeScript types are properly defined
3. Test your changes thoroughly
4. Update documentation as needed

## 📄 License

This project is part of the Task Manager application suite.

---

Built with ❤️ using React, TypeScript, and Vite

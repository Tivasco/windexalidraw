# Project Structure

This document provides an overview of the project structure for the WebApp Boilerplate.

## Directory Structure

The project follows a modular structure to organize code logically:

```
webapp-boilerplate/
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   ├── pages/                # Page components
│   ├── contexts/             # React context providers
│   ├── services/             # Service layer
│   │   ├── api/              # API client and services
│   │   ├── auth/             # Authentication services
│   │   └── logging/          # Logging services
│   ├── utils/                # Utility functions
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript type definitions
│   ├── config/               # Configuration files
│   ├── middleware/           # Express middleware
│   ├── models/               # Data models
│   ├── database/             # Database scripts and models
│   └── server/               # Server-side code
├── public/                   # Static assets
├── docs/                     # Documentation
├── tests/                    # Test files
├── .env                      # Environment variables
├── .env.example              # Example environment variables
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Docker configuration
├── package.json              # Project dependencies
└── README.md                 # Project overview
```

## Key Directories Explained

### `src/components/`

Contains reusable UI components that are used throughout the application. Components are organized by functionality and follow a consistent structure.

Example components:
- Button
- Card
- Modal
- Form elements

### `src/pages/`

Contains page-level components that represent different routes in the application. Each page typically composes multiple components.

Example pages:
- Home
- Login
- Dashboard
- Profile

### `src/contexts/`

Contains React context providers that manage global state across the application.

Example contexts:
- AuthContext - Manages authentication state
- ThemeContext - Manages theme preferences
- NotificationContext - Manages notifications

### `src/services/`

Contains service modules that handle business logic, API communication, and other services.

#### `src/services/api/`

Contains the API client and service modules for communicating with the backend.

Key files:
- `apiClient.ts` - Base API client with interceptors
- `userService.ts` - User-related API calls
- `dataService.ts` - Data-related API calls

#### `src/services/auth/`

Contains authentication-related services.

Key files:
- `authService.ts` - Authentication methods
- `keycloakService.ts` - Keycloak integration

#### `src/services/logging/`

Contains logging services for tracking application events and errors.

Key files:
- `logger.ts` - Logging utility

### `src/utils/`

Contains utility functions that are used across the application.

Example utilities:
- Date formatting
- String manipulation
- Validation functions

### `src/hooks/`

Contains custom React hooks that encapsulate reusable logic.

Example hooks:
- `useAuth` - Authentication hook
- `useFetch` - Data fetching hook
- `useForm` - Form handling hook

### `src/types/`

Contains TypeScript type definitions used throughout the application.

Example types:
- API response types
- Model interfaces
- Prop types

### `src/config/`

Contains configuration files for different aspects of the application.

Example configurations:
- API endpoints
- Feature flags
- Environment-specific settings

### `src/middleware/`

Contains Express middleware for the backend.

Example middleware:
- Authentication middleware
- Error handling middleware
- Logging middleware
- Rate limiting middleware

### `src/models/`

Contains data models that define the structure of data used in the application.

Example models:
- User model
- Product model
- Order model

### `src/database/`

Contains database-related code, including scripts for initialization and migrations.

Key files:
- `initDb.js` - Database initialization script
- `migrations/` - Database migrations
- `connection.js` - Database connection setup

### `src/server/`

Contains server-side code for the Express API.

Key files:
- `api.js` - Main API server
- `routes/` - API route definitions
- `controllers/` - Request handlers

## File Naming Conventions

The project follows these naming conventions:

- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`, `useForm.ts`)
- **Contexts**: PascalCase with `Context` suffix (e.g., `AuthContext.tsx`)
- **Services**: camelCase with `Service` suffix (e.g., `authService.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `validation.ts`)
- **Types**: PascalCase (e.g., `User.ts`, `ApiResponse.ts`)

## Module Organization

Each module typically follows this structure:

```
ModuleName/
├── index.ts                # Main export file
├── ModuleName.tsx          # Main component/implementation
├── ModuleName.test.tsx     # Tests
├── ModuleName.module.css   # Styles (if using CSS modules)
└── types.ts                # TypeScript types
```

## Import Organization

Imports are organized in the following order:

1. External libraries
2. Internal modules
3. Components
4. Hooks
5. Utilities
6. Types
7. Styles

Example:

```tsx
// External libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Internal modules
import { apiClient } from '../services/api/apiClient';

// Components
import { Button } from '../components/Button';

// Hooks
import { useAuth } from '../hooks/useAuth';

// Utilities
import { formatDate } from '../utils/formatDate';

// Types
import { User } from '../types/User';

// Styles
import styles from './Component.module.css';
```

## Next Steps

- [Frontend Architecture](./frontend.md): Details about the frontend architecture
- [Backend Architecture](./backend.md): Details about the backend architecture
- [Database Design](./database.md): Details about the database design 
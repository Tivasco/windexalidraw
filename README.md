# Windexcalidraw

A collaborative drawing application built with Excalidraw, React, Express, and MySQL. Features real-time auto-save functionality and a modern user interface.

## Features

- **Drawing Interface**: Seamless integration with Excalidraw for a powerful drawing experience
- **Auto-save**: Automatic saving of drawings with configurable delay
- **Board Management**: Create, edit, and organize multiple drawing boards
- **API Server**: Express.js backend with MySQL storage
- **Modern Stack**: Built with React, TypeScript, and Vite
- **Authentication**: Secure access with Keycloak integration

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **Database**: MySQL
- **Authentication**: Keycloak, JWT
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (local or remote)
- Keycloak server (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/windexcalidraw.git
   cd windexcalidraw
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and update the values

4. Initialize the database:
   ```bash
   npm run init-db
   ```

5. Start the development server:
   ```bash
   npm run start
   ```

### Using Docker

1. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

2. Access the application:
   - Frontend: http://localhost:5173
   - API: http://localhost:3001
   - Keycloak: http://localhost:8080

## Project Structure

```
windexcalidraw/
├── src/
│   ├── pages/          # React page components
│   ├── components/     # Reusable React components
│   ├── server/         # API server code
│   ├── services/       # Service layer
│   ├── database/       # Database scripts
│   ├── utils/          # Utility functions
│   ├── config/         # Configuration files
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
├── .env                # Environment variables
└── package.json        # Project dependencies
```

## API Endpoints

### Board Endpoints

- `GET /api/excalidraw/boards` - List all boards
- `GET /api/excalidraw/boards/:id` - Get a specific board
- `POST /api/excalidraw/boards` - Create a new board
- `PUT /api/excalidraw/boards/:id` - Update a board
- `DELETE /api/excalidraw/boards/:id` - Delete a board

## Authentication

This boilerplate supports two authentication methods:

1. **JWT Authentication**: Simple token-based authentication
2. **Keycloak Integration**: Enterprise-grade authentication and authorization

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
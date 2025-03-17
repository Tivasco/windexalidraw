# Installation Guide

This guide will walk you through the process of setting up the WebApp Boilerplate for development.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Docker** and **Docker Compose** (for containerized development)
- **Git** (for version control)
- **MySQL** (if running locally without Docker)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/webapp-boilerplate.git
cd webapp-boilerplate
```

## Step 2: Install Dependencies

Install all required dependencies for the project:

```bash
npm install
```

This will install all dependencies defined in the `package.json` file, including both production and development dependencies.

## Step 3: Environment Configuration

Copy the example environment file and configure it for your environment:

```bash
cp .env.example .env
```

Open the `.env` file in your preferred text editor and update the values according to your environment. Pay special attention to:

- Database connection settings
- API keys and secrets
- Authentication configuration
- Environment-specific settings

See the [Environment Configuration](./environment.md) guide for detailed information about each environment variable.

## Step 4: Database Setup

### Option 1: Using Docker (Recommended)

If you're using Docker, the database will be automatically set up when you start the containers:

```bash
docker-compose up -d
```

### Option 2: Local MySQL Setup

If you're running MySQL locally, create a database and run the initialization script:

```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS webapp_boilerplate;"

# Run the initialization script
npm run init-db
```

## Step 5: Verify Database Connection

Verify that your application can connect to the database:

```bash
npm run verify-db
```

If successful, you should see a message confirming the connection.

## Step 6: Start the Development Server

Start the development server with:

```bash
npm run start
```

This will start both the frontend and backend servers concurrently:
- Frontend: http://localhost:5173
- API: http://localhost:3001

## Step 7: Access the Application

Open your browser and navigate to:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **API**: [http://localhost:3001](http://localhost:3001)
- **Keycloak** (if using Docker): [http://localhost:8080](http://localhost:8080)

## Troubleshooting

### Common Issues

1. **Port Conflicts**: If you encounter port conflicts, check if other applications are using ports 5173, 3001, or 8080. You can change the ports in the `.env` file.

2. **Database Connection Issues**: Ensure your database credentials are correct in the `.env` file. Check that your MySQL server is running.

3. **Node Version Issues**: This project requires Node.js v18 or higher. Use `nvm` (Node Version Manager) to switch to a compatible version if needed.

4. **Docker Issues**: If you encounter issues with Docker, ensure Docker Desktop is running and try restarting it. You can also try rebuilding the containers with `docker-compose build --no-cache`.

### Getting Help

If you encounter any issues not covered here, please:

1. Check the [troubleshooting section](../troubleshooting.md) for common problems and solutions
2. Search for existing issues in the GitHub repository
3. Create a new issue if your problem hasn't been reported

## Next Steps

Now that you have the application running, you might want to:

- Explore the [Project Structure](../architecture/project-structure.md)
- Learn about the [API Endpoints](../api/endpoints.md)
- Understand the [Authentication Flow](../architecture/authentication.md)
- Set up your [Development Environment](../contributing/workflow.md) 
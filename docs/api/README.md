# API Documentation

## Overview

This API is built using Express.js and follows RESTful principles. It includes authentication, rate limiting, and standardized error handling.

## Base URL

- Development: `http://localhost:3001/api`
- Production: `https://api.yourdomain.com/api`

## Authentication

The API uses JWT (JSON Web Token) authentication with Keycloak integration.

### Authentication Flow

1. User logs in through Keycloak
2. Receives access token and refresh token
3. Include access token in Authorization header: `Authorization: Bearer <token>`
4. Token refresh is handled automatically by the API client

## Error Handling

All API errors follow a standard format:

```json
{
  "status": 400,
  "message": "Error message",
  "timestamp": "2024-03-16T12:00:00.000Z",
  "path": "/api/resource",
  "details": {
    // Additional error details
  }
}
```

### Common Error Codes

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Rate Limiting

- Rate limit: 100 requests per minute per IP
- Headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## API Endpoints

### Authentication

#### POST /api/auth/login
Login with username and password

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "refreshToken": "string",
  "expiresIn": 3600
}
```

#### POST /api/auth/refresh
Refresh access token

**Request:**
```json
{
  "refreshToken": "string"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "expiresIn": 3600
}
```

### Users

#### GET /api/users/current
Get current user information

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "roles": ["string"]
}
```

### Protected Resources

#### GET /api/protected
Example protected endpoint

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Access granted to protected resource"
}
```

## Using the API Client

The boilerplate includes a pre-configured API client with error handling and token refresh:

```typescript
import { apiClient } from '@/services/api/apiClient';

// GET request
const data = await apiClient.get<ResponseType>('/endpoint');

// POST request
const response = await apiClient.post<ResponseType>('/endpoint', requestData);

// PUT request
const updated = await apiClient.put<ResponseType>('/endpoint', updateData);

// DELETE request
await apiClient.delete<void>('/endpoint');
```

## Error Handling Best Practices

```typescript
try {
  const data = await apiClient.get<ResponseType>('/endpoint');
} catch (error) {
  if (error instanceof ApiError) {
    // Handle specific API error
    console.error(`API Error: ${error.message}, Status: ${error.status}`);
  } else {
    // Handle other errors
    console.error('Unexpected error:', error);
  }
}
```

## Websocket Endpoints

### /ws/notifications
Real-time notifications endpoint

**Connection:**
```typescript
const ws = new WebSocket('ws://localhost:3001/ws/notifications');
```

**Events:**
- `message`: New notification
- `error`: Connection error
- `close`: Connection closed

## API Versioning

The API supports versioning through URL path:
- v1: `/api/v1/...`
- v2: `/api/v2/...`

## Security Considerations

1. Always use HTTPS in production
2. Implement proper CORS policies
3. Validate all input data
4. Use appropriate content security policies
5. Implement rate limiting for all endpoints
6. Keep dependencies updated
7. Use security headers (implemented via Helmet)

## Monitoring and Logging

All API requests are logged with:
- Timestamp
- Request method and path
- Response status
- Response time
- Client IP
- User agent

## Need Help?

- Check the [troubleshooting guide](../troubleshooting.md)
- Submit an issue on GitHub
- Contact the development team 
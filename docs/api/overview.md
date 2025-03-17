# API Overview

This document provides an overview of the API design principles and standards used in the WebApp Boilerplate.

## API Design Principles

The API in this boilerplate follows these key design principles:

1. **RESTful Design**: The API follows REST principles, using standard HTTP methods and status codes.
2. **JSON Format**: All API requests and responses use JSON format.
3. **Versioning**: API endpoints are versioned to ensure backward compatibility.
4. **Authentication**: Secured endpoints require authentication via JWT tokens.
5. **Consistent Error Handling**: Standardized error responses across all endpoints.
6. **Rate Limiting**: Protection against abuse through rate limiting.
7. **Documentation**: All endpoints are documented with examples.

## API Structure

### Base URL

The base URL for all API endpoints is:

```
http://localhost:3001/api
```

In production, this would be replaced with your domain.

### Versioning

API versioning is included in the URL path:

```
/api/v1/resource
```

This allows for future API changes without breaking existing clients.

## Request Format

### Headers

All requests should include the following headers:

```
Content-Type: application/json
Accept: application/json
```

For authenticated endpoints, include the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Request Body

For POST, PUT, and PATCH requests, the request body should be in JSON format:

```json
{
  "property1": "value1",
  "property2": "value2"
}
```

## Response Format

### Success Responses

Successful responses follow this structure:

```json
{
  "status": 200,
  "data": {
    // Response data here
  },
  "message": "Operation successful"
}
```

### Error Responses

Error responses follow this structure:

```json
{
  "status": 400,
  "message": "Error message",
  "timestamp": "2023-03-16T12:00:00.000Z",
  "path": "/api/resource",
  "details": {
    // Additional error details (optional)
  }
}
```

## HTTP Status Codes

The API uses standard HTTP status codes:

- **2xx**: Success
  - 200: OK
  - 201: Created
  - 204: No Content
- **4xx**: Client Error
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 422: Unprocessable Entity
  - 429: Too Many Requests
- **5xx**: Server Error
  - 500: Internal Server Error
  - 503: Service Unavailable

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Obtain a token by authenticating via `/api/login` or through Keycloak
2. Include the token in the Authorization header of subsequent requests

See the [Authentication](../security/authentication.md) documentation for more details.

## Rate Limiting

To protect the API from abuse, rate limiting is implemented:

- **Public endpoints**: 100 requests per IP per hour
- **Authenticated endpoints**: 1000 requests per user per hour

When rate limits are exceeded, the API returns a 429 status code with a Retry-After header.

## CORS

Cross-Origin Resource Sharing (CORS) is configured to allow requests from:

- In development: `http://localhost:5173`
- In production: Your configured domains

## API Client

The boilerplate includes an API client service that handles:

- Authentication token management
- Request/response interceptors
- Error handling
- Automatic token refresh

See the [API Client](../architecture/frontend.md#api-client) documentation for usage details.

## Next Steps

- [API Endpoints](./endpoints.md): Detailed documentation of all API endpoints
- [Error Handling](./error-handling.md): More information about API error handling
- [Data Models](./models.md): Documentation of API data models and schemas 
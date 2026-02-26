# API Reference

The application uses **Next.js App Router API Routes** located in `app/api`.

## Base URL
All API routes are prefixed with `/api`.

## Endpoints

### Authentication
-   **POST /api/auth/[...nextauth]**: Handles sign-in, sign-out, and session management via NextAuth.js.

### Contact
-   **POST /api/contact**: Submits a new contact form message.
    -   **Body**: `{ name, email, phone, message, organization? }`
    -   **Response**: `{ success: true, data: ... }`

### Newsletter
-   **POST /api/newsletter**: Subscribes an email to the newsletter.
    -   **Body**: `{ email }`

### Admin
-   **GET /api/admin/stats**: Returns dashboard statistics (counts of projects, messages, etc.).
-   **POST /api/admin/upload**: Handles file uploads (images) for services/projects. (Check implementation details).

## Error Handling
Most endpoints return standard HTTP status codes:
-   `200`: Success
-   `400`: Bad Request (Validation Request)
-   `401`: Unauthorized (Not logged in)
-   `403`: Forbidden (Insufficient permissions)
-   `500`: Internal Server Error

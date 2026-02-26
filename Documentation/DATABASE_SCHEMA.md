# Database Schema Documentation

The project uses a relational database managed by **Prisma ORM**. The schema is defined in `prisma/schema.prisma`.

## Models

### User
Admin users who can access the dashboard.
-   **id**: Unique identifier (CUID).
-   **email**: Unique email address.
-   **password**: Hashed password.
-   **role**: User role (default: "CONTENT_EDITOR").

### CompanyProfile
Singleton model storing global company information.
-   **name**: Company name.
-   **heroTitle/Subtitle**: Content for the homepage hero section.
-   **mission/vision/values**: Core company identity text.
-   **contact info**: Address, phone, email, and social links.

### Service
Services offered by the company.
-   **title**: Service name.
-   **description**: Detailed description.
-   **icon**: Lucide icon name string.
-   **category**: Grouping (e.g., "engineering" or "consultancy").

### Project
Portfolio items.
-   **title**: Project name.
-   **client**: Client name.
-   **status**: "COMPLETED", "ONGOING", etc.
-   **scope**: JSON array detailing the work done.

### NewsPost
Blog articles or news updates.
-   **slug**: URL-friendly identifier.
-   **content**: Rich text or markdown content.
-   **published**: Boolean flag for visibility.

### Job
Career opportunities.
-   **title**: Job position.
-   **requirements**: details or JSON array.
-   **status**: "OPEN" or "CLOSED".

### ContactSubmission
Stores messages from the contact form.
-   **status**: "NEW", "READ", "ARCHIVED".

### NavigationItem
Dynamic control over header/footer links.
-   **type**: Location of the link ("header"/"footer").

### SiteSettings
Global configurations like SEO keywords and section toggles (e.g., enabling/disabling the Careers section).

## Relationships
-   Most models are standalone in this architecture to facilitate simple content management.
-   **User** management is separate from the public content.

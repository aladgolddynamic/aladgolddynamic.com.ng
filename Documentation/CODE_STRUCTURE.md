# Code Structure

This document outlines the folder structure of the **Aladgold Dynamic CMS** project to help developers navigate the codebase.

## Root Directory

-   **`app/`**: Contains the **Next.js App Router** logic. This is the heart of the application where pages and API routes are defined.
-   **`components/`**: Reusable React components.
-   **`lib/`**: Shared libraries and utility functions that don't directly render UI (e.g., Prisma client instance, type definitions).
-   **`prisma/`**: Database configuration. Contains the `schema.prisma` file and seed scripts.
-   **`public/`**: Static assets like images, fonts, and icons that are served directly.
-   **`scripts/`**: Maintenance and utility scripts (e.g., database cleanups).
-   **`styles/`**: Global CSS files (including Tailwind directives).
-   **`utils/`**: Helper functions for text formatting, dates, etc.
-   **`Documentation/`**: Project documentation (You are here).

## Detailed Breakdown

### `app/`
-   **`(public)`**: Route group for public-facing pages (Home, About, Services, etc.).
-   **`admin/`**: Secured routes for the Admin Dashboard.
-   **`api/`**: Backend API endpoints.
-   **`auth/`**: NextAuth.js authentication configuration.
-   **`globals.css`**: Global styles.
-   **`layout.tsx`**: Root layout file.

### `components/`
-   **`ui/`**: Base UI components from **Shadcn UI** (Button, Input, Dialog, etc.).
-   **`admin/`**: Components specific to the Admin Dashboard (Sidebar, Data Tables).
-   **`public/`**: Components used on the public website (Hero, Navbar, Footer).
-   **`shared/`**: Components used in both areas.

### `lib/`
-   **`prisma.ts`**: Best-practice instantiation of the Prisma Client to prevent connection exhaustion in dev.
-   **`utils.ts`**: Common utility, often class-merging helper logic (`cn`).

### `prisma/`
-   **`schema.prisma`**: The source of truth for the database model.
-   **`seed.ts`**: Script to populte the database with initial data.

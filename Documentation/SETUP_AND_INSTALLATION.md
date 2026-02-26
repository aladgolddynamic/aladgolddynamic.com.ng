# Setup and Installation Guide

This guide will walk you through setting up the **Aladgold Dynamic CMS** locally for development purposes.

## Prerequisites
Before you begin, ensure you have the following installed to your machine:
-   **[Node.js](https://nodejs.org/)** (v18.17 or later recommended)
-   **npm** (comes with Node.js) or **pnpm** / **yarn**
-   **Git**

## Installation Steps

1.  **Clone the Repository** (if you haven't already):
    ```bash
    git clone <repository-url>
    cd aladgolddynamic.com.ng
    ```

2.  **Install Dependencies**:
    Run the following command to install all required packages:
    ```bash
    npm install
    # or
    pnpm install
    ```

## Configuration

1.  **Environment Variables**:
    Create a `.env` file in the root directory (or use `.env.local` for local development). You can start by copying the example if one exists, or ensure you have the following keys:
    ```env
    # Database Connection
    DATABASE_URL="file:./dev.db"

    # NextAuth Authentication
    AUTH_SECRET="your-super-secret-key-at-least-32-chars" # Generate with `npx auth secret` or `openssl rand -base64 32`
    
    # Public Base URL (for auth callbacks)
    NEXT_PUBLIC_APP_URL="http://localhost:3000"

    # Supabase (for Database Migration and Storage)
    NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
    ```

> [!IMPORTANT]
> **Storage Setup**: Ensure you have a public bucket named `images` created in your Supabase project for image uploads to work.

## Database Setup

This project uses **Prisma** with **SQLite** for development.

1.  **Generate Prisma Client**:
    This reads your `schema.prisma` and generates the TypeScript client.
    ```bash
    npx prisma generate
    ```

2.  **Push Schema to Database**:
    This creates the SQLite database file (`dev.db`) and creates the tables.
    ```bash
    npx prisma db push
    ```

3.  **Seed Initial Data**:
    Populate the database with default data (like the admin user and initial services).
    ```bash
    npx prisma db seed
    ```
    *Note: Check `prisma/seed.ts` (if available) to see the default credentials (usually `admin@aladgold.com` / `password`).*

## Running the Application

1.  **Start Development Server**:
    ```bash
    npm run dev
    ```

2.  **Access the App**:
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

3.  **Access Admin Dashboard**:
    Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to log in.

## Troubleshooting

-   **Database Errors**: If you encounter errors related to the database, try deleting the `prisma/dev.db` file and running `npx prisma db push` and `npx prisma db seed` again.
-   **Hydration Errors**: Occasional hydration mismatches may occur in dev mode due to browser extensions. Try checking in an incognito window.

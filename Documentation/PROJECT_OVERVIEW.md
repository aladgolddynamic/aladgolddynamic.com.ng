# Project Overview

## Introduction
The **Aladgold Dynamic Company Limited** CMS is a comprehensive web application designed to manage the digital presence of the company. It serves two primary functions:
1.  **Public Website**: A modern, responsive interface for clients to explore services, projects, careers, and news.
2.  **Admin Dashboard**: A secure, internal tool for company staff to manage all dynamic content without needing to touch the code.

## High-Level Architecture
The project follows a monolithic architecture built on the **Next.js** framework, integrating both frontend UI and backend API routes in a single deployable unit.

-   **Frontend**: Built with React Server Components (RSC) and Client Components where interactivity is needed. It uses **Tailwind CSS** for styling and **Shadcn UI** for consistent design patterns.
-   **Backend**: Leverages Next.js API Routes (App Router) to handle server-side logic.
-   **Database Layer**: Uses **Prisma ORM** to interact with a Relational Database. Currently configured for **SQLite** for development flexibility, with a path to upgrade to **PostgreSQL** for production.
-   **Authentication**: Implemented via **NextAuth.js**, securing admin routes and managing session states.

## Technology Stack

### Core Framework
-   **[Next.js 15+](https://nextjs.org/)**: The React framework for the web, utilizing the App Router for modern routing and layouts.
-   **[React 19](https://react.dev/)**: The library for web and native user interfaces.
-   **[TypeScript](https://www.typescriptlang.org/)**: Statically typed JavaScript for better developer ergonomics and code safety.

### Styling & UI
-   **[Tailwind CSS 4](https://tailwindcss.com/)**: Utility-first CSS framework.
-   **[Shadcn UI](https://ui.shadcn.com/)**: Reusable components built using Radix UI and Tailwind CSS.
-   **[Lucide React](https://lucide.dev/)**: Beuatiful & consistent icon set.
-   **[Framer Motion](https://www.framer.com/motion/)**: For animations and gesture handling.

### Data & Backend
-   **[Prisma](https://www.prisma.io/)**: Next-generation Node.js and TypeScript ORM.
-   **[SQLite](https://www.sqlite.org/)**: Lightweight, file-based database (Development).
-   **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library.
-   **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible and extensible forms with easy validation.

### Authentication
-   **[NextAuth.js](https://next-auth.js.org/)** (v5 beta): Complete open-source authentication solution for Next.js applications.

## Key Features
-   **Dynamic Service Management**: Add, edit, or remove company services with custom icons and color themes.
-   **Project Portfolio**: Showcase past work with rich details, images, and categorization.
-   **News & Blogging**: a full-featured blog section to share company updates and industry news.
-   **Careers Portal**: Manage job openings and receive applications (via email or future integrations).
-   **Newsletter**: Collect subscriber emails for marketing campaigns.

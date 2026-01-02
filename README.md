# Aladgold Dynamic Company Limited

A comprehensive Content Management System (CMS) and public-facing website built for **# Aladgold Dynamic Company Limited
** (formerly Aladgold Dynamic). This system allows for easy management of services, projects, careers, and news, alongside a robust newsletter subscription system.

## 🚀 Tech Stack

- **Framework**: [Next.js 15/16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Database**: [Prisma ORM](https://www.prisma.io/) with **SQLite**
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Forms**: React Hook Form + Zod

## 🏗️ System Architecture & Workings

### 1. Public Website
The frontend is a high-performance Next.js application featuring:
- **Responsive Design**: Mobile-first approach using Tailwind CSS.
- **Dynamic Content**: Pages (Services, Projects, News) fetch data directly from the SQLite database via Prisma.
- **Newsletter**: A persistent footer form that captures user emails and stores them for marketing.

### 2. Admin Dashboard (`/admin`)
A secure portal for managing company data:
- **Services Management**: Create and edit services with categories (Engineering vs. Consultancy), curated icons, and theme colors.
- **Project Portfolio**: Manage completed and ongoing projects with details like year, budget, and scope.
- **Career Portal**: Post job openings that appear dynamically on the Careers page.
- **News/Blog**: Publish updates and articles with an integrated rich-text-ready editor logic.
- **Newsletter Dashboard**: View all subscribers and export the list to CSV for external marketing tools.
- **Navigation Management**: Refactored system to manage header and footer links with predefined safe routes.

### 3. Database & Models
The system uses a relational schema defined in `prisma/schema.prisma`:
- `User`: Admin credentials and roles.
- `Service`: Grouped by `category` (engineering/consultancy).
- `Project`: Portfolio items with detailed metadata.
- `Newsletter`: Unique email subscriptions.
- `Job`: Career opportunities with status tracking.

## 🔐 Admin Credentials

> [!IMPORTANT]
> These are the default credentials generated during seeding. It is highly recommended to change the password after the first login.

| User Type | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@aladgold.com` | `admin123` |

## 🛠️ Getting Started

### Installation
```bash
npm install
```

### Database Setup
```bash
# Push schema to SQLite
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed initial data (Admin user, default services)
npx prisma db seed
```

### Development
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 📁 Project Structure

- `app/`: Next.js App Router (Public and Admin routes).
- `components/`: Reusable UI components (Admin, Public, and Shadcn).
- `lib/`: Shared utilities (Prisma client, types, icon maps).
- `prisma/`: Database schema and seeding scripts.
- `scripts/`: Maintenance scripts (Deduplication, Service updates).

---

## 🌐 Deployment & Hosting Guide

### 1. Database Warning (SQLite vs. Production)
> [!WARNING]
> This project currently uses **SQLite** (`dev.db`). SQLite is a file-based database and will **NOT persist** data on Vercel between deployments or server restarts.
> **Action**: For production, update `schema.prisma` to use **PostgreSQL** (e.g., Vercel Postgres or Supabase).

### 2. Hosting on Vercel
1.  **Push to GitHub**: Initialize a Git repo and push your code to GitHub.
2.  **Import to Vercel**: Login to [Vercel](https://vercel.com/) and import your repository.
3.  **Environment Variables**: Add your `DATABASE_URL` and `AUTH_SECRET` in the Vercel project settings.
4.  **Install Command**: Ensure `npm install` is used.
5.  **Build Command**: `npx prisma generate && next build`.

### 3. Adding Domain from Hostinger
1.  **Purchase Domain**: Get your `.com` or `.com.ng` domain on [Hostinger](https://www.hostinger.com/).
2.  **Update Nameservers**: If using Cloudflare (recommended), change the Hostinger nameservers to the ones provided by Cloudflare.
3.  **Vercel Domain Setup**:
    - In Vercel Project Settings > **Domains**, add your domain (e.g., `pira-tech.com.ng`).
    - Copy the **A Record** IP or **CNAME** provided by Vercel.

### 4. Cloudflare Integration (Fixing ISP IP Blocks)
> [!TIP]
> Some Nigerian ISPs block specific IP ranges or have issues with `.com.ng` resolution. Cloudflare acts as a proxy to bypass these local ISP restrictions.

1.  **Sign up for Cloudflare**: Add your site to [Cloudflare](https://www.cloudflare.com/).
2.  **DNS Configuration**:
    - Add an **A Record** pointing to Vercel's IP (`76.76.21.21`).
    - Ensure the "Proxy status" is set to **Proxied** (Orange cloud).
3.  **SSL/TLS**: Set mode to **Full** or **Full (Strict)**.
4.  **Nigerian ISP Blocks**: By using Cloudflare, traffic is routed through their global edge network, effectively bypassing many local network-level blocks applied to Vercel's default IP ranges.

---



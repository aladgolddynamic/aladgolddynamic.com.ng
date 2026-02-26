# Admin Guide

This guide explains how to use the **Admin Dashboard** to manage the content of the Aladgold Dynamic website.

## Accessing the Dashboard
1.  Navigate to `/admin` (e.g., `http://localhost:3000/admin`).
2.  Log in with your credentials.
    -   **Default Dev Credentials**: Refer to `prisma/seed.ts` (usually `admin@aladgold.com` / `password`).

## Dashboard Sections

### 1. Dashboard Home
Provides a quick overview of system stats:
-   Total Projects
-   Active Services
-   Unread Messages
-   New Subscribers

### 2. Services Management
-   **List View**: See all active services grouped by category (Engineering/Consultancy).
-   **Add Service**: Click "Add New Service". You can choose an icon from the Lucide library and pick a theme color.
-   **Edit/Delete**: modify existing services or remove them.

### 3. Projects Portfolio
-   **Manage Projects**: detailed case studies of company work.
-   **Fields**: Client name, Project Scope (add multiple items), Year, Budget, and Status.
-   **Images**: Upload a featured image for the project.

### 4. News & Blog
-   Create articles to keep the "News" section fresh.
-   Supports Markdown or Rich Text for content.
-   **Published Status**: Drafts will not appear on the public site until toggled to "Published".

### 5. Careers
-   Post job openings.
-   **Status**: Toggle between OPEN and CLOSED. Closed jobs are hidden from the public view.

### 6. Newsletter
-   View a list of all email addresses that have subscribed via the website footer.
-   **Export**: Use the export button to download a CSV list for use in Mailchimp or other marketing tools.

### 7. Inbox (Contact Form)
-   Read messages submitted via the "Contact Us" page.
-   Mark messages as Read or Archived to keep the inbox clean.

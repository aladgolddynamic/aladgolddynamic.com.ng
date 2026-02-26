# Contributing Guide

Thank you for your interest in contributing to the **Aladgold Dynamic CMS** project.

## Development Workflow

1.  **Pull Latest Changes**: Always start with a fresh pull from the main branch.
    ```bash
    git checkout main
    git pull origin main
    ```
2.  **Create a Branch**:
    ```bash
    git checkout -b feature/amazing-feature
    ```
3.  **Make Changes**: Write your code.
4.  **Test**: Ensure the application builds and runs without errors.
    ```bash
    npm run build
    ```
5.  **Commit**: Use descriptive commit messages.
    ```bash
    git commit -m "feat: add new gallery component"
    ```
6.  **Push**:
    ```bash
    git push origin feature/amazing-feature
    ```

## Code Style

### TypeScript/JavaScript
-   We use **TypeScript** for strict type safety. Avoid using `any` whenever possible.
-   Follow standard ESLint rules configured in the project.

### Styling
-   Use **Tailwind CSS** for all styling.
-   Avoid writing custom CSS in global files unless absolutely necessary (e.g., for complex animations that Tailwind config doesn't cover).
-   Use **Shadcn UI** components for consistency. If you need a button, import `Button` from `@/components/ui/button`.

### Icons
-   Use **Lucide React** icons.

## Project Structure
Refer to `Documentation/CODE_STRUCTURE.md` for details on where files should be placed.

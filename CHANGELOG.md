# Changelog

## [Unreleased]

### Fixed

- Correct case-sensitive imports for homepage components and assets so the Vite production build resolves them on Linux.
- Resolve the bundled Prompt font assets from Vite's public directory.
- Route browser API requests through `/api` and configure a Vercel Services deployment for the Vite client and Express server.
- Correct the Express service entry point and avoid starting its local listener in Vercel's runtime.
- Resolve frontend ESLint errors, including undefined references, broken service-page hook wiring, and missing hook dependencies.

### Security

- Stop tracking the server environment file and provide a blank environment-variable template.

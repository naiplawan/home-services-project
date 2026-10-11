# Changelog

## [Unreleased]

### Added

- Add Next.js App Router to the frontend with shadcn-style buttons, alert dialogs, and skeleton loading states animated with Framer Motion.
- Add animated success, warning, and error notifications and retain the existing service, admin, customer, checkout, and profile screens.

### Changed

- Make public, customer, admin, profile, and checkout screens responsive across mobile, tablet, and desktop widths.
- Replace app-specific stylesheets with Tailwind utilities and load the Prompt font through Next.js local font support.
- Move frontend routing and Vercel's client service from Vite/React Router to Next.js while keeping the Express `/api` service and local development proxy.
- Update local image handling for Next.js static asset imports and document the Next.js development workflow.

### Fixed

- Populate the homepage featured section from the current service list instead of matching outdated service names.
- Show animated loading states while homepage, customer, and admin service lists fetch results, with retry actions when requests fail.
- Show only the first validation error for each registration field so required and format messages do not appear together.
- Return service and category query results as arrays in the API response and report Supabase query errors; update homepage and admin consumers to render the normalized payload.
- Keep the service listing page rendered when an API response has no service data, instead of throwing a client-side exception.

- Correct case-sensitive imports for homepage components and assets so the Vite production build resolves them on Linux.
- Resolve the bundled Prompt font assets from Vite's public directory.
- Route browser API requests through `/api` and configure a Vercel Services deployment for the Vite client and Express server.
- Correct the Express service entry point and avoid starting its local listener in Vercel's runtime.
- Resolve frontend ESLint errors, including undefined references, broken service-page hook wiring, and missing hook dependencies.

### Security

- Stop tracking the server environment file and provide a blank environment-variable template.

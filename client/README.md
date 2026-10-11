# Home Services frontend

The customer and admin web app uses Next.js App Router, React 18, Tailwind CSS, shadcn/ui primitives, and Framer Motion. The Express API remains in `../server` and is served under `/api` in the Vercel deployment.

## Local development

1. Install frontend dependencies with `npm install` in this directory.
2. Start the API from `../server` on port `4000`.
3. Run `npm run dev` here and open `http://localhost:3000`.

`npm run build` creates the production build, `npm start` serves that build, and `npm run lint` runs ESLint.

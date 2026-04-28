# Ideator Nexus

A **Next.js** + **Supabase** web app for managing an engineering lab.

## Features
- Inventory Tracker
- Tool Checkout System
- 3D‑Printer Queue
- Role‑based authentication (Admin / User) via Supabase Auth
- Tailwind‑CSS dark theme (bg‑slate‑950, text‑slate‑200, emerald accents)
- Live dashboard, inventory page, and printer‑queue UI
- API routes for CRUD operations
- Jest + React‑Testing‑Library test suite (printer queue logic)
- CI workflow (GitHub Actions) for lint, test, build

## Local development
```bash
# Clone the repo (already done in this workspace)
cd ideator-nexus
npm install
# Supabase env vars – placed in .env.local (git‑ignored)
npm run dev   # http://localhost:3000
```

## Deployment
The app is set up for Vercel / Netlify deployment. Supabase migrations are managed via `npx supabase db push`.

## License
MIT – feel free to fork and improve!

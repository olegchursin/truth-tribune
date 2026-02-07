This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local setup

Copy `.env.local.example` to `.env.local` and fill in values. **Do not commit `.env.local`.** Before pushing, run `git status` and confirm no `.env` or `.env.local` is staged.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

1. **Connect repo:** Push code to `main`, then [Vercel](https://vercel.com) → Add New Project → Import Git Repository → select [olegchursin/truth-tribune](https://github.com/olegchursin/truth-tribune). Framework: Next.js (auto-detected). Root: `.`.

2. **Environment variables** (Vercel → Project → Settings → Environment Variables). Set for **Production** (and **Preview** if you want cron on previews):

   | Variable | Notes |
   | -------- | ----- |
   | `SUPABASE_URL` | Supabase project URL |
   | `SUPABASE_ANON_KEY` | From Supabase Dashboard → API |
   | `SUPABASE_SERVICE_KEY` | service_role key (secret) |
   | `NEWS_API_KEY` | [newsapi.org](https://newsapi.org) |
   | `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) |
   | `CRON_SECRET` | Generate with `openssl rand -hex 32`; Vercel sends it when invoking cron |
   | `NANOBANANA_API_KEY` | Optional (image generation) |
   | `APP_URL` | Optional; set to `https://<your-vercel-domain>` when using image generation |

3. **Cron:** `vercel.json` defines `/api/cron/daily-news` at 10:00 UTC daily. Vercel sends `Authorization: Bearer <CRON_SECRET>` when `CRON_SECRET` is set.

4. **Deploy:** Push to main or Redeploy. If the build fails with missing env errors, add the vars and redeploy.

## Database (Supabase)

- **Schema:** Run `supabase-schema.sql` in Supabase SQL Editor once per project.
- **Vercel:** Use the same `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_KEY` as in Supabase Dashboard → Project Settings → API.
- **Verify:** After deploy, open the paper site and confirm sections load. Trigger cron once (Vercel → Cron Jobs → Run, or `curl -H "Authorization: Bearer $CRON_SECRET" https://<your-domain>/api/cron/daily-news`) and check logs for DB errors.

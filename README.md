# Carnak Construction — Website

Single-page marketing site for **Carnak Construction Inc.** (East Rockaway, NY), built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## 1. Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript only
```

Copy `.env.example` to `.env.local` and fill in values as needed (none are required to run locally).

## 2. Edit content and contact details

**All copy and business data lives in [`data/site.ts`](data/site.ts).** Components only read from it.

- Phone, email, address, service area, year established, SEO title/description, navigation
- Every section's headings, paragraphs, service cards, markets, process steps, and form options
- `credentials.show` — the "Credentials, insurance, and bonding information available upon request" line stays hidden until the owner confirms it
- `showPlaceholderLabels` — hides the "Project Photography Placeholder" captions

Search the file for **`CONFIRM`** to find every item that must be verified with the owner before publishing. Fields set to `null` (email, street address, ZIP, privacy policy URL) are hidden everywhere, including the JSON-LD schema, until filled in.

## 3. Add real project images

1. Put photos in `public/images/` (e.g. `public/images/hero.jpg`). Use landscape images at least 2000px wide for the hero and experience panels.
2. In `data/site.ts`, set the matching `src` and write an accurate `alt`:
   - `images.hero` — main hero photo
   - `images.heroDetail` — small inset detail in the hero
   - `images.about` — About section (the "Established" plate overlays it)
   - `experience.panels[n].image` — the three experience panels
3. While `src` is `null`, an SVG material texture (brick, concrete, stone, paving, roofing, plan) renders instead. No external image hosts are used.

Only use photos of work the company actually performed and has the right to publish.

## 4. Form delivery

The bid form (`components/BidForm.tsx`) validates in the browser and posts JSON to `app/api/bid-request/route.ts`, which re-validates on the server using the same rules (`lib/bid-form.ts`).

**Email via Resend (built in).** Set these in `.env.local` and in Vercel (Production + Preview):

| Variable | Example |
|---|---|
| `RESEND_API_KEY` | from resend.com → API Keys |
| `BID_INBOX_EMAIL` | `estimating@yourdomain.com` (comma-separate multiple) |
| `BID_FROM_EMAIL` | `Carnak Website <bids@yourdomain.com>` — must be on a domain verified in Resend |

Without all three, the route responds `delivered: false` and the form shows an honest **"not sent"** message asking the visitor to call. It never claims a submission was delivered when it was not.

**Using another provider (Formspree, SendGrid, a CRM webhook):** replace the `fetch("https://api.resend.com/emails", …)` block in `app/api/bid-request/route.ts`. Keep the `{ ok, delivered }` response shape.

**File uploads** are UI only. Selected file names are included in the email, but files are not transmitted. To accept files, upload them to storage (e.g. Vercel Blob, S3) from the client, then send the resulting URLs with the form. Vercel function request bodies are capped at ~4.5 MB, so drawing sets should not be posted directly to the API route. Update `contact.uploadNote` in `data/site.ts` once this is wired.

The form includes a hidden honeypot field for basic spam filtering. Add rate limiting or a CAPTCHA service if spam becomes a problem.

## 5. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project →** import the repo. Framework preset: Next.js (defaults are fine).
3. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL` = the final domain, e.g. `https://www.example.com` (drives canonical URL, sitemap, robots, Open Graph, JSON-LD)
   - the three form variables above, when ready
4. Deploy, then attach the custom domain under **Settings → Domains**.

Future deploys happen automatically on every push to the main branch.

## Project structure

```
app/
  layout.tsx            fonts, metadata, Open Graph
  page.tsx              section order
  globals.css           design tokens (colors, fonts), reveal animation
  api/bid-request/      form endpoint
  opengraph-image.tsx   generated social image
  icon.svg, apple-icon.tsx, robots.ts, sitemap.ts
components/             one file per section + shared pieces
data/site.ts            ALL content and business details
lib/                    form validation, class helpers
public/images/          real project photography goes here
```

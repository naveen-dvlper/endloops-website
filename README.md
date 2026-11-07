# Endloops website

A five-page marketing site for Endloops (Home, Solutions, Tools, About, Contact), built as a design-and-build assignment.
The messaging covers both product types: end-to-end solutions and standalone tools.

Live site: <add your deployed link here>

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, lucide-react icons. No router library: routing is a small
`pushState` implementation in `src/App.tsx` (with browser back/forward support and per-page title and meta description).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint     # type-check
```

## Deploying

`vercel.json` and `public/_redirects` send every path to `index.html`, so opening `/tools` or `/contact` directly works on Vercel or Netlify.

## Structure

```
public/logo.png          logo, used as supplied
src/App.tsx              routing, page metadata, layout shell
src/components/          Header, Hero, Footer and the five pages
src/data/endloopsData.ts all product, audience and pipeline content
src/index.css            colour tokens, fonts, reduced-motion rules
```

## Design decisions

- Navy for text and structure, the logo's green as the brand accent, blue and purple kept to glows and highlights.
- One interactive "how it works" pipeline on Home and an illustrative reconciliation / PO demo on Tools.
- Contact form validates every field, moves focus to the first error and announces the result. It is simulated: nothing is sent.
- Product status is `null` in the data file because the brief does not say which products are live.
- `prefers-reduced-motion` stops the auto-advancing pipeline and smooth scrolling.

## Known limits / next steps

- Contact form has no backend. The email address is a placeholder.
- Demo data is illustrative, not real client data.

## AI use

<Describe which AI tools you used and for what, and which parts you wrote or changed yourself.>

## Confidentiality

The brief and the logo belong to Endloops and are used only for this assignment.

# Major Arcana Games — Website Rebuild

A custom Next.js storefront replacing the existing Shopify site for [Major Arcana Games](https://majorarcanagames.com).

## Overview

This project migrates the Major Arcana Games e-commerce presence from Shopify to a custom-built Next.js application, giving full control over design, performance, and integrations.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: TBD
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
/
├── app/          # Next.js App Router pages and layouts
├── components/   # Shared UI components
├── lib/          # Utilities, API clients, helpers
└── public/       # Static assets
```

## Deployment

Deployed to Vercel. Push to `main` triggers a production deploy.

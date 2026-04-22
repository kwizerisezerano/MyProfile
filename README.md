# KWIZERISEZERANO - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Dark theme with beautiful gradients and glassmorphism effects
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Scroll-triggered animations and transitions
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Performance**: Optimized for speed with Next.js

## Sections

- **Hero**: Introduction with animated tech stack display
- **About**: Personal bio with key highlights and stats
- **Skills**: Technical skills with progress bars and job titles
- **Services**: 9 comprehensive services offered
- **Experience**: Timeline of work and teaching experience
- **Contact**: Contact form and social links

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Icons**: Lucide React
- **Deployment**: Vercel (Free Tier)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Deployment on Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option 2: Git Integration

1. Push code to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Auto-deploy on every push

### Option 3: Manual

Build with `npm run build` then upload `dist` folder to Vercel.

## Customization

- Update personal info in components
- Modify colors in `tailwind.config.ts`
- Add your social links in `Contact.tsx` and `Footer.tsx`

## License

MIT

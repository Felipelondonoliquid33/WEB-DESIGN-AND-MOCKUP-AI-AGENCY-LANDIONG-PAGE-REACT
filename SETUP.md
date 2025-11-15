# Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm** package manager
- **Git** (optional, for version control)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Footer component
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features section
│   ├── Process.tsx       # Process section
│   ├── Export.tsx        # Export section
│   ├── Showcase.tsx      # Portfolio showcase
│   ├── Testimonials.tsx  # Testimonials carousel
│   ├── TrustedBy.tsx     # Trusted by section
│   ├── AnimatedNumbers.tsx # Statistics
│   ├── CTA.tsx           # Call-to-action
│   └── ShipFaster.tsx    # Ship faster section
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── package.json          # Dependencies
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    50: "#f5f3ff",
    // ... your colors
  },
  accent: {
    orange: "#f97316",
    blue: "#3b82f6",
    green: "#10b981",
  },
}
```

### Content

- Update component files in `components/` to modify content
- Replace placeholder images in `public/` directory
- Edit testimonials, features, and other content in respective component files

### Animations

- Adjust animation timings in component files using Framer Motion props
- Modify animation variants in `lib/animations.ts`
- Customize GSAP animations in `lib/gsapAnimations.ts`

## Building for Production

### 1. Build the Application

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### 2. Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Your app will be live at `your-project.vercel.app`

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Connect your Git repository and deploy
- **AWS Amplify**: Use AWS Amplify Console
- **Railway**: Connect GitHub and deploy
- **DigitalOcean App Platform**: Use App Platform

## Performance Optimization

### Image Optimization

- Use Next.js `Image` component for automatic optimization
- Place images in `public/` directory
- Use WebP format when possible

### Code Splitting

- Components are automatically code-split with Next.js
- Use dynamic imports for heavy components
- Lazy load components below the fold

### Analytics

- Vercel Analytics is included by default
- Add your analytics ID in `.env.local`
- Customize analytics in `app/layout.tsx`

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port: `npm run dev -- -p 3001`

2. **Module not found**
   - Delete `node_modules` and `.next` directories
   - Run `npm install` again

3. **TypeScript errors**
   - Run `npm run lint` to check for errors
   - Ensure all dependencies are installed

4. **Build errors**
   - Check Node.js version (requires 18.17+)
   - Clear `.next` directory and rebuild

## Support

For issues or questions:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Tailwind CSS documentation](https://tailwindcss.com/docs)
3. Check [Framer Motion documentation](https://www.framer.com/motion/)
4. Open an issue on GitHub

## License

This project is licensed under the MIT License.


# Quick Start Guide

Get your landing page up and running in minutes!

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

That's it! Your landing page is now running locally.

## 📝 Next Steps

### Customize Content

1. **Update Branding**: Edit `components/Header.tsx` and `components/Footer.tsx`
2. **Modify Hero Section**: Edit `components/Hero.tsx`
3. **Change Features**: Edit `components/Features.tsx`
4. **Update Testimonials**: Edit `components/Testimonials.tsx`
5. **Modify Colors**: Edit `tailwind.config.ts`

### Add Images

1. Place images in the `public/` directory
2. Update image paths in components
3. Use Next.js `Image` component for optimization

### Deploy

1. Push to GitHub
2. Deploy to Vercel (recommended) or your preferred platform
3. Your site will be live!

## 🎨 Key Features

- ✅ Fully responsive design
- ✅ Smooth animations with Framer Motion
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Accessibility compliant
- ✅ TypeScript support
- ✅ Modern UI/UX

## 📚 Documentation

- See `README.md` for detailed documentation
- See `SETUP.md` for comprehensive setup guide

## 🐛 Troubleshooting

**Port already in use?**
```bash
npm run dev -- -p 3001
```

**Module not found?**
```bash
rm -rf node_modules .next
npm install
```

**Build errors?**
```bash
npm run build
```

## 💡 Tips

- Use `npm run lint` to check for errors
- Use `npm run format` to format code
- Check browser console for any warnings
- Test on multiple devices for responsiveness

## 🎯 Performance

- Images are automatically optimized
- Code is automatically split
- Lazy loading is enabled
- Analytics are included

Enjoy building! 🚀


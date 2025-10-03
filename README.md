# EduGameHub - Rural Learning Platform

<img width="1781" height="970" alt="image" src="https://github.com/user-attachments/assets/62a3bc83-6196-4abf-b496-03308924857e" />


A gamified digital learning platform for rural school students (grades 6–12) focusing on STEM subjects. Built with React, TypeScript, and Tailwind CSS, designed to be mobile-first, offline-capable, and multilingual.

---

## Table of Contents

- [Motivation](#motivation)
- [Features](#features)
- [Live Demo](#live-demo)
- [Technologies Used](#technologies-used)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
  - [GitHub Pages (Recommended)](#github-pages-recommended)
  - [Other Platforms](#other-platforms)
- [Configuration](#configuration)
  - [Repository Configuration](#repository-configuration)
  - [GitHub Pages Setup](#github-pages-setup)
- [Demo Credentials](#demo-credentials)
- [Offline Support](#offline-support)
- [Multilingual Support](#multilingual-support)
- [Core Modules](#core-modules)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Motivation

Rural students often face challenges such as limited internet access, lack of engaging STEM content, and language barriers. EduGameHub addresses these by offering gamified, offline-capable, and multilingual digital learning experiences.


---

## Features

- **Gamified Learning**: Pokemon Red-style top-down adventure games
- **Multilingual Support**: English, Spanish, and Tamil with quick toggle
- **Offline Access**: Downloadable lessons and offline capability
- **Mobile-First Design**: Optimized for low-cost devices
- **Dark/Light Mode**: Theme toggle with proper color system
- **Role-Based Access**: Student, Teacher, and Admin dashboards
- **PWA Support**: Progressive Web App capabilities

---

## Live Demo

Visit the live demo: [https://edugamiz.vercel.app/](https://edugamiz.vercel.app/)

---

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Components**: Custom shadcn/ui components
- **Deployment**: Vercel
---

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TuShArBhArDwA/EduGameHub.git
   cd EduGameHub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
```

---

## Deployment

### GitHub Pages (Recommended)

1. **Automatic Deployment** (Recommended):
   - Push your code to the `main` or `master` branch
   - GitHub Actions will automatically build and deploy your app
   - Your app will be available at `https://TuShArBhArDwA.github.io/EduGameHub/`

2. **Manual Deployment**:
   ```bash
   npm run deploy:gh-pages
   ```

### Other Platforms

- **Netlify**: `npm run deploy:netlify`
- **Vercel**: `npm run deploy:vercel`
- **Local Testing**: `npm run serve:local`

---

## Configuration

### Repository Configuration

The app is configured for the repository `edugamehub1` by user `Terrificdatabytes`. The base path in `vite.config.ts` is set to:

```typescript
base: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/edugamehub1/' : './',
```

### GitHub Pages Setup

1. Go to your repository settings: https://github.com/Terrificdatabytes/edugamehub1/settings
2. Navigate to "Pages" section in the left sidebar
3. Under "Source", select "GitHub Actions"
4. The deployment workflow will automatically deploy when you push to main/master
5. Your app will be available at: https://terrificdatabytes.github.io/edugamehub1/

**Important**: If you don't have a `package-lock.json` file, run `npm install` locally first to generate it, then commit it to your repository for faster CI builds.

---

## Demo Credentials

Use these credentials to test different user roles:

- **Student**: `student` / `demo123`
- **Teacher**: `teacher` / `demo123`
- **Admin**: `admin` / `demo123`

---

## Offline Support

The app includes:
- Service Worker for offline caching
- Offline status indicator
- Downloadable lessons
- Lite mode for low-end devices

---

## Multilingual Support

Supported languages:
- English (en)
- Spanish (es)
- Tamil (ta)
- Hindi (hi)


---

## Core Modules

1. **Student Dashboard**: Gamified learning with progress tracking
2. **Teacher Dashboard**: Content management and student analytics
3. **Admin Panel**: User management and system configuration
4. **Pokemon-style Games**: Subject-specific adventure games
5. **Compatibility Module**: Device detection and optimization
6. **Troubleshooting Module**: Diagnostic tools and help system

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact
- **Meet T-Bot** - [Discover My Work](https://t-bot-blush.vercel.app/)
- **Tushar Bhardwaj** - [Portfolio](https://tushar-bhardwaj.vercel.app/)
- **Connect 1:1** - [Topmate](https://topmate.io/tusharbhardwaj)
- **GitHub:** [TuShArBhArDwA](https://github.com/TuShArBhArDwA)
- **LinkedIn:** [Tushar Bhardwaj](https://www.linkedin.com/in/bhardwajtushar2004/)
- **Email:** [tusharbhardwaj2617@example.com](mailto:tusharbhardwaj2617@example.com)


  

# Tirmotu - Immersive Comic Viewer

An interactive comic viewing experience with animated transitions, focus points, and immersive storytelling.

## Features

- Guided comic viewing experience with smooth transitions between focus points
- Animated page transitions for a cinematic feel
- Interactive timeline with visual markers for navigation
- Auto-play functionality for hands-free viewing
- Dark/light theme support
- Fully responsive design

## Technologies

- **Next.js**: React framework for server-rendered applications
- **Mantine UI**: Component library for building the interface
- **Framer Motion**: Animation library for smooth transitions
- **Tabler Icons**: Clean, consistent icon set

## Architecture

The application uses Next.js for server-side rendering and static site generation. Key components:

- `ComicViewer`: Core component that displays comic pages and handles focus point transitions
- `useComicNavigation`: Custom hook that manages navigation state and logic
- `Slide Controls`: Interactive timeline slider for navigating between focus points
- `Theme Management`: Light/dark theme support using Mantine's color scheme

## Getting Started

```bash
# Install dependencies
yarn

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Data Structure

Comic data is structured as follows:

```typescript
interface ComicData {
  title: string;
  description: string;
  pages: ComicPage[];
}

interface ComicPage {
  id: number;
  imageUrl: string;
  focusPoints: FocusPoint[];
  title?: string;
}

interface FocusPoint {
  x: number;        // Horizontal position (0-100%)
  y: number;        // Vertical position (0-100%)
  scale: number;    // Zoom level
  duration: number; // Seconds to stay on this point
  transitionSpeed?: number;
  description?: string;
}
```

## PWA Support

The application includes Progressive Web App support, allowing it to be installed on mobile devices and used offline.

## Development

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load the Geist font.

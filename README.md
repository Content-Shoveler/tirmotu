# Tirmotu - Comic Viewer

An immersive comic viewing experience built with Next.js, Mantine UI, and Framer Motion.

## Features

- Interactive comic viewing with focus points and panels
- Smooth animations and transitions
- Timeline slider for easy navigation
- Dark/light theme support
- Responsive design for all devices

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [Mantine](https://mantine.dev/)
- **Icons**: [Tabler Icons](https://tabler-icons.io/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Hooks
- **Styling**: Mantine's built-in styling system

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/public/comic/` - Comic page images
- `/src/components/` - React components
- `/src/data/` - Comic data and configuration
- `/src/hooks/` - Custom React hooks
- `/src/pages/` - Next.js pages
- `/src/styles/` - Global styles
- `/src/utils/` - Utility functions and types

## Key Components

- `ComicViewer` - Core component for viewing the comic with focus points
- `ThemeToggle` - Dark/light mode toggle button
- `Layout` - Main layout wrapper for the application

## Development

### Running Tests

```bash
yarn test
```

### Building for Production

```bash
yarn build
```

Then start the production server:

```bash
yarn start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

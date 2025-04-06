# Tirmotu - Interactive Comic Viewer

An immersive comic viewing experience built with modern web technologies. Tirmotu presents a political fantasy narrative through animated focus points and smooth transitions.

## About the Comic

"Tirmotu" is a political fantasy narrative following characters including young Sita Suzeran through a world of intrigue, power dynamics, and political maneuvering. The story unfolds across multiple chapters:

- The Game (Pages 1-3)
- Great Houses (Pages 4-6)
- The Plot (Page 7)
- Young Sita Suzeran (Pages 8-12)

## Features

- **Focus Point Navigation**: Navigate through specific points of interest on each comic page
- **Intelligent Panel Flow**: Each panel guides the reader through the storytelling experience
- **Smooth Animations**: Powered by Framer Motion for fluid transitions between panels and pages
- **Timeline Navigation**: Jump to any point in the comic using the interactive timeline slider
- **Dark/Light Theme Support**: Comfortable reading in any lighting condition
- **Responsive Design**: Optimized viewing experience across all device sizes
- **PWA Support**: Install as a standalone application on supported devices
- **Smart Backward Navigation**: System remembers the last focus point viewed on each page
- **Auto-Play Mode**: Automatically advance through the comic for a hands-free experience
- **Full Keyboard Navigation**: Navigate the entire comic using just your keyboard
- **Circular Navigation**: Seamlessly loop from the end back to the beginning

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15.2.4
- **UI Library**: [Mantine](https://mantine.dev/) 7.17.3
- **Icons**: [Tabler Icons React](https://tabler-icons.io/) 3.31.0
- **Animations**: [Framer Motion](https://www.framer.com/motion/) 12.6.3
- **State Management**: React Hooks
- **Styling**: Mantine's emotion-based styling system
- **React & React DOM**: Version 19.0.0
- **TypeScript**: Full type safety across the project
- **PWA Support**: next-pwa 5.6.0

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

## Keyboard Navigation

The comic supports comprehensive keyboard navigation:

- **Right Arrow / Space**: Navigate to the next focus point
- **Left Arrow**: Navigate to the previous focus point
- **Up Arrow**: Navigate to the previous page
- **Down Arrow**: Navigate to the next page
- **P Key**: Toggle auto-play mode

## Project Structure

- `/originals/` - Source comic image files
- `/public/comic/` - Optimized comic page images
- `/public/icons/` - PWA icon assets in various sizes
- `/src/components/` - React components
- `/src/data/` - Comic data and configuration
- `/src/hooks/` - Custom React hooks (including the core navigation system)
- `/src/pages/` - Next.js page components
- `/src/styles/` - Global styles
- `/src/utils/` - Utility functions, types, and constants

## Key Components

- `ComicViewer` - Core component for viewing comic pages with focus points
- `Timeline` - Interactive slider for navigating through the comic
- `Navigation` - Controls for moving between pages and focus points
- `useComicNavigation` - Custom hook providing comprehensive navigation logic
- `Layout` - Main layout wrapper with header and footer
- `ThemeToggle` - Dark/light mode toggle button

## Storage and Persistence

The application maintains state across sessions:

- **Last Focus Points**: Remembers the last focus point viewed on each page
- **Auto-Play Preference**: Saves user preference for auto-play functionality

## PWA Capabilities

The comic viewer is installable as a Progressive Web App with:

- Offline support
- Home screen installation
- App-like experience
- Custom icons and splash screens

## Development Scripts

```bash
# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Lint the codebase
yarn lint

# Generate PWA icons
yarn generate-icons
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

import { ComicData, ComicPage } from '@/utils/types';

// Sample comic data for testing and demonstration
export const comicData: ComicData = {
  title: "The Adventure Begins",
  description: "A journey through an unknown world with unexpected turns and surprises.",
  pages: [
    {
      id: 1,
      imageUrl: "https://picsum.photos/id/237/900/1600",
      title: "The Beginning",
      focusPoints: [
        { x: 50, y: 20, scale: 1, duration: 2, transitionSpeed: 0.5 },
        { x: 30, y: 40, scale: 1.5, duration: 3, transitionSpeed: 1.2, description: "The hero begins their journey..." },
        { x: 60, y: 60, scale: 2, duration: 3, transitionSpeed: 0.8 },
        { x: 50, y: 80, scale: 1.5, duration: 2, transitionSpeed: 1.5, description: "What lies ahead is unknown." },
      ]
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/id/238/900/1600",
      title: "The Encounter",
      focusPoints: [
        { x: 50, y: 20, scale: 1, duration: 2, transitionSpeed: 0.3 },
        { x: 20, y: 30, scale: 2, duration: 3, transitionSpeed: 2.0, description: "A strange figure appears..." },
        { x: 70, y: 50, scale: 1.5, duration: 3, transitionSpeed: 0.6 },
        { x: 50, y: 70, scale: 2, duration: 2, transitionSpeed: 1.0, description: "They offer a mysterious object." },
      ]
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/id/239/900/1600",
      title: "The Decision",
      focusPoints: [
        { x: 50, y: 30, scale: 1, duration: 2, transitionSpeed: 0.4 },
        { x: 30, y: 40, scale: 1.5, duration: 3, transitionSpeed: 1.8, description: "The hero must choose..." },
        { x: 70, y: 40, scale: 1.5, duration: 3, transitionSpeed: 0.7 },
        { x: 50, y: 70, scale: 2, duration: 2, transitionSpeed: 2.5, description: "Each path has consequences." },
      ]
    },
    {
      id: 4,
      imageUrl: "https://picsum.photos/id/240/900/1600",
      title: "The Journey",
      focusPoints: [
        { x: 50, y: 20, scale: 1, duration: 2, transitionSpeed: 0.6 },
        { x: 20, y: 40, scale: 1.8, duration: 3, transitionSpeed: 0.9, description: "Through strange landscapes..." },
        { x: 80, y: 50, scale: 1.5, duration: 3, transitionSpeed: 1.2 },
        { x: 50, y: 80, scale: 2, duration: 2, transitionSpeed: 0.5, description: "Every step reveals new wonders." },
      ]
    },
    {
      id: 5,
      imageUrl: "https://picsum.photos/id/241/900/1600",
      title: "The Challenge",
      focusPoints: [
        { x: 50, y: 20, scale: 1, duration: 2, transitionSpeed: 1.0 },
        { x: 30, y: 40, scale: 2, duration: 3, transitionSpeed: 0.4, description: "A test of courage awaits..." },
        { x: 70, y: 60, scale: 1.5, duration: 3, transitionSpeed: 2.0 },
        { x: 50, y: 80, scale: 1.8, duration: 2, transitionSpeed: 0.8, description: "Will they overcome it?" },
      ]
    }
  ]
};

// Helper function to get total number of focus points across all pages
export const getTotalFocusPoints = (): number => {
  return comicData.pages.reduce((total, page) => total + page.focusPoints.length, 0);
};

// Helper function to get a page by its ID
export const getPageById = (id: number): ComicPage | undefined => {
  return comicData.pages.find(page => page.id === id);
};

// Helper function to get the next page ID
export const getNextPageId = (currentId: number): number | null => {
  const currentIndex = comicData.pages.findIndex(page => page.id === currentId);
  if (currentIndex === -1 || currentIndex === comicData.pages.length - 1) {
    return null;
  }
  return comicData.pages[currentIndex + 1].id;
};

// Helper function to get the previous page ID
export const getPrevPageId = (currentId: number): number | null => {
  const currentIndex = comicData.pages.findIndex(page => page.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  return comicData.pages[currentIndex - 1].id;
};

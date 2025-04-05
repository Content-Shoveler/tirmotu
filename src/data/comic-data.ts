import { ComicData, ComicPage } from '@/utils/types';

// Comic data using real images
export const comicData: ComicData = {
  title: "Tirmotu",
  description: "A journey through the political landscape of Tirmotu.",
  pages: [
    {
      id: 1,
      imageUrl: "/comic/page-1.png",
      title: "The Game",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 0.5 },
        { x: 30, y: 40, scale: 1.5, duration: 3, transitionSpeed: 1.2, description: "The hero begins their journey..." },
        { x: 60, y: 60, scale: 2, duration: 3, transitionSpeed: 0.8 },
        { x: 50, y: 80, scale: 1.5, duration: 2, transitionSpeed: 1.5, description: "What lies ahead is unknown." },
      ]
    },
    {
      id: 2,
      imageUrl: "/comic/page-2.png",
      title: "The Game",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 0.3 },
        { x: 20, y: 30, scale: 2, duration: 3, transitionSpeed: 2.0, description: "A strange figure appears..." },
        { x: 70, y: 50, scale: 1.5, duration: 3, transitionSpeed: 0.6 },
        { x: 50, y: 70, scale: 2, duration: 2, transitionSpeed: 1.0, description: "They offer a mysterious object." },
      ]
    },
    {
      id: 3,
      imageUrl: "/comic/page-3.png",
      title: "The Game",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 0.4 },
        { x: 30, y: 40, scale: 1.5, duration: 3, transitionSpeed: 1.8, description: "The hero must choose..." },
        { x: 70, y: 40, scale: 1.5, duration: 3, transitionSpeed: 0.7 },
        { x: 50, y: 70, scale: 2, duration: 2, transitionSpeed: 2.5, description: "Each path has consequences." },
      ]
    },
    {
      id: 4,
      imageUrl: "/comic/page-4.png",
      title: "Great Houses",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 0.6 },
        { x: 20, y: 40, scale: 1.8, duration: 3, transitionSpeed: 0.9, description: "Through strange landscapes..." },
        { x: 80, y: 50, scale: 1.5, duration: 3, transitionSpeed: 1.2 },
        { x: 50, y: 80, scale: 2, duration: 2, transitionSpeed: 0.5, description: "Every step reveals new wonders." },
      ]
    },
    {
      id: 5,
      imageUrl: "/comic/page-5.png",
      title: "Great Houses",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 1.0 },
        { x: 30, y: 40, scale: 2, duration: 3, transitionSpeed: 0.4, description: "A test of courage awaits..." },
        { x: 70, y: 60, scale: 1.5, duration: 3, transitionSpeed: 2.0 },
        { x: 50, y: 80, scale: 1.8, duration: 2, transitionSpeed: 0.8, description: "Will they overcome it?" },
      ]
    },
    {
      id: 6,
      imageUrl: "/comic/page-6.png",
      title: "Great Houses",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 0.5 },
        { x: 30, y: 40, scale: 1.5, duration: 3, transitionSpeed: 1.2, description: "The path forward emerges..." },
        { x: 60, y: 60, scale: 2, duration: 3, transitionSpeed: 0.8 },
        { x: 50, y: 80, scale: 1.5, duration: 2, transitionSpeed: 1.5, description: "Alliances must be formed." },
      ]
    },
    {
      id: 7,
      imageUrl: "/comic/page-7.png",
      title: "The Plot",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 0.3 },
        { x: 20, y: 30, scale: 2, duration: 3, transitionSpeed: 2.0, description: "Secrets begin to unfold..." },
        { x: 70, y: 50, scale: 1.5, duration: 3, transitionSpeed: 0.6 },
        { x: 50, y: 70, scale: 2, duration: 2, transitionSpeed: 1.0, description: "Not everything is as it seems." },
      ]
    },
    {
      id: 8,
      imageUrl: "/comic/page-8.png",
      title: "Young Sita Suzeran",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 0.4 },
        { x: 30, y: 40, scale: 1.5, duration: 3, transitionSpeed: 1.8, description: "A new character emerges..." },
        { x: 70, y: 40, scale: 1.5, duration: 3, transitionSpeed: 0.7 },
        { x: 50, y: 70, scale: 2, duration: 2, transitionSpeed: 2.5, description: "Her story begins to unfold." },
      ]
    },
    {
      id: 9,
      imageUrl: "/comic/page-9.png",
      title: "Young Sita",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 0.6 },
        { x: 20, y: 40, scale: 1.8, duration: 3, transitionSpeed: 0.9, description: "The past reveals itself..." },
        { x: 80, y: 50, scale: 1.5, duration: 3, transitionSpeed: 1.2 },
        { x: 50, y: 80, scale: 2, duration: 2, transitionSpeed: 0.5, description: "Each memory holds importance." },
      ]
    },
    {
      id: 10,
      imageUrl: "/comic/page-10.png",
      title: "Young Sita",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 1.0 },
        { x: 30, y: 40, scale: 2, duration: 3, transitionSpeed: 0.4, description: "Decisions are made..." },
        { x: 70, y: 60, scale: 1.5, duration: 3, transitionSpeed: 2.0 },
        { x: 50, y: 80, scale: 1.8, duration: 2, transitionSpeed: 0.8, description: "That will shape the future." },
      ]
    },
    {
      id: 11,
      imageUrl: "/comic/page-11.png",
      title: "Young Sita",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 0.5 },
        { x: 30, y: 40, scale: 1.5, duration: 3, transitionSpeed: 1.2, description: "The challenge intensifies..." },
        { x: 60, y: 60, scale: 2, duration: 3, transitionSpeed: 0.8 },
        { x: 50, y: 80, scale: 1.5, duration: 2, transitionSpeed: 1.5, description: "Every choice has a cost." },
      ]
    },
    {
      id: 12,
      imageUrl: "/comic/page-12.png",
      title: "Young Sita",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2, transitionSpeed: 0.3 },
        { x: 20, y: 30, scale: 2, duration: 3, transitionSpeed: 2.0, description: "The story continues..." },
        { x: 70, y: 50, scale: 1.5, duration: 3, transitionSpeed: 0.6 },
        { x: 50, y: 70, scale: 2, duration: 2, transitionSpeed: 1.0, description: "With more to be revealed." },
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

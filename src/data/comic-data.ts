import { ComicData, ComicPage, FocusPoint } from '@/utils/types';

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
        { x: 50, y: 50, scale: 1, duration: 1.8, transitionSpeed: 2.3, description: "A world of intrigue and politics awaits..." },
        { x: 50, y: -10, scale: 2.2, duration: 3.2, transitionSpeed: 3.2, description: "The hero begins their journey..." },
        { x: 50, y: 50, scale: 2.5, duration: 2.5, transitionSpeed: 2.8, description: "Shadows lurk in every corner." },
        { x: 50, y: 115, scale: 2.3, duration: 2.7, transitionSpeed: 3.5, description: "What lies ahead is unknown." },
        { x: 50, y: 50, scale: 1, duration: 3.5, transitionSpeed: 2.5, description: "The first steps are always the hardest." },
      ]
    },
    {
      id: 2,
      imageUrl: "/comic/page-2.png",
      title: "The Game",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2.3, transitionSpeed: 2.6, description: "The tension builds in the air..." },
        { x: 50, y: -15, scale: 2.4, duration: 4.0, transitionSpeed: 3.8, description: "A strange figure appears..." },
        { x: 30, y: 50, scale: 2.6, duration: 2.8, transitionSpeed: 2.4, description: "Their intentions remain unclear." },
        { x: 65, y: 50, scale: 2.3, duration: 3.2, transitionSpeed: 4.2, description: "They offer a mysterious object." },
        { x: 50, y: 110, scale: 2, duration: 3.2, transitionSpeed: 4.2, description: "They offer a mysterious object." },
        { x: 50, y: 50, scale: 1, duration: 2.3, transitionSpeed: 2.6, description: "The tension builds in the air..." },
      ]
    },
    {
      id: 3,
      imageUrl: "/comic/page-3.png",
      title: "The Game",
      focusPoints: [
        { x: 50, y: 50, scale: 1, duration: 2.3, transitionSpeed: 2.6, description: "The tension builds in the air..." },
        { x: 50, y: -15, scale: 2.4, duration: 4.0, transitionSpeed: 3.8, description: "A strange figure appears..." },
        { x: 10, y: 50, scale: 2.8, duration: 2.8, transitionSpeed: 2.4, description: "Their intentions remain unclear." },
        { x: 50, y: 50, scale: 2.4, duration: 4.0, transitionSpeed: 3.8, description: "A strange figure appears..." },
        { x: 25, y: 130, scale: 2.8, duration: 2.8, transitionSpeed: 2.4, description: "Their intentions remain unclear." },
        { x: 65, y: 127, scale: 2.6, duration: 2.8, transitionSpeed: 2.4, description: "Their intentions remain unclear." },
        { x: 50, y: 50, scale: 1, duration: 2.3, transitionSpeed: 2.6, description: "The tension builds in the air..." },
      ]
    },
    {
      id: 4,
      imageUrl: "/comic/page-4.png",
      title: "Great Houses",
      focusPoints: [
        { x: 50, y: 40, scale: 1.4, duration: 1.6, transitionSpeed: 2.7, description: "The great houses stand tall..." },
        { x: 20, y: 30, scale: 2.1, duration: 3.5, transitionSpeed: 3.1, description: "Through strange landscapes..." },
        { x: 85, y: 60, scale: 1.9, duration: 2.7, transitionSpeed: 2.5, description: "Ancient powers wait to be discovered." },
        { x: 45, y: 85, scale: 2.3, duration: 4.2, transitionSpeed: 3.0, description: "Every step reveals new wonders." },
        { x: 30, y: 55, scale: 1.5, duration: 2.0, transitionSpeed: 3.8, description: "The journey grows more treacherous." },
      ]
    },
    {
      id: 5,
      imageUrl: "/comic/page-5.png",
      title: "Great Houses",
      focusPoints: [
        { x: 60, y: 45, scale: 1.3, duration: 2.5, transitionSpeed: 3.2, description: "Secrets whisper in shadowed halls..." },
        { x: 25, y: 35, scale: 2.6, duration: 3.0, transitionSpeed: 2.8, description: "A test of courage awaits..." },
        { x: 80, y: 65, scale: 1.7, duration: 2.3, transitionSpeed: 4.5, description: "Will they overcome it?" },
      ]
    },
    {
      id: 6,
      imageUrl: "/comic/page-6.png",
      title: "Great Houses",
      focusPoints: [
        { x: 45, y: 55, scale: 1.2, duration: 2.1, transitionSpeed: 2.9, description: "Power dynamics shift constantly..." },
        { x: 20, y: 30, scale: 1.9, duration: 4.5, transitionSpeed: 3.2, description: "The path forward emerges..." },
        { x: 65, y: 50, scale: 2.4, duration: 3.3, transitionSpeed: 2.6, description: "Enemies lurk in the shadows." },
        { x: 40, y: 75, scale: 1.8, duration: 2.9, transitionSpeed: 3.8, description: "Alliances must be formed." },
        { x: 75, y: 20, scale: 2.1, duration: 3.8, transitionSpeed: 3.0, description: "Old feuds threaten to reignite." },
        { x: 15, y: 65, scale: 1.5, duration: 2.6, transitionSpeed: 2.4, description: "Trust is a rare and valuable currency." },
      ]
    },
    {
      id: 7,
      imageUrl: "/comic/page-7.png",
      title: "The Plot",
      focusPoints: [
        { x: 55, y: 45, scale: 1.3, duration: 2.4, transitionSpeed: 2.7, description: "The plot thickens like morning fog..." },
        { x: 15, y: 25, scale: 2.8, duration: 3.9, transitionSpeed: 3.8, description: "Secrets begin to unfold..." },
        { x: 75, y: 55, scale: 1.6, duration: 2.2, transitionSpeed: 2.2, description: "Hidden agendas come to light." },
        { x: 40, y: 70, scale: 2.3, duration: 4.8, transitionSpeed: 3.3, description: "Not everything is as it seems." },
      ]
    },
    {
      id: 8,
      imageUrl: "/comic/page-8.png",
      title: "Young Sita Suzeran",
      focusPoints: [
        { x: 50, y: 45, scale: 1.2, duration: 1.9, transitionSpeed: 2.9, description: "Young Sita stands resolute..." },
        { x: 25, y: 35, scale: 1.7, duration: 3.6, transitionSpeed: 3.6, description: "A new character emerges..." },
        { x: 70, y: 30, scale: 2.1, duration: 2.5, transitionSpeed: 2.5, description: "Her eyes hold determination and wisdom." },
        { x: 45, y: 80, scale: 2.4, duration: 3.1, transitionSpeed: 4.0, description: "Her story begins to unfold." },
        { x: 15, y: 65, scale: 1.8, duration: 2.3, transitionSpeed: 3.2, description: "A destiny awaits this young Suzeran." },
      ]
    },
    {
      id: 9,
      imageUrl: "/comic/page-9.png",
      title: "Young Sita",
      focusPoints: [
        { x: 55, y: 40, scale: 1.4, duration: 2.7, transitionSpeed: 3.2, description: "Fragments of the past emerge..." },
        { x: 15, y: 35, scale: 2.2, duration: 3.5, transitionSpeed: 2.8, description: "The past reveals itself..." },
        { x: 85, y: 60, scale: 1.9, duration: 2.8, transitionSpeed: 3.9, description: "Childhood experiences shaped her worldview." },
        { x: 60, y: 85, scale: 2.7, duration: 4.2, transitionSpeed: 2.6, description: "Each memory holds importance." },
        { x: 30, y: 20, scale: 1.6, duration: 1.9, transitionSpeed: 3.4, description: "Early lessons in politics and power." },
        { x: 75, y: 30, scale: 2.0, duration: 3.0, transitionSpeed: 4.2, description: "The making of a future leader." },
      ]
    },
    {
      id: 10,
      imageUrl: "/comic/page-10.png",
      title: "Young Sita",
      focusPoints: [
        { x: 45, y: 55, scale: 1.5, duration: 2.0, transitionSpeed: 3.0, description: "At a pivotal moment in her journey..." },
        { x: 25, y: 30, scale: 2.5, duration: 4.4, transitionSpeed: 2.3, description: "Decisions are made..." },
        { x: 65, y: 70, scale: 1.7, duration: 2.6, transitionSpeed: 4.5, description: "The stakes have never been higher." },
        { x: 35, y: 85, scale: 2.2, duration: 3.9, transitionSpeed: 2.8, description: "That will shape the future." },
      ]
    },
    {
      id: 11,
      imageUrl: "/comic/page-11.png",
      title: "Young Sita",
      focusPoints: [
        { x: 55, y: 45, scale: 1.3, duration: 2.1, transitionSpeed: 2.7, description: "Sita faces her greatest trial yet..." },
        { x: 25, y: 35, scale: 1.8, duration: 3.4, transitionSpeed: 3.2, description: "The challenge intensifies..." },
        { x: 70, y: 65, scale: 2.3, duration: 2.8, transitionSpeed: 3.0, description: "Opposition grows stronger by the day." },
        { x: 45, y: 75, scale: 1.6, duration: 3.7, transitionSpeed: 3.5, description: "Her resolve remains unbroken." },
        { x: 15, y: 50, scale: 2.0, duration: 2.5, transitionSpeed: 4.1, description: "Every choice has a cost." },
      ]
    },
    {
      id: 12,
      imageUrl: "/comic/page-12.png",
      title: "Young Sita",
      focusPoints: [
        { x: 50, y: 45, scale: 1.1, duration: 1.5, transitionSpeed: 2.5, description: "This chapter comes to a close..." },
        { x: 20, y: 25, scale: 2.4, duration: 3.1, transitionSpeed: 3.7, description: "The story continues..." },
        { x: 80, y: 55, scale: 1.8, duration: 4.0, transitionSpeed: 2.6, description: "New allies and adversaries await." },
        { x: 35, y: 75, scale: 2.6, duration: 2.9, transitionSpeed: 3.2, description: "With more to be revealed." },
        { x: 60, y: 35, scale: 1.5, duration: 3.6, transitionSpeed: 4.3, description: "The young Suzeran's path unfolds." },
        { x: 10, y: 60, scale: 2.0, duration: 2.2, transitionSpeed: 2.9, description: "Her legend is only beginning." },
      ]
    }
  ]
};

// Helper function to get total number of focus points across all pages
export const getTotalFocusPoints = (): number => {
  return comicData.pages.reduce((total, page) => total + page.focusPoints.length, 0);
};

// Helper function to get total number of navigation points (all focus points across all pages)
export const getTotalNavigationPoints = (): number => {
  return comicData.pages.reduce((total, page) => total + page.focusPoints.length, 0);
};

// Convert absolute index to page and focus point indices
export const getPageAndFocusPointFromAbsoluteIndex = (absoluteIndex: number): 
  { pageId: number; focusPointIndex: number } | null => {
  let currentIndex = 0;
  
  for (const page of comicData.pages) {
    if (absoluteIndex < currentIndex + page.focusPoints.length) {
      return {
        pageId: page.id,
        focusPointIndex: absoluteIndex - currentIndex
      };
    }
    currentIndex += page.focusPoints.length;
  }
  
  return null; // Out of bounds
};

// Get absolute index from page id and focus point index
export const getAbsoluteIndexFromPageAndFocusPoint = (
  pageId: number, 
  focusPointIndex: number
): number => {
  let absoluteIndex = 0;
  
  for (const page of comicData.pages) {
    if (page.id === pageId) {
      return absoluteIndex + focusPointIndex;
    }
    absoluteIndex += page.focusPoints.length;
  }
  
  return -1; // Not found
};

// Get focus point by absolute index
export const getFocusPointByAbsoluteIndex = (absoluteIndex: number): 
  { page: ComicPage; focusPoint: FocusPoint } | null => {
  const result = getPageAndFocusPointFromAbsoluteIndex(absoluteIndex);
  if (!result) return null;
  
  const page = getPageById(result.pageId);
  if (!page) return null;
  
  return {
    page,
    focusPoint: page.focusPoints[result.focusPointIndex]
  };
};

// Helper function to get a page by its ID
export const getPageById = (id: number): ComicPage | undefined => {
  return comicData.pages.find(page => page.id === id);
};

// Helper function to get the next page ID
export const getNextPageId = (currentId: number): number | null => {
  const currentIndex = comicData.pages.findIndex(page => page.id === currentId);
  
  // If we're at the last comic page, return the end page (one number more than there are images)
  if (currentIndex === comicData.pages.length - 1) {
    return comicData.pages.length + 1; // This will be 13 with 12 comic pages
  }
  
  // If we're at an invalid page or the end page itself, return null
  if (currentIndex === -1 || currentId > comicData.pages.length) {
    return null;
  }
  
  return comicData.pages[currentIndex + 1].id;
};

// Helper function to get the previous page ID
export const getPrevPageId = (currentId: number): number | null => {
  // If we're on the end page (one number more than there are images), return the last page
  if (currentId === comicData.pages.length + 1) {
    return comicData.pages[comicData.pages.length - 1].id;
  }
  
  const currentIndex = comicData.pages.findIndex(page => page.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  return comicData.pages[currentIndex - 1].id;
};

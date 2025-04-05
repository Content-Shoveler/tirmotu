import { ComicPage } from "@/types";

// This is sample data representing comic pages and their focus points
export const comicPages: ComicPage[] = [
  {
    id: 1,
    filename: "/comics/page1.jpg",
    title: "Introduction",
    cached: true,
    focusPoints: [
      { x: 25, y: 25, scale: 1.0, duration: 2, description: "Our story begins..." },
      { x: 75, y: 25, scale: 1.5, duration: 3, description: "In a distant galaxy..." },
      { x: 50, y: 75, scale: 2.0, duration: 3, description: "Where adventure awaits." }
    ]
  },
  {
    id: 2,
    filename: "/comics/page2.jpg",
    title: "The Journey Begins",
    cached: true,
    focusPoints: [
      { x: 20, y: 30, scale: 1.0, duration: 2 },
      { x: 80, y: 30, scale: 1.5, duration: 3, description: "Our heroes set out..." },
      { x: 50, y: 70, scale: 2.0, duration: 3 }
    ]
  },
  {
    id: 3,
    filename: "/comics/page3.jpg",
    cached: false,
    focusPoints: [
      { x: 30, y: 20, scale: 1.0, duration: 2, description: "Encountering challenges..." },
      { x: 70, y: 40, scale: 1.5, duration: 3 },
      { x: 50, y: 80, scale: 2.0, duration: 3, description: "And making new allies." }
    ]
  },
  {
    id: 4,
    filename: "/comics/page4.jpg",
    title: "The Revelation",
    cached: false,
    focusPoints: [
      { x: 40, y: 30, scale: 1.0, duration: 2 },
      { x: 60, y: 30, scale: 1.5, duration: 3, description: "A shocking discovery..." },
      { x: 40, y: 60, scale: 2.0, duration: 3 }
    ]
  },
  {
    id: 5,
    filename: "/comics/page5.jpg",
    title: "The Conclusion",
    cached: true,
    focusPoints: [
      { x: 30, y: 20, scale: 1.0, duration: 2, description: "As the story ends..." },
      { x: 70, y: 50, scale: 1.5, duration: 3 },
      { x: 50, y: 80, scale: 2.0, duration: 3, description: "A new adventure awaits." }
    ]
  }
];

export const totalPages = comicPages.length;

// Get a page by its ID
export const getPageById = (id: number): ComicPage | undefined => {
  return comicPages.find(page => page.id === id);
};

// Get next page ID
export const getNextPageId = (currentId: number): number | null => {
  const nextPage = comicPages.find(page => page.id === currentId + 1);
  return nextPage ? nextPage.id : null;
};

// Get previous page ID
export const getPrevPageId = (currentId: number): number | null => {
  const prevPage = comicPages.find(page => page.id === currentId - 1);
  return prevPage ? prevPage.id : null;
};

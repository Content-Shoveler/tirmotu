import { ComicPage } from "@/types";

// Comic pages data with focus points
export const comicPages: ComicPage[] = [
  {
    id: 0,
    filename: "/comics/page0.png",
    title: "Cover",
    cached: true,
    focusPoints: [
      { x: 50, y: 50, scale: 1.0, duration: 2, description: "Cover page" },
      { x: 30, y: 30, scale: 1.5, duration: 2 },
      { x: 70, y: 70, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 1,
    filename: "/comics/page1.png",
    title: "The Game",
    cached: true,
    focusPoints: [
      { x: 25, y: 25, scale: 1.0, duration: 2, description: "The story begins..." },
      { x: 75, y: 25, scale: 1.5, duration: 2 },
      { x: 50, y: 75, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 2,
    filename: "/comics/page2.png",
    title: "The Game",
    cached: true,
    focusPoints: [
      { x: 30, y: 30, scale: 1.0, duration: 2 },
      { x: 70, y: 30, scale: 1.5, duration: 2, description: "Game continues..." },
      { x: 50, y: 70, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 3,
    filename: "/comics/page3.png",
    title: "The Game",
    cached: true,
    focusPoints: [
      { x: 30, y: 20, scale: 1.0, duration: 2, description: "Game finale" },
      { x: 70, y: 40, scale: 1.5, duration: 2 },
      { x: 50, y: 80, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 4,
    filename: "/comics/page4.png",
    title: "Great Houses",
    cached: true,
    focusPoints: [
      { x: 40, y: 30, scale: 1.0, duration: 2 },
      { x: 60, y: 30, scale: 1.5, duration: 2, description: "The great houses..." },
      { x: 40, y: 60, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 5,
    filename: "/comics/page5.png",
    title: "Great Houses",
    cached: true,
    focusPoints: [
      { x: 30, y: 20, scale: 1.0, duration: 2, description: "Houses and their history" },
      { x: 70, y: 50, scale: 1.5, duration: 2 },
      { x: 50, y: 80, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 6,
    filename: "/comics/page6.png",
    title: "Great Houses",
    cached: true,
    focusPoints: [
      { x: 25, y: 25, scale: 1.0, duration: 2 },
      { x: 75, y: 25, scale: 1.5, duration: 2, description: "House alliances" },
      { x: 50, y: 75, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 7,
    filename: "/comics/page7.png",
    title: "SS&CC Plot",
    cached: true,
    focusPoints: [
      { x: 30, y: 30, scale: 1.0, duration: 2, description: "The plot unfolds" },
      { x: 70, y: 30, scale: 1.5, duration: 2 },
      { x: 50, y: 70, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 8,
    filename: "/comics/page8.png",
    title: "Young Sita Suzeran",
    cached: true,
    focusPoints: [
      { x: 30, y: 20, scale: 1.0, duration: 2 },
      { x: 70, y: 40, scale: 1.5, duration: 2, description: "Young Sita's rise" },
      { x: 50, y: 80, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 9,
    filename: "/comics/page9.png",
    title: "Young Sita",
    cached: true,
    focusPoints: [
      { x: 40, y: 30, scale: 1.0, duration: 2, description: "Sita's journey begins" },
      { x: 60, y: 30, scale: 1.5, duration: 2 },
      { x: 40, y: 60, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 10,
    filename: "/comics/page10.png",
    title: "Young Sita",
    cached: true,
    focusPoints: [
      { x: 30, y: 20, scale: 1.0, duration: 2 },
      { x: 70, y: 50, scale: 1.5, duration: 2, description: "Sita's challenges" },
      { x: 50, y: 80, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 11,
    filename: "/comics/page11.png",
    title: "Young Sita",
    cached: true,
    focusPoints: [
      { x: 25, y: 25, scale: 1.0, duration: 2, description: "Sita's determination" },
      { x: 75, y: 25, scale: 1.5, duration: 2 },
      { x: 50, y: 75, scale: 1.2, duration: 2 }
    ]
  },
  {
    id: 12,
    filename: "/comics/page12.png",
    title: "Young Sita",
    cached: true,
    focusPoints: [
      { x: 30, y: 30, scale: 1.0, duration: 2 },
      { x: 70, y: 30, scale: 1.5, duration: 2 },
      { x: 50, y: 70, scale: 1.2, duration: 2, description: "Sita's triumph" }
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

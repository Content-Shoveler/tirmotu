import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { 
  getPageById, 
  getNextPageId, 
  getPrevPageId,
  getAbsoluteIndexFromPageAndFocusPoint,
  getPageAndFocusPointFromAbsoluteIndex,
  getTotalNavigationPoints,
  comicData
} from '@/data/comic-data';
import { FocusPoint } from '@/utils/types';

export interface ComicNavigationState {
  currentPageId: number;
  currentFocusPointIndex: number;
  focusPoints: FocusPoint[];
  isAutoPlaying: boolean;
  hasNextPoint: boolean;
  hasPrevPoint: boolean;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentFocusPoint: FocusPoint | null;
  isLoading: boolean;
  absoluteIndex: number;
  totalNavigationPoints: number;
}

export interface ComicNavigationActions {
  nextPoint: () => boolean;
  prevPoint: () => boolean;
  nextPage: () => boolean;
  prevPage: () => boolean;
  goToFocusPoint: (index: number) => boolean;
  navigateToAbsoluteIndex: (index: number) => boolean;
  toggleAutoPlay: () => void;
}

export default function useComicNavigation(initialPageId: number): [ComicNavigationState, ComicNavigationActions] {
  const router = useRouter();
  const [currentPageId, setCurrentPageId] = useState<number>(initialPageId);
  const [currentFocusPointIndex, setCurrentFocusPointIndex] = useState<number>(0);
  const [absoluteIndex, setAbsoluteIndex] = useState<number>(() => {
    return getAbsoluteIndexFromPageAndFocusPoint(initialPageId, 0);
  });
  
  // Parse URL hash to get focus point index
  const getFocusPointFromHash = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    
    const hash = window.location.hash;
    if (!hash) return 0;
    
    // Remove the # symbol and parse as integer
    const focusIndex = parseInt(hash.substring(1), 10);
    return !isNaN(focusIndex) ? focusIndex : 0;
  }, []);
  
  // Update URL hash based on current focus point index
  const updateUrlHash = useCallback((index: number) => {
    if (typeof window === 'undefined') return;
    
    // Only use hash for non-zero indices (first focus point has no hash)
    if (index === 0) {
      // Remove hash if it exists
      if (window.location.hash) {
        // Use history API to update the URL without triggering a navigation
        window.history.replaceState(
          {}, 
          '', 
          `/${currentPageId}`
        );
      }
    } else {
      // Add or update hash
      window.history.replaceState(
        {}, 
        '', 
        `/${currentPageId}#${index}`
      );
    }
  }, [currentPageId]);
  
  // Initialize autoplay state from localStorage if available
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('comic-autoplay');
      return savedState === 'true';
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Get focus points for current page
  const currentPage = getPageById(currentPageId);
  const focusPoints = currentPage?.focusPoints || [];
  
  // Calculate navigation availability
  const totalPoints = getTotalNavigationPoints();
  const hasNextPoint = absoluteIndex < totalPoints - 1;
  const hasPrevPoint = absoluteIndex > 0;
  const hasNextPage = getNextPageId(currentPageId) !== null;
  const hasPrevPage = getPrevPageId(currentPageId) !== null;
  
  // Timeline spacing constants (must match Timeline.tsx and index.tsx)
  const COMIC_START_INDEX = 2; // Space for Home (0) and separator (1)
  
  // Update absolute index when page or focus point changes
  useEffect(() => {
    // For the end page, use totalPoints + offset
    if (currentPageId === comicData.pages.length + 1) {
      setAbsoluteIndex(totalPoints + COMIC_START_INDEX);
      return;
    }
    
    // Get the base absolute index from the comic data
    const baseAbsoluteIndex = getAbsoluteIndexFromPageAndFocusPoint(
      currentPageId, 
      currentFocusPointIndex
    );
    
    if (baseAbsoluteIndex !== -1) {
      // Apply offset for comic content to account for Home and separator
      const adjustedIndex = baseAbsoluteIndex + COMIC_START_INDEX;
      setAbsoluteIndex(adjustedIndex);
    }
  }, [currentPageId, currentFocusPointIndex, totalPoints]);
  
  // Get current focus point
  const currentFocusPoint = focusPoints[currentFocusPointIndex] || null;
  
  // Navigation based on absolute index
  const navigateToAbsoluteIndex = useCallback((newAbsoluteIndex: number) => {
    console.log(`useComicNavigation: Navigating to absolute index ${newAbsoluteIndex}`);
    
    // Constants for timeline spacing (must match those in Timeline.tsx)
    const HOME_INDEX = 0;
    const COMIC_START_INDEX = 2; // Space for Home (0) and separator (1)
    
    // Handle special indices
    
    // Home page
    if (newAbsoluteIndex === HOME_INDEX) {
      setIsLoading(true);
      router.push('/');
      return true;
    }
    
    // Skip separator
    if (newAbsoluteIndex === 1) return false;
    
    // End page
    const END_INDEX = totalPoints + COMIC_START_INDEX;
    if (newAbsoluteIndex === END_INDEX) {
      setIsLoading(true);
      router.push(`/${comicData.pages.length + 1}`);
      return true;
    }
    
    // Validate range for comic content
    if (newAbsoluteIndex < COMIC_START_INDEX || newAbsoluteIndex >= END_INDEX) return false;
    
    // Adjust the index back to match the comic data indexing
    const adjustedIndex = newAbsoluteIndex - COMIC_START_INDEX;
    
    // Get the corresponding page and focus point
    const result = getPageAndFocusPointFromAbsoluteIndex(adjustedIndex);
    if (!result) return false;
    
    if (result.pageId !== currentPageId) {
      setIsLoading(true);
      router.push(`/${result.pageId}#${result.focusPointIndex}`);
      return true;
    } else {
      setCurrentFocusPointIndex(result.focusPointIndex);
      updateUrlHash(result.focusPointIndex);
      return true;
    }
  }, [currentPageId, router, updateUrlHash, totalPoints]);
  
  // Update navigation methods to use absolute index
  const nextPoint = useCallback(() => {
    return navigateToAbsoluteIndex(absoluteIndex + 1);
  }, [absoluteIndex, navigateToAbsoluteIndex]);
  
  const prevPoint = useCallback(() => {
    // If we're on page 1 and at the first focus point, go back to homepage
    if (currentPageId === 1 && currentFocusPointIndex === 0) {
      setIsLoading(true);
      router.push('/');
      return true;
    }
    
    return navigateToAbsoluteIndex(absoluteIndex - 1);
  }, [absoluteIndex, navigateToAbsoluteIndex, currentPageId, currentFocusPointIndex, router]);
  
  const nextPage = useCallback(() => {
    if (hasNextPage) {
      const nextId = getNextPageId(currentPageId);
      if (nextId) {
        setIsLoading(true);
        router.push(`/${nextId}`);
        return true;
      }
    }
    return false;
  }, [hasNextPage, currentPageId, router]);
  
  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      const prevId = getPrevPageId(currentPageId);
      if (prevId) {
        setIsLoading(true);
        router.push(`/${prevId}`);
        return true;
      }
    }
    return false;
  }, [hasPrevPage, currentPageId, router]);
  
  const goToFocusPoint = useCallback((index: number) => {
    if (index >= 0 && index < focusPoints.length) {
      setCurrentFocusPointIndex(index);
      updateUrlHash(index);
      return true;
    }
    return false;
  }, [focusPoints.length, updateUrlHash]);
  
  const toggleAutoPlay = useCallback(() => {
    const newState = !isAutoPlaying;
    setIsAutoPlaying(newState);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('comic-autoplay', newState.toString());
    }
  }, [isAutoPlaying]);
  
  // Auto-play effect - updated to use nextPoint
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAutoPlaying && currentFocusPoint) {
      timer = setTimeout(() => {
        const success = nextPoint();
        if (!success) {
          setIsAutoPlaying(false);
          // Also update localStorage when autoplay stops automatically
          if (typeof window !== 'undefined') {
            localStorage.setItem('comic-autoplay', 'false');
          }
        }
      }, currentFocusPoint.duration * 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAutoPlaying, currentFocusPoint, nextPoint]);
  
  // Sync with URL parameter when page changes (without modifying focus point)
  useEffect(() => {
    if (router.isReady && router.query.pageNumber) {
      const pageId = parseInt(router.query.pageNumber as string, 10);
      if (!isNaN(pageId) && pageId !== currentPageId) {
        setCurrentPageId(pageId);
        setIsLoading(false);
      }
    }
  }, [router.isReady, router.query.pageNumber, currentPageId]);
  
  // Handle initial hash value and hash changes
  useEffect(() => {
    if (router.isReady && typeof window !== 'undefined') {
      const handleHashChange = () => {
        const focusIndex = getFocusPointFromHash();
        const page = getPageById(currentPageId);
        
        // Validate focus index is within bounds for the current page
        if (page && focusIndex >= 0 && focusIndex < page.focusPoints.length) {
          setCurrentFocusPointIndex(focusIndex);
        }
      };
      
      // Process hash on initial load
      handleHashChange();
      
      // Listen for hash changes
      window.addEventListener('hashchange', handleHashChange);
      
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, [router.isReady, currentPageId, getFocusPointFromHash]);
  
  // Update URL hash when focus point changes (but not on initial load)
  useEffect(() => {
    if (router.isReady && !isLoading && typeof window !== 'undefined') {
      // Don't update URL if we're just initializing from the hash
      const currentHash = getFocusPointFromHash();
      if (currentHash !== currentFocusPointIndex) {
        updateUrlHash(currentFocusPointIndex);
      }
    }
  }, [currentFocusPointIndex, router.isReady, isLoading, updateUrlHash, getFocusPointFromHash]);
  
  // Key navigation - updated to use nextPoint/prevPoint
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextPoint();
      } else if (e.key === 'ArrowLeft') {
        prevPoint();
      } else if (e.key === 'ArrowUp') {
        prevPage();
      } else if (e.key === 'ArrowDown') {
        nextPage();
      } else if (e.key === 'p') {
        toggleAutoPlay();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextPoint, prevPoint, nextPage, prevPage, toggleAutoPlay]);
  
  return [
    {
      currentPageId,
      currentFocusPointIndex,
      focusPoints,
      isAutoPlaying,
      hasNextPoint,
      hasPrevPoint,
      hasNextPage,
      hasPrevPage,
      currentFocusPoint,
      isLoading,
      absoluteIndex,
      totalNavigationPoints: totalPoints
    },
    {
      nextPoint,
      prevPoint,
      nextPage,
      prevPage,
      goToFocusPoint,
      navigateToAbsoluteIndex,
      toggleAutoPlay
    }
  ];
}

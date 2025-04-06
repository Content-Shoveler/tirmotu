import { useState, useEffect, useCallback, useRef } from 'react';
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
import { NAVIGATION_CONSTANTS, LastFocusPoints } from '@/utils/navigation-constants';

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
  // For debugging
  lastFocusPoints?: LastFocusPoints;
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

/**
 * Custom hook for comic navigation that handles:
 * - Navigation between focus points on a page
 * - Navigation between pages
 * - Circular navigation (home -> pages -> end -> home)
 * - Smart backwards navigation (remembers last viewed focus point)
 * - Absolute index navigation for the timeline
 * - URL synchronization
 * - Auto-play functionality
 */
export default function useComicNavigation(initialPageId: number): [ComicNavigationState, ComicNavigationActions] {
  const router = useRouter();
  const [currentPageId, setCurrentPageId] = useState<number>(initialPageId);
  const [currentFocusPointIndex, setCurrentFocusPointIndex] = useState<number>(0);
  const [absoluteIndex, setAbsoluteIndex] = useState<number>(() => {
    // Special case for homepage
    if (initialPageId === 0) {
      return NAVIGATION_CONSTANTS.HOME_INDEX;
    }
    
    // Special case for end page
    if (initialPageId === comicData.pages.length + 1) {
      const totalPoints = getTotalNavigationPoints();
      return totalPoints + NAVIGATION_CONSTANTS.COMIC_START_INDEX;
    }
    
    return getAbsoluteIndexFromPageAndFocusPoint(initialPageId, 0) + NAVIGATION_CONSTANTS.COMIC_START_INDEX;
  });
  
  // Track last viewed focus point for each page for smarter backward navigation
  const [lastFocusPoints, setLastFocusPoints] = useState<LastFocusPoints>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(NAVIGATION_CONSTANTS.LAST_FOCUS_POINTS_STORAGE_KEY);
      if (savedState) {
        try {
          return JSON.parse(savedState);
        } catch (e) {
          console.error('Failed to parse last focus points from localStorage', e);
        }
      }
    }
    return {};
  });
  
  // Reference to track if this is the initial page load
  const isInitialLoad = useRef(true);
  
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
    
    // Don't update URL for non-comic pages (home/end)
    if (currentPageId === 0 || currentPageId > comicData.pages.length) {
      return;
    }
    
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
      const savedState = localStorage.getItem(NAVIGATION_CONSTANTS.AUTOPLAY_STORAGE_KEY);
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
  const endIndex = totalPoints + NAVIGATION_CONSTANTS.COMIC_START_INDEX;
  
  // Enable circular navigation by always allowing next/prev
  const hasNextPoint = true; // Always allow forward navigation
  const hasPrevPoint = true; // Always allow backward navigation
  const hasNextPage = currentPageId < comicData.pages.length + 1; // Allow until we reach end page
  const hasPrevPage = currentPageId > 0; // Allow until we reach home page
  
  // Update absolute index when page or focus point changes
  useEffect(() => {
    // Skip for initial rendering
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    
    // Special case for homepage
    if (currentPageId === 0) {
      setAbsoluteIndex(NAVIGATION_CONSTANTS.HOME_INDEX);
      return;
    }
    
    // Special case for end page
    if (currentPageId === comicData.pages.length + 1) {
      setAbsoluteIndex(endIndex);
      return;
    }
    
    // Get the base absolute index from the comic data
    const baseAbsoluteIndex = getAbsoluteIndexFromPageAndFocusPoint(
      currentPageId, 
      currentFocusPointIndex
    );
    
    if (baseAbsoluteIndex !== -1) {
      // Apply offset for comic content to account for Home and separator
      const adjustedIndex = baseAbsoluteIndex + NAVIGATION_CONSTANTS.COMIC_START_INDEX;
      setAbsoluteIndex(adjustedIndex);
    }
  }, [currentPageId, currentFocusPointIndex, endIndex]);
  
  // Update last focus point when changing pages or focus points
  useEffect(() => {
    // Skip for initial rendering or non-comic pages
    if (isInitialLoad.current || currentPageId === 0 || currentPageId > comicData.pages.length) {
      return;
    }
    
    // Save the current focus point for this page
    const updatedLastFocusPoints = {
      ...lastFocusPoints,
      [currentPageId]: currentFocusPointIndex
    };
    
    setLastFocusPoints(updatedLastFocusPoints);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        NAVIGATION_CONSTANTS.LAST_FOCUS_POINTS_STORAGE_KEY, 
        JSON.stringify(updatedLastFocusPoints)
      );
    }
  }, [currentPageId, currentFocusPointIndex, lastFocusPoints]);
  
  // Get current focus point
  const currentFocusPoint = focusPoints[currentFocusPointIndex] || null;
  
  /**
   * Safely navigate to a page, handling potential route cancellation errors
   */
  const safeNavigate = useCallback((path: string) => {
    // Don't do anything if we're already on the page (without the hash)
    const currentPath = router.asPath.split('#')[0]; // Ignore hash for comparison
    const targetPath = path.split('#')[0];
    
    if (currentPath === targetPath) {
      console.log(`Already at path ${targetPath}, only updating hash if needed`);
      
      // Update hash if needed
      if (path.includes('#') && currentPath !== path) {
        const hash = path.split('#')[1];
        if (hash) {
          const focusIndex = parseInt(hash, 10);
          if (!isNaN(focusIndex)) {
            setCurrentFocusPointIndex(focusIndex);
            updateUrlHash(focusIndex);
          }
        }
      }
      
      return true;
    }
    
    console.log(`Navigation: Navigating from ${router.asPath} to ${path}`);
    
    // Important: Use router.push WITHOUT any setTimeout
    setIsLoading(true);
    window.location.href = path;
    
    return true;
  }, [router, isLoading, updateUrlHash]);
  
  /**
   * Navigation based on absolute index
   * Handles special indices for home, separator, and end page
   */
  const navigateToAbsoluteIndex = useCallback((newAbsoluteIndex: number) => {
    console.log(`useComicNavigation: Navigating to absolute index ${newAbsoluteIndex}`);
    
    // Home page
    if (newAbsoluteIndex === NAVIGATION_CONSTANTS.HOME_INDEX) {
      return safeNavigate('/');
    }
    
    // Skip separator
    if (newAbsoluteIndex === NAVIGATION_CONSTANTS.SEPARATOR_INDEX) return false;
    
    // End page
    const END_INDEX = totalPoints + NAVIGATION_CONSTANTS.COMIC_START_INDEX;
    if (newAbsoluteIndex === END_INDEX) {
      return safeNavigate(`/${comicData.pages.length + 1}`);
    }
    
    // Handle circular navigation: beyond end goes to home
    if (newAbsoluteIndex > END_INDEX) {
      return safeNavigate('/');
    }
    
    // Handle circular navigation: below home goes to end
    if (newAbsoluteIndex < NAVIGATION_CONSTANTS.HOME_INDEX) {
      return safeNavigate(`/${comicData.pages.length + 1}`);
    }
    
    // Regular comic content navigation
    if (newAbsoluteIndex >= NAVIGATION_CONSTANTS.COMIC_START_INDEX && newAbsoluteIndex < END_INDEX) {
      // Adjust the index back to match the comic data indexing
      const adjustedIndex = newAbsoluteIndex - NAVIGATION_CONSTANTS.COMIC_START_INDEX;
      
      // Get the corresponding page and focus point
      const result = getPageAndFocusPointFromAbsoluteIndex(adjustedIndex);
      if (!result) return false;
      
      if (result.pageId !== currentPageId) {
        return safeNavigate(`/${result.pageId}#${result.focusPointIndex}`);
      } else {
        setCurrentFocusPointIndex(result.focusPointIndex);
        updateUrlHash(result.focusPointIndex);
        return true;
      }
    }
    
    return false;
  }, [currentPageId, safeNavigate, updateUrlHash, totalPoints]);
  
  /**
   * Navigation to next point with circular navigation support
   */
  const nextPoint = useCallback(() => {
    // If on end page, go to homepage (circular navigation)
    if (currentPageId === comicData.pages.length + 1) {
      return safeNavigate('/');
    }
    
    // If at the last focus point of the last page, go to end page
    if (currentPageId === comicData.pages.length && 
        currentFocusPointIndex === focusPoints.length - 1) {
      return safeNavigate(`/${comicData.pages.length + 1}`);
    }
    
    // Standard next point navigation
    return navigateToAbsoluteIndex(absoluteIndex + 1);
  }, [absoluteIndex, currentPageId, currentFocusPointIndex, focusPoints.length, 
      navigateToAbsoluteIndex, safeNavigate]);
  
  /**
   * Navigation to previous point with circular navigation and smart backtracking
   */
  const prevPoint = useCallback(() => {
    // If on homepage, go to end page (circular navigation)
    if (currentPageId === 0) {
      return safeNavigate(`/${comicData.pages.length + 1}`);
    }
    
    // If at the first focus point of the first page, go to homepage
    if (currentPageId === 1 && currentFocusPointIndex === 0) {
      return safeNavigate('/');
    }
    
    // Standard previous point navigation
    return navigateToAbsoluteIndex(absoluteIndex - 1);
  }, [absoluteIndex, currentPageId, currentFocusPointIndex, navigateToAbsoluteIndex, safeNavigate]);
  
  /**
   * Navigation to next page with circular navigation support
   */
  const nextPage = useCallback(() => {
    // If on end page, go to homepage (circular navigation)
    if (currentPageId === comicData.pages.length + 1) {
      return safeNavigate('/');
    }
    
    // If on homepage, go to first page
    if (currentPageId === 0) {
      return safeNavigate('/1');
    }
    
    // Standard next page navigation
    const nextId = getNextPageId(currentPageId);
    if (nextId) {
      return safeNavigate(`/${nextId}`);
    }
    
    return false;
  }, [currentPageId, safeNavigate]);
  
  /**
   * Navigation to previous page with circular navigation and smart backtracking
   */
  const prevPage = useCallback(() => {
    // If on homepage, go to end page (circular navigation)
    if (currentPageId === 0) {
      return safeNavigate(`/${comicData.pages.length + 1}`);
    }
    
    // If on first page, go to homepage
    if (currentPageId === 1) {
      return safeNavigate('/');
    }
    
    // For standard previous page navigation, get the ID of the previous page
    const prevId = getPrevPageId(currentPageId);
    if (prevId) {
      // Check if we have a saved focus point for this page
      const savedFocusPoint = lastFocusPoints[prevId];
      
      // If we have a saved focus point, navigate to that specific point
      if (savedFocusPoint !== undefined) {
        return safeNavigate(`/${prevId}#${savedFocusPoint}`);
      }
      
      // Otherwise navigate to last focus point of the previous page
      const prevPage = getPageById(prevId);
      if (prevPage) {
        const lastFocusPointIndex = Math.max(0, prevPage.focusPoints.length - 1);
        return safeNavigate(`/${prevId}#${lastFocusPointIndex}`);
      }
      
      // Fallback to simply navigating to the previous page
      return safeNavigate(`/${prevId}`);
    }
    
    return false;
  }, [currentPageId, lastFocusPoints, safeNavigate]);
  
  /**
   * Navigate to a specific focus point on the current page
   */
  const goToFocusPoint = useCallback((index: number) => {
    if (index >= 0 && index < focusPoints.length) {
      setCurrentFocusPointIndex(index);
      updateUrlHash(index);
      return true;
    }
    return false;
  }, [focusPoints.length, updateUrlHash]);
  
  /**
   * Toggle autoplay mode and save state to localStorage
   */
  const toggleAutoPlay = useCallback(() => {
    const newState = !isAutoPlaying;
    setIsAutoPlaying(newState);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(NAVIGATION_CONSTANTS.AUTOPLAY_STORAGE_KEY, newState.toString());
    }
  }, [isAutoPlaying]);
  
  /**
   * Auto-play effect - advances to next point after duration expires
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAutoPlaying && currentFocusPoint) {
      timer = setTimeout(() => {
        nextPoint();
      }, currentFocusPoint.duration * 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAutoPlaying, currentFocusPoint, nextPoint]);
  
  /**
   * Sync with URL parameter when page changes and add navigation event handlers
   */
  useEffect(() => {
    // Handle route change events
    const handleRouteChangeStart = () => {
      console.log('Route change starting');
      setIsLoading(true);
    };
    
    const handleRouteChangeComplete = () => {
      console.log('Route change complete');
      setIsLoading(false);
    };
    
    const handleRouteChangeError = (err: Error) => {
      console.error('Route change error:', err);
      setIsLoading(false);
    };
    
    // Add event listeners
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);
    
    // Normal URL parameter sync
    if (router.isReady && router.query.pageNumber) {
      const pageId = parseInt(router.query.pageNumber as string, 10);
      if (!isNaN(pageId) && pageId !== currentPageId) {
        setCurrentPageId(pageId);
        setIsLoading(false);
      }
    } else if (router.isReady && router.pathname === '/') {
      // Handle homepage
      if (currentPageId !== 0) {
        setCurrentPageId(0);
        setIsLoading(false);
      }
    }
    
    // Cleanup event listeners
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.isReady, router.query.pageNumber, router.pathname, currentPageId]);
  
  /**
   * Handle initial hash value and hash changes
   */
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
  
  /**
   * Update URL hash when focus point changes (but not on initial load)
   */
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
      if (e.key === 'ArrowRight') {
        nextPoint();
      } else if (e.key === 'ArrowLeft') {
        prevPoint();
      } else if (e.key === 'ArrowUp') {
        prevPage();
      } else if (e.key === 'ArrowDown') {
        nextPage();
      } else if (e.key === 'p' || e.key === ' ') {
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

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getPageById, getNextPageId, getPrevPageId } from '@/data/comic-data';
import { FocusPoint } from '@/utils/types';

export interface ComicNavigationState {
  currentPageId: number;
  currentFocusPointIndex: number;
  focusPoints: FocusPoint[];
  isAutoPlaying: boolean;
  hasNextFocusPoint: boolean;
  hasPrevFocusPoint: boolean;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentFocusPoint: FocusPoint | null;
  isLoading: boolean;
}

export interface ComicNavigationActions {
  nextFocusPoint: () => void;
  prevFocusPoint: () => void;
  nextPage: () => void;
  prevPage: () => void;
  goToFocusPoint: (index: number) => void;
  toggleAutoPlay: () => void;
}

export default function useComicNavigation(initialPageId: number): [ComicNavigationState, ComicNavigationActions] {
  const router = useRouter();
  const [currentPageId, setCurrentPageId] = useState<number>(initialPageId);
  const [currentFocusPointIndex, setCurrentFocusPointIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Get focus points for current page
  const currentPage = getPageById(currentPageId);
  const focusPoints = currentPage?.focusPoints || [];
  
  // Check navigation availability
  const hasNextFocusPoint = currentFocusPointIndex < focusPoints.length - 1;
  const hasPrevFocusPoint = currentFocusPointIndex > 0;
  const hasNextPage = getNextPageId(currentPageId) !== null;
  const hasPrevPage = getPrevPageId(currentPageId) !== null;
  
  // Get current focus point
  const currentFocusPoint = focusPoints[currentFocusPointIndex] || null;
  
  // Navigation actions
  const nextFocusPoint = useCallback(() => {
    if (hasNextFocusPoint) {
      setCurrentFocusPointIndex(currentFocusPointIndex + 1);
      return true;
    } else if (hasNextPage) {
      const nextId = getNextPageId(currentPageId);
      if (nextId) {
        setIsLoading(true);
        router.push(`/comic/${nextId}`);
      }
      return true;
    }
    return false;
  }, [currentFocusPointIndex, hasNextFocusPoint, hasNextPage, currentPageId, router]);
  
  const prevFocusPoint = useCallback(() => {
    if (hasPrevFocusPoint) {
      setCurrentFocusPointIndex(currentFocusPointIndex - 1);
      return true;
    } else if (hasPrevPage) {
      const prevId = getPrevPageId(currentPageId);
      if (prevId) {
        setIsLoading(true);
        router.push(`/comic/${prevId}`);
      }
      return true;
    }
    return false;
  }, [currentFocusPointIndex, hasPrevFocusPoint, hasPrevPage, currentPageId, router]);
  
  const nextPage = useCallback(() => {
    if (hasNextPage) {
      const nextId = getNextPageId(currentPageId);
      if (nextId) {
        setIsLoading(true);
        router.push(`/comic/${nextId}`);
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
        router.push(`/comic/${prevId}`);
        return true;
      }
    }
    return false;
  }, [hasPrevPage, currentPageId, router]);
  
  const goToFocusPoint = useCallback((index: number) => {
    if (index >= 0 && index < focusPoints.length) {
      setCurrentFocusPointIndex(index);
      return true;
    }
    return false;
  }, [focusPoints.length]);
  
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying);
  }, [isAutoPlaying]);
  
  // Auto-play effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAutoPlaying && currentFocusPoint) {
      timer = setTimeout(() => {
        const success = nextFocusPoint();
        if (!success) {
          setIsAutoPlaying(false);
        }
      }, currentFocusPoint.duration * 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAutoPlaying, currentFocusPoint, nextFocusPoint]);
  
  // Sync with URL parameter and reset focus point when page changes
  useEffect(() => {
    if (router.isReady && router.query.pageNumber) {
      const pageId = parseInt(router.query.pageNumber as string, 10);
      if (!isNaN(pageId) && pageId !== currentPageId) {
        setCurrentPageId(pageId);
        setCurrentFocusPointIndex(0);
        setIsLoading(false);
      }
    }
  }, [router.isReady, router.query.pageNumber, currentPageId]);
  
  // Key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextFocusPoint();
      } else if (e.key === 'ArrowLeft') {
        prevFocusPoint();
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
  }, [nextFocusPoint, prevFocusPoint, nextPage, prevPage, toggleAutoPlay]);
  
  return [
    {
      currentPageId,
      currentFocusPointIndex,
      focusPoints,
      isAutoPlaying,
      hasNextFocusPoint,
      hasPrevFocusPoint,
      hasNextPage,
      hasPrevPage,
      currentFocusPoint,
      isLoading
    },
    {
      nextFocusPoint,
      prevFocusPoint,
      nextPage,
      prevPage,
      goToFocusPoint,
      toggleAutoPlay
    }
  ];
}

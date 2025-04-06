import { useEffect, useContext, createContext } from 'react';
import { getPageById } from '@/data/comic-data';
import useComicNavigation from '@/hooks/useComicNavigation';
import Viewer from './Viewer';
import { Box, MantineColorScheme } from '@mantine/core';

// Create a context to share navigation state and actions with the app
import { FocusPoint } from '@/utils/types';

export interface ComicNavigationState {
  currentPageId: number;
  isAutoPlaying: boolean;
  hasNextPoint: boolean;
  hasPrevPoint: boolean;
  currentFocusPoint: FocusPoint | null;
  isLoading: boolean;
  absoluteIndex: number;
  totalNavigationPoints: number;
  title: string;
  nextPoint: () => void;
  prevPoint: () => void;
  navigateToAbsoluteIndex: (index: number) => boolean;
  toggleAutoPlay: () => void;
}

export const ComicNavigationContext = createContext<ComicNavigationState | null>(null);

// Hook to access comic navigation context anywhere in the app
export const useComicNavigationContext = () => {
  const context = useContext(ComicNavigationContext);
  if (!context) {
    throw new Error('useComicNavigationContext must be used within a ComicNavigationProvider');
  }
  return context;
};

interface ComicViewerProps {
  pageId: number;
  colorScheme?: MantineColorScheme;
  toggleColorScheme?: () => void;
  navigationDirection?: "forward" | "backward";
  updateAppNavigationState?: (state: ComicNavigationState) => void;
}

export default function ComicViewer({ 
  pageId, 
  navigationDirection = "forward",
  updateAppNavigationState
}: ComicViewerProps) {
  // Get comic navigation state and actions
  const [
    {
      currentPageId,
      isAutoPlaying,
      hasNextPoint,
      hasPrevPoint,
      currentFocusPoint,
      isLoading,
      absoluteIndex,
      totalNavigationPoints
    },
    {
      nextPoint,
      prevPoint,
      navigateToAbsoluteIndex,
      toggleAutoPlay
    }
  ] = useComicNavigation(pageId);
  
  // Get the current comic page from the data
  const currentPage = getPageById(currentPageId);
  
  // Create the navigation state object
  const navigationState: ComicNavigationState = {
    currentPageId,
    isAutoPlaying,
    hasNextPoint,
    hasPrevPoint,
    currentFocusPoint,
    isLoading,
    absoluteIndex,
    totalNavigationPoints,
    title: currentPage?.title || '',
    nextPoint,
    prevPoint,
    navigateToAbsoluteIndex,
    toggleAutoPlay
  };

  // Update app navigation state when our state changes
  useEffect(() => {
    if (updateAppNavigationState && currentPage) {
      updateAppNavigationState(navigationState);
    }
  }, [
    currentPage, 
    isAutoPlaying, 
    hasNextPoint, 
    hasPrevPoint, 
    absoluteIndex, 
    totalNavigationPoints,
    updateAppNavigationState
  ]);
  
  // Handle case when page is not found
  if (!currentPage) {
    return null;
  }
  
  return (
    <ComicNavigationContext.Provider value={navigationState}>
      <Box style={{ height: 'calc(100vh - 120px)' }}>
        <Viewer
          currentPageId={currentPageId}
          currentImageUrl={currentPage.imageUrl}
          currentTitle={currentPage.title || ''}
          currentFocusPoint={currentFocusPoint}
          isLoading={isLoading}
          navigationDirection={navigationDirection}
        />
      </Box>
    </ComicNavigationContext.Provider>
  );
}

import { useEffect } from 'react';
import { getPageById } from '@/data/comic-data';
import useComicNavigation from '@/hooks/useComicNavigation';
import Viewer from './Viewer';
import { Box, MantineColorScheme } from '@mantine/core';

interface ComicViewerProps {
  pageId: number;
  colorScheme?: MantineColorScheme;
  toggleColorScheme?: () => void;
  navigationDirection?: "forward" | "backward";
}

export default function ComicViewer({ 
  pageId, 
  navigationDirection = "forward"
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
  
  // Update header and footer controls through DOM manipulation
  useEffect(() => {
    if (typeof document !== 'undefined' && currentPage) {
      // Find header elements by data attribute if they exist
      const headerTitle = document.querySelector('[data-header-title]');
      if (headerTitle) {
        headerTitle.textContent = currentPage.title || '';
      }
      
      // Update navigation buttons
      const nextButton = document.querySelector('[data-next-button]');
      const prevButton = document.querySelector('[data-prev-button]');
      const playButton = document.querySelector('[data-play-button]');
      
      if (nextButton) {
        (nextButton as HTMLElement).onclick = () => nextPoint();
        nextButton.classList.toggle('disabled', !hasNextPoint);
      }
      
      if (prevButton) {
        (prevButton as HTMLElement).onclick = () => prevPoint();
        prevButton.classList.toggle('disabled', !hasPrevPoint);
      }
      
      if (playButton) {
        (playButton as HTMLElement).onclick = () => toggleAutoPlay();
        playButton.classList.toggle('playing', isAutoPlaying);
      }
      
      // Update footer timeline
      const timelineElement = document.querySelector('[data-timeline]');
      if (timelineElement) {
        timelineElement.setAttribute('data-absolute-index', absoluteIndex.toString());
        timelineElement.setAttribute('data-total-points', totalNavigationPoints.toString());
      }
    }
  }, [
    currentPage, 
    isAutoPlaying, 
    hasNextPoint, 
    hasPrevPoint, 
    nextPoint, 
    prevPoint, 
    toggleAutoPlay, 
    absoluteIndex, 
    totalNavigationPoints
  ]);
  
  // Handle case when page is not found
  if (!currentPage) {
    return null;
  }
  
  return (
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
  );
}

import { getPageById } from '@/data/comic-data';
import useComicNavigation from '@/hooks/useComicNavigation';
import Header from './Header';
import Viewer from './Viewer';
import Footer from './Footer';

import { MantineColorScheme } from '@mantine/core';

interface ComicViewerProps {
  pageId: number;
  colorScheme: MantineColorScheme;
  toggleColorScheme: () => void;
}

export default function ComicViewer({ 
  pageId, 
  colorScheme, 
  toggleColorScheme 
}: ComicViewerProps) {
  // Get comic navigation state and actions - destructure only what we need
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
  
  if (!currentPage) {
    return null;
  }
  
  return (
    <>
      <Header
        title={currentPage.title}
        isPlaying={isAutoPlaying}
        hasNext={hasNextPoint}
        hasPrev={hasPrevPoint}
        onNext={nextPoint}
        onPrev={prevPoint}
        onPlayPause={toggleAutoPlay}
        toggleColorScheme={toggleColorScheme}
        colorScheme={colorScheme}
      />
      
      <Viewer
        currentPageId={currentPageId}
        currentImageUrl={currentPage.imageUrl}
        currentTitle={currentPage.title || ''}
        currentFocusPoint={currentFocusPoint}
        isLoading={isLoading}
      />
      
      <Footer
        absoluteIndex={absoluteIndex}
        totalNavigationPoints={totalNavigationPoints}
        navigateToAbsoluteIndex={navigateToAbsoluteIndex}
        colorScheme={colorScheme}
      />
    </>
  );
}

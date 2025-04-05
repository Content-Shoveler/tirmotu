import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Loader, Tooltip, Box, Group, Center, Text } from '@mantine/core';
import { IconPlayerPlayFilled, IconPlayerPauseFilled, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import useComicNavigation from '@/hooks/useComicNavigation';
import { FocusPoint } from '@/utils/types';
import { 
  getPageById, 
  getFocusPointByAbsoluteIndex, 
  comicData,
  getAbsoluteIndexFromPageAndFocusPoint 
} from '@/data/comic-data';

interface ComicViewerProps {
  pageId: number;
}

export default function ComicViewer({ pageId }: ComicViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  
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
  
  // Update viewport dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setViewportDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    // Set initial dimensions
    updateDimensions();
    
    // Add resize event listener
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Reset image loaded state when page changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentPageId]);
  
  // Calculate transform values for focus point
  const getTransformForFocusPoint = (focusPoint: FocusPoint | null) => {
    if (!focusPoint) return { x: 0, y: 0, scale: 1 };
    
    // Convert percentage to viewport coordinates
    // Invert y-percentage because CSS transforms move in opposite direction
    const x = -(focusPoint.x - 50) * (viewportDimensions.width / 100);
    const y = -(focusPoint.y - 50) * (viewportDimensions.height / 100);
    
    return {
      x,
      y,
      scale: focusPoint.scale
    };
  };
  
  const transform = getTransformForFocusPoint(currentFocusPoint);
  
  if (!currentPage) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }
  
  return (
    <Box 
      ref={containerRef}
      pos="relative"
      w="100%"
      h="100vh"
      style={{ 
        overflow: 'hidden',
        touchAction: 'none', // Prevent default touch actions for better experience
      }}
    >
      {/* Image container with focus point animation */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        initial={false}
        animate={{
          x: transform.x,
          y: transform.y,
          scale: transform.scale,
        }}
        transition={{
          type: 'spring',
          duration: currentFocusPoint?.transitionSpeed || 0.8,
          bounce: 0.1,
        }}
      >
        {/* Comic image with loading state */}
        {!imageLoaded && (
          <Center
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 5 
            }}
          >
            <Loader size="lg" />
          </Center>
        )}
        
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <Image
            src={currentPage.imageUrl}
            alt={currentPage.title || `Comic page ${currentPageId}`}
            fill
            priority
            style={{
              objectFit: 'contain',
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </motion.div>
      
      {/* Captions */}
      <AnimatePresence>
        {currentFocusPoint?.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '140px',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '80%',
              padding: '10px 16px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              borderRadius: '8px',
              zIndex: 30,
              textAlign: 'center',
            }}
          >
            <Text>{currentFocusPoint.description}</Text>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation Controls */}
      <Group
        justify="center"
        gap="md"
        style={{
          position: 'absolute',
          bottom: '60px',
          left: 0,
          right: 0,
          padding: '0 20px',
          zIndex: 20,
        }}
      >
        {/* Left navigation button */}
        <Button
          aria-label="Previous"
          size="lg"
          variant="subtle"
          onClick={prevPoint}
          disabled={!hasPrevPoint}
          radius="xl"
        >
          <IconChevronLeft size={24} />
        </Button>
        
        {/* Play/Pause button */}
        <Button
          aria-label={isAutoPlaying ? "Pause" : "Play"}
          size="lg"
          variant="filled"
          color="blue"
          onClick={toggleAutoPlay}
          radius="xl"
        >
          {isAutoPlaying ? (
            <IconPlayerPauseFilled size={24} />
          ) : (
            <IconPlayerPlayFilled size={24} />
          )}
        </Button>
        
        {/* Right navigation button */}
        <Button
          aria-label="Next"
          size="lg"
          variant="subtle"
          onClick={nextPoint}
          disabled={!hasNextPoint}
          radius="xl"
        >
          <IconChevronRight size={24} />
        </Button>
      </Group>
      
      {/* Timeline Slider - Enhanced to show all navigation points */}
      <Box
        style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          padding: '0 20px',
          zIndex: 20,
        }}
      >
        <Box 
          style={{
            width: '100%',
            height: '30px',  // Increased height for more visual detail
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Timeline track */}
          <Box 
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '4px',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(200, 200, 200, 0.2)',
              borderRadius: '2px',
            }}
          />
          
          {/* Generate markers for all pages and focus points */}
          {Array.from({ length: totalNavigationPoints }).map((_, index) => {
            const pointInfo = getFocusPointByAbsoluteIndex(index);
            const isCurrentPoint = index === absoluteIndex;
            const isPageStart = pointInfo?.focusPoint && 
                             pointInfo.page.focusPoints.indexOf(pointInfo.focusPoint) === 0;
            
            const title = isPageStart 
              ? `Page ${pointInfo?.page.id}: ${pointInfo?.page.title || ''}`
              : pointInfo?.focusPoint.description || `Focus point ${index + 1}`;
            
            return (
              <Tooltip key={`nav-point-${index}`} label={title}>
                <div
                  style={{
                    position: 'absolute',
                    left: `${(index / (totalNavigationPoints - 1)) * 100}%`,
                    width: isCurrentPoint ? '10px' : isPageStart ? '8px' : '6px',
                    height: isCurrentPoint ? '10px' : isPageStart ? '8px' : '6px',
                    backgroundColor: 'white',
                    opacity: index <= absoluteIndex 
                      ? 1 
                      : isPageStart ? 0.8 : 0.5,
                    borderRadius: '50%',
                    transform: 'translateX(-50%)',
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                    zIndex: 2,
                    border: isPageStart ? '2px solid white' : 'none',
                  }}
                  onClick={() => navigateToAbsoluteIndex(index)}
                />
              </Tooltip>
            );
          })}
          
          {/* Page markers */}
          {comicData.pages.map((page) => {
            // Find the absolute index for the first focus point of this page
            const pageStartIndex = page.focusPoints.length > 0 
              ? getAbsoluteIndexFromPageAndFocusPoint(page.id, 0)
              : -1;
              
            if (pageStartIndex === -1) return null;
            
            const position = (pageStartIndex / (totalNavigationPoints - 1)) * 100;
            
            return (
              <div
                key={`page-marker-${page.id}`}
              style={{
                position: 'absolute',
                bottom: '12px',
                left: `${position}%`,
                transform: 'translateX(-50%)',
                fontSize: '10px',
                opacity: 0.7,
                textAlign: 'center',
                pointerEvents: 'none',
              }}
              >
                {page.id}
              </div>
            );
          })}
          
          {/* Progress bar */}
          <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: `${(absoluteIndex / (totalNavigationPoints - 1)) * 100}%`,
              height: '4px',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
              borderRadius: '2px',
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </Box>
      </Box>
      
      
      {/* Page Title */}
      {currentPage.title && (
        <Box
          p="xs"
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '8px 16px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '8px',
            zIndex: 20,
          }}
        >
          <Text color="white" fw={500}>{currentPage.title}</Text>
        </Box>
      )}
      
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100,
            }}
          >
            <Loader size="lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

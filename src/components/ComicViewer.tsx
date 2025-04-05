import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Spinner } from '@heroui/react';
import useComicNavigation from '@/hooks/useComicNavigation';
import { FocusPoint } from '@/utils/types';
import { getPageById } from '@/data/comic-data';

interface ComicViewerProps {
  pageId: number;
}

export default function ComicViewer({ pageId }: ComicViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  
  // Get comic navigation state and actions
  const [
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
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef} 
      className="comic-viewer"
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--background)',
        touchAction: 'none', // Prevent default touch actions for better experience
      }}
    >
      {/* Image container with focus point animation */}
      <motion.div
        className="image-container"
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
          <div 
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 5 
            }}
          >
            <Spinner size="lg" />
          </div>
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
            {currentFocusPoint.description}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation Controls */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 20px',
          zIndex: 20,
        }}
      >
        {/* Left navigation button */}
        <Button
          isIconOnly
          aria-label="Previous"
          size="lg"
          variant="shadow"
          onPress={prevFocusPoint}
          isDisabled={!hasPrevFocusPoint && !hasPrevPage}
          style={{ marginRight: '16px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Button>
        
        {/* Play/Pause button */}
        <Button
          isIconOnly
          aria-label={isAutoPlaying ? "Pause" : "Play"}
          size="lg"
          color="primary"
          variant="shadow"
          onPress={toggleAutoPlay}
        >
          {isAutoPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </Button>
        
        {/* Right navigation button */}
        <Button
          isIconOnly
          aria-label="Next"
          size="lg"
          variant="shadow"
          onPress={nextFocusPoint}
          isDisabled={!hasNextFocusPoint && !hasNextPage}
          style={{ marginLeft: '16px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Button>
      </div>
      
      {/* Timeline Slider */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          padding: '0 20px',
          zIndex: 20,
        }}
      >
        <div 
          style={{
            width: '100%',
            height: '20px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Timeline track */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '4px',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
            }}
          />
          
          {/* Focus points */}
          {focusPoints.map((_, index) => (
            <div
              key={`focus-${index}`}
              style={{
                position: 'absolute',
                left: `${(index / (focusPoints.length - 1)) * 100}%`,
                width: index === currentFocusPointIndex ? '10px' : '6px',
                height: index === currentFocusPointIndex ? '10px' : '6px',
                backgroundColor: index <= currentFocusPointIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                zIndex: 2,
              }}
              onClick={() => goToFocusPoint(index)}
            />
          ))}
          
          {/* Progress bar */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: `${(currentFocusPointIndex / (focusPoints.length - 1)) * 100}%`,
              height: '4px',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
              borderRadius: '2px',
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </div>
      </div>
      
      {/* Page Navigation Buttons */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '16px',
        transform: 'translateY(-50%)',
        zIndex: 20,
      }}>
        <Button
          isIconOnly
          aria-label="Previous Page"
          size="lg"
          variant="ghost"
          onPress={prevPage}
          isDisabled={!hasPrevPage}
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            margin: '10px 0'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </Button>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '16px',
        transform: 'translateY(-50%)',
        zIndex: 20,
      }}>
        <Button
          isIconOnly
          aria-label="Next Page"
          size="lg"
          variant="ghost"
          onPress={nextPage}
          isDisabled={!hasNextPage}
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            margin: '10px 0'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
      
      {/* Page Title */}
      {currentPage.title && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '8px 16px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            borderRadius: '8px',
            zIndex: 20,
          }}
        >
          {currentPage.title}
        </div>
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
            <Spinner size="lg" color="white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

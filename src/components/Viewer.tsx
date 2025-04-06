import { useRef, useState, useEffect } from 'react';
import { Box } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { FocusPoint } from '@/utils/types';
import ComicImage from './Image';
import Loading from './Loading';

interface ViewerProps {
  currentPageId: number;
  currentImageUrl: string;
  currentTitle: string;
  currentFocusPoint: FocusPoint | null;
  isLoading: boolean;
}

export default function Viewer({ 
  currentPageId,
  currentImageUrl,
  currentTitle,
  currentFocusPoint,
  isLoading
}: ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  
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
  
  return (
    <Box 
      ref={containerRef}
      pos="relative"
      style={{ 
        flex: 1,
        overflow: 'hidden',
        touchAction: 'none', // Prevent default touch actions for better experience
      }}
    >
      {/* Comic image with focus point animation */}
      <ComicImage
        src={currentImageUrl}
        alt={currentTitle || `Comic page ${currentPageId}`}
        currentFocusPoint={currentFocusPoint}
        viewportDimensions={viewportDimensions}
      />
      
      {/* Caption overlay */}
      <AnimatePresence>
        {currentFocusPoint?.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '20px',
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
      
      {/* Loading overlay */}
      <Loading isLoading={isLoading} />
    </Box>
  );
}

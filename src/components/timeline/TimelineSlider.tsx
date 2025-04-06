import { useRef } from 'react';
import { Box, Tooltip, useMantineColorScheme } from '@mantine/core';
import { motion } from 'framer-motion';
import { 
  getFocusPointByAbsoluteIndex,
  comicData,
  getAbsoluteIndexFromPageAndFocusPoint
} from '@/data/comic-data';

interface TimelineSliderProps {
  absoluteIndex: number;
  totalNavigationPoints: number;
  navigateToAbsoluteIndex: (index: number) => boolean;
}

export function TimelineSlider({ 
  absoluteIndex, 
  totalNavigationPoints, 
  navigateToAbsoluteIndex 
}: TimelineSliderProps) {
  const { colorScheme } = useMantineColorScheme();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate the slider track colors based on theme
  const trackBgColor = colorScheme === 'dark' ? 'rgba(200, 200, 200, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const progressColor = colorScheme === 'dark' ? 'white' : 'black';
  const markerColor = colorScheme === 'dark' ? 'white' : 'black';
  
  return (
    <Box
      ref={sliderRef}
      style={{
        width: '100%',
        height: '30px',
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
          backgroundColor: trackBgColor,
          borderRadius: '2px',
        }}
      />
      
      {/* Generate markers for all navigation points */}
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
            <motion.div
              style={{
                position: 'absolute',
                left: `${(index / (totalNavigationPoints - 1)) * 100}%`,
                width: isCurrentPoint ? '10px' : isPageStart ? '8px' : '6px',
                height: isCurrentPoint ? '10px' : isPageStart ? '8px' : '6px',
                backgroundColor: markerColor,
                opacity: index <= absoluteIndex 
                  ? 1 
                  : isPageStart ? 0.8 : 0.5,
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                cursor: 'pointer',
                zIndex: 2,
                border: isPageStart ? `2px solid ${colorScheme === 'dark' ? '#1A1B1E' : 'white'}` : 'none',
              }}
              whileHover={{
                scale: 1.2,
                opacity: 1,
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
              color: colorScheme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
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
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          height: '4px',
          transform: 'translateY(-50%)',
          backgroundColor: progressColor,
          borderRadius: '2px',
        }}
        initial={false}
        animate={{
          width: `${(absoluteIndex / (totalNavigationPoints - 1)) * 100}%`,
        }}
        transition={{
          type: 'spring',
          duration: 0.3,
          bounce: 0.1,
        }}
      />
    </Box>
  );
}

import { Slider, SliderProps, useMantineColorScheme } from '@mantine/core';
import { 
  getFocusPointByAbsoluteIndex,
  comicData,
  getAbsoluteIndexFromPageAndFocusPoint 
} from '@/data/comic-data';

interface TimelineProps {
  absoluteIndex: number;
  totalNavigationPoints: number;
  navigateToAbsoluteIndex: (index: number) => boolean;
}

export default function Timeline({ 
  absoluteIndex, 
  totalNavigationPoints, 
  navigateToAbsoluteIndex 
}: TimelineProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Generate marks for all pages
  const marks = comicData.pages.map(page => {
    // Find the absolute index for the first focus point of this page
    const pageStartIndex = page.focusPoints.length > 0 
      ? getAbsoluteIndexFromPageAndFocusPoint(page.id, 0)
      : -1;
      
    if (pageStartIndex === -1) return null;
    
    return {
      value: pageStartIndex,
      label: `${page.id}`
    };
  }).filter(Boolean) as SliderProps['marks'];
  
  // Get label content based on focus point info
  const getLabel = (value: number) => {
    const pointInfo = getFocusPointByAbsoluteIndex(value);
    if (!pointInfo) return `Point ${value + 1}`;
    
    const isPageStart = pointInfo.page.focusPoints.indexOf(pointInfo.focusPoint) === 0;
    
    return isPageStart 
      ? `Page ${pointInfo.page.id}: ${pointInfo.page.title || ''}`
      : pointInfo.focusPoint.description || `Focus point ${value + 1}`;
  };
  
  // Function to determine thumb size based on if it's a page start point
  const getThumbSize = (value: number) => {
    const pointInfo = getFocusPointByAbsoluteIndex(value);
    if (!pointInfo) return 10;
    
    const isPageStart = pointInfo.page.focusPoints.indexOf(pointInfo.focusPoint) === 0;
    return isPageStart ? 16 : 10;
  };
  
  return (
    <Slider
      value={absoluteIndex}
      onChange={(value) => navigateToAbsoluteIndex(value)}
      min={0}
      max={totalNavigationPoints - 1}
      step={1}
      marks={marks}
      label={getLabel}
      thumbSize={getThumbSize(absoluteIndex)}
      styles={() => ({
        root: {
          height: 30,
        },
        track: {
          backgroundColor: isDark ? 'rgba(200, 200, 200, 0.2)' : 'rgba(0, 0, 0, 0.1)',
          height: 4,
        },
        bar: {
          backgroundColor: isDark ? 'white' : 'black',
          height: 4,
        },
        thumb: {
          backgroundColor: isDark ? 'white' : 'black',
          borderWidth: 0,
        },
        mark: {
          width: 8,
          height: 8,
          backgroundColor: isDark ? 'white' : 'black',
          opacity: 0.8,
          transform: 'translateX(-50%) translateY(-50%)',
        },
        markFilled: {
          opacity: 1,
        },
        markLabel: {
          fontSize: 10,
          marginTop: 5,
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        }
      })}
    />
  );
}

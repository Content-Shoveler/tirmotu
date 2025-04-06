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
  'data-timeline'?: boolean;
}

export default function Timeline({ 
  absoluteIndex, 
  totalNavigationPoints, 
  navigateToAbsoluteIndex,
  'data-timeline': timelineData
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
  
  // Handle user interaction with the timeline
  const handleSliderChange = (value: number) => {
    console.log(`Timeline: Navigating to absolute index ${value}`);
    return navigateToAbsoluteIndex(value);
  };
  
  return (
    <Slider
      value={absoluteIndex}
      data-timeline={timelineData}
      onChange={handleSliderChange}
      min={0}
      max={totalNavigationPoints - 1}
      step={1}
      marks={marks}
      label={getLabel}
      thumbSize={getThumbSize(absoluteIndex)}
      styles={() => ({
        root: {
          width: '100%',
          marginBottom: 10,
        },
        track: {
          backgroundColor: isDark ? 'rgba(200, 200, 200, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
        bar: {
          backgroundColor: isDark ? 'white' : 'black',
        },
        thumb: {
          backgroundColor: isDark ? 'white' : 'black',
        },
        mark: {
          backgroundColor: isDark ? 'white' : 'gray',
          width: '20px',
          height: '20px',
          marginTop: '-6px',
          marginLeft: '-6px',
        },
        markLabel: {
          fontSize: 10,
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          marginTop: -4,
          marginLeft: 2.5,
        }
      })}
    />
  );
}

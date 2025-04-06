import { Slider, SliderProps, useMantineColorScheme } from '@mantine/core';
import { 
  getFocusPointByAbsoluteIndex,
  comicData,
  getAbsoluteIndexFromPageAndFocusPoint
} from '@/data/comic-data';
import { NAVIGATION_CONSTANTS } from '@/utils/navigation-constants';

interface TimelineProps {
  absoluteIndex: number;
  totalNavigationPoints: number;
  navigateToAbsoluteIndex: (index: number) => boolean;
  'data-timeline'?: boolean;
  currentPageId: number; // Add current page ID to better handle end page
}

export default function Timeline({ 
  absoluteIndex, 
  totalNavigationPoints, 
  navigateToAbsoluteIndex,
  'data-timeline': timelineData,
  currentPageId
}: TimelineProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Use constants from navigation-constants.ts
  const HOME_INDEX = NAVIGATION_CONSTANTS.HOME_INDEX;
  const COMIC_START_INDEX = NAVIGATION_CONSTANTS.COMIC_START_INDEX;
  const END_INDEX = totalNavigationPoints + COMIC_START_INDEX;
  
  // Generate comic page marks (filtering out nulls first to avoid TypeScript errors)
  const pageMarks = comicData.pages
    .map(page => {
      // Find the absolute index for the first focus point of this page
      const pageStartIndex = page.focusPoints.length > 0 
        ? getAbsoluteIndexFromPageAndFocusPoint(page.id, 0)
        : -1;
        
      if (pageStartIndex === -1) return null;
      
      // Offset the index to leave space for Home
      const adjustedIndex = pageStartIndex + COMIC_START_INDEX;
      
      return {
        value: adjustedIndex,
        label: `${page.id}`
      };
    })
    .filter((mark): mark is { value: number; label: string } => mark !== null);
  
  // Generate marks for homepage, all comic pages, and end page
  const marks: SliderProps['marks'] = [
    // Homepage mark (absoluteIndex = 0)
    { value: HOME_INDEX, label: 'Home' },
    
    // Add filtered comic page marks
    ...pageMarks,
    
    // End page mark
    { value: END_INDEX, label: 'End' }
  ];
  
  // Get label content based on focus point info
  const getLabel = (value: number) => {
    // Special case for homepage
    if (value === HOME_INDEX) return "Home";
    
    // Special case for end page
    if (value === END_INDEX) return "The End";
    
    // Empty slot reserved for spacing
    if (value === NAVIGATION_CONSTANTS.SEPARATOR_INDEX) return "";
    
    // Adjust the index back to match comic data indexing
    const adjustedValue = value - COMIC_START_INDEX;
    
    const pointInfo = getFocusPointByAbsoluteIndex(adjustedValue);
    if (!pointInfo) return `Point ${value}`;
    
    const isPageStart = pointInfo.page.focusPoints.indexOf(pointInfo.focusPoint) === 0;
    
    return isPageStart 
      ? `Page ${pointInfo.page.id}: ${pointInfo.page.title || ''}`
      : pointInfo.focusPoint.description || `Focus point ${adjustedValue + 1}`;
  };
  
  // Function to determine thumb size based on if it's a page start point
  const getThumbSize = (value: number) => {
    // Special cases for homepage and end page
    if (value === HOME_INDEX || value === END_INDEX) return 16;
    
    // Empty slot reserved for spacing - make thumb invisible
    if (value === NAVIGATION_CONSTANTS.SEPARATOR_INDEX) return 0;
    
    // Adjust the index back to match comic data indexing
    const adjustedValue = value - COMIC_START_INDEX;
    
    const pointInfo = getFocusPointByAbsoluteIndex(adjustedValue);
    if (!pointInfo) return 10;
    
    const isPageStart = pointInfo.page.focusPoints.indexOf(pointInfo.focusPoint) === 0;
    return isPageStart ? 16 : 10;
  };
  
  // Handle user interaction with the timeline
  const handleSliderChange = (value: number) => {
    console.log(`Timeline: Navigating to absolute index ${value}`);
    
    // Skip the spacer mark - if clicked, do nothing
    if (value === NAVIGATION_CONSTANTS.SEPARATOR_INDEX) return false;
    
    return navigateToAbsoluteIndex(value);
  };
  
  // Determine correct display value for special cases
  const getDisplayValue = () => {
    // Handle end page specifically to ensure correct display
    if (currentPageId === comicData.pages.length + 1) {
      return END_INDEX;
    }
    
    // Handle homepage specifically
    if (currentPageId === 0) {
      return HOME_INDEX;
    }
    
    // Otherwise use the calculated absoluteIndex
    return absoluteIndex;
  };
  
  return (
    <Slider
      value={getDisplayValue()}
      data-timeline={timelineData}
      onChange={handleSliderChange}
      min={0}
      max={END_INDEX}
      step={1}
      marks={marks}
      label={getLabel}
      thumbSize={getThumbSize(getDisplayValue())}
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

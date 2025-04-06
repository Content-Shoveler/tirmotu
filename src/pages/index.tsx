import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card, Container, Stack, Text, Group, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { ComicNavigationState } from '@/components/ComicViewer';
import { 
  comicData, 
  getPageAndFocusPointFromAbsoluteIndex
} from '@/data/comic-data';
import { ComicPage } from '@/utils/types';

interface HomeProps {
  updateAppNavigationState?: (state: ComicNavigationState) => void;
}

export default function Home({ updateAppNavigationState }: HomeProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Define startReading with useCallback to prevent recreation on each render
  const startReading = useCallback(async () => {
    setIsLoading(true);
    try {
      await router.push('/1');
    } catch (error) {
      console.error('Navigation error:', error);
      setIsLoading(false);
    }
  }, [router]);
  
  // Track auto-play state
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  
  // Function to toggle auto-play
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prevState => !prevState);
    // If turning on auto-play, start the reading process
    if (!isAutoPlaying) {
      startReading();
    }
  }, [isAutoPlaying, startReading]);
  
  // Function to navigate to a specific index on the timeline
  const navigateToAbsoluteIndex = useCallback((index: number) => {
    console.log(`Home: Navigating to absolute index ${index}`);
    
    // Constants for timeline spacing (must match those in Timeline.tsx)
    const HOME_INDEX = 0;
    const COMIC_START_INDEX = 2; // Space for Home (0) and separator (1)
    
    // Get the total number of focus points from the comic data
    const totalFocusPoints = comicData.pages.reduce(
      (total: number, page: ComicPage) => total + page.focusPoints.length, 0
    );
    
    // If index is HOME_INDEX (0), we stay on the home page
    if (index === HOME_INDEX) {
      return true;
    }
    
    // Skip the separator mark (index 1)
    if (index === 1) {
      return false;
    }
    
    // If it's the last index (end page), navigate to the end page
    const END_INDEX = totalFocusPoints + COMIC_START_INDEX;
    if (index === END_INDEX) {
      router.push(`/${comicData.pages.length + 1}`);
      return true;
    }
    
    // For comic content indices, adjust the index to account for Home and separator offsets
    if (index >= COMIC_START_INDEX) {
      // Subtract the offset before looking up the page/focus point
      const adjustedIndex = index - COMIC_START_INDEX;
      const pageAndPoint = getPageAndFocusPointFromAbsoluteIndex(adjustedIndex);
      
      if (pageAndPoint) {
        router.push(`/${pageAndPoint.pageId}`);
        return true;
      }
    }
    
    return false;
  }, [router]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Right arrow and space move forward to first page
      if (e.key === 'ArrowRight' || e.key === ' ') {
        startReading();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [startReading]);
  
  // Create a simplified navigation state for the home page
  useEffect(() => {
    if (updateAppNavigationState) {
      // Get the total focus points in the comic
      const totalFocusPoints = comicData.pages.reduce(
        (total: number, page: ComicPage) => total + page.focusPoints.length, 0
      );
      
      // Constants for timeline spacing (must match those in Timeline.tsx)
      const HOME_INDEX = 0;
      const COMIC_START_INDEX = 2; // Space for Home (0) and separator (1)
      
      const navigationState = {
        currentPageId: 0,
        isAutoPlaying: isAutoPlaying,
        hasNextPoint: true,
        hasPrevPoint: false,
        currentFocusPoint: null,
        isLoading: false,
        absoluteIndex: HOME_INDEX, // Home is at index 0
        // Add COMIC_START_INDEX to account for homepage and spacing offsets
        totalNavigationPoints: totalFocusPoints + COMIC_START_INDEX + 1, // +1 for end page
        title: 'Immersive Comic Experience',
        nextPoint: startReading,
        prevPoint: () => false,
        navigateToAbsoluteIndex: navigateToAbsoluteIndex,
        toggleAutoPlay: toggleAutoPlay
      };
      
      updateAppNavigationState(navigationState);
    }
  }, [updateAppNavigationState, startReading, navigateToAbsoluteIndex, toggleAutoPlay, isAutoPlaying]);

  return (
    <>
      <Head>
        <title>Immersive Comic Experience</title>
        <meta name="description" content="An immersive comic viewing experience with focus points and smooth transitions" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      
  <Container 
    h="calc(100vh - 120px)" // Account for header and footer (60px each)
    display="flex" 
    style={{ 
      alignItems: 'center', 
      justifyContent: 'center'
    }}
  >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card 
            shadow="sm" 
            p="xl" 
            radius="md" 
            withBorder 
            maw={500}
            ta="center"
          >
            <Stack>
              <Title order={1}>
                Immersive Comic Experience
              </Title>
              
              <Text size="lg" mt="xl">
                Welcome to a revolutionary way to experience comics. Our guided viewing system
                will lead you through each panel with cinematic transitions, creating an
                immersive narrative flow unlike traditional comic reading.
              </Text>
              
              <Group justify="center" mt="xl" gap="md">
                <Button
                  color="blue"
                  size="lg"
                  loading={isLoading}
                  onClick={startReading}
                >
                  Start Reading
                </Button>
                
                <Button
                  component={Link}
                  href="/about"
                  variant="outline"
                  size="lg"
                >
                  Learn More
                </Button>
              </Group>
            </Stack>
          </Card>
        </motion.div>
      </Container>
    </>
  );
}

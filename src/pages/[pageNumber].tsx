import { useRouter } from 'next/router';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Container, Stack, Title, Text, Group, Button } from '@mantine/core';
import { comicData } from '@/data/comic-data';
import ComicViewer from '@/components/ComicViewer';
import { NAVIGATION_CONSTANTS } from '@/utils/navigation-constants';

import { ComicNavigationState } from '@/components/ComicViewer';

interface PageProps {
  pageNumber: number;
  navigationDirection?: "forward" | "backward";
  updateAppNavigationState?: (state: ComicNavigationState) => void;
}

const Page: NextPage<PageProps> = ({ 
  pageNumber, 
  navigationDirection = "forward",
  updateAppNavigationState 
}) => {
  const router = useRouter();
  
  // Get the current page data
  const page = comicData.pages.find(p => p.id === pageNumber);
  
  // Check if this is the end page (one number more than there are comic pages)
  const isEndPage = pageNumber === comicData.pages.length + 1;
  
  // Navigation functions for end page
  const goToHomePage = useCallback(() => {
    router.push('/');
  }, [router]);

  const goToLastPage = useCallback(() => {
    router.push(`/${comicData.pages[comicData.pages.length - 1].id}`);
  }, [router]);

  // Create the end page navigation state
  useEffect(() => {
    if (updateAppNavigationState && isEndPage) {
      const endNavigationState: ComicNavigationState = {
        currentPageId: pageNumber,
        isAutoPlaying: false,
        hasNextPoint: true, // Enable circular navigation to home
        hasPrevPoint: true, // Always allow back navigation
        currentFocusPoint: null,
        isLoading: false,
        absoluteIndex: comicData.pages.reduce((total, page) => total + page.focusPoints.length, 0) + NAVIGATION_CONSTANTS.COMIC_START_INDEX,
        totalNavigationPoints: comicData.pages.reduce((total, page) => total + page.focusPoints.length, 0),
        title: "The End",
        nextPoint: goToHomePage,
        prevPoint: goToLastPage,
        navigateToAbsoluteIndex: (index) => {
          // Handle specific navigation from timeline
          if (index === NAVIGATION_CONSTANTS.HOME_INDEX) {
            goToHomePage();
            return true;
          }
          
          // Other indices handled by router navigation
          return false;
        },
        toggleAutoPlay: () => false
      };
      
      updateAppNavigationState(endNavigationState);
    }
  }, [updateAppNavigationState, pageNumber, goToHomePage, goToLastPage, isEndPage]);

  // Global keyboard navigation - works for all pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Special handling for end page
      if (isEndPage) {
        // Right arrow and space return to home from end page (circular navigation)
        if (e.key === 'ArrowRight' || e.key === ' ') {
          goToHomePage();
        }
        // Left arrow goes to previous page from end page
        else if (e.key === 'ArrowLeft') {
          goToLastPage();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEndPage, goToHomePage, goToLastPage]);
  
  // If it's the end page, display a special "End" message
  if (isEndPage) {

    return (
      <Container 
        h="calc(100vh - 120px)" // Account for header and footer (60px each)
        display="flex" 
        style={{ 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Stack align="center" gap="lg">
          <Title order={1} size="h1" mb="md">The End</Title>
          <Text size="lg" maw={600} mb="xl">
            Thank you for reading our comic. We hope you enjoyed the journey through Tirmotu!
          </Text>
          <Group>
            <Button onClick={goToHomePage}>Return Home</Button>
            <Button 
              variant="outline"
              onClick={goToLastPage}
            >
              Previous Page
            </Button>
          </Group>
        </Stack>
      </Container>
    );
  }
  
  // If the page is not found and it's not the end page, return a 404-like page
  if (!page && !router.isFallback) {
    console.error(`Page not found: ${pageNumber}`);
    return (
      <Container 
        h="calc(100vh - 120px)" // Account for header and footer (60px each)
        display="flex" 
        style={{ 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Stack align="center" gap="lg">
          <Title order={1} size="h1" mb="md">Page Not Found</Title>
          <Text size="lg" mb="xl">Sorry, the comic page you&apos;re looking for doesn&apos;t exist.</Text>
          <Button onClick={() => router.push('/')}>Return Home</Button>
        </Stack>
      </Container>
    );
  }
  
  return (
    <>
      <Head>
        <title>{page?.title ? `${page.title} | Comic Viewer` : 'Comic Viewer'}</title>
        <meta name="description" content={`Page ${pageNumber} of the comic: ${comicData.title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      
      <ComicViewer 
        pageId={pageNumber} 
        navigationDirection={navigationDirection}
        updateAppNavigationState={updateAppNavigationState}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all comic pages
  const paths = comicData.pages.map(page => ({
    params: { pageNumber: page.id.toString() },
  }));
  
  // Add the end page (one number more than the number of comic pages)
  paths.push({
    params: { pageNumber: (comicData.pages.length + 1).toString() }
  });
  
  return {
    paths,
    fallback: false, // Return 404 for any paths not generated
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageNumber = parseInt(params?.pageNumber as string, 10);
  
  return {
    props: {
      pageNumber,
    },
  };
};

export default Page;

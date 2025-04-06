import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { MantineProvider, createTheme, AppShell } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPageById } from '@/data/comic-data';
import '@mantine/core/styles.css';
import '@/styles/globals.css';

// Define Mantine theme
const theme = createTheme({
  // Default theme settings
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'system-ui, -apple-system, sans-serif' },
  defaultRadius: 'md',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [navigationDirection, setNavigationDirection] = useState<"forward" | "backward">("forward");
  const [prevPath, setPrevPath] = useState<string>("");
  // Use localStorage to persist color scheme
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
  });
  
  // Toggle color scheme
  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newColorScheme);
    console.log('Theme toggled to:', newColorScheme);
  };
  
  // Add router change event listeners for debugging
  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      console.log('Route change starting to:', url);
    };
    
    const handleRouteChangeComplete = (url: string) => {
      console.log('Route change completed to:', url);
    };
    
    const handleRouteChangeError = (err: Error, url: string) => {
      console.error(`Route change to ${url} failed:`, err);
    };
    
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);
  
  // Track navigation direction for animations
  useEffect(() => {
    if (prevPath) {
      // For comic pages, determine direction based on page number
      const prevMatch = prevPath.match(/\/comic\/(\d+)/);
      const currentMatch = router.asPath.match(/\/comic\/(\d+)/);
      
      if (prevMatch && currentMatch) {
        const prevPage = parseInt(prevMatch[1], 10);
        const currentPage = parseInt(currentMatch[1], 10);
        setNavigationDirection(currentPage > prevPage ? "forward" : "backward");
      } else {
        // Default direction for non-comic page navigation
        setNavigationDirection("forward");
      }
    }
    
    setPrevPath(router.asPath);
  }, [router.asPath]);

  // Get current page title and determine if we're on a comic page
  const isHomePage = router.pathname === '/';
  const isEndPage = router.pathname === '/[pageNumber]' && router.query.pageNumber === String(12 + 1); // End page is one more than total pages
  const pageNumber = router.pathname === '/[pageNumber]' ? parseInt(router.query.pageNumber as string, 10) : null;
  
  // Default navigation handlers
  const defaultNextPoint = () => {
    if (isHomePage) {
      router.push('/1');
    }
    return false;
  };
  
  const defaultPrevPoint = () => {
    return false;
  };
  
  const defaultToggleAutoPlay = () => {
    // No-op for non-comic pages
  };
  
  // Default navigation state for non-comic pages
  const defaultNavigationState = {
    isPlaying: false,
    hasNext: !isEndPage, // There's a next page unless we're on the end page
    hasPrev: !isHomePage, // There's a prev page unless we're on the home page
    onNext: defaultNextPoint,
    onPrev: defaultPrevPoint,
    onPlayPause: defaultToggleAutoPlay,
    absoluteIndex: isHomePage ? 0 : (isEndPage ? 999 : -1), // Home page is first, end page is last
    totalNavigationPoints: 100, // Placeholder
    navigateToAbsoluteIndex: () => false
  };

  return (
    <MantineProvider
      theme={theme}
      forceColorScheme={colorScheme}
    >
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 60 }}
        bg={colorScheme === 'dark' ? '#1A1B1E' : '#FFFFFF'}
        c={colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
        styles={{
          main: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: '60px',
            paddingBottom: '60px',
          }
        }}
      >
        <AppShell.Header>
          <Header 
            title={pageNumber ? getPageById(pageNumber)?.title || 'Comic Viewer' : 'Immersive Comic Experience'}
            isPlaying={defaultNavigationState.isPlaying}
            hasNext={defaultNavigationState.hasNext}
            hasPrev={defaultNavigationState.hasPrev}
            onNext={defaultNavigationState.onNext}
            onPrev={defaultNavigationState.onPrev}
            onPlayPause={defaultNavigationState.onPlayPause}
            toggleColorScheme={toggleColorScheme}
            colorScheme={colorScheme}
          />
        </AppShell.Header>
        
        <AppShell.Main>
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
            custom={navigationDirection}
          >
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0, x: navigationDirection === "forward" ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: navigationDirection === "forward" ? -100 : 100 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30 
              }}
              style={{ width: '100%', height: '100%' }}
            >
              <Component 
                {...pageProps} 
                navigationDirection={navigationDirection}
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
              />
            </motion.div>
          </AnimatePresence>
        </AppShell.Main>
        
        <AppShell.Footer>
          <Footer 
            absoluteIndex={defaultNavigationState.absoluteIndex}
            totalNavigationPoints={defaultNavigationState.totalNavigationPoints}
            navigateToAbsoluteIndex={defaultNavigationState.navigateToAbsoluteIndex}
            colorScheme={colorScheme}
          />
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}

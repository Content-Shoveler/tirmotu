import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { MantineProvider, createTheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import '@mantine/core/styles.css';
import '@/styles/globals.css';
// Add debugging for route changes

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

  return (
    <MantineProvider
      theme={theme}
      forceColorScheme={colorScheme}
    >
      <Layout toggleColorScheme={toggleColorScheme} colorScheme={colorScheme}>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
          custom={navigationDirection}
        >
          <Component 
            {...pageProps} 
            key={router.asPath} 
            navigationDirection={navigationDirection}
          />
        </AnimatePresence>
      </Layout>
    </MantineProvider>
  );
}

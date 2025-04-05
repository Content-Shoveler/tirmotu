import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import { useState, useEffect } from 'react';
// Add debugging for route changes

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [navigationDirection, setNavigationDirection] = useState<"forward" | "backward">("forward");
  const [prevPath, setPrevPath] = useState<string>("");
  
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
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
    >
      <Layout>
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
    </ThemeProvider>
  );
}

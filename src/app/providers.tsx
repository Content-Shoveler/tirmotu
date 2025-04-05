"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function Providers({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  // Check system preference and set initial theme
  useEffect(() => {
    // Only run on the client side
    if (typeof window === 'undefined') return;
    
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initial setup
    const initialDarkMode = darkModeQuery.matches;
    setIsDarkMode(initialDarkMode);
    
    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Event listener for theme changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    darkModeQuery.addEventListener('change', handleChange);
    
    // Set mounted state separately to avoid update loop
    setTimeout(() => {
      setMounted(true);
    }, 0);
    
    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  if (!mounted) {
    // Render a placeholder with the same structure to avoid layout shift
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <NextThemesProvider attribute="class">
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
}

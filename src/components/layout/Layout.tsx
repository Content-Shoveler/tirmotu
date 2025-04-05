import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Box, AppShell } from '@mantine/core';

// Dynamically import components to avoid SSR issues with browser-specific APIs
const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), { ssr: false });

interface LayoutProps {
  children: ReactNode;
  toggleColorScheme: () => void;
  colorScheme: 'light' | 'dark';
}

export default function Layout({ children, toggleColorScheme, colorScheme }: LayoutProps) {
  return (
    <AppShell>
      <AppShell.Main>
        {children}
        
        {/* Theme toggle positioned in top-right corner */}
        <Box 
          pos="fixed"
          top={16}
          right={16}
          style={{ zIndex: 1000 }}
        >
          <ThemeToggle toggleColorScheme={toggleColorScheme} colorScheme={colorScheme} />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

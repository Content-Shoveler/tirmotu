import { ReactNode } from 'react';
import { Box, MantineColorScheme } from '@mantine/core';

interface LayoutProps {
  children: ReactNode;
  colorScheme: MantineColorScheme;
}

export default function Layout({ children, colorScheme }: LayoutProps) {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#FFFFFF',
        color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      }}
    >
      {children}
    </Box>
  );
}

import { ReactNode } from 'react';
import { AppShell, MantineColorScheme } from '@mantine/core';

interface LayoutProps {
  children?: ReactNode;
  colorScheme: MantineColorScheme;
  header?: ReactNode;
  footer?: ReactNode;
  viewer?: ReactNode;
}

export default function Layout({ 
  children, 
  colorScheme, 
  header, 
  footer, 
  viewer 
}: LayoutProps) {
  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      bg={colorScheme === 'dark' ? '#1A1B1E' : '#FFFFFF'}
      c={colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
      styles={{
        main: {
          paddingLeft: 0,
          paddingRight: 0,
          // We need to override padding to ensure full-height viewer
          paddingTop: '60px', // Match header height
          paddingBottom: '60px', // Match footer height
        }
      }}
    >
      {header && <AppShell.Header>{header}</AppShell.Header>}
      
      <AppShell.Main>
        {viewer || children}
      </AppShell.Main>
      
      {footer && <AppShell.Footer>{footer}</AppShell.Footer>}
    </AppShell>
  );
}

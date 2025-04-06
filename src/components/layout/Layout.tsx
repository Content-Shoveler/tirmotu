import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Box, AppShell, Tooltip, ActionIcon, Group } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { useRouter } from 'next/router';

// Dynamically import components to avoid SSR issues with browser-specific APIs
const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), { ssr: false });

interface LayoutProps {
  children: ReactNode;
  toggleColorScheme: () => void;
  colorScheme: 'light' | 'dark';
}

export default function Layout({ children, toggleColorScheme, colorScheme }: LayoutProps) {
  const router = useRouter();
  return (
    <AppShell>
      <AppShell.Main>
        {children}
        
        {/* Controls positioned in top-right corner */}
        <Box 
          pos="fixed"
          top={16}
          right={16}
          style={{ zIndex: 1000 }}
        >
          <Group gap="xs">
            <Tooltip label="Go to home page">
              <ActionIcon
                variant="subtle"
                aria-label="Home"
                onClick={() => router.push('/')}
                size="lg"
              >
                <IconHome size={20} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
            <ThemeToggle toggleColorScheme={toggleColorScheme} colorScheme={colorScheme} />
          </Group>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

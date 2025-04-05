import { useState, useEffect } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

interface ThemeToggleProps {
  toggleColorScheme: () => void;
  colorScheme: 'light' | 'dark';
}

export default function ThemeToggle({ toggleColorScheme, colorScheme }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tooltip label={colorScheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <ActionIcon
        variant="subtle"
        aria-label="Toggle theme"
        onClick={toggleColorScheme}
        size="lg"
      >
        {colorScheme === 'dark' ? (
          <IconSun size={20} stroke={1.5} />
        ) : (
          <IconMoon size={20} stroke={1.5} />
        )}
      </ActionIcon>
    </Tooltip>
  );
}

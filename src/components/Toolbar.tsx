import { Group, MantineColorScheme } from '@mantine/core';
import HomeButton from './HomeButton';
import ThemeToggle from './ThemeToggle';

interface ToolbarProps {
  toggleColorScheme: () => void;
  colorScheme: MantineColorScheme;
}

export default function Toolbar({ toggleColorScheme, colorScheme }: ToolbarProps) {
  return (
    <Group gap="xs">
      <HomeButton />
      <ThemeToggle toggleColorScheme={toggleColorScheme} colorScheme={colorScheme} />
    </Group>
  );
}

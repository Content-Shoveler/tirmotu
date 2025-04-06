import { Group, Box, MantineColorScheme } from '@mantine/core';
import Toolbar from './Toolbar';
import Title from './Title';
import Navigation from './Navigation';

interface HeaderProps {
  title?: string;
  isPlaying: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPlayPause: () => void;
  toggleColorScheme: () => void;
  colorScheme: MantineColorScheme;
}

export default function Header({
  title,
  isPlaying,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
  onPlayPause,
  toggleColorScheme,
  colorScheme
}: HeaderProps) {
  return (
    <Box
      component="header"
      h={60}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        borderBottom: '1px solid',
        borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <Group justify="space-between" style={{ width: '100%' }}>
        <Toolbar toggleColorScheme={toggleColorScheme} colorScheme={colorScheme} />
        
        <Box style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <Title title={title} data-header-title={true} />
        </Box>
        
        <Box ml="auto">
          <Navigation 
            isPlaying={isPlaying}
            hasNext={hasNext}
            hasPrev={hasPrev}
            onNext={onNext}
            onPrev={onPrev}
            onPlayPause={onPlayPause}
            data-next-button={true}
            data-prev-button={true}
            data-play-button={true}
          />
        </Box>
      </Group>
    </Box>
  );
}

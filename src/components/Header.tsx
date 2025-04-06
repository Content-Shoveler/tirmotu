import { Group, Box, MantineColorScheme } from '@mantine/core';
import Toolbar from './Toolbar';
import Title from './Title';
import Navigation from './Navigation';
import Timer from './Timer';
import { FocusPoint } from '@/utils/types';

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
  currentFocusPoint: FocusPoint | null;
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
  colorScheme,
  currentFocusPoint
}: HeaderProps) {
  return (
    <Box
      component="header"
      h={60}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        borderBottom: '1px solid',
        borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Timer at the very top */}
      <Box style={{ width: '100%', position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Timer isPlaying={isPlaying} currentFocusPoint={currentFocusPoint} />
      </Box>
      <Group justify="space-between" style={{ width: '100%', padding: '0 16px', flex: 1, alignItems: 'center' }}>
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

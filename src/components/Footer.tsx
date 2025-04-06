import { Box, MantineColorScheme } from '@mantine/core';
import Timeline from './Timeline';

interface FooterProps {
  absoluteIndex: number;
  totalNavigationPoints: number;
  navigateToAbsoluteIndex: (index: number) => boolean;
  colorScheme: MantineColorScheme;
}

export default function Footer({
  absoluteIndex,
  totalNavigationPoints,
  navigateToAbsoluteIndex,
  colorScheme
}: FooterProps) {
  return (
    <Box
      component="footer"
      h={60}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        borderTop: '1px solid',
        borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <Timeline
        absoluteIndex={absoluteIndex}
        totalNavigationPoints={totalNavigationPoints}
        navigateToAbsoluteIndex={navigateToAbsoluteIndex}
        data-timeline={true}
      />
    </Box>
  );
}

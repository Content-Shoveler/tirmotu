import { Button } from '@mantine/core';
import { IconPlayerPlayFilled, IconPlayerPauseFilled } from '@tabler/icons-react';

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

export default function PlayPauseButton({ isPlaying, onClick }: PlayPauseButtonProps) {
  return (
    <Button
      aria-label={isPlaying ? "Pause" : "Play"}
      size="lg"
      variant="filled"
      color="blue"
      onClick={onClick}
      radius="xl"
    >
      {isPlaying ? (
        <IconPlayerPauseFilled size={24} />
      ) : (
        <IconPlayerPlayFilled size={24} />
      )}
    </Button>
  );
}

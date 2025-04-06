import { Group } from '@mantine/core';
import PrevButton from './PrevButton';
import PlayPauseButton from './PlayPauseButton';
import NextButton from './NextButton';

interface NavigationProps {
  isPlaying: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPlayPause: () => void;
}

export default function Navigation({
  isPlaying,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
  onPlayPause
}: NavigationProps) {
  return (
    <Group justify="center" gap="md">
      <PrevButton onClick={onPrev} disabled={!hasPrev} />
      <PlayPauseButton isPlaying={isPlaying} onClick={onPlayPause} />
      <NextButton onClick={onNext} disabled={!hasNext} />
    </Group>
  );
}

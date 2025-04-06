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
  'data-next-button'?: boolean;
  'data-prev-button'?: boolean;
  'data-play-button'?: boolean;
}

export default function Navigation({
  isPlaying,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
  onPlayPause,
  'data-next-button': nextButtonData,
  'data-prev-button': prevButtonData,
  'data-play-button': playButtonData,
}: NavigationProps) {
  return (
    <Group justify="center" gap="md">
      <PrevButton onClick={onPrev} disabled={!hasPrev} data-prev-button={prevButtonData} />
      <PlayPauseButton isPlaying={isPlaying} onClick={onPlayPause} data-play-button={playButtonData} />
      <NextButton onClick={onNext} disabled={!hasNext} data-next-button={nextButtonData} />
    </Group>
  );
}

import { Progress } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { FocusPoint } from '@/utils/types';

interface TimerProps {
  isPlaying: boolean;
  currentFocusPoint: FocusPoint | null;
}

export default function Timer({ isPlaying, currentFocusPoint }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  
  // Reset timer when focus point changes or play state changes
  useEffect(() => {
    if (currentFocusPoint && isPlaying) {
      setTimeRemaining(currentFocusPoint.duration);
      setTotalDuration(currentFocusPoint.duration);
    } else {
      setTimeRemaining(0);
      setTotalDuration(0);
    }
  }, [currentFocusPoint, isPlaying]);
  
  // Update timer every 100ms for smoother progress animation
  const interval = useInterval(() => {
    if (timeRemaining > 0) {
      setTimeRemaining((prev) => Math.max(0, prev - 0.1));
    }
  }, 100);
  
  // Start/stop interval based on play state
  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      interval.start();
    } else {
      interval.stop();
    }
    
    return interval.stop;
  }, [interval, isPlaying, timeRemaining]);
  
  // Calculate progress percentage (starts at 0% and goes to 100%)
  const progressPercentage = totalDuration > 0 
    ? (1 - (timeRemaining / totalDuration)) * 100 
    : 0;
  
  // Don't render anything if not playing
  if (!isPlaying || !currentFocusPoint) {
    return null;
  }
  
  return (
    <Progress 
      value={progressPercentage} 
      size="xs" 
      color="blue" 
      radius={0}
      style={{ width: '100%' }}
    />
  );
}

import { Button } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';

interface PrevButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function PrevButton({ onClick, disabled }: PrevButtonProps) {
  return (
    <Button
      aria-label="Previous"
      size="lg"
      variant="subtle"
      onClick={onClick}
      disabled={disabled}
      radius="xl"
    >
      <IconChevronLeft size={24} />
    </Button>
  );
}

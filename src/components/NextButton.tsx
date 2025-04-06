import { Button } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

interface NextButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function NextButton({ onClick, disabled }: NextButtonProps) {
  return (
    <Button
      aria-label="Next"
      size="lg"
      variant="subtle"
      onClick={onClick}
      disabled={disabled}
      radius="xl"
    >
      <IconChevronRight size={24} />
    </Button>
  );
}

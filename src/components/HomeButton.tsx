import { ActionIcon, Tooltip } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export default function HomeButton() {
  const router = useRouter();
  
  return (
    <Tooltip label="Go to home page">
      <ActionIcon
        variant="subtle"
        aria-label="Home"
        onClick={() => router.push('/')}
        size="lg"
      >
        <IconHome size={20} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
}

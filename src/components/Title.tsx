import { Box, Text, useMantineColorScheme } from '@mantine/core';

interface TitleProps {
  title?: string;
  'data-header-title'?: boolean;
}

export default function Title({ title, 'data-header-title': headerTitle }: TitleProps) {
  const { colorScheme } = useMantineColorScheme();
  
  if (!title) return null;
  
  return (
    <Box
      p="xs"
      data-header-title={headerTitle}
      style={{
        padding: '8px 16px',
        backgroundColor: colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        borderRadius: '8px',
      }}
    >
      <Text color={colorScheme === 'dark' ? 'white' : 'black'} fw={500}>{title}</Text>
    </Box>
  );
}

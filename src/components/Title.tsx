import { Box, Text, useMantineColorScheme } from '@mantine/core';

interface TitleProps {
  title?: string;
}

export default function Title({ title }: TitleProps) {
  const { colorScheme } = useMantineColorScheme();
  
  if (!title) return null;
  
  return (
    <Box
      p="xs"
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

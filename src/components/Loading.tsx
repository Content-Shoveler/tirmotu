import { motion } from 'framer-motion';
import { Loader, useMantineColorScheme } from '@mantine/core';

interface LoadingProps {
  isLoading: boolean;
}

export default function Loading({ isLoading }: LoadingProps) {
  const { colorScheme } = useMantineColorScheme();
  
  if (!isLoading) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <Loader size="lg" />
    </motion.div>
  );
}

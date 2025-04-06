import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card, Container, Stack, Text, Group, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { ComicNavigationState } from '@/components/ComicViewer';

interface HomeProps {
  updateAppNavigationState?: (state: ComicNavigationState) => void;
}

export default function Home({ updateAppNavigationState }: HomeProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Define startReading with useCallback to prevent recreation on each render
  const startReading = useCallback(async () => {
    setIsLoading(true);
    try {
      await router.push('/1');
    } catch (error) {
      console.error('Navigation error:', error);
      setIsLoading(false);
    }
  }, [router]);
  
  // Create a simplified navigation state for the home page
  useEffect(() => {
    if (updateAppNavigationState) {
      const navigationState = {
        currentPageId: 0,
        isAutoPlaying: false,
        hasNextPoint: true,
        hasPrevPoint: false,
        currentFocusPoint: null,
        isLoading: false,
        absoluteIndex: 0,
        totalNavigationPoints: 100,
        title: 'Immersive Comic Experience',
        nextPoint: startReading,
        prevPoint: () => false,
        navigateToAbsoluteIndex: () => false,
        toggleAutoPlay: () => {}
      };
      
      updateAppNavigationState(navigationState);
    }
  }, [updateAppNavigationState, startReading]);

  return (
    <>
      <Head>
        <title>Immersive Comic Experience</title>
        <meta name="description" content="An immersive comic viewing experience with focus points and smooth transitions" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      
  <Container 
    h="calc(100vh - 120px)" // Account for header and footer (60px each)
    display="flex" 
    style={{ 
      alignItems: 'center', 
      justifyContent: 'center'
    }}
  >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card 
            shadow="sm" 
            p="xl" 
            radius="md" 
            withBorder 
            maw={500}
            ta="center"
          >
            <Stack>
              <Title order={1}>
                Immersive Comic Experience
              </Title>
              
              <Text size="lg" mt="xl">
                Welcome to a revolutionary way to experience comics. Our guided viewing system
                will lead you through each panel with cinematic transitions, creating an
                immersive narrative flow unlike traditional comic reading.
              </Text>
              
              <Group justify="center" mt="xl" gap="md">
                <Button
                  color="blue"
                  size="lg"
                  loading={isLoading}
                  onClick={startReading}
                >
                  Start Reading
                </Button>
                
                <Button
                  component={Link}
                  href="/about"
                  variant="outline"
                  size="lg"
                >
                  Learn More
                </Button>
              </Group>
            </Stack>
          </Card>
        </motion.div>
      </Container>
    </>
  );
}

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card, Container, Stack, Text, Group, Title } from '@mantine/core';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const startReading = async () => {
    setIsLoading(true);
    try {
      await router.push('/1');
    } catch (error) {
      console.error('Navigation error:', error);
      setIsLoading(false);
    }
  };

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
        h="100vh" 
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

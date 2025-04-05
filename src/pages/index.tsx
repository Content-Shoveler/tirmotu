import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card } from '@heroui/react';
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
      
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '0 1rem',
        background: 'var(--background)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card 
            style={{ 
              maxWidth: '500px',
              padding: '2rem',
              backgroundColor: 'var(--background)',
              border: '1px solid var(--foreground)',
              textAlign: 'center'
            }}
          >
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--foreground)'
            }}>
              Immersive Comic Experience
            </h1>
            
            <div style={{ margin: '2rem 0' }}></div>
            
            <p style={{ color: 'var(--foreground)', lineHeight: 1.6 }}>
              Welcome to a revolutionary way to experience comics. Our guided viewing system
              will lead you through each panel with cinematic transitions, creating an
              immersive narrative flow unlike traditional comic reading.
            </p>
            
            <div style={{ margin: '3rem 0' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Button
                color="primary"
                size="lg"
                isLoading={isLoading}
                onPress={startReading}
              >
                Start Reading
              </Button>
              
              <Button
                as={Link}
                href="/about"
                variant="bordered"
                size="lg"
                onPress={() => {}}
              >
                Learn More
              </Button>
            </div>
          </Card>
        </motion.div>
      </main>
    </>
  );
}

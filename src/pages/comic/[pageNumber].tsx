import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { comicData } from '@/data/comic-data';
import ComicViewer from '@/components/ComicViewer';
import { Button } from '@heroui/react';

interface ComicPageProps {
  pageNumber: number;
}

const ComicPage: NextPage<ComicPageProps> = ({ pageNumber }) => {
  const router = useRouter();
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('left');
  
  // Handle navigation direction for exit animations
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const newPageMatch = url.match(/\/comic\/(\d+)/);
      if (newPageMatch) {
        const newPage = parseInt(newPageMatch[1], 10);
        setExitDirection(newPage > pageNumber ? 'left' : 'right');
      }
    };
    
    router.events.on('routeChangeStart', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, pageNumber]);
  
  // Get the current page data
  const page = comicData.pages.find(p => p.id === pageNumber);
  
  // Variants for page transitions
  const variants = {
    initial: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };
  
  // If the page is not found, return a 404-like page
  if (!page && !router.isFallback) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '2rem' }}>Page Not Found</h1>
        <p style={{ marginBottom: '2rem' }}>Sorry, the comic page you&apos;re looking for doesn&apos;t exist.</p>
        <Button onClick={() => router.push('/')}>Return Home</Button>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>{page?.title ? `${page.title} | Comic Viewer` : 'Comic Viewer'}</title>
        <meta name="description" content={`Page ${pageNumber} of the comic: ${comicData.title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      
      <motion.div
        custom={exitDirection}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        style={{ width: '100%', height: '100vh' }}
      >
        <ComicViewer pageId={pageNumber} />
      </motion.div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all comic pages
  const paths = comicData.pages.map(page => ({
    params: { pageNumber: page.id.toString() },
  }));
  
  return {
    paths,
    fallback: false, // Return 404 for any paths not generated
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageNumber = parseInt(params?.pageNumber as string, 10);
  
  return {
    props: {
      pageNumber,
    },
  };
};

export default ComicPage;

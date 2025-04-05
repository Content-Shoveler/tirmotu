import { useRouter } from 'next/router';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { comicData } from '@/data/comic-data';
import ComicViewer from '@/components/ComicViewer';
import { Button } from '@heroui/react';

interface ComicPageProps {
  pageNumber: number;
  navigationDirection?: "forward" | "backward";
}

const ComicPage: NextPage<ComicPageProps> = ({ pageNumber, navigationDirection = "forward" }) => {
  const router = useRouter();
  
  // Get the current page data
  const page = comicData.pages.find(p => p.id === pageNumber);
  
  // Variants for page transitions
  const variants = {
    initial: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 120, damping: 45 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 120, damping: 45 },
        opacity: { duration: 0.4 },
      },
    }),
  };
  
  // Check if this is the end page (one number more than there are comic pages)
  const isEndPage = pageNumber === comicData.pages.length + 1;
  
  // If it's the end page, display a special "End" message
  if (isEndPage) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        padding: '2rem',
        textAlign: 'center',
        background: 'var(--background)'
      }}>
        <h1 style={{ 
          marginBottom: '2rem', 
          fontSize: '3rem',
          color: 'var(--foreground)'
        }}>The End</h1>
        <p style={{ 
          marginBottom: '2rem', 
          fontSize: '1.2rem',
          maxWidth: '600px',
          color: 'var(--foreground)'
        }}>
          Thank you for reading our comic. We hope you enjoyed the journey through Tirmotu!
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={() => router.push('/')}>Return Home</Button>
          <Button 
            variant="bordered"
            onClick={() => router.push(`/${comicData.pages[comicData.pages.length - 1].id}`)}
          >
            Previous Page
          </Button>
        </div>
      </div>
    );
  }
  
  // If the page is not found and it's not the end page, return a 404-like page
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
        custom={navigationDirection}
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
  
  // Add the end page (one number more than the number of comic pages)
  paths.push({
    params: { pageNumber: (comicData.pages.length + 1).toString() }
  });
  
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

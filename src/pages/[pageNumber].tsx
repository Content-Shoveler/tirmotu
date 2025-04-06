import { useRouter } from 'next/router';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { Container, Stack, Title, Text, Group, Button } from '@mantine/core';
import { comicData } from '@/data/comic-data';
import ComicViewer from '@/components/ComicViewer';

import { ComicNavigationState } from '@/components/ComicViewer';

interface PageProps {
  pageNumber: number;
  navigationDirection?: "forward" | "backward";
  updateAppNavigationState?: (state: ComicNavigationState) => void;
}

const Page: NextPage<PageProps> = ({ 
  pageNumber, 
  navigationDirection = "forward",
  updateAppNavigationState 
}) => {
  const router = useRouter();
  
  // Get the current page data
  const page = comicData.pages.find(p => p.id === pageNumber);
  
  // Check if this is the end page (one number more than there are comic pages)
  const isEndPage = pageNumber === comicData.pages.length + 1;
  
  // If it's the end page, display a special "End" message
  if (isEndPage) {
    return (
      <Container 
        h="calc(100vh - 120px)" // Account for header and footer (60px each)
        display="flex" 
        style={{ 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Stack align="center" gap="lg">
          <Title order={1} size="h1" mb="md">The End</Title>
          <Text size="lg" maw={600} mb="xl">
            Thank you for reading our comic. We hope you enjoyed the journey through Tirmotu!
          </Text>
          <Group>
            <Button onClick={() => router.push('/')}>Return Home</Button>
            <Button 
              variant="outline"
              onClick={() => router.push(`/${comicData.pages[comicData.pages.length - 1].id}`)}
            >
              Previous Page
            </Button>
          </Group>
        </Stack>
      </Container>
    );
  }
  
  // If the page is not found and it's not the end page, return a 404-like page
  if (!page && !router.isFallback) {
    console.error(`Page not found: ${pageNumber}`);
    return (
      <Container 
        h="calc(100vh - 120px)" // Account for header and footer (60px each)
        display="flex" 
        style={{ 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Stack align="center" gap="lg">
          <Title order={1} size="h1" mb="md">Page Not Found</Title>
          <Text size="lg" mb="xl">Sorry, the comic page you&apos;re looking for doesn&apos;t exist.</Text>
          <Button onClick={() => router.push('/')}>Return Home</Button>
        </Stack>
      </Container>
    );
  }
  
  return (
    <>
      <Head>
        <title>{page?.title ? `${page.title} | Comic Viewer` : 'Comic Viewer'}</title>
        <meta name="description" content={`Page ${pageNumber} of the comic: ${comicData.title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      
      <ComicViewer 
        pageId={pageNumber} 
        navigationDirection={navigationDirection}
        updateAppNavigationState={updateAppNavigationState}
      />
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

export default Page;

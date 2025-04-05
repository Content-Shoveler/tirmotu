import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
    >
      <Layout>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}

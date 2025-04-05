import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues with browser-specific APIs
const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), { ssr: false });
const NetworkStatus = dynamic(() => import('@/components/NetworkStatus'), { ssr: false });

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: 0,
        maxWidth: '100%',
        position: 'relative'
      }}
    >
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
      
      {/* Status indicators positioned in top-right corner */}
      <div style={{ 
        position: 'fixed', 
        top: '16px', 
        right: '16px', 
        display: 'flex', 
        gap: '8px', 
        zIndex: 1000 
      }}>
        <NetworkStatus />
        <ThemeToggle />
      </div>
    </div>
  );
}

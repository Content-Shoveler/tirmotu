import { useState, useEffect } from 'react';
import { Chip } from '@heroui/react';

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Check initial status
    setIsOnline(navigator.onLine);

    // Add event listeners for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Chip
      color={isOnline ? 'success' : 'danger'}
      variant="flat"
      size="sm"
    >
      {isOnline ? 'Online' : 'Offline'}
    </Chip>
  );
}

"use client";

import { useState, useEffect } from "react";

export const useOfflineStatus = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check initial offline status
    setIsOffline(!navigator.onLine);

    // Event listeners for online/offline status changes
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOffline;
};

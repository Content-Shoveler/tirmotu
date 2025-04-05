"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ComicPage, FocusPoint } from "@/types";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import FocusPointAnimation from "./FocusPointAnimation";
import LoadingIndicator from "./LoadingIndicator";

interface ComicViewerProps {
  page: ComicPage;
  isAutoPlaying?: boolean;
  currentFocusPointIndex?: number;
  onFocusPointChange?: (index: number) => void;
}

const ComicViewer = ({
  page,
  isAutoPlaying = false,
  currentFocusPointIndex = 0,
  onFocusPointChange,
}: ComicViewerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isOffline = useOfflineStatus();
  
  // Determine if we should show an offline warning
  const showOfflineWarning = isOffline && !page.cached;

  useEffect(() => {
    // Reset image state when page changes
    setImageLoaded(false);
    setImageError(false);
  }, [page.id]);

  // Handle image load success
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
    setImageLoaded(true);
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 select-none"
    >
      {!imageLoaded && !imageError && !showOfflineWarning && <LoadingIndicator />}

      {showOfflineWarning && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 text-gray-500 dark:text-gray-400"
          >
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
            <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Offline
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            This comic page isn't available offline. Connect to the internet to view it.
          </p>
        </div>
      )}

      {imageError && !showOfflineWarning && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 text-gray-500 dark:text-gray-400"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Image Failed to Load
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            There was an error loading this comic page. Please try again later.
          </p>
        </div>
      )}

      <AnimatePresence>
        {!showOfflineWarning && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
          >
            <img
              src={page.filename}
              alt={page.title || `Comic page ${page.id}`}
              className="max-w-full max-h-full object-contain"
              style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            {imageLoaded && page.focusPoints.length > 0 && (
              <FocusPointAnimation
                containerRef={containerRef}
                imageDimensions={imageDimensions}
                focusPoints={page.focusPoints}
                currentFocusPointIndex={currentFocusPointIndex}
                isPlaying={isAutoPlaying}
                onFocusPointChange={onFocusPointChange}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline/Cached indicator */}
      <div className="absolute bottom-4 left-4 z-10">
        <div 
          className={`flex items-center text-xs px-2 py-1 rounded-full ${
            isOffline 
              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' 
              : page.cached 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}
        >
          <div 
            className={`w-2 h-2 rounded-full mr-1 ${
              isOffline 
                ? 'bg-orange-500' 
                : page.cached 
                  ? 'bg-green-500' 
                  : 'bg-gray-500'
            }`} 
          />
          {isOffline ? "Offline" : page.cached ? "Available Offline" : "Online Only"}
        </div>
      </div>
    </div>
  );
};

export default ComicViewer;

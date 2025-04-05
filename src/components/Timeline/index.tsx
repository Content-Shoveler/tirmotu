"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { comicPages, totalPages } from "@/data/comicData";

interface TimelineProps {
  currentPageId: number;
  currentFocusPointIndex?: number;
  onFocusPointChange?: (index: number) => void;
}

const Timeline = ({
  currentPageId,
  currentFocusPointIndex = 0,
  onFocusPointChange,
}: TimelineProps) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [lastMouseMoveTime, setLastMouseMoveTime] = useState(0);
  
  const currentPage = comicPages.find(page => page.id === currentPageId);
  const totalFocusPoints = currentPage?.focusPoints.length || 0;

  // Handle mouse movement to show/hide timeline
  useEffect(() => {
    // Show initially when component mounts
    setIsVisible(true);
    setLastMouseMoveTime(Date.now());
    
    const handleMouseMove = () => {
      setIsVisible(true);
      setLastMouseMoveTime(Date.now());
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hide timeline after 3 seconds of inactivity
    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastMouseMoveTime > 3000) {
        setIsVisible(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run only on mount

  // Handle page navigation
  const handlePageMarkerClick = (pageId: number) => {
    router.push(`/comic/${pageId}`);
  };

  // Handle focus point navigation
  const handleFocusPointClick = (index: number) => {
    if (onFocusPointChange) {
      onFocusPointChange(index);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-4/5 max-w-3xl h-8 bg-gray-200/70 dark:bg-gray-800/70 rounded-full z-30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Page markers */}
          <div className="relative w-full h-full flex items-center justify-between px-6">
            {/* Title page marker */}
            <motion.button
              className={`w-3 h-3 rounded-full ${
                currentPageId === 0
                  ? "bg-blue-600 dark:bg-blue-400"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/")}
              aria-label="Title page"
            />

            {/* Comic page markers */}
            {comicPages.map((page) => (
              <div key={page.id} className="relative">
                <motion.button
                  className={`w-3 h-3 rounded-full ${
                    currentPageId === page.id
                      ? "bg-blue-600 dark:bg-blue-400"
                      : "bg-gray-400 dark:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageMarkerClick(page.id)}
                  aria-label={`Page ${page.id}`}
                />

                {/* Focus point markers (only for current page) */}
                {currentPageId === page.id && page.focusPoints.length > 0 && (
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-1 items-center bg-gray-200/90 dark:bg-gray-800/90 px-2 py-1 rounded-md">
                    {page.focusPoints.map((_, index) => (
                      <motion.button
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          currentFocusPointIndex === index
                            ? "bg-blue-600 dark:bg-blue-400"
                            : "bg-gray-400 dark:bg-gray-600"
                        }`}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleFocusPointClick(index)}
                        aria-label={`Focus point ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* End page marker */}
            <motion.button
              className={`w-3 h-3 rounded-full ${
                currentPageId === totalPages + 1
                  ? "bg-blue-600 dark:bg-blue-400"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/end")}
              aria-label="End page"
            />
          </div>

          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentPageId - 1 + currentFocusPointIndex / totalFocusPoints) / totalPages) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Timeline;

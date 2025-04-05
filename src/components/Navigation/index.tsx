"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getNextPageId, getPrevPageId } from "@/data/comicData";

interface NavigationProps {
  pageId: number;
  isPlaying: boolean;
  togglePlayPause: () => void;
  hasFocusPoints: boolean;
  currentFocusPointIndex: number;
  totalFocusPoints: number;
  onFocusPointChange: (index: number) => void;
}

const Navigation = ({
  pageId,
  isPlaying,
  togglePlayPause,
  hasFocusPoints,
  currentFocusPointIndex,
  totalFocusPoints,
  onFocusPointChange,
}: NavigationProps) => {
  const router = useRouter();
  const prevPageId = getPrevPageId(pageId);
  const nextPageId = getNextPageId(pageId);

  const handlePrevPage = useCallback(() => {
    if (prevPageId !== null) {
      router.push(`/comic/${prevPageId}`);
    } else {
      // If no previous comic page, go to title screen
      router.push("/");
    }
  }, [router, prevPageId]);

  const handleNextPage = useCallback(() => {
    if (nextPageId !== null) {
      router.push(`/comic/${nextPageId}`);
    } else {
      // If no next comic page, go to end screen
      router.push("/end");
    }
  }, [router, nextPageId]);

  const handlePrevFocusPoint = useCallback(() => {
    if (currentFocusPointIndex > 0) {
      onFocusPointChange(currentFocusPointIndex - 1);
    }
  }, [currentFocusPointIndex, onFocusPointChange]);

  const handleNextFocusPoint = useCallback(() => {
    if (currentFocusPointIndex < totalFocusPoints - 1) {
      onFocusPointChange(currentFocusPointIndex + 1);
    } else {
      // If we're at the last focus point, go to the next page
      handleNextPage();
    }
  }, [currentFocusPointIndex, totalFocusPoints, onFocusPointChange, handleNextPage]);

  return (
    <>
      {/* Left navigation button (previous) */}
      <motion.button
        className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-24 flex items-center justify-center rounded-full bg-gray-200/50 dark:bg-gray-800/50 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={hasFocusPoints ? handlePrevFocusPoint : handlePrevPage}
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </motion.button>

      {/* Right navigation button (next) */}
      <motion.button
        className="fixed right-4 top-1/2 -translate-y-1/2 w-12 h-24 flex items-center justify-center rounded-full bg-gray-200/50 dark:bg-gray-800/50 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={hasFocusPoints ? handleNextFocusPoint : handleNextPage}
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </motion.button>

      {/* Play/Pause control */}
      <AnimatePresence>
        {hasFocusPoints && (
          <motion.button
            className="fixed bottom-16 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200/80 dark:bg-gray-800/80 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 z-40 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

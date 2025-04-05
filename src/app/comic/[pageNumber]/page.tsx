"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ComicViewer from "@/components/ComicViewer";
import Navigation from "@/components/Navigation";
import Timeline from "@/components/Timeline";
import ThemeToggle from "@/components/ThemeToggle";
import { getPageById } from "@/data/comicData";
import type { ComicPage } from "@/types";

export default function ComicPage() {
  const router = useRouter();
  const params = useParams<{ pageNumber: string }>();
  const pageId = parseInt(params.pageNumber, 10);
  
  const [page, setPage] = useState<ComicPage | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFocusPointIndex, setCurrentFocusPointIndex] = useState(0);
  
  // Fetch page data and handle navigation
  useEffect(() => {
    if (isNaN(pageId)) {
      router.push("/");
      return;
    }

    const comicPage = getPageById(pageId);
    if (comicPage) {
      setPage(comicPage);
      setCurrentFocusPointIndex(0);
      
      // Store the current page for continue reading functionality
      try {
        localStorage.setItem("comic-last-page", pageId.toString());
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    } else {
      router.push("/");
    }
  }, [pageId, router]);

  // Toggle play/pause state
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  // Handle focus point change
  const handleFocusPointChange = (index: number) => {
    setCurrentFocusPointIndex(index);
  };

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-700 border-t-gray-800 dark:border-t-gray-200 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pageId}
        className="relative min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-900"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.3 }}
      >
        <ThemeToggle />
        
        <ComicViewer
          page={page}
          isAutoPlaying={isPlaying}
          currentFocusPointIndex={currentFocusPointIndex}
          onFocusPointChange={handleFocusPointChange}
        />
        
        <Navigation
          pageId={pageId}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          hasFocusPoints={page.focusPoints.length > 0}
          currentFocusPointIndex={currentFocusPointIndex}
          totalFocusPoints={page.focusPoints.length}
          onFocusPointChange={handleFocusPointChange}
        />
        
        <Timeline
          currentPageId={pageId}
          currentFocusPointIndex={currentFocusPointIndex}
          onFocusPointChange={handleFocusPointChange}
        />
      </motion.main>
    </AnimatePresence>
  );
}

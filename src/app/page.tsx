"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { comicPages } from "@/data/comicData";
import { useEffect, useState } from "react";

export default function TitleScreen() {
  const router = useRouter();
  const [lastReadPage, setLastReadPage] = useState<number | null>(null);
  
  // Check for last read page on component mount
  useEffect(() => {
    try {
      const savedPage = localStorage.getItem("comic-last-page");
      if (savedPage) {
        setLastReadPage(parseInt(savedPage, 10));
      }
    } catch (error) {
      // Handle localStorage errors (e.g., in private browsing)
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  const startReading = () => {
    router.push("/comic/1");
  };

  const continueReading = () => {
    if (lastReadPage) {
      router.push(`/comic/${lastReadPage}`);
    } else {
      startReading();
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ThemeToggle />
      
      <motion.div
        className="max-w-3xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Immersive Comic Viewer
        </motion.h1>
        
        <motion.p
          className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Experience comics like never before with guided focus points and smooth transitions.
          Scroll down to begin your journey.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg text-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            onClick={startReading}
          >
            Start Reading
          </motion.button>

          {lastReadPage && (
            <motion.button
              className="px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg text-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              onClick={continueReading}
            >
              Continue Reading (Page {lastReadPage})
            </motion.button>
          )}
        </div>
        
        <motion.div
          className="absolute bottom-8 w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Scroll to begin</p>
          <motion.div
            className="mx-auto w-6 h-10 border-2 border-gray-500 dark:border-gray-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div
              className="w-1 h-2 bg-gray-500 dark:bg-gray-400 rounded-full mt-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed bottom-4 left-4 text-xs text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p>PWA Ready • {comicPages.length} Pages</p>
      </motion.div>
    </main>
  );
}

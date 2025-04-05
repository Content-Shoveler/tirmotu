"use client";

import { motion } from "framer-motion";
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
  const currentPage = comicPages.find(page => page.id === currentPageId);

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-4/5 max-w-3xl z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative p-2 bg-gray-200/70 dark:bg-gray-800/70 rounded-xl backdrop-blur-sm">
        {/* Timeline implementation with improved visuals */}
        <div className="h-12 relative">
          {/* Track */}
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full -translate-y-1/2"></div>
          
          {/* Progress indicator */}
          <div 
            className="absolute top-1/2 left-0 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full -translate-y-1/2"
            style={{
              width: `${(currentPageId / (totalPages + 1)) * 100}%`
            }}
          ></div>
          
          {/* Page markers */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-1">
            {/* Start page */}
            <motion.button
              className={`w-3 h-3 rounded-full ${
                currentPageId === 0
                  ? "bg-blue-600 dark:bg-blue-400 ring-2 ring-white dark:ring-gray-950"
                  : "bg-gray-500 dark:bg-gray-400"
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/")}
              aria-label="Start page"
            />
            
            {/* Comic pages */}
            {comicPages.map((page) => (
              <motion.button
                key={page.id}
                className={`w-2.5 h-2.5 rounded-full ${
                  currentPageId === page.id
                    ? "bg-blue-600 dark:bg-blue-400 ring-2 ring-white dark:ring-gray-950"
                    : "bg-gray-400 dark:bg-gray-600"
                }`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push(`/comic/${page.id}`)}
                aria-label={`Page ${page.id}`}
              />
            ))}
            
            {/* End page */}
            <motion.button
              className={`w-3 h-3 rounded-full ${
                currentPageId === totalPages + 1
                  ? "bg-blue-600 dark:bg-blue-400 ring-2 ring-white dark:ring-gray-950"
                  : "bg-gray-500 dark:bg-gray-400"
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/end")}
              aria-label="End page"
            />
          </div>
          
          {/* Current position thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
            style={{
              left: `${(currentPageId / (totalPages + 1)) * 100}%`,
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-400 shadow-md ring-2 ring-white dark:ring-gray-950 -translate-x-1/2" />
          </motion.div>
        </div>
        
        {/* Focus points for current page - displayed above slider */}
        {currentPage && currentPage.focusPoints.length > 0 && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1.5 items-center bg-gray-200/90 dark:bg-gray-800/90 px-3 py-1.5 rounded-lg shadow-sm border border-gray-300/50 dark:border-gray-700/50">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">Focus Points:</span>
            {currentPage.focusPoints.map((point, index) => (
              <motion.button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${
                  currentFocusPointIndex === index
                    ? "bg-blue-600 dark:bg-blue-400"
                    : "bg-gray-400 dark:bg-gray-600"
                }`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onFocusPointChange && onFocusPointChange(index)}
                aria-label={`Focus point ${index + 1}${point.description ? `: ${point.description}` : ''}`}
                title={point.description || `Focus point ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Timeline;

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { comicPages } from "@/data/comicData";

export default function EndScreen() {
  const router = useRouter();

  const handleRestartReading = () => {
    router.push("/");
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
          The End
        </motion.h1>
        
        <motion.p
          className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Thank you for experiencing our immersive comic. We hope you enjoyed the journey through
          all {comicPages.length} pages and their unique focus points.
        </motion.p>

        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Credits</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Art and Story: Comic Creator<br />
            Immersive Viewer: Next.js & Framer Motion<br />
            Technical Implementation: Immersive Comic Viewer Team
          </p>
        </motion.div>

        <motion.button
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg text-lg font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          onClick={handleRestartReading}
        >
          Return to Title Screen
        </motion.button>
        
        <motion.div
          className="mt-12 text-gray-500 dark:text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p>© 2025 Immersive Comic Viewer</p>
          <p>A Progressive Web App experience</p>
        </motion.div>
      </motion.div>
    </main>
  );
}

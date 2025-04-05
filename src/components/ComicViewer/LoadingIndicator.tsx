"use client";

import { motion } from "framer-motion";

const LoadingIndicator = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        className="w-16 h-16 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-12 h-12 border-4 border-gray-300 dark:border-gray-700 border-t-gray-800 dark:border-t-gray-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingIndicator;

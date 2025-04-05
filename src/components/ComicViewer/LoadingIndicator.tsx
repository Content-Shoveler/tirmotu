"use client";

import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";

const LoadingIndicator = () => {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div 
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Spinner
          size="lg"
          color="primary"
        />
      </motion.div>
    </div>
  );
};

export default LoadingIndicator;

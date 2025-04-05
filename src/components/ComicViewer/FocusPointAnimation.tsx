"use client";

import { useEffect, useState, useRef, MutableRefObject } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FocusPoint } from "@/types";

interface FocusPointAnimationProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  imageDimensions: { width: number; height: number };
  focusPoints: FocusPoint[];
  currentFocusPointIndex: number;
  isPlaying: boolean;
  onFocusPointChange?: (index: number) => void;
}

const FocusPointAnimation = ({
  containerRef,
  imageDimensions,
  focusPoints,
  currentFocusPointIndex,
  isPlaying,
  onFocusPointChange,
}: FocusPointAnimationProps) => {
  const controls = useAnimation();
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [captionVisible, setCaptionVisible] = useState(false);
  const [currentCaption, setCurrentCaption] = useState("");

  // Update container dimensions on resize
  useEffect(() => {
    const updateContainerDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    // Initial update
    updateContainerDimensions();

    // Add resize listener
    window.addEventListener("resize", updateContainerDimensions);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateContainerDimensions);
    };
  }, [containerRef]);

  // Clear any existing timers when unmounted
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Calculate the transformation to focus on a specific point
  const calculateTransform = (focusPoint: FocusPoint) => {
    if (!containerRef.current || !imageDimensions.width || !imageDimensions.height) {
      return { scale: 1, x: 0, y: 0 };
    }

    const containerWidth = containerDimensions.width;
    const containerHeight = containerDimensions.height;
    
    // Calculate the fitting scale for the image to fit in the container
    const scaleX = containerWidth / imageDimensions.width;
    const scaleY = containerHeight / imageDimensions.height;
    const baseFitScale = Math.min(scaleX, scaleY);
    
    // Calculate the actual scale with the focus point's zoom level
    const targetScale = baseFitScale * focusPoint.scale;
    
    // Calculate the center point of the image when it's at the base fit scale
    const centeredImageWidth = imageDimensions.width * baseFitScale;
    const centeredImageHeight = imageDimensions.height * baseFitScale;
    const imageOffsetX = (containerWidth - centeredImageWidth) / 2;
    const imageOffsetY = (containerHeight - centeredImageHeight) / 2;
    
    // Calculate the coordinates of the focus point in the container
    const focusPointX = imageOffsetX + (focusPoint.x / 100) * centeredImageWidth;
    const focusPointY = imageOffsetY + (focusPoint.y / 100) * centeredImageHeight;
    
    // Calculate the target center of the container
    const targetCenterX = containerWidth / 2;
    const targetCenterY = containerHeight / 2;
    
    // Calculate the translation needed
    const translateX = targetCenterX - focusPointX;
    const translateY = targetCenterY - focusPointY;
    
    return {
      scale: targetScale,
      x: translateX,
      y: translateY,
    };
  };

  // Animate to a specific focus point
  const animateToFocusPoint = (index: number) => {
    if (index < 0 || index >= focusPoints.length) return;

    const focusPoint = focusPoints[index];
    const transform = calculateTransform(focusPoint);

    if (focusPoint.description) {
      setCurrentCaption(focusPoint.description);
      setCaptionVisible(true);
    } else {
      setCaptionVisible(false);
    }

    controls.start({
      x: transform.x,
      y: transform.y,
      scale: transform.scale,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 1,
      },
    });

    // If playing, set timer for the next point
    if (isPlaying && index < focusPoints.length - 1) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        if (onFocusPointChange) {
          onFocusPointChange(index + 1);
        }
      }, focusPoint.duration * 1000);
    }
  };

  // Update animation when focus point changes
  useEffect(() => {
    animateToFocusPoint(currentFocusPointIndex);
  }, [currentFocusPointIndex, containerDimensions, imageDimensions]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!isPlaying && timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    } else if (isPlaying) {
      animateToFocusPoint(currentFocusPointIndex);
    }
  }, [isPlaying]);

  return (
    <>
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none"
        }}
        animate={controls}
        initial={calculateTransform(focusPoints[0])}
      />

      <AnimatePresence>
        {captionVisible && currentCaption && (
          <motion.div
            style={{
              position: "absolute",
              bottom: "4rem",
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "36rem",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "0.75rem",
              borderRadius: "0.375rem",
              textAlign: "center"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {currentCaption}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FocusPointAnimation;

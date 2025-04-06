import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Center, Loader } from '@mantine/core';
import { FocusPoint } from '@/utils/types';

interface ImageProps {
  src: string;
  alt: string;
  currentFocusPoint: FocusPoint | null;
  viewportDimensions: { width: number; height: number };
}

export default function ComicImage({ 
  src, 
  alt, 
  currentFocusPoint, 
  viewportDimensions 
}: ImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Reset image loaded state when image src changes
  useEffect(() => {
    setImageLoaded(false);
  }, [src]);
  
  // Calculate transform values for focus point
  const getTransformForFocusPoint = (focusPoint: FocusPoint | null) => {
    if (!focusPoint) return { x: 0, y: 0, scale: 1 };
    
    // Convert percentage to viewport coordinates
    // Invert y-percentage because CSS transforms move in opposite direction
    const x = -(focusPoint.x - 50) * (viewportDimensions.width / 100);
    const y = -(focusPoint.y - 50) * (viewportDimensions.height / 100);
    
    return {
      x,
      y,
      scale: focusPoint.scale
    };
  };
  
  const transform = getTransformForFocusPoint(currentFocusPoint);
  
  return (
    <>
      {/* Loading indicator */}
      {!imageLoaded && (
        <Center
          style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5 
          }}
        >
          <Loader size="lg" />
        </Center>
      )}
      
      {/* Image with motion animations */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        initial={false}
        animate={{
          x: transform.x,
          y: transform.y,
          scale: transform.scale,
        }}
        transition={{
          type: 'spring',
          duration: currentFocusPoint?.transitionSpeed || 0.8,
          bounce: 0.1,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            style={{
              objectFit: 'contain',
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </motion.div>
    </>
  );
}

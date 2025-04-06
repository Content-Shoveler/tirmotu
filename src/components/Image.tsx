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
    
    // For panning to work properly with CSS transforms:
    // - We need to make the transform move in the opposite direction 
    // - Subtracting from 50% centers the focus point
    // - Multiply by viewport dimension and divide by 100 to convert percentage to pixels
    const x = -((focusPoint.x - 50) / 100) * viewportDimensions.width;
    const y = -((focusPoint.y - 50) / 100) * viewportDimensions.height;
    
    console.log('Transform values:', { 
      x, y, 
      scale: focusPoint.scale, 
      focusPoint,
      viewportDimensions 
    });
    
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

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ComicPage } from "@/types";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import FocusPointAnimation from "./FocusPointAnimation";
import LoadingIndicator from "./LoadingIndicator";

interface ComicViewerProps {
  page: ComicPage;
  isAutoPlaying?: boolean;
  currentFocusPointIndex?: number;
  onFocusPointChange?: (index: number) => void;
}

const ComicViewer = ({
  page,
  isAutoPlaying = false,
  currentFocusPointIndex = 0,
  onFocusPointChange,
}: ComicViewerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isOffline = useOfflineStatus();
  
  // Determine if we should show an offline warning
  const showOfflineWarning = isOffline && !page.cached;

  useEffect(() => {
    // Reset image state when page changes
    setImageLoaded(false);
    setImageError(false);
  }, [page.id]);

  // Handle image load success
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
    setImageLoaded(true);
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: "relative", 
        width: "100%", 
        height: "100vh", 
        overflow: "hidden", 
        backgroundColor: "var(--bg-color)",
        userSelect: "none"
      }}
    >
      {!imageLoaded && !imageError && !showOfflineWarning && <LoadingIndicator />}

      {showOfflineWarning && (
        <div style={{
          position: "absolute", 
          inset: 0, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          padding: "1rem", 
          textAlign: "center"
        }}>
          <div style={{ maxWidth: "400px" }}>
            <div className="offline-warning" style={{ 
              padding: "1rem", 
              borderRadius: "0.5rem", 
              backgroundColor: "#fff7ed", 
              color: "#9a3412", 
              border: "1px solid #fdba74" 
            }}>
              <div style={{ display: "flex", alignItems: "center" }}>
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
                  style={{ marginRight: "8px" }}
                >
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                  <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                  <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                  <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                  <line x1="12" y1="20" x2="12.01" y2="20"></line>
                </svg>
                <div>
                  <h3 style={{ fontWeight: "600", fontSize: "1.25rem", margin: "0 0 4px 0" }}>Offline</h3>
                  <p style={{ margin: 0 }}>This comic page is not available offline. Connect to the internet to view it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {imageError && !showOfflineWarning && (
        <div style={{
          position: "absolute", 
          inset: 0, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          padding: "1rem", 
          textAlign: "center"
        }}>
          <div style={{ maxWidth: "400px" }}>
            <div className="error-message" style={{ 
              padding: "1rem", 
              borderRadius: "0.5rem", 
              backgroundColor: "#fee2e2", 
              color: "#b91c1c", 
              border: "1px solid #fca5a5" 
            }}>
              <div style={{ display: "flex", alignItems: "center" }}>
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
                  style={{ marginRight: "8px" }}
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                  <h3 style={{ fontWeight: "600", fontSize: "1.25rem", margin: "0 0 4px 0" }}>Image Failed to Load</h3>
                  <p style={{ margin: 0 }}>There was an error loading this comic page. Please try again later.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {!showOfflineWarning && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center"
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
          >
            <img
              src={page.filename}
              alt={page.title || `Comic page ${page.id}`}
              style={{ 
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                visibility: imageLoaded ? 'visible' : 'hidden'
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            {imageLoaded && page.focusPoints.length > 0 && (
              <FocusPointAnimation
                containerRef={containerRef}
                imageDimensions={imageDimensions}
                focusPoints={page.focusPoints}
                currentFocusPointIndex={currentFocusPointIndex}
                isPlaying={isAutoPlaying}
                onFocusPointChange={onFocusPointChange}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline/Cached indicator */}
      <div style={{ position: "absolute", bottom: "1rem", left: "1rem", zIndex: 10 }}>
        <div className="status-badge" style={{
          display: "inline-flex",
          alignItems: "center",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: "500",
          backgroundColor: isOffline ? "#fef3c7" : page.cached ? "#d1fae5" : "#f3f4f6",
          color: isOffline ? "#92400e" : page.cached ? "#065f46" : "#4b5563"
        }}>
          <div style={{
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            marginRight: "0.25rem",
            backgroundColor: isOffline ? "#f59e0b" : page.cached ? "#10b981" : "#6b7280"
          }} />
          {isOffline ? "Offline" : page.cached ? "Available Offline" : "Online Only"}
        </div>
      </div>
    </div>
  );
};

export default ComicViewer;

'use client';

import { useState } from "react";
import Image from "next/image";

interface ProjectFullscreenImageProps {
  src: string;
  alt: string;
}

export function ProjectFullscreenImage({ src, alt }: ProjectFullscreenImageProps) {
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsImageFullscreen(!isImageFullscreen);
  };

  return (
    <>
      <Image 
        src={src} 
        alt={alt}
        width={1200}
        height={600}
        style={{ width: "100%", height: "auto", borderRadius: "12px" }}
        className="project-image-clickable"
        onClick={toggleFullscreen}
      />

      {/* Fullscreen Image Modal */}
      {isImageFullscreen && (
        <div className="fullscreen-modal" onClick={toggleFullscreen}>
          <div className="fullscreen-content">
            <button className="fullscreen-close" onClick={toggleFullscreen}>
              ×
            </button>
            <Image 
              src={src} 
              alt={alt}
              fill
              className="fullscreen-image"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
} 
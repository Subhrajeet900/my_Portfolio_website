"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120;
const FRAME_START = 0;
const FRAME_END = 119;

import Overlay from "./Overlay";

function getFramePath(index: number) {
  // Format to 3 digits: e.g., 001, 042, 119
  const formattedIndex = index.toString().padStart(3, "0");
  return `/sequence/frame_${formattedIndex}_delay-0.066s.png`;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = FRAME_START; i <= FRAME_END; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setImagesLoaded(true);
            drawFrame(0); // Draw first frame when all loaded
          }
        };
        images.push(img);
    }
    
    imagesRef.current = images;
  }, []);

  // Frame mapping
  const frameIndex = useTransform(scrollYProgress, [0, 1], [FRAME_START, FRAME_END]);

  // Handle window resize for canvas drawing correctly
  useEffect(() => {
    const handleResize = () => {
        if (!imagesLoaded) return;
        const currentFrame = Math.round(frameIndex.get());
        drawFrame(currentFrame);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, frameIndex]);

  // When scroll changes, update the canvas
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!imagesLoaded) return;
    drawFrame(Math.round(latest));
  });

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img) return;

    // Set canvas dimensions to match display size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.height = window.innerHeight;

    // Object-fit: cover mathematics
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      // Image is taller than canvas
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Important: Fill background with dark color to avoid white flashes
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#0a0a0a]">
      {/* Sticky container to hold the canvas and overlay */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0a0a0a]">
        
        {/* The loader, fades out when images loaded */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0a0a] text-zinc-400">
            <div className="flex flex-col items-center gap-4">
               <div className="w-8 h-8 border-4 border-zinc-600 border-t-white rounded-full animate-spin" />
               <p className="text-sm font-medium tracking-widest uppercase">Loading Experience</p>
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
        
        {/* Overlay is rendered here */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

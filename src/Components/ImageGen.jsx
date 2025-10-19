import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ImageGen() {
  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    const gridSize = 20;
    const pixelArray = [];

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        pixelArray.push({
          id: `${i}-${j}`,
          x: i,
          y: j,
          delay: Math.random() * 2,
        });
      }
    }

    setPixels(pixelArray);
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
        </motion.div>

        {/* Main pixel grid */}
        <div className="relative w-80 h-80 flex flex-wrap gap-0">
          {pixels.map((pixel) => (
            <motion.div
              key={pixel.id}
              className="w-4 h-4"
              initial={{
                scale: 0,
                rotate: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0.8],
                backgroundColor: ["#06b6d4", "#8b5cf6", "#ec4899", "#06b6d4"],
              }}
              transition={{
                duration: 2,
                delay: pixel.delay,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut",
              }}
              style={{
                boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

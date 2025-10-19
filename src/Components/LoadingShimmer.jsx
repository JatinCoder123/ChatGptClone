import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageGen from "@/Components/ImageGen";

const texts = [
  "✨ Generating magic...",
  "🪄 Processing your imagination...",
  "🎨 Painting pixels...",
  "🚀 Almost there...",
  "🧠 AI is thinking...",
];

const LoadingShimmer = () => {
  const [randomText, setRandomText] = useState(texts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * texts.length);
      setRandomText(texts[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ImageGen />

      <motion.p
        key={randomText}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-lg font-medium text-[var(--text-secondary)]"
      >
        {randomText}
      </motion.p>
    </div>
  );
};

export default LoadingShimmer;

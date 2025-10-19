import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function UpgradeButton({ ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      {/* Glow Effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50 blur-2xl rounded-full pointer-events-none"
      />

      {/* Main Button */}
      <motion.button
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...props}
        className="relative px-4 py-2 rounded-xl bg-[#1a1a1a] border border-[#333] font-bold text-lg text-white shadow-xl cursor-pointer overflow-hidden"
      >
        {/* Shimmer Effect */}
        <motion.div
          animate={{
            x: [-100, 300, 300, -100],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.1,
          }}
          className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-violet-400/30 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Content */}
        <div className="relative flex items-center gap-3">
          <motion.div
            animate={{
              rotate: isHovered ? 180 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>

          <span>Upgrade</span>

          <motion.div
            animate={{
              x: isHovered ? 3 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </motion.button>

      {/* Subtle Ring on Hover */}
      {isHovered && (
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.15, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 border-2 border-violet-400 rounded-xl pointer-events-none"
        />
      )}
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Globe, Volume, Mic } from "lucide-react";
import { BASE_PATH } from "../../store/constants";

export default function HeroNav() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { id: "translator", icon: Globe, label: "Translator", to: "translator" },
    { id: "media", icon: Image, label: "Media Generator", to: "gen" },
    {
      id: "pronunciation",
      icon: Volume,
      label: "Check Pronunciation",
      to: "pronunciation",
    },
    { id: "tts", icon: Mic, label: "Text-to-Speech", to: "tts" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-full px-5 py-3 flex flex-wrap gap-3 items-center justify-center"
    >
      {navItems.map((item, index) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          onHoverStart={() => setHoveredItem(item.id)}
          onHoverEnd={() => setHoveredItem(null)}
          onClick={() => window.open(`${BASE_PATH}/${item.to}`, "_blank")}
          className="relative flex bg-[var(--background)] items-center gap-2.5 px-6 py-3 rounded-full border border-[var(--surface)] text-[var(--text-primary)] font-medium text-sm transition-all duration-300 overflow-hidden cursor-pointer"
        >
          {hoveredItem === item.id && (
            <motion.div
              layoutId="hover-bg"
              className="absolute inset-0 bg-[--background-secondary] rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}

          <motion.div
            animate={{
              rotate: hoveredItem === item.id ? 360 : 0,
              scale: hoveredItem === item.id ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <item.icon className="w-5 h-5" />
          </motion.div>

          <span className="relative z-10">{item.label}</span>

          {hoveredItem === item.id && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#444]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.button>
      ))}
    </motion.nav>
  );
}

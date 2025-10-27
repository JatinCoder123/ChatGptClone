import React, { useState, useEffect, useRef } from "react";
import {
  ListOrdered,
  HelpCircle,
  Check,
  Languages,
  MicVocal,
  Gauge,
  Wallpaper,
  Presentation,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarDialog from "../Features/avatar/AvatarDialog";
import { languagesToVoices } from "@/assets/assets.js";

const AvatarOption = ({ data, setData, handleFile }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeMenu = () => setActiveMenu(null);

  // 🔸 Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  useEffect(() => {
    const langIndex = languagesToVoices.findIndex(
      (lang) => lang.language === data.language
    );
    handleData("langIndex", langIndex !== -1 ? langIndex : 0);
    handleData(
      "voice",
      languagesToVoices[langIndex !== -1 ? langIndex : 0].voices[0].name
    );
  }, [data.language]);
  const menuVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const MenuItem = ({ icon: Icon, label, selected, onClick }) => (
    <div
      onClick={onClick}
      className={`flex text-white/80 items-center justify-between cursor-pointer px-3 py-1 rounded-md hover:bg-white/20 ${
        selected ? "bg-white/10" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={16} />
        <span>{label}</span>
      </div>
      {selected && <Check size={16} />}
    </div>
  );
  const handleData = (item, val) => {
    setData((prev) => {
      return {
        ...prev,
        [item]: val,
      };
    });
  };

  return (
    <div ref={menuRef} className=" w-full flex justify-center mt-3 select-none">
      <div className="flex flex-wrap items-center gap-2 bg-transparent  text-[var(--text-primary)]">
        {/* Avatar */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen("true")}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <Presentation size={16} />
            <span>{data.avatar}</span>
          </button>
          {open && (
            <AvatarDialog
              open={open}
              setOpen={setOpen}
              handleData={handleData}
              data={data}
              handleFile={handleFile}
            />
          )}
        </div>
        {/* Languages */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleClick("language")}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <Languages size={16} />
            <span>{data.language}</span>
          </button>
          <AnimatePresence>
            {activeMenu === "language" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariant}
                className="absolute bottom-10 left-0 bg-black/80 rounded-lg p-2 min-w-[120px] shadow-lg"
              >
                {languagesToVoices.map((lang) => (
                  <MenuItem
                    key={lang.locale}
                    icon={Languages}
                    label={lang.language}
                    selected={data.language === lang.language}
                    onClick={() => {
                      handleData("language", lang.language);
                      closeMenu();
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Voices */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleClick("voice")}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <MicVocal size={16} />
            <span>{data.voice}</span>
          </button>

          <AnimatePresence>
            {activeMenu === "voice" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariant}
                className="absolute bottom-10 left-0 bg-black/80 rounded-lg p-2 min-w-[160px] shadow-lg overflow-y-auto max-h-60 custom-scrollbar"
              >
                {languagesToVoices[`${data.langIndex}`].voices.map((voice) => (
                  <MenuItem
                    key={voice.name}
                    icon={MicVocal}
                    label={voice.name}
                    selected={data.voice === voice.name}
                    onClick={() => {
                      handleData("voice", voice.name);
                      closeMenu();
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Speed */}
        <div className="relative">
          {/* Button to toggle menu */}
          <button
            type="button"
            onClick={() => handleClick("speed")}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <Gauge size={16} />
            <span>{data.speed}x</span>
          </button>

          {/* Dropdown menu with range slider */}
          <AnimatePresence>
            {activeMenu === "speed" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariant}
                className="absolute bottom-10 left-0 bg-black/80 rounded-lg p-3 min-w-[160px] shadow-lg flex flex-col gap-2"
              >
                <label className="text-sm text-gray-300 mb-1 font-medium">
                  Speaking Speed:{" "}
                  <span className="text-white">{data.speed}x</span>
                </label>

                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={data.speed}
                  onChange={(e) =>
                    handleData("speed", parseFloat(e.target.value))
                  }
                  className="w-full bg-black cursor-pointer"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* HELP BUTTON */}
        <button
          type="button"
          className="flex items-center gap-1 rounded-full bg-white/10 p-2 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
        >
          <HelpCircle size={16} />
        </button>
      </div>
    </div>
  );
};

export default AvatarOption;

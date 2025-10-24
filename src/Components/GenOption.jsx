import React, { useState, useEffect, useRef } from "react";
import {
  Clapperboard,
  Smartphone,
  Gem,
  Clock,
  ListOrdered,
  HelpCircle,
  Image as ImageIcon,
  Check,
  Package,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GenOption = ({ data, setData }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const ratioArray =
    data.type == "video"
      ? ["1:1", "2:3", "3:2", "16:9", "9:16"]
      : ["1:1", "2:3", "3:2"];
  const qualityArray =
    data.type == "video"
      ? ["480p", "720p", "1080p"]
      : ["low", "medium", "high"];

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

  const menuVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const MenuItem = ({ icon: Icon, label, selected, onClick }) => (
    <div
      onClick={onClick}
      className={`flex items-center justify-between cursor-pointer px-3 py-1 rounded-md hover:bg-white/20 ${
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
    <div
      ref={menuRef}
      className="relative w-full flex justify-center mt-3 select-none"
    >
      <div className="flex flex-wrap items-center gap-2 bg-transparent relative text-[var(--text-primary)]">
        {/* TYPE */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              handleClick("type");
            }}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            {data.type === "video" ? (
              <>
                <Clapperboard size={16} />
                <span>Video</span>
              </>
            ) : (
              <>
                <ImageIcon size={16} />
                <span>Image</span>
              </>
            )}
          </button>
          <AnimatePresence>
            {activeMenu === "type" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariant}
                className="absolute bottom-10 left-0 bg-black/80 rounded-lg p-2 min-w-[120px] shadow-lg"
              >
                <MenuItem
                  icon={Clapperboard}
                  label="Video"
                  selected={data.type === "video"}
                  onClick={() => {
                    handleData("type", "video");
                    closeMenu();
                  }}
                />
                <MenuItem
                  icon={ImageIcon}
                  label="Image"
                  selected={data.type === "image"}
                  onClick={() => {
                    handleData("type", "image");
                    closeMenu();
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RATIO */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleClick("ratio")}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <Smartphone size={16} />
            <span>{data.type == "video" ? data.ratio : data.size}</span>
          </button>
          <AnimatePresence>
            {activeMenu === "ratio" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariant}
                className="absolute bottom-10 left-0 bg-black/80 rounded-lg p-2 min-w-[120px] shadow-lg"
              >
                {ratioArray.map((r) => (
                  <MenuItem
                    key={r}
                    icon={Smartphone}
                    label={r}
                    selected={
                      (data.type == "video" && data.ratio === r) ||
                      (data.type == "image" && data.size === r)
                    }
                    onClick={() => {
                      data.type == "video"
                        ? handleData("ratio", r)
                        : handleData("size", r);
                      closeMenu();
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* QUALITY */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleClick("quality")}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <Gem size={16} />
            <span>
              {data.type == "video" ? data.quality : data.imageQuality}
            </span>
          </button>
          <AnimatePresence>
            {activeMenu === "quality" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariant}
                className="absolute bottom-10 left-0 bg-black/80 rounded-lg p-2 min-w-[120px] shadow-lg"
              >
                {qualityArray.map((q) => (
                  <MenuItem
                    key={q}
                    icon={Gem}
                    label={q}
                    selected={
                      data.type == "video"
                        ? data.quality === q
                        : data.imageQuality === q
                    }
                    onClick={() => {
                      data.type == "video"
                        ? handleData("quality", q)
                        : handleData("imageQuality", q);
                      closeMenu();
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DURATION (only video) */}
        {data.type === "video" && (
          <div className="relative">
            <button
              type="button"
              onClick={() => handleClick("duration")}
              className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
            >
              <Clock size={16} />
              <span>{data.duration}</span>
            </button>
            <AnimatePresence>
              {activeMenu === "duration" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariant}
                  className="absolute bottom-10 left-0 bg-black/80 rounded-lg p-2 min-w-[120px] shadow-lg"
                >
                  {["5s", "10s", "15s", "30s"].map((d) => (
                    <MenuItem
                      key={d}
                      icon={Clock}
                      label={d}
                      selected={data.duration === d}
                      onClick={() => {
                        handleData("duration", d);
                        closeMenu();
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Model (only Image) */}
        {data.type === "image" && (
          <div className="relative">
            <button
              type="button"
              onClick={() => handleClick("model")}
              className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
            >
              <Package size={16} />
              <span>{data.model}</span>
            </button>
            <AnimatePresence>
              {activeMenu === "model" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariant}
                  className="absolute bottom-10 left-0 bg-black/80 rounded-lg p-2 min-w-[120px] shadow-lg"
                >
                  {["GPT", "Dall-E"].map((d) => (
                    <MenuItem
                      key={d}
                      icon={Package}
                      label={d}
                      selected={data.model === d}
                      onClick={() => {
                        handleData("model", d);
                        closeMenu();
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* COUNT */}
        <div className="relative">
          <button
            type="button"
            onClick={() => handleClick("count")}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <ListOrdered size={16} />
            <span>{data.count}</span>
          </button>
          <AnimatePresence>
            {activeMenu === "count" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariant}
                className="absolute bottom-10 left-0 bg-black/80 rounded-lg p-2 min-w-[120px] shadow-lg"
              >
                {["1v", "2v", "3v", "4v", "5v"].map((c) => (
                  <MenuItem
                    key={c}
                    icon={ListOrdered}
                    label={c}
                    selected={data.count === c}
                    onClick={() => {
                      handleData("count", c);
                      closeMenu();
                    }}
                  />
                ))}
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

export default GenOption;

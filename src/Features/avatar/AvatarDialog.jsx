import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dialog from "@/Components/Dialog";
import { Plus, Check } from "lucide-react";
import { avatars } from "@/assets/assets.js";

export default function AvatarDialog({
  open,
  setOpen,
  data,
  handleData,
  handleFile,
}) {
  const [activeTab, setActiveTab] = useState("avatar");

  const backgrounds = [
    { name: "white", color: "#ffffff" },
    { name: "transparent", color: "transparent" },
    { name: "custom", icon: <Plus size={20} /> },
  ];

  return (
    <div className="flex items-center justify-center">
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Generated Video Settings"
      >
        {/* Navbar */}
        <div className="flex border-b mb-4">
          {["avatar", "background"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 py-2 text-sm font-medium capitalize transition cursor-pointer ${
                activeTab === tab
                  ? "text-[var(--text-primary)]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Fixed Height Content Wrapper */}
        <div className="relative min-h-[280px] overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "avatar" ? (
              <motion.div
                key="avatar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 grid grid-cols-2 gap-4 overflow-y-auto pr-1 custom-scrollbar"
              >
                {avatars.map((av, i) => {
                  const isSelected =
                    data.avatar === av.name &&
                    data.avatarTalkingStyle === av.avatarTalkingStyle;
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        handleData("avatar", av.name);
                        handleData("avatarTalkingStyle", av.avatarTalkingStyle);
                      }}
                      className={`relative flex flex-col items-center p-3 border rounded-xl cursor-pointer transition ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/20"
                          : "hover:bg-[var(--background-secondary)]"
                      }`}
                    >
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={av.img}
                          alt={av.name}
                          className="w-full h-full object-contain"
                        />
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5">
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium mt-2">{av.name}</p>
                      <p className="text-xs text-gray-500">
                        {av.avatarTalkingStyle}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="background"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-3 gap-4"
              >
                {backgrounds.map((bg, i) => {
                  const isSelected = data.bg === bg.name;
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (bg.name === "custom") {
                          handleFile();
                        }
                        handleData("bg", bg.name);
                      }}
                      className={`relative flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/20"
                          : "hover:bg-[var(--background-secondary)]"
                      }`}
                    >
                      <div
                        className={`w-20 h-20 rounded-lg mb-2 flex items-center justify-center ${
                          bg.color === "transparent"
                            ? "bg-gray-200/30 border border-dashed"
                            : ""
                        }`}
                        style={{
                          background:
                            bg.color !== "transparent" && !bg.icon
                              ? bg.color
                              : "none",
                        }}
                      >
                        {bg.icon && bg.icon}
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5">
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium">{bg.name}</p>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Dialog>
    </div>
  );
}

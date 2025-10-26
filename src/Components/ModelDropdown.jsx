import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { models } from "../assets/assets.js";
import { useDispatch, useSelector } from "react-redux";
import { modelAction } from "../store/slices/ModelSlice.js";

export default function ModelDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { model } = useSelector((state) => state.model);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();

  const modelsList = [
    { name: "GPT-4", icon: models.chatGpt },
    { name: "Grok", icon: models.grok },
    { name: "Deepseek", icon: models.deepseek },
  ];

  // Filter models based on search
  const filteredModels = modelsList.filter((model) =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get selected model data
  const selectedModelData =
    modelsList.find((m) => m.name === model) || modelsList[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block w-40 md:w-48" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-2 items-center justify-between w-full px-4 py-2 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--text-primary)] font-medium shadow-sm hover:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all"
      >
        <div className="flex items-center gap-2">
          <img
            src={selectedModelData.icon}
            alt={model}
            className="w-5 h-5 object-contain"
          />
          <span className="truncate">{model}</span>
        </div>
        {/* Arrow */}
        <span
          className={`inline-block transition-transform text-xs ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 mt-2 w-full min-w-[200px] rounded-lg bg-[var(--background)] border border-[var(--border)] shadow-lg z-20 overflow-hidden"
          >
            {/* Search Bar */}
            <div className="p-3 border-b border-[var(--border)]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search models..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] text-sm"
                />
              </div>
            </div>

            {/* Model List */}
            <ul className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => (
                  <li
                    key={model.name}
                    onClick={() => {
                      dispatch(modelAction.setModel(model.name));
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--surface)] text-[var(--text-primary)] transition-colors ${
                      model === model.name ? "bg-[var(--surface)]" : ""
                    }`}
                  >
                    <img
                      src={model.icon}
                      alt={model.name}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-medium">{model.name}</span>
                    {model === model.name && (
                      <span className="ml-auto text-cyan-500">✓</span>
                    )}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-[var(--text-secondary)] text-sm text-center">
                  No models found
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

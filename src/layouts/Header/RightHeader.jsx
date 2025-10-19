import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClear } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "@/store/constants.js";
import { useDispatch, useSelector } from "react-redux";
import UpgradeButton from "@/Components/UpgradeBtn";
import { toggleTheme } from "@/store/slices/themeSlice";

const RightHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const { messages } = useSelector((state) => state.messages);

  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-2">
        <UpgradeButton onClick={() => navigateTo(`${BASE_PATH}/plans`)} />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(toggleTheme())}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${
            mode === "dark"
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {mode === "light" ? "☀️" : "🌙"}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden relative">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 rounded-lg transition-colors cursor-pointer bg-[var(--background-secondary)] text-[var(--text-primary)]"
        >
          <BsThreeDotsVertical className="w-6 h-6" />
        </motion.button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-lg p-2 z-50"
            >
              <div className="flex flex-col gap-2">
                <UpgradeButton
                  onClick={() => {
                    navigateTo(`${BASE_PATH}/plans`);
                    setMenuOpen(false);
                  }}
                />

                <button
                  onClick={() => {
                    dispatch(toggleTheme());
                    setMenuOpen(false);
                  }}
                  className="px-3 py-2 text-sm rounded-md hover:bg-[var(--background-secondary)] text-[var(--text-primary)] text-left"
                >
                  {mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default RightHeader;

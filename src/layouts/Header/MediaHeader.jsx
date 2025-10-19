import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import RightHeader from "./RightHeader.jsx";
export default function MediaHeader({ setMobileOpen }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-[999] backdrop-blur-md border-b bg-[var(--background)] border-[var(--text-secondary)]/10 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden  p-2 bg-[var(--background)] text-[var(--text-primary)] rounded shadow"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
        <RightHeader />
      </div>
    </motion.header>
  );
}

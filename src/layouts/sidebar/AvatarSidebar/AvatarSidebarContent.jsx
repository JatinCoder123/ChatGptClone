import { PanelRightOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/assets";
import SidebarFooter from "../SidebarFooter";

export default function AvatarSidebarContent({ panelFn, collapsed }) {
  return (
    <>
      <motion.div
        animate={{ width: collapsed ? 72 : 230 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`flex flex-col h-full overflow-hidden border-r border-[var(--text-secondary)]/10 shadow-sm bg-[var(--sidebar-background)]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2">
          {/* Logo + Text */}
          {!collapsed && (
            <motion.div
              className="flex items-center gap-2 cursor-pointer overflow-hidden"
              animate={{ width: collapsed ? "40px" : "200px" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <img src={logo} className="w-8 h-8 rounded" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-bold font-mono text-lg text-[var(--text-primary)] whitespace-nowrap"
                  >
                    <span className="text-[#33A852]">Ri</span>
                    <span className="text-[#4285F4]">ghtAI</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Collapse/Expand Button */}
          <button
            onClick={() => panelFn((p) => !p)}
            className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface)] flex items-center justify-center transition cursor-pointer"
          >
            {collapsed ? (
              <img src={logo} className="w-8 h-8 rounded" />
            ) : (
              <PanelRightOpen size={20} />
            )}
          </button>
        </div>

        {/* Footer (Always visible, even when collapsed) */}
        <SidebarFooter collapsed={collapsed} />
      </motion.div>
    </>
  );
}

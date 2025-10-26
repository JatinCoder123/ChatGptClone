import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarContent from "./SidebarContent";

export default function AppSidebar({ mobileOpen, setMobileOpen }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#1a1a1a] z-[9999]">
      {/* Desktop Sidebar */}
      <span className="hidden md:block">
        <SidebarContent
          panelFn={setCollapsed}
          collapsed={collapsed}
          mobileOpen={mobileOpen}
        />
      </span>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-[230px] bg-[#171717] flex flex-col  md:hidden"
          >
            <SidebarContent panelFn={setMobileOpen} mobileOpen={mobileOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

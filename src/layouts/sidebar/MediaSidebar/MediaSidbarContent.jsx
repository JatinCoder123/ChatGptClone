import React, { useEffect, useRef, useState } from "react";
import { PanelRightOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/assets";
import { MdImageSearch } from "react-icons/md";
import SidebarFooter from "../SidebarFooter";
import { TbPhotoVideo } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { FaRegImages } from "react-icons/fa6";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_PATH } from "../../../store/constants";
import { LuCircleFadingPlus } from "react-icons/lu";

export default function MediaSidebarContent({ panelFn, collapsed }) {
  const [hoveredChat, setHoveredChat] = useState(null);
  const [active, setActive] = useState("Create");
  const location = useLocation();
  const navigateTo = useNavigate();
  const sidebarRef = useRef(null); // <-- Ref for click outside

  const library = [
    { icon: LuCircleFadingPlus, title: "Create", to: "create" },
    { icon: TbPhotoVideo, title: "My media", to: "my-media" },
    { icon: CiStar, title: "Favorites", to: "favorites" },
  ];
  const menuItems = [
    { icon: MdImageSearch, title: "Explore", to: "" },
    { icon: FaRegImages, title: "Images", to: "images" },
    { icon: MdOutlineVideoLibrary, title: "Videos", to: "videos" },
  ];

  // Handle active item based on route
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart === "gen") {
      setActive("Create");
      return;
    }
    const matchedItem = menuItems.find(
      (item) =>
        item.to === lastPart || (item.to === "" && lastPart === "explore")
    );
    if (matchedItem) {
      setActive(matchedItem.title);
      return;
    }
    const matchedLibraryItem = library.find((item) => item.to === lastPart);
    if (matchedLibraryItem) {
      setActive(matchedLibraryItem.title);
    }
  }, [location.pathname]);

  // Click outside to collapse
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        panelFn(false); // collapse sidebar
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelFn]);

  return (
    <motion.div
      ref={sidebarRef} // <-- attach ref here
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
          className="md:hidden p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface)] flex items-center justify-center transition cursor-pointer"
        >
          {collapsed ? (
            <img src={logo} className="w-8 h-8 rounded" />
          ) : (
            <PanelRightOpen size={20} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 overflow-y-auto custom-scrollbar"
          >
            <div className="px-3 py-3 flex flex-col gap-3">
              <div>
                {menuItems.map((item) => (
                  <div
                    key={item.title}
                    className={`group relative flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors mb-0.5 ${
                      active === item.title
                        ? "bg-[var(--surface)]"
                        : "hover:bg-[var(--background-secondary)]"
                    }`}
                    onClick={() => {
                      setActive(item.title);
                      panelFn(false); // close sidebar on mobile
                      navigateTo(`${BASE_PATH}/gen/explore/${item.to}`);
                    }}
                    onMouseEnter={() => setHoveredChat(item)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    <span className="text-[15px] text-[var(--text-primary)] truncate pr-2 flex items-center gap-2">
                      <item.icon size={20} />
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="px-3 text-[13px] text-[var(--text-secondary)] font-medium mb-2">
                  Library
                </h3>
                {library.map((item) => (
                  <div
                    key={item.title}
                    className={`group relative flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors mb-0.5 ${
                      active === item.title
                        ? "bg-[var(--surface)]"
                        : "hover:bg-[var(--background-secondary)]"
                    }`}
                    onClick={() => {
                      panelFn(false); // close sidebar on mobile
                      setActive(item.title);
                      navigateTo(`${BASE_PATH}/gen/${item.to}`);
                    }}
                    onMouseEnter={() => setHoveredChat(item)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    <span className="text-[15px] text-[var(--text-primary)] truncate pr-2 flex items-center gap-2">
                      <item.icon size={20} />
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <SidebarFooter collapsed={collapsed} />
    </motion.div>
  );
}

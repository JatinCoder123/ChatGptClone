import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  User,
  Settings,
  AtSign,
  Sparkle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, logout } from "@/store/slices/userSlice.js";
import { toast } from "react-toastify";
import LoadingButton from "@/Components/LoadingButton";
import { BASE_PATH } from "@/store/constants.js";

const SidebarFooter = ({ collapsed }) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigateTo = useNavigate();
  const { user, isAuthenticated, loading, message, error } = useSelector(
    (state) => state.user
  );

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearAllUserErrors());
      navigateTo(`${BASE_PATH}/`);
    }
  }, [error, dispatch, message]);

  return (
    <div className="mt-auto border-t border-[#2d2d2d] relative">
      <div
        className={`flex items-center py-1 cursor-pointer ${
          collapsed ? "justify-center " : "justify-between px-4 "
        } hover:bg-[var(--surface)] transition-colors`}
        onClick={() => setDropdownOpen((prev) => !prev)}
        ref={dropdownRef}
      >
        {/* Profile + Info */}
        <div className="flex items-center gap-3">
          <div className="rounded-full flex items-center justify-center relative">
            {loading ? (
              <LoadingButton />
            ) : !isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg font-medium bg-[var(--accent-primary)] text-white hover:opacity-90 transition cursor-pointer"
                onClick={() => navigateTo(`${BASE_PATH}/login`)}
              >
                Login
              </motion.button>
            ) : (
              <>
                <div className="flex items-center rounded-lg cursor-pointer hover:bg-[var(--surface)] p-1">
                  <img
                    src={user.profile_pic || `${BASE_PATH}/profile.png`}
                    alt="User"
                    className="w-10 h-10 rounded-full border border-[var(--border)]"
                  />
                </div>

                {/* ChatGPT-like dropdown menu */}
                <AnimatePresence>
                  {isDropdownOpen && !collapsed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-14 left-0 w-50 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg backdrop-blur-lg z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-[var(--border)]  text-[var(--text-secondary)] flex items-center gap-1">
                        <span>
                          <AtSign size={10} />
                        </span>
                        <p className="text-[13px] font-medium">
                          {user?.email || "example@gmail.com"}
                        </p>
                      </div>

                      <div className="py-1">
                        <MenuItem
                          icon={<Sparkle size={16} />}
                          label="Upgrade plan"
                          onClick={() => {
                            setDropdownOpen(false);
                            navigateTo(`${BASE_PATH}/plans`);
                          }}
                        />
                        <MenuItem
                          icon={<Settings size={16} />}
                          label="Settings"
                          onClick={() => {
                            setDropdownOpen(false);
                            navigateTo(`${BASE_PATH}/settings`);
                          }}
                        />
                        <MenuItem
                          icon={<LogOut size={16} />}
                          label="Logout"
                          onClick={handleLogout}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Name & Plan → only when expanded */}
          <AnimatePresence>
            {!collapsed && isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-left"
              >
                <p className="text-[15px] text-[var(--text-primary)]">
                  {user?.name || "Jatin Verma"}
                </p>
                <p className="text-[13px] text-[#808080]">Free plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Sub-component for menu items
const MenuItem = ({ icon, label, onClick }) => (
  <motion.div
    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2 cursor-pointer text-[14px] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
  >
    {icon}
    <span>{label}</span>
  </motion.div>
);

export default SidebarFooter;

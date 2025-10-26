import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  MoreHorizontal,
  PanelRightOpen,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/assets";
import SidebarFooter from "../SidebarFooter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../../../store/constants";
import { chatActions } from "../../../store/slices/chatSlice";
import DeleteChatDialog from "../../../Features/chat/DeleteChatDialog";
import RenameChat from "../../../Features/chat/RenameChat";
import { messagesAction } from "../../../store/slices/messageSlice";

export default function SidebarContent({ panelFn, collapsed, mobileOpen }) {
  const [hoveredChat, setHoveredChat] = useState(null);
  const [menuChatId, setMenuChatId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteChatId, setDeleteChatId] = useState(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameChatId, setRenameChatId] = useState(null);
  const { chats, activeChat, isDelete } = useSelector((state) => state.chats);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const sidebarRef = useRef(null); // <-- Ref for click outside
  useEffect(() => {
    const handleClickOutside = () => setMenuChatId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        panelFn(false); // collapse sidebar
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelFn]);
  return (
    <>
      {deleteDialogOpen && (
        <DeleteChatDialog
          deleteChatId={deleteChatId}
          dialogOpen={deleteDialogOpen}
          setDialogOpen={setDeleteDialogOpen}
        />
      )}
      {renameDialogOpen && (
        <RenameChat
          renameChatId={renameChatId}
          dialogOpen={renameDialogOpen}
          setDialogOpen={setRenameDialogOpen}
        />
      )}
      <motion.div
        ref={sidebarRef}
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

        {/* New Chat Button */}
        <div className="px-3 pb-3 mt-4">
          <button
            onClick={() => {
              dispatch(messagesAction.addMessage([]));
              dispatch(chatActions.setActiveChat(null));
              navigateTo(`${BASE_PATH}/`);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg  hover:bg-[var(--surface)] transition-colors text-[var(--text-primary)] cursor-pointer"
          >
            <Plus size={18} strokeWidth={1.5} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="text-[15px]"
                >
                  New Chat
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Recents */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1 overflow-y-auto custom-scrollbar"
            >
              <div className="px-3 py-3 ">
                <h3 className="px-3 text-[13px] text-[var(--text-secondary)] font-medium mb-2">
                  Recents
                </h3>
                {chats.map((chat) => (
                  <div
                    key={chat.chat_id}
                    className={`group relative flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors mb-0.5  ${
                      activeChat === chat.chat_id
                        ? "bg-[var(--surface)]"
                        : "hover:bg-[var(--background-secondary)]"
                    }`}
                    onClick={() => {
                      dispatch(chatActions.setActiveChat(chat.chat_id));
                      navigateTo(`${BASE_PATH}/c/${chat.chat_id}`);
                    }}
                    onMouseEnter={() => setHoveredChat(chat)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    {/* Chat Title */}
                    <span className="text-[15px] text-[var(--text-primary)] truncate pr-2">
                      {chat.title}
                    </span>

                    {/* 3 dots button */}
                    {hoveredChat === chat && (
                      <div className="relative">
                        <button
                          className="flex-shrink-0 p-1 rounded hover:bg-[var(--surface)] transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent triggering chat click
                            setMenuChatId(
                              menuChatId === chat.chat_id ? null : chat.chat_id
                            );
                          }}
                        >
                          <MoreHorizontal
                            size={16}
                            className="text-[#A0A0A0]"
                          />
                        </button>

                        {/* Dropdown menu */}
                        <AnimatePresence>
                          {menuChatId === chat.chat_id && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-0 mt-2 w-32 bg-[var(--surface)] border border-[var(--text-secondary)]/10 rounded-lg shadow-md z-20"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="w-full flex items-center gap-2 px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--background-secondary)] transition-colors text-sm"
                                onClick={() => {
                                  setRenameDialogOpen(true);
                                  setRenameChatId(chat.chat_id);
                                  setMenuChatId(null);
                                }}
                              >
                                <Pencil
                                  size={15}
                                  className="text-[var(--text-secondary)]"
                                />
                                Rename
                              </button>

                              <button
                                className="w-full flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-[var(--background-secondary)] transition-colors text-sm"
                                onClick={() => {
                                  setDeleteDialogOpen(true);
                                  setDeleteChatId(chat.chat_id);
                                  setMenuChatId(null);
                                }}
                              >
                                <Trash2 size={15} />
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer (Always visible, even when collapsed) */}
        <SidebarFooter collapsed={collapsed} />
      </motion.div>
    </>
  );
}

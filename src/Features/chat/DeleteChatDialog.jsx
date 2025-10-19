import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteChat, chatActions } from "../../store/slices/chatSlice";
import { BASE_PATH } from "../../store/constants";

const DeleteChatDialog = ({ deleteChatId, dialogOpen, setDialogOpen }) => {
  const { chats, isDelete, loading } = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const dialog = useRef();
  const handleDelete = () => {
    dispatch(deleteChat(chats, deleteChatId));
  };

  useEffect(() => {
    if (isDelete) {
      dispatch(chatActions.resetDeletedAfterSuccessfullyDelete());
      navigateTo(`${BASE_PATH}/`);
      setDialogOpen(false);
    }
  }, [isDelete]);
  useEffect(() => {
    if (dialogOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [dialogOpen]);

  return (
    <div className="fixed min-h-screen flex items-center justify-center  ">
      {/* Animated Backdrop */}
      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0  backdrop-brightness-30 z-30 "
            onClick={() => setDialogOpen(false)}
          />
        )}
      </AnimatePresence>
      <dialog
        ref={dialog}
        id="deleteDialog"
        className="bg-transparent border-none p-0 max-w-md w-full rounded-2xl overflow-visible z-50 relative top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%]"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleCancel();
        }}
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50"
          >
            {/* Header with animated warning icon */}
            <div className="relative bg-gradient-to-r from-red-600 to-orange-600 p-6 overflow-hidden">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute right-4 top-4 opacity-10"
              >
                <AlertTriangle size={120} />
              </motion.div>
              <form method="dialog">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setDialogOpen(false)}
                  className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors z-10"
                >
                  <X size={24} />
                </motion.button>
              </form>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-3"
              >
                <AlertTriangle size={32} className="text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white">
                Confirm Deletion
              </h2>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-300 leading-relaxed"
              >
                Are you absolutely sure you want to delete this item? This
                action cannot be undone and all associated data will be
                permanently removed.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-red-950/30 border border-red-900/50 rounded-lg p-4"
              >
                <p className="text-sm text-red-300 flex items-start gap-2">
                  <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    This is a destructive action and cannot be reversed.
                  </span>
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 pt-2"
              >
                <form method="dialog">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    onClick={() => setDialogOpen(false)}
                    className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </motion.button>
                </form>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Delete
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </dialog>
    </div>
  );
};

export default DeleteChatDialog;

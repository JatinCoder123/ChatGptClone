import { motion, AnimatePresence } from "framer-motion";
import { BASE_PATH } from "@/store/constants.js";
import MessageBubble from "./MessageBubble.jsx";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
const Message = () => {
  const messagesEndRef = useRef(null);
  const { messages, loading } = useSelector((state) => state.messages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  return (
    <div className="flex-1 w-full overflow-y-auto  p-4 custom-scrollbar ">
      {/* Center messages inside */}
      <div className="max-w-3xl mx-auto flex flex-col">
        <AnimatePresence>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start mb-4"
          >
            <div className="rounded-2xl">
              <motion.img
                src={`${BASE_PATH}/logo.png`}
                alt="Logo"
                className="w-10 h-10"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Message;

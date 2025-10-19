import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import MessageRenderer from "./MessgaeRenderer";
import { modalToIcon } from "@/assets/assets.js";

export default function MessageBubble({ message }) {
  const mode = useSelector((state) => state.theme.mode);
  const model = useSelector((state) => state.model.model);

  const renderTextWithLinks = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-500 hover:underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className={`mb-8  flex ${
        message.isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex flex-col gap-2 w-full max-w-2xl ${
          message.isUser ? "items-end" : "items-start"
        }`}
      >
        {/* Images */}
        {message.images && message.images.length > 0 && (
          <div className="flex flex-wrap justify-end gap-2 mt-2">
            {message.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Uploaded-${idx}`}
                className="rounded-lg w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] object-cover"
              />
            ))}
          </div>
        )}

        {/* Files */}
        {message.files &&
          message.files.length > 0 &&
          message.files.map((file, idx) => (
            <a
              key={idx}
              href={file.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-md border break-all
border-gray-300 text-[var(--text-primary)] text-sm hover:bg-[var(--surface)]"
            >
              📎 {file.name}
            </a>
          ))}

        {/* Message bubble */}

        {message.isUser && message.message.length !== 0 && (
          <motion.div
            initial={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
            animate={{
              boxShadow: [
                "0 1px 6px rgba(0,0,0,0.15), 0 0 6px rgba(79,198,212,0.2), 0 0 12px rgba(203,168,183,0.15)",
                "0 1px 8px rgba(0,0,0,0.2), 0 0 12px rgba(79,198,212,0.3), 0 0 20px rgba(203,168,183,0.25)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            whileHover={{ scale: 1.01 }}
            className={` px-4 py-3 rounded-md rounded-br-2xl rounded-tl-2xl border whitespace-pre-wrap break-words break-all
 ${
   mode === "dark"
     ? "bg-[#1e1e1e] border-gray-700 text-gray-100"
     : "bg-white border-gray-200 text-gray-900"
 }`}
          >
            {/* Text */}
            {message.message && <p>{renderTextWithLinks(message.message)}</p>}
          </motion.div>
        )}
        {!message.isUser && (
          <motion.div
            className=" text-[var(--text-primary)] whitespace-pre-wrap break-words break-all flex flex-col 
"
          >
            <img
              src={modalToIcon[message.model]}
              className="h-8 w-8 rounded-full"
            />
            <MessageRenderer content={message.message} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

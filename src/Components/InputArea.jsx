import { useState, useRef, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMic, FiX, FiFile, FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { messagesAction, sendChat } from "../store/slices/messageSlice.js";
import { AudioLines } from "./animate-ui/icons/audio-lines.jsx";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../store/constants.js";
import GenOption from "./GenOption.jsx";
import { toast } from "react-toastify";
import { createMedia, createVideoJobId } from "../store/slices/mediaSlice.js";

export default function InputArea({ chatId, ...props }) {
  const [data, setData] = useState({
    type: "image",
    ratio: "2:3",
    size: "1:1",
    quality: "480p",
    imageQuality: "low",
    duration: "5s",
    count: "1v",
    model: "GPT",
  });
  const [inputText, setInputText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [recording, setRecording] = useState(false);
  const { loading, messages, message } = useSelector((state) => state.messages);
  const { loading: mediaLoading } = useSelector((state) => state.media);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { model } = useSelector((state) => state.model);
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [inputText]);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (!inputText.trim() &&
        imagePreviews.length === 0 &&
        filePreviews.length === 0) ||
      loading
    )
      return;

    const newMessage = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      message: inputText.trim(),
      images: imagePreviews,
      files: filePreviews,
      isUser: true,
    };
    dispatch(messagesAction.addMessage([...messages, newMessage]));
    console.log("Total Messages", messages);
    setInputText("");
    setImagePreviews([]);
    setFilePreviews([]);
    dispatch(
      sendChat(messages, inputText, files, images, user.id, chatId, model)
    );
    setFiles(() => []);
    setImages(() => []);
  };
  const genHandleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      toast.error("Please Give Some Prompt!");
    }
    props.setType(data.type);
    const formData = new FormData();
    formData.append("prompt", inputText);
    if (data.type == "video") {
      formData.append("quality", data.quality);
      formData.append("resolution", data.ratio);
      formData.append("duration", data.duration);
    } else {
      formData.append("quality", data.imageQuality);
      formData.append("model", data.model);
      formData.append("resolution", data.size);
    }
    formData.append("count", data.count);
    if (images.length > 0) formData.append("image", images[0]);

    setInputText("");
    setImages(() => []);
    setImagePreviews([]);

    if (data.type === "image") dispatch(createMedia(formData, user.id));
    else dispatch(createVideoJobId(formData, user.id));
  };

  // ✅ Update handleFileChange
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    selectedFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        setImages((prev) => [...prev, file]);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      } else {
        setFiles((prev) => [...prev, file]);
        setFilePreviews((prev) => [
          ...prev,
          { name: file.name, url: URL.createObjectURL(file) },
        ]);
      }
    });
    e.target.value = "";
  };

  // Handle mic (speech to text)
  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (!recording) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => prev + (prev ? " " : "") + transcript);
      };

      recognition.onerror = (err) => {
        console.error("Speech recognition error:", err);
        setRecording(false);
      };

      recognition.onend = () => setRecording(false);

      recognition.start();
      recognitionRef.current = recognition;
      setRecording(true);
    } else {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      props.gen ? genHandleSubmit(e) : handleSubmit(e);
    }
  };

  return (
    <>
      <form
        onSubmit={genHandleSubmit}
        className="w-full flex items-center justify-center"
      >
        <motion.div
          initial={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
          animate={{
            boxShadow: [
              "0 1px 6px rgba(0,0,0,0.15), 0 0 6px rgba(79,198,212,0.1)",
              "0 1px 8px rgba(0,0,0,0.2), 0 0 12px rgba(79,198,212,0.15)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="flex flex-col w-full max-w-3xl
          py-2 px-3 rounded-3xl border bg-[var(--surface)] border-[var(--surface)] transition"
        >
          {/* Previews (stay inside input area, above textarea row) */}
          {(imagePreviews.length > 0 || filePreviews.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-2">
              {/* Images */}
              {imagePreviews.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt={`preview-${idx}`}
                    className="h-16 w-auto rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreviews((prev) =>
                        prev.filter((_, i) => i !== idx)
                      );
                      setImages((prev) => prev.filter((_, i) => i !== idx));
                    }}
                    className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* Files */}
              {filePreviews.map((file, idx) => (
                <div
                  key={idx}
                  className="relative flex items-center gap-2 bg-[var(--background-secondary)] px-3 py-2 rounded-lg"
                >
                  <FiFile className="text-gray-600 dark:text-gray-300" />
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-cyan-600 dark:text-cyan-400"
                  >
                    {file.name}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setFilePreviews((prev) =>
                        prev.filter((_, i) => i !== idx)
                      );
                      setFiles((prev) => prev.filter((_, i) => i !== idx));
                    }}
                    className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input Row */}

          <div className="flex flex-wrap  items-center justify-center gap-2 w-full">
            {/* ➕ File Upload */}
            <div className="relative flex items-center">
              <motion.button
                type="button"
                whileHover={{ scale: isAuthenticated ? 1.1 : 1 }}
                onClick={() => isAuthenticated && fileInputRef.current.click()}
                onMouseEnter={() => !isAuthenticated && setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`flex cursor-pointer items-center justify-center text-[var(--text-primary)] ${
                  isAuthenticated
                    ? "hover:text-cyan-500"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <FiPlus size={22} />
              </motion.button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
            </div>

            {/* 📝 Textarea */}
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 min-w-0 resize-none max-h-40 overflow-y-auto
      px-3 py-2 rounded-md border-none outline-none
      bg-[var(--surface)] text-[var(--text-primary)] placeholder-gray-400
      w-full sm:w-auto"
              rows={1}
            />

            {/* 🎤 Mic */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              onClick={handleMicClick}
              className={`p-2 rounded-full flex items-center justify-center cursor-pointer ${
                recording
                  ? "bg-[var(--destructive)] text-white"
                  : "text-[var(--text-primary)] hover:text-cyan-500"
              }`}
            >
              <FiMic className="w-5 h-5" />
            </motion.button>

            {/* 📤 Send */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={
                (!inputText.trim() &&
                  !imagePreviews.length &&
                  !filePreviews.length) ||
                mediaLoading ||
                loading
              }
              className={`p-2 rounded-full transition-colors
      ${
        inputText.trim() || imagePreviews.length || filePreviews.length
          ? "bg-cyan-500 text-white hover:bg-cyan-600"
          : "bg-[var(--background-secondary)] text-gray-400 cursor-not-allowed"
      }
    `}
            >
              {inputText.trim() ? (
                <FiSend className="w-5 h-5" />
              ) : (
                <AudioLines animateOnHover />
              )}
            </motion.button>
          </div>
          {props.gen && <GenOption setData={setData} data={data} />}
        </motion.div>
      </form>
    </>
  );
}

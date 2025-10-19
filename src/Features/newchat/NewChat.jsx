import HeroNav from "./HeroNav";
import CircularGallery from "./CircularGallery.jsx";
import InputArea from "../../Components/InputArea.jsx";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { messagesAction } from "../../store/slices/messageSlice.js";
import { useEffect } from "react";
import { BASE_PATH } from "../../store/constants.js";

const NewChat = () => {
  const mode = useSelector((state) => state.theme.mode);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.messages);
  useEffect(() => {
    if (message) {
      navigateTo(`${BASE_PATH}/c/${message}`);
      dispatch(messagesAction.resetMessage());
    }
  }, [message]);
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full z-10 px-4 flex flex-col items-center justify-center min-h-screen pb-40 bg-[var(--background)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center mb-6"
      >
        <div className="bg-[var(--background)]">
          <CircularGallery
            mode={mode}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
        <HeroNav />
      </motion.div>
      <InputArea chatId={null} />
    </motion.div>
  );
};

export default NewChat;

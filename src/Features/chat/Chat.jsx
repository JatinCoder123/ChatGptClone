import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Partical from "@/Components/Particles.jsx";
import { useDispatch, useSelector } from "react-redux";
import InputArea from "@/Components/InputArea.jsx";
import Message from "@/layouts/Messages/Message.jsx";
import { chatActions } from "../../store/slices/chatSlice";
import {
  getMessages,
  messagesAction,
} from "../../store/slices/messageSlice.js";
const Chat = () => {
  const { chatId } = useParams();
  const { mode } = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chats);
  const { messages, loading, message, error } = useSelector(
    (state) => state.messages
  );

  useEffect(() => {
    if (chats.length > 0) {
      const chat = chats.filter((chat) => chat.chat_id == chatId);
      if (chat.length == 0) {
        dispatch(getMessages(chatId));
      } else {
        dispatch(messagesAction.addMessage(JSON.parse(chat[0]["messages"])));
      }
    }
  }, [chats, chatId]);
  // useEffect(() => {
  //   if (message) {
  //     dispatch(messagesAction.resetMessage());
  //   }
  //   if (error) {
  //     toast.error(error);
  //     dispatch(messagesAction.resetError());
  //   }
  // }, [message, error]);
  useEffect(() => {
    dispatch(chatActions.setActiveChat(chatId));
  }, [chats, chatId]);

  return (
    <div className="relative w-full h-screen overflow-hidden  ">
      {/* Background Particles */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: 0,
          pointerEvents: "none",
        }}
        className={` ${mode === "dark" ? "" : "opacity-0"}`}
      >
        <Partical
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={100}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between w-full h-full px-4 py-2  mx-auto">
        <div className="flex-1 flex flex-col justify-end overflow-hidden">
          <Message />
        </div>
        <InputArea chatId={chatId} />
      </div>
    </div>
  );
};

export default Chat;

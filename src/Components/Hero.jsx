import Partical from "./Particles.jsx";
import { useSelector } from "react-redux";
import InputArea from "./InputArea.jsx";
import Message from "@/layouts/Messages/Message.jsx";

export default function Hero({ messages, isTyping, setMessages, setIsTyping }) {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div className="relative w-full h-screen overflow-hidden ">
      {/* Background Particles */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: 0,
          pointerEvents: "none",
        }}
        className={`${mode === "dark" ? "" : "opacity-0"}`}
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

      {/* Messages + Input */}
      <div className="relative z-10 flex flex-col justify-between w-full h-full px-4 py-2  mx-auto">
        {/* Messages */}
        <div className="flex-1 flex flex-col justify-end overflow-hidden">
          <Message messages={messages} isTyping={isTyping} />
        </div>

        <InputArea
          messages={messages}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}

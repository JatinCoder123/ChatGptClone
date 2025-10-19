import { useState } from "react";
import Header from "@/layouts/Header/Header.jsx";
import Hero from "@/Components/Hero.jsx";
import AppSidebar from "@/layouts/sidebar/AppSidebar.jsx";

function HomePage() {
  const [messages, setMessages] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false); // for small screens

  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      <AppSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          clearChat={() => setMessages([])}
          messages={messages}
          setMobileOpen={setMobileOpen}
        />
        <Hero
          messages={messages}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}

export default HomePage;

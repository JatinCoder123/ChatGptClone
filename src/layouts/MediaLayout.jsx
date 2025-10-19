import { useState } from "react";
import Header from "@/layouts/Header/Header.jsx";
import MediaSidebar from "@/layouts/sidebar/MediaSidebar/MediaSidebar.jsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MediaHeader from "./Header/MediaHeader";

function MediaLayout() {
  const [mobileOpen, setMobileOpen] = useState(false); // for small screens

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      <MediaSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <MediaHeader setMobileOpen={setMobileOpen} />
        <Outlet />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" // you can change to "light"
        />{" "}
      </div>
    </div>
  );
}

export default MediaLayout;

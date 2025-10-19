import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MediaHeader from "./Header/MediaHeader";
import AvatarSidebar from "./sidebar/AvatarSidebar/AvatarSidebar";

function AvatarLayout() {
  const [mobileOpen, setMobileOpen] = useState(false); // for small screens

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      <AvatarSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

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

export default AvatarLayout;

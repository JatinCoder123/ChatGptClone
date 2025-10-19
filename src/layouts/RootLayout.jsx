import { useState } from "react";
import Header from "@/layouts/Header/Header.jsx";
import AppSidebar from "@/layouts/sidebar/AppSidebar/AppSidebar.jsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false); // for small screens

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      <AppSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header setMobileOpen={setMobileOpen} />
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

export default RootLayout;

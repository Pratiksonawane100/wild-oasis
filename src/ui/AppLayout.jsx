import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MenuButton from "./MenuButton";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Disable scrolling on the body when the sidebar is open
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen" style={{ height: "100%" }}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header className="bg-white shadow-md" />
        <main className="flex-1 p-4 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Menu Button */}
      <MenuButton onToggle={toggleSidebar} />
    </div>
  );
}

export default AppLayout;

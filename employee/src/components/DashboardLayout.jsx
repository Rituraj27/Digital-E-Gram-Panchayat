import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col h-screen lg:flex-row">
       <div className="w-full  bg-green-900 text-white lg:w-[15vw] block fixed lg:h-screen h-auto p-2 lg:p-0 z-50 ">
        <button className="block lg:hidden" onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <nav className={`mt-4 ${isOpen ? "block" : "hidden"} lg:block`}>
          <ul>
            <li>
              <Link to="/" className="block px-4 py-2 rounded hover:bg-green-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/tickets" className="block px-4 py-2 rounded hover:bg-green-700">
                Tickets
              </Link>
            </li>
            <li>
              <Link to="/grievances" className="block px-4 py-2 rounded hover:bg-green-700">
                Grievances
              </Link>
            </li>
            <li>
              <Link to="/messages" className="block px-4 py-2 rounded hover:bg-green-700">
                Message
              </Link>
            </li>
            <li>
              <Link to="/notifications" className="block px-4 py-2 rounded hover:bg-green-700">
                Notifications
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 lg:ml-[15vw] p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useEffect, useState } from "react";
import { RecruiterSidebar } from "../data/data";
import { Blend, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com"; 

function SidebarRecruiter() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ Email: "" });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      navigate("/");
      window.alert("Logout success");
    } catch (error) {
      window.alert("Logout failed");
      console.log("logout failed", error);
    }
  };

  return (
    <div className="bg-gray-300 flex flex-col border-r w-1/6 h-screen p-4 -2xl font-poppins">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <Blend size={28} className="text-gray-800" />
        <span className="text-2xl font-extrabold text-gray-800">
          ᗯOᖇK<span className="text-gray-700">ᐯIᗷE</span> 
        </span>
      </div>

      {/* User Info */}
      <div className="flex flex-col bg-gray-100 rounded-lg p-3 mb-6">
        <p className="text-md font-bold font-mono">Recruiter</p>
        <p className="text-xs">{user.Email}</p>
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col border-t border-b py-4 gap-4 w-full flex-grow">
        {RecruiterSidebar.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 text-black text-md cursor-pointer font-semibold hover:bg-gray-800 hover:text-white px-3 py-2 rounded text-left transition-colors duration-200"
          >
            {item.icon && (
              <item.icon
                size={20}
                className="text-black group-hover:text-white"
              />
            )}
            {item.name}
          </button>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-600 text-md cursor-pointer font-semibold hover:bg-red-600 hover:text-white px-3 py-2 rounded text-left transition-colors duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SidebarRecruiter;

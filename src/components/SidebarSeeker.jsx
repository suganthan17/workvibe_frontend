import React, { useEffect, useState } from "react";
import { SeekerSidebar } from "../data/data";
import { Blend, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SidebarSeeker() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Email: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
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
    <div className="bg-emerald-50 flex flex-col border-r w-1/6 h-screen p-4 rounded-r-2xl font-poppins">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <Blend size={28} className="text-emerald-700" />
        <span className="text-2xl font-extrabold text-emerald-700">
          ᗯOᖇKᐯIᗷE
        </span>
      </div>

      {/* User Info */}
      <div className="flex flex-col bg-emerald-100 rounded-lg p-3 mb-6">
        <p className="text-md font-bold font-mono">Job Seeker</p>
        <p className="text-xs ">{user.Email}</p>
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col border-t border-b py-4 gap-4 w-full flex-grow">
        {SeekerSidebar.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 text-black text-md cursor-pointer font-semibold hover:bg-emerald-600 hover:text-white px-3 py-2 rounded text-left transition-colors duration-200"
          >
            {item.icon && (
              <item.icon
                size={20}
                className="text-emerald-800 group-hover:text-white"
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

export default SidebarSeeker;

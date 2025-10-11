import React, { useEffect, useState } from "react";
import { RecruiterSidebar } from "../data/data";
import { Blend, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function SidebarRecruiter() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", name: "" });

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/recruiter/profile/sidebar`, {
        withCredentials: true,
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col w-64 min-h-screen border-r border-gray-700 shadow-lg p-4 font-poppins text-gray-100">
      <div className="flex items-center gap-2 mb-6 px-2">
        <Blend size={28} className="text-indigo-400" />
        <span className="text-2xl font-extrabold text-white">
          ᗯOᖇK<span className="text-indigo-500">ᐯIᗷE</span>
        </span>
      </div>

      <div className="flex flex-col bg-gray-800 rounded-xl p-4 mb-6 shadow-md text-center">
        <div className="w-20 h-20 rounded-full bg-gray-600 mx-auto mb-3 flex items-center justify-center text-xl font-bold text-white">
          {user.name ? user.name.charAt(0).toUpperCase() : "R"}
        </div>
        <p className="text-md font-semibold">{user.name || "Recruiter"}</p>
        <p className="text-xs text-gray-400 truncate">
          {user.email || "email@example.com"}
        </p>
      </div>

      <div className="flex flex-col border-t border-b border-gray-700 py-4 gap-2 flex-grow">
        {RecruiterSidebar.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 text-gray-200 text-md cursor-pointer font-semibold hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200"
          >
            {item.icon && <item.icon size={20} />}
            {item.name}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 text-md cursor-pointer font-semibold hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 mt-2"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SidebarRecruiter;

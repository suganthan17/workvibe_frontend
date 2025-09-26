import React, { useEffect, useState } from "react";
import { SeekerSidebar } from "../data/data";
import { Blend, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function SidebarSeeker() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ Email: "", name: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/seeker/profile/sidebar`, {
          withCredentials: true,
        });
        setUser({ Email: res.data.email, name: res.data.name });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

      // Dismiss any previous toasts
      toast.dismiss();

      // Show success toast
      toast.success("Logged out successfully!", { duration: 2000 });

      // Navigate after toast duration
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.dismiss();
      toast.error("Logout failed", { duration: 3000 });
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-slate-900 flex flex-col w-64 min-h-screen border-r border-slate-800 shadow-lg p-4 font-poppins">
      <div className="flex items-center gap-2 mb-6 px-2">
        <Blend size={28} className="text-indigo-400" />
        <span className="text-2xl font-extrabold text-white">
          ᗯOᖇK<span className="text-indigo-500">ᐯIᗷE</span>
        </span>
      </div>

      <div className="flex flex-col bg-slate-800 rounded-xl p-4 mb-6 shadow-md text-center">
        <div className="w-20 h-20 rounded-full bg-slate-700 mx-auto mb-3 flex items-center justify-center text-xl font-bold text-gray-200">
          {user.name ? user.name.charAt(0).toUpperCase() : "S"}
        </div>
        <p className="text-md font-semibold text-white">
          {user.name || "Job Seeker"}
        </p>
        <p className="text-xs text-gray-400 truncate">{user.Email}</p>
      </div>

      <div className="flex flex-col border-t border-b border-slate-800 py-4 gap-2 flex-grow">
        {SeekerSidebar.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 text-gray-300 text-md cursor-pointer font-medium hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-lg transition-all duration-200"
          >
            {item.icon && <item.icon size={20} />}
            {item.name}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 text-md cursor-pointer font-semibold hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg transition-all duration-200 mt-2"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SidebarSeeker;

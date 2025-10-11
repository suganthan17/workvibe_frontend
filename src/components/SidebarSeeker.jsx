import React, { useEffect, useState } from "react";
import { Blend, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SeekerSidebar } from "../data/data";
import toast from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function SidebarSeeker() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/seeker/profile`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setUser(data.info || {});
      } catch (err) {
        console.error(err);
      }
    };
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
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-slate-900 w-64 min-h-screen p-4 text-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Blend size={28} className="text-indigo-400" />
        <span className="text-2xl font-extrabold">
          ᗯOᖇK<span className="text-indigo-500">ᐯIᗷE</span>
        </span>
      </div>
      <div className="bg-slate-800 p-4 rounded-lg text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-slate-700 mx-auto flex items-center justify-center font-bold text-xl">
          {user.name ? user.name.charAt(0) : "S"}
        </div>
        <p className="mt-2 font-semibold">{user.name || "Job Seeker"}</p>
        <p className="text-xs text-gray-400">
          {user.email || "email@example.com"}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {SeekerSidebar.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <item.icon size={20} />
            {item.name}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-600 text-red-400"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SidebarSeeker;

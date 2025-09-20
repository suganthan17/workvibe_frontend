import React, { useEffect, useState } from "react";
import { SeekerSidebar } from "../data/data";
import { Blend, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SidebarSeeker() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ Email: "", name: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/seeker/profile/sidebar",
          { withCredentials: true }
        );
        setUser({ Email: res.data.email, name: res.data.name });
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
      window.alert("Logout successful");
    } catch (error) {
      window.alert("Logout failed");
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-gray-300 flex flex-col border border-gray-400 w-1/6 h-screen p-4 font-poppins">
      <div className="flex items-center gap-2 mb-6">
        <Blend size={28} className="text-gray-800" />
        <span className="text-2xl font-extrabold text-gray-800">
          ᗯOᖇK<span className="text-gray-700">ᐯIᗷE</span>
        </span>
      </div>

      <div className="flex flex-col bg-gray-100 rounded-lg p-3 mb-6">
        <p className="text-md font-bold font-mono">{user.name || "Job Seeker"}</p>
        <p className="text-xs">{user.Email}</p>
      </div>

      <div className="flex flex-col border-t border-b py-4 gap-4 w-full flex-grow">
        {SeekerSidebar.map((item) => (
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

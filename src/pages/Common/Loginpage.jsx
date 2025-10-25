import React, { useState } from "react";
import { Mail, Lock, Blend } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ab1 from "/src/assets/ab6.jpg";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [login, setLogin] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.dismiss();

    try {
      const res = await fetch(`${BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(login),
      });

      const data = await res.json();
      if (res.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful");
        const role = data.user.Role?.toLowerCase();
        navigate(role === "seeker" ? "/seekerhome" : "/recruiterhome");
      } else toast.error(data.message || "Invalid credentials");
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-x-hidden bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <Blend size={28} className="text-[#0e5ed3]" />
            <span className="text-3xl font-extrabold text-gray-900">
              ᗯOᖇK<span className="text-[#0e5ed3]">ᐯIᗷE</span>
            </span>
          </div>

          <h3 className="text-3xl font-bold text-gray-900">Log In</h3>
          <p className="text-gray-500 text-sm mt-2 mb-8">
            Welcome back! Let’s continue your journey with WorkVibe.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-[#0e5ed3]">
              <Mail size={18} className="text-gray-500" />
              <input
                name="Email"
                type="email"
                value={login.Email}
                onChange={handleChange}
                required
                placeholder="Email address"
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
              />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-[#0e5ed3]">
              <Lock size={18} className="text-gray-500" />
              <input
                name="Password"
                type={showPwd ? "text" : "password"}
                value={login.Password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="text-xs font-semibold text-blue-900 cursor-pointer hover:underline"
              >
                {showPwd ? "HIDE" : "SHOW"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-900 to-sky-600 hover:from-sky-600 hover:to-indigo-700 cursor-pointer text-white font-semibold shadow-lg shadow-[#0e5ed3]/40 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center relative overflow-hidden">
        <img
          src={ab1}
          alt="Right side visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="px-8 md:px-20 py-12 md:py-20 lg:py-24 max-w-lg text-left">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              Join WorkVibe Today
            </h1>
            <p className="text-white text-sm md:text-base lg:text-lg font-medium opacity-95 leading-relaxed drop-shadow-md">
              Create your free account and start exploring career opportunities
              that fit your vibe. Build your profile, apply to jobs, and connect
              with employers — all in one place.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <p className="text-sm text-white/90">New to WorkVibe?</p>
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex bg-gradient-to-r from-blue-900 to-sky-600 hover:from-sky-600 hover:to-indigo-700 cursor-pointer items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition"
              >
                Sign up now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

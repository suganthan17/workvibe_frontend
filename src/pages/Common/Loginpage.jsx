import React, { useState } from "react";
import { Mail, Lock, Blend } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Illustration from "/src/assets/n1.svg";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      {/* Card */}
      <div className="w-full max-w-7xl rounded-3xl border border-gray-200 shadow-2xl shadow-black overflow-hidden bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Login Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-20">
              <Blend size={28} className="text-[#0e5ed3]" />
              <span className="text-4xl font-extrabold text-gray-900">
                ᗯOᖇK<span className="text-[#0e5ed3]">ᐯIᗷE</span>
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Log In</h3>
            <p className="text-gray-500 text-sm mt-2 mb-8">
              Welcome back! Let’s continue your journey with WorkVibe.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
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

              {/* Password with SHOW/HIDE */}
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
                  className="text-xs font-semibold text-[#0e5ed3] hover:underline"
                >
                  {showPwd ? "HIDE" : "SHOW"}
                </button>
              </div>

              {/* CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0e5ed3] hover:bg-[#0b4aa7] text-white font-semibold shadow-lg shadow-[#0e5ed3]/40 transition"
              >
                Log In
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#0e5ed3] font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Right: Illustration */}
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-[#1771e6] to-[#0b4aa7] text-white flex flex-col justify-center items-center">
            <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-sm" />
            <div className="absolute -right-16 bottom-6 w-40 h-40 rounded-full bg-white/10 blur-sm" />

            <img
              src={Illustration}
              alt="Login illustration"
              className="w-100 h-auto mb-6 z-10 drop-shadow-lg"
            />

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
                WELCOME BACK
              </h2>
              <p className="uppercase tracking-widest text-white/80 text-xs mt-1">
                to WorkVibe
              </p>
              <p className="mt-6 text-sm md:text-[15px] text-white/90 max-w-md leading-relaxed">
                Access your account and continue exploring opportunities,
                connecting with recruiters, and building your career.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

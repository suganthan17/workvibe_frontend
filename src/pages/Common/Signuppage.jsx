import React, { useState } from "react";
import { User as UserIcon, Mail, Lock, Blend } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Illustration from "/src/assets/n3.svg"; 

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

export default function SignupPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({
    Username: "",
    Email: "",
    Password: "",
    Role: "seeker",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      const res = await fetch(`${BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful! Please log in.");
        navigate("/");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      {/* Card */}
      <div className="w-full max-w-7xl rounded-3xl border border-gray-200 shadow-2xl shadow-black overflow-hidden bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Welcome Panel */}
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-[#1771e6] to-[#0b4aa7] text-white flex flex-col justify-center items-center">
            {/* Decorative circles */}
            <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-sm" />
            <div className="absolute -right-16 bottom-6 w-40 h-40 rounded-full bg-white/10 blur-sm" />

            {/* Illustration */}
            <img
              src={Illustration}
              alt="Signup illustration"
              className="w-100 h-auto mb-6 z-10 drop-shadow-lg"
            />

            {/* Text Content */}
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
                WELCOME
              </h2>
              <p className="uppercase tracking-widest text-white/80 text-xs mt-1">
                to WorkVibe
              </p>
              <p className="mt-6 text-sm md:text-[15px] text-white/90 max-w-md leading-relaxed">
                Create your account and start discovering new roles, connecting
                with recruiters, and growing your career with confidence.
              </p>
            </div>
          </div>

          {/* Right: Sign up form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-20">
              <Blend size={28} className="text-[#0e5ed3]" />
              <span className="text-4xl font-extrabold text-gray-900">
                ᗯOᖇK<span className="text-[#0e5ed3]">ᐯIᗷE</span>
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Sign up</h3>
            <p className="text-gray-500 text-sm mt-2 mb-8">
              Let’s get you started. It only takes a minute.
            </p>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Username */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-[#0e5ed3]">
                <UserIcon size={18} className="text-gray-500" />
                <input
                  name="Username"
                  value={form.Username}
                  onChange={onChange}
                  required
                  placeholder="Full name"
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-[#0e5ed3]">
                <Mail size={18} className="text-gray-500" />
                <input
                  name="Email"
                  type="email"
                  value={form.Email}
                  onChange={onChange}
                  required
                  placeholder="Email address"
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
                />
              </div>

              {/* Password with SHOW */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-[#0e5ed3]">
                <Lock size={18} className="text-gray-500" />
                <input
                  name="Password"
                  type={showPwd ? "text" : "password"}
                  value={form.Password}
                  onChange={onChange}
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

              {/* Role */}
              <div className="p-3 rounded-xl border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-[#0e5ed3]">
                <select
                  name="Role"
                  value={form.Role}
                  onChange={onChange}
                  className="w-full bg-transparent outline-none text-gray-800 text-sm"
                >
                  <option value="seeker">I’m a Job Seeker</option>
                  <option value="recruiter">I’m a Recruiter</option>
                </select>
              </div>

              {/* CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0e5ed3] hover:bg-[#0b4aa7] text-white font-semibold shadow-lg shadow-[#0e5ed3]/40 transition"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-[#0e5ed3] font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

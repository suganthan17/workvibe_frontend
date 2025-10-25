import React, { useState } from "react";
import { User as UserIcon, Mail, Lock, Blend } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Illustration from "/src/assets/ab4.jpg";

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
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen flex bg-gradient-to-br from-sky-100 via-white to-indigo-50">
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src={Illustration}
          alt="Signup Illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 w-full pl-25 pb-5 h-full flex items-center">
          <div className="px-8 md:px-20 py-12 md:py-20 lg:py-24 max-w-lg text-left">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              Join WorkVibe Today
            </h1>
            <p className="text-white text-sm md:text-base lg:text-lg font-medium opacity-95 leading-relaxed drop-shadow-md">
              Create your free account and start exploring career opportunities that fit your vibe.
              Build your profile, apply to jobs, and connect with employers — all in one place.
            </p>

            <div className="mt-8">
              <p className="text-sm text-white/90">Already a member?</p>
              <button
                onClick={() => window.location.assign("/login")}
                className="mt-3 bg-gradient-to-r from-blue-900 to-sky-600 hover:from-sky-600 hover:to-indigo-700 cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <Blend size={28} className="text-[#0e5ed3]" />
            <span className="text-3xl font-extrabold text-gray-900">
              ᗯOᖇK<span className="text-[#0e5ed3]">ᐯIᗷE</span>
            </span>
          </div>

          <h3 className="text-3xl font-bold text-gray-900">Create Account</h3>
          <p className="text-gray-500 text-sm mt-2 mb-8">
            Let’s get you started. It only takes a minute.
          </p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-[#0e5ed3]">
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

            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-[#0e5ed3]">
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

            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-[#0e5ed3]">
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

            <div className="p-3 rounded-xl border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-[#0e5ed3]">
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

            <button
              type="submit"
              className="w-full py-3 cursor-pointer rounded-xl bg-gradient-to-r from-blue-900 to-sky-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-sky-500/40 transition"
            >
              Create Account
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import LoginImg from "/src/assets/13.svg";
import { Blend } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL = 
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function LoginPage() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const inputClass =
    "p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 border border-gray-700 placeholder-gray-400";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(login),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful 🎉");
        navigate(data.user.role === "seeker" ? "/seekerhome" : "/recruiterhome");
      } else {
        toast.error(data.message || "Login failed ❌");
      }
    } catch (err) {
      toast.error("Network error. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen font-poppins bg-gray-900 text-gray-100">
      <Toaster />
      <div className="w-full md:w-1/2 flex flex-col justify-center px-16">
        <div className="flex items-center mb-6">
          <Blend size={35} className="text-indigo-500 mr-2" />
          <span className="text-4xl font-extrabold text-white">
            ᗯOᖇK<span className="text-indigo-500">ᐯIᗷE</span>
          </span>
        </div>

        <div className="bg-gray-800 shadow-lg rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-2 text-white">Welcome Back</h2>
          <p className="text-gray-400 mb-6">Login to your account</p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={login.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={login.password}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-3 font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-gray-400 text-sm text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block w-1/2">
        <img
          src={LoginImg}
          alt="Branding"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </div>
    </div>
  );
}

export default LoginPage;

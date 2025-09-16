import React, { useState } from "react";
import img1 from "../assets/3.svg";
import { Blend } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [login, setLogin] = useState({ Email: "", Password: "" });
  const navigate = useNavigate();

  const inputClass =
    "p-3 border font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ Email: login.Email, Password: login.Password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect based on role
        if (data.user.Role === "seeker") navigate("/seeker-dashboard");
        else if (data.user.Role === "recruiter") navigate("/recruiter-dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen font-poppins">
      {/* Left Side - Form */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <div className="flex items-center mb-4">
          <Blend size={35} className="text-emerald-700 mr-2" />
          <span className="text-3xl font-extrabold text-emerald-700">ᗯOᖇKᐯIᗷE</span>
        </div>

        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-600 mb-6">Login to your account</p>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={login.Email}
            onChange={handleChange}
            className={inputClass}
            required
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={login.Password}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <button
            type="submit"
            className="bg-emerald-600 text-white p-3 font-semibold rounded-md hover:bg-emerald-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/" className="text-emerald-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2">
        <img src={img1} alt="Branding" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default LoginPage;

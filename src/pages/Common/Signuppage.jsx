import React, { useState } from "react";
import SignupImg from "/src/assets/9.svg";
import { Blend } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com"; 

function Signuppage() {
  const [signup, setSignup] = useState({
    Username: "",
    Email: "",
    Password: "",
    Role: "seeker",
  });

  const navigate = useNavigate();
  const inputClass =
    "p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 border border-gray-700 placeholder-gray-400";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });

      const data = await res.json();
      alert(data.message); 

      if (res.ok) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen font-poppins bg-gray-900 text-gray-100">
      {/* Left Image Panel */}
      <div className="hidden md:block w-1/2">
        <img
          src={SignupImg}
          alt="Branding"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </div>

      {/* Right Form Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-16">
        <div className="flex items-center mb-6">
          <Blend size={35} className="text-indigo-500 mr-2" />
          <span className="text-4xl font-extrabold text-white">
            ᗯOᖇK<span className="text-indigo-500">ᐯIᗷE</span>
          </span>
        </div>

        <div className="bg-gray-800 shadow-lg rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-2 text-white">Create Your Account</h2>
          <p className="text-gray-400 mb-6">Join WorkVibe today</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="Username"
              placeholder="Full Name"
              value={signup.Username}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="email"
              name="Email"
              placeholder="Email Address"
              value={signup.Email}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <div className="flex gap-4">
              <input
                type="password"
                name="Password"
                placeholder="Password"
                value={signup.Password}
                onChange={handleChange}
                className={`${inputClass} flex-1`}
                required
              />
              <select
                name="Role"
                value={signup.Role}
                onChange={handleChange}
                className={`${inputClass} flex-1`}
              >
                <option value="seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white p-3 font-semibold rounded-lg hover:bg-indigo-700 cursor-pointer transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-gray-400 text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-indigo-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;

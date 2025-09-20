import React, { useState } from "react";
import SignupImg from "/src/assets/6.svg";
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
    "p-3 border font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500";

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
    <div className="flex h-screen font-poppins">
      <div className="w-1/2">
        <img
          src={SignupImg}
          alt="Branding"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center px-16">
        <div className="flex items-center mb-4">
          <Blend size={35} className="text-gray-700 mr-2" />
          <span className="text-4xl font-extrabold text-gray-700">ᗯOᖇKᐯIᗷE</span>
        </div>

        <h2 className="text-xl font-semibold mb-2">Welcome To WorkVibe</h2>
        <p className="text-gray-600 mb-6">Create your account</p>

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
            className="bg-gray-700 text-white p-3 font-semibold rounded-md hover:bg-gray-900 cursor-pointer transition"
          >
            Create
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-gray-700 cursor-pointer font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signuppage;

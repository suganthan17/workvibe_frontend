import React, { useState } from "react";
import img1 from "../assets/5.svg";
import { Blend } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Signuppage() {
  const [signup, setSignup] = useState({
    Username: "",
    Email: "",
    Password: "",
    Role: "seeker",
  });

  const navigate = useNavigate();

  const inputClass =
    "p-3 border font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });

      const data = await res.json();
      alert(data.message); // "Signup successful, please login"
      if (res.ok) navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen font-poppins">
      {/* Left Side - Image */}
      <div className="w-1/2">
        <img src={img1} alt="Branding" className="w-full h-full object-cover" />
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <div className="flex items-center mb-4">
          <Blend size={35} className="text-emerald-700 mr-2" />
          <span className="text-3xl font-extrabold text-emerald-700">ᗯOᖇKᐯIᗷE</span>
        </div>

        <h2 className="text-2xl font-bold mb-2">Welcome To WorkVibe</h2>
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
            className="bg-emerald-600 text-white p-3 font-semibold rounded-md hover:bg-emerald-700 transition"
          >
            Create
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signuppage;

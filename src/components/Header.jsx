// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { Briefcase } from "lucide-react";
=======
import { Blend } from "lucide-react";
>>>>>>> 9ac492f (added auth)

function Header() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center space-x-2">
<<<<<<< HEAD
          <Briefcase size={35} className="text-blue-600" />
          <span className="text-2xl md:text-3xl font-extrabold text-blue-600 font-poppins">
            WorkVibe
          </span>
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-600">Signup</Link>
=======
          <Blend size={35} className="text-emerald-700" />
          <span className="text-2xl md:text-3xl font-extrabold text-emerald-700 font-poppins">
            ᗯOᖇKᐯIᗷE
          </span>
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
          <Link to="/login" className="text-gray-700 hover:text-green-600">Login</Link>
          <Link to="/signup" className="text-gray-700 hover:text-green-600">Signup</Link>
>>>>>>> 9ac492f (added auth)
        </div>
      </div>
    </nav>
  );
}

export default Header;

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Blend } from "lucide-react";
import ban1 from "/src/assets/ban2.svg";
import Footer from "../../components/Footer";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-50 via-white to-sky-100 overflow-hidden">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full flex justify-start items-center px-8 md:px-20 py-6 z-10">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Blend size={40} className="text-indigo-700" />
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              WORK<span className="text-indigo-700">VIBE</span>
            </h1>
          </div>
        </nav>

        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-20 mt-24 md:mt-0 space-y-6">
          <p className="uppercase text-gray-500 font-semibold tracking-widest text-xs">
            Connecting Talent & Opportunity
          </p>

          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 leading-tight">
            Discover Your <br />
            <span className="text-blue-800">Next Dream Job</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-xl leading-relaxed">
            WorkVibe empowers professionals and organizations to connect,
            collaborate, and grow. Find the perfect job or the right talent —
            all in one modern hiring platform.
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-gradient-to-r  from-indigo-800 to-sky-500 text-white cursor-pointer font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.05] active:scale-[0.97] transition duration-300"
            >
              Explore Now
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-8 py-3 border-2 border-indigo-700 cursor-pointer text-indigo-700 font-semibold rounded-xl hover:bg-gradient-to-r from-indigo-800 to-sky-500 hover:text-white hover:border-white transition duration-300"
            >
              About Us
            </button>
          </div>
        </div>

        <motion.img
          src={ban1}
          alt="WorkVibe Job Opportunities"
          initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full max-w-2xl object-contain drop-shadow-2xl"
        />
      </div>

      <Footer />
    </>
  );
}

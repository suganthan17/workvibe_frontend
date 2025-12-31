import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Blend } from "lucide-react";
import ban1 from "/src/assets/ban2.svg";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      <nav className="absolute top-0 left-0 w-full flex items-center px-8 md:px-20 py-6 z-10">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Blend size={46} className="text-indigo-700" />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            WORK<span className="text-indigo-700">VIBE</span>
          </h1>
        </div>
      </nav>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between h-full px-8 md:px-20 pt-24 gap-14">
        <div className="flex-1 space-y-6">
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center cursor-pointer gap-2 px-7 py-2.5 text-sm font-extrabold text-indigo-700 rounded-full border-2 border-indigo-700 bg-white hover:bg-indigo-700 hover:text-white shadow-sm hover:shadow-indigo-300 transition"
          >
            Get Started
          </button>

          <p className="uppercase text-gray-500 font-bold tracking-[0.25em] text-xs">
            About WorkVibe
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Built to Simplify <br />
            <span className="text-indigo-700">Modern Hiring</span>
          </h1>

          <p className="text-gray-700 text-base md:text-lg max-w-lg leading-relaxed font-medium">
            WorkVibe is a modern job portal designed to bridge the gap between
            talented professionals and forward-thinking companies with clarity,
            speed, and trust.
          </p>

          <div className="flex gap-4 pt-4 max-w-3xl">
            <div className="flex-1 bg-white rounded-xl p-5 shadow-sm">
              <h3 className="text-base font-extrabold text-gray-800 mb-1">
                Our Mission
              </h3>
              <p className="text-gray-600 text-sm font-medium">
                Empower individuals to build meaningful careers.
              </p>
            </div>

            <div className="flex-1 bg-white rounded-xl p-5 shadow-sm">
              <h3 className="text-base font-extrabold text-gray-800 mb-1">
                Our Vision
              </h3>
              <p className="text-gray-600 text-sm font-medium">
                A transparent, human-centered hiring ecosystem.
              </p>
            </div>

            <div className="flex-1 bg-white rounded-xl p-5 shadow-sm">
              <h3 className="text-base font-extrabold text-gray-800 mb-1">
                What We Do
              </h3>
              <p className="text-gray-600 text-sm font-medium">
                Connect talent and recruiters with smart tools.
              </p>
            </div>
          </div>
        </div>

        <motion.img
          src={ban1}
          alt="About WorkVibe"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="flex-1 max-w-lg object-contain"
        />
      </div>
    </div>
  );
}

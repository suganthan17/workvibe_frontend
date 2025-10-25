import React from "react";
import { useNavigate } from "react-router-dom";
import { Blend } from "lucide-react";
import ban1 from "/src/assets/ban2.svg";
import Footer from "../../components/Footer";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-10 z-10">
        <nav className="flex items-center justify-between mb-10">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-50 to-sky-50">
              <Blend size={28} className="text-indigo-500" />
            </div>
            <h1 className="text-xl font-extrabold text-gray-800">
              ᗯOᖇK<span className="text-indigo-500">ᐯIᗷE</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium">
            <a href="#about" className="hover:text-sky-600 transition cursor-pointer">
              About
            </a>
            <a href="#employers" className="hover:text-sky-600 transition cursor-pointer">
              Employers
            </a>
            <a href="#contact" className="hover:text-sky-600 transition cursor-pointer">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full border text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 rounded-full bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </nav>

        <div className="uppercase text-gray-500 font-semibold tracking-widest text-xs mb-2">
          Connecting Talent & Opportunity
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
          Discover Your <br /> Next Dream Job
        </h1>

        <p className="text-gray-600 text-base md:text-lg max-w-md mb-8">
          WorkVibe empowers professionals and organizations to connect,
          collaborate, and grow. Find the perfect job or the right talent — all
          in one modern hiring platform.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="px-7 py-3 bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer"
        >
          Explore Jobs
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-10">
        <img
          src={ban1}
          alt="WorkVibe Job Opportunities"
          className="w-full h-auto"
        />
      </div>
    </div>
    <Footer/>
    </>
  );
}

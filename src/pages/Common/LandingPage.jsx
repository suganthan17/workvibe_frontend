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
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-10">
          {/* Navbar */}
          <nav className="flex items-center justify-start mb-16">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Blend size={42} className="text-indigo-700" />
              <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
                ᗯOᖇK<span className="text-indigo-700">ᐯIᗷE</span>
              </h1>
            </div>
          </nav>

          {/* Hero Text Section */}
          <div className="max-w-lg space-y-5">
            <p className="uppercase text-gray-500 font-semibold tracking-widest text-xs">
              Connecting Talent & Opportunity
            </p>

            <h1 className="text-7xl font-extrabold  text-gray-800">
              Discover Your <br /> Next Dream Job
            </h1>

            <p className="text-gray-600 text-base md:text-lg">
              WorkVibe empowers professionals and organizations to connect,
              collaborate, and grow. Find the perfect job or the right talent —
              all in one modern hiring platform.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-8 cursor-pointer py-3 bg-gradient-to-r from-blue-900 to-sky-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition duration-300"
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center p-10">
          <img
            src={ban1}
            alt="WorkVibe Job Opportunities"
            className="w-full h-auto"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

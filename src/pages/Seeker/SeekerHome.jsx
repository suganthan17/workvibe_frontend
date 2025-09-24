import React, { useState, useEffect } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function SeekerHome() {
  const jobsapplied = 0;
  const [jobssaved, setJobssaved] = useState(0);

  useEffect(() => {
    const countsavedjobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/savedjobs`, {
          method: "GET",
          credentials: "include",
          headers:{"Content-Type":"application/json"}
        });
        const data = await res.json();
        if (res.ok) {
          setJobssaved(data.jobs.length);
        }
      } catch (error) {
        console.log(error);
      }
    };
    countsavedjobs();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SidebarSeeker />

      <div className="flex-1 bg-gray-100 p-5">
        <div className="flex items-center justify-between border-b border-gray-300 px-8 py-3 shadow-sm bg-gray-50 mb-5 rounded-md">
          <div>
            <h1 className="text-2xl font-bold text-black">HOME</h1>
            <p className="text-black text-sm">
              Welcome back! Here’s a quick overview of your activity.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-8">
          <h2 className="font-semibold text-xl mb-6 text-gray-800">
            Quick Stats
          </h2>
          <div className="flex flex-wrap gap-6">
            <div className="border border-gray-300 rounded-xl w-56 h-28 bg-white shadow-md flex flex-col justify-center items-center hover:shadow-lg transition-shadow duration-200">
              <p className="font-medium text-gray-600">Jobs Applied</p>
              <span className="font-bold text-2xl text-gray-900">
                {jobsapplied}
              </span>
            </div>
            <div className="border border-gray-300 rounded-xl w-56 h-28 bg-white shadow-md flex flex-col justify-center items-center hover:shadow-lg transition-shadow duration-200">
              <p className="font-medium text-gray-600">Jobs Saved</p>
              <span className="font-bold text-2xl text-gray-900">
                {jobssaved}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeekerHome;

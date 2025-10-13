// src/pages/Seeker/SeekerHome.jsx
import React, { useState, useEffect } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import { MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

const SeekerHome = () => {
  const [jobssaved, setJobssaved] = useState(0);
  const [jobsapplied, setJobsapplied] = useState(0);

  // Fetch Saved Jobs Count
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/jobs/savedjobs`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok && data.jobs) {
          setJobssaved(data.jobs.length);
        }
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    fetchSavedJobs();
  }, []);

  // Fetch Applied Jobs Count
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/jobs/applied`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok && data.jobs) {
          setJobsapplied(data.jobs.length);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      {/* Sidebar */}
      <SidebarSeeker />

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="flex flex-col  mb-5  border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 pb-2">Dashboard</h1>
          <p className="text-sm text-gray-600 mb-5">
            Overview of your applications and saved jobs.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex space-x-6 w-full h-auto">
          {/* Jobs saved */}
          <div className="bg-gradient-to-br from-blue-600 to-violet-400 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between w-64">
            <div className="flex items-start justify-between">
              <h2 className="text-sm font-medium">Jobs Saved</h2>
              <Link to="/savedjobs">
                <div className="bg-white/20 p-2 rounded-full">
                  <MoveUpRight className="w-4 h-4 text-white cursor-pointer" />
                </div>
              </Link>
            </div>

            <p className="text-5xl font-bold mt-3">{jobssaved}</p>
          </div>

          {/* Jobs applied */}
          <div className="bg-white text-black p-6 rounded-2xl shadow-md flex flex-col justify-between w-64 border border-gray-200">
            <div className="flex items-start justify-between">
              <h2 className="text-sm font-medium">Jobs Applied</h2>
              <Link to="/appliedjobs">
                <div className="bg-black p-2 rounded-full">
                  <MoveUpRight className="w-4 h-4 text-white cursor-pointer" />
                </div>
              </Link>
            </div>

            <p className="text-5xl font-bold mt-3">{jobsapplied}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerHome;

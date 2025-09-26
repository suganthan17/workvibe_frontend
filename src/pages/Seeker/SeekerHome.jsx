// src/pages/Seeker/SeekerHome.jsx
import React, { useState, useEffect } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import { BookCheck, Bookmark } from "lucide-react";


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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarSeeker />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="border-b border-gray-300 px-6 py-4 bg-white rounded-md shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">
            Overview of your applications and saved jobs.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Jobs Applied */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Jobs Applied</p>
              <h2 className="text-3xl font-bold text-gray-900">{jobsapplied}</h2>
            </div>
            <div className="p-4 bg-blue-100 rounded-full">
              <BookCheck className="text-blue-600" size={28} />
            </div>
          </div>

          {/* Jobs Saved */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Jobs Saved</p>
              <h2 className="text-3xl font-bold text-gray-900">{jobssaved}</h2>
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <Bookmark className="text-green-600" size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerHome;

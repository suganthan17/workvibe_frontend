// src/pages/SavedJobs.jsx
import React, { useEffect, useState } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import { Bookmark } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/jobs/savedjobs`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch saved jobs");

        const data = await res.json();
        setSavedJobs(data.jobs || []);
        setCurrentUserId(data.currentUserId || "");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load saved jobs");
      }
    };

    fetchSavedJobs();
  }, []);

  const handleUnsaveJob = async (jobId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/jobs/savejobs/${jobId}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        toast.success("Job unsaved successfully!");
      } else {
        toast.error(data.message || "Failed to unsave job");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SidebarSeeker />
      <div className="flex-1 p-6">
        <Toaster position="top-right" />

        <div className="flex items-center justify-between border-b border-gray-300 px-6 py-3 mb-6 bg-white rounded-lg shadow">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Saved Jobs</h1>
            <p className="text-gray-600 text-sm">All the jobs you have saved.</p>
          </div>
        </div>

        {savedJobs.length === 0 ? (
          <p className="text-gray-500">No saved jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{job.jobTitle}</h2>
                    <p className="text-gray-700 font-medium">{job.companyName}</p>
                    <p className="text-gray-500 text-sm">{job.location}</p>
                  </div>
                  <Bookmark
                    size={24}
                    className={`cursor-pointer ${
                      job.savedBy?.includes(currentUserId)
                        ? "fill-black"
                        : "fill-white stroke-black"
                    }`}
                    onClick={() => handleUnsaveJob(job._id)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {job.experienceLevel && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {job.experienceLevel}
                    </span>
                  )}
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Hiring multiple candidates
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {job.employmentType || "Full-time"}
                  </span>
                </div>

                <div className="text-sm text-gray-700 mb-3">
                  <p>Salary: ₹{job.salaryMin} - ₹{job.salaryMax} / month</p>
                  
                </div>

                <a
                  href={job.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  View & Apply
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedJobs;

// src/pages/Seeker/SavedJobs.jsx
import React, { useEffect, useState } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import {
  Bookmark,
  MapPin,
  IndianRupee,
  Clock3,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const navigate = useNavigate();

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

  const handleViewDetails = (jobId) => {
    navigate(`/jobdetails/${jobId}`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <SidebarSeeker />
      <div className="flex-1 px-10 py-8">
        <div className="flex flex-col mb-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 pb-2">Saved Jobs</h1>
          <p className="text-sm text-gray-600 mb-5">
            Manage your saved jobs and explore opportunities that match your goals.
          </p>
        </div>

        {savedJobs.length === 0 ? (
          <p className="text-gray-500 text-center mt-20 text-lg">
            No saved jobs yet. Start exploring and save jobs you like!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden h-[400px] relative"
              >
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleUnsaveJob(job._id)}
                    aria-pressed={job.savedBy?.includes(currentUserId)}
                  >
                    <Bookmark
                      size={22}
                      className={`transition-all ${
                        job.savedBy?.includes(currentUserId)
                          ? "fill-gray-600 cursor-pointer stroke-white scale-150"
                          : "fill-white stroke-gray-400 hover:stroke-gray-600"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 leading-snug">
                      {job.jobTitle}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">{job.companyName}</p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {job.jobDescription}
                  </p>
                </div>

                <div className="px-6 pb-6 space-y-2 text-gray-700 text-sm border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <Clock3 className="text-indigo-500 w-4 h-4" />
                    <span>{job.employmentType || "Full-time"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-indigo-500 w-4 h-4" />
                    <span>{job.location || "Remote"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="text-indigo-500 w-4 h-4" />
                    <span>
                      ₹{job.salaryMin}–₹{job.salaryMax} / month
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(job._id)}
                  className="w-full py-2.5 bg-indigo-600 text-white font-semibold cursor-pointer rounded-b-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  View Job <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedJobs;

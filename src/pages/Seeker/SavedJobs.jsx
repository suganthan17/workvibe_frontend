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

  // Fetch Saved Jobs
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

  // Handle Unsave Job
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

  // View Job Details
  const handleViewDetails = (jobId) => {
    navigate(`/jobdetails/${jobId}`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      <SidebarSeeker />
      <div className="flex-1 p-10">
        <div className="flex flex-col mb-5 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 pb-2">Saved Jobs</h1>
          <p className="text-sm text-gray-600 mb-5">
            View and apply the jobs you’ve saved and are interested in.
          </p>
        </div>

        {/* Saved Jobs Section */}
        {savedJobs.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">
            No saved jobs yet. Start exploring and save jobs you like!
          </p>
        ) : (
          <div className=" space-y-5 min-w-full gap-6">
            {savedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-4xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Header Section */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mt-2">
                      {job.jobTitle}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      {job.companyName}
                    </p>
                  </div>

                  {/* Bookmark + Save/Saved label */}
                  <button
                    onClick={() => handleUnsaveJob(job._id)}
                    className="flex items-center gap-2 bg-transparent border-0 p-0"
                    aria-pressed={job.savedBy?.includes(currentUserId)}
                    type="button"
                  >
                    <Bookmark
                      size={22}
                      className={`cursor-pointer ${
                        job.savedBy?.includes(currentUserId)
                          ? "fill-red-400 stroke-gray-800"
                          : "fill-white stroke-while"
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold select-none ${
                        job.savedBy?.includes(currentUserId)
                          ? "text--600"
                          : "text-gray-600"
                      }`}
                    >
                      {job.savedBy?.includes(currentUserId) ? "Saved" : "Save"}
                    </span>
                  </button>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">{job.jobDescription}</p>
                </div>

                {/* Footer Row */}
                <div className="flex items-center justify-between mt-3">
                  {/* Job info icons */}
                  <div className="flex items-center gap-6 text-gray-700 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock3 className="text-gray-500 w-4 h-4" />
                      <span className="text-black font-semibold">
                        {job.employmentType || "Full-time"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="text-gray-500 w-4 h-4" />
                      <span className="text-black font-semibold">
                        {job.location || "Remote"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <IndianRupee className="text-gray-500 w-4 h-4" />
                      <span className="text-black font-semibold">
                        ₹{job.salaryMin}–₹{job.salaryMax} / month
                      </span>
                    </div>
                  </div>

                  {/* View Job Button */}
                  <button
                    onClick={() => handleViewDetails(job._id)}
                    className="flex items-center cursor-pointer gap-2 text-indigo-700 font-semibold hover:underline"
                  >
                    View Job <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedJobs;

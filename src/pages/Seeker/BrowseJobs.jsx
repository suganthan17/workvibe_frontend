// src/pages/seeker/BrowseJobs.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarSeeker from "../../components/SidebarSeeker";
import { Bookmark } from "lucide-react";
import toast from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/jobs/getalljobs`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setJobs(data.jobs || []);
        setCurrentUserId(data.currentUserId || "");
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch jobs");
      }
    };
    fetchJobs();
  }, []);

  const handleSaveJob = async (jobId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/jobs/savejobs/${jobId}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        const updatedSavedBy = data.savedBy;
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? { ...job, savedBy: updatedSavedBy } : job
          )
        );
        if (updatedSavedBy.includes(currentUserId)) {
          toast.success("Saved!", { duration: 2000 });
        } else {
          toast("Removed from saved!", { icon: "ℹ️", duration: 2000 });
        }
      } else {
        toast.error(data.message || "Could not update saved jobs");
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
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      <SidebarSeeker />
      <div className="flex-1 p-10">
        <div className="flex flex-col  mb-5  border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 pb-2">Find your job</h1>
          <p className="text-sm text-gray-600 mb-5">
            View and apply to the latest job postings.
          </p>
        </div>

        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Save Icon */}
                <span
                  onClick={() => handleSaveJob(job._id)}
                  className="absolute top-4 right-4 cursor-pointer"
                >
                  <Bookmark
                    size={22}
                    className={`${
                      job.savedBy?.includes(currentUserId)
                        ? "fill-indigo-600 stroke-indigo-600"
                        : "fill-white stroke-gray-400"
                    }`}
                  />
                </span>

                {/* Company Logo Placeholder */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <i className="fa-regular fa-user text-lg"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {job.companyName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "Recently posted"}
                    </p>
                  </div>
                </div>

                {/* Job Info */}
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {job.jobTitle}
                </h2>

                <div className="flex flex-wrap gap-2 mb-4 text-sm">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md font-medium">
                    {job.employmentType || "Full-time"}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md font-medium">
                    {job.experienceLevel || "Senior level"}
                  </span>
                </div>

                {/* Salary & Location */}
                <div className="flex items-center justify-between mt-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-800">
                      ₹{job.salaryMin} - ₹{job.salaryMax}
                      <span className="text-gray-500"> /month</span>
                    </p>
                    <p className="text-gray-500 text-xs">{job.location}</p>
                  </div>
                  <button
                    onClick={() => handleViewDetails(job._id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    View Details
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

export default BrowseJobs;

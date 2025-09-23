import React, { useEffect, useState } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import { Bookmark } from "lucide-react";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/getalljobs`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setJobs(data.jobs || []);
        setCurrentUserId(data.currentUserId || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  const handleSaveJob = async (jobId) => {
    try {
      const res = await fetch(`${BASE_URL}/savejobs/${jobId}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? { ...job, savedBy: data.savedBy } : job
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SidebarSeeker />
      <div className="flex-1 p-5">
        <div className="flex items-center justify-between border-b border-gray-300 px-8 py-3 shadow-sm bg-white mb-5 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Find The Job</h1>
            <p className="text-gray-600 text-sm">View all available jobs.</p>
          </div>
        </div>

        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs available yet.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="border border-gray-200 rounded-xl p-6 bg-white shadow hover:shadow-md mb-4 transition-shadow"
            >
              <div className="flex items-center mb-3">
                {job.experienceLevel && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                    {job.experienceLevel}
                  </span>
                )}
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Hiring multiple candidates
                </span>

                <span
                  onClick={() => handleSaveJob(job._id)}
                  className="ml-auto cursor-pointer"
                >
                  <Bookmark
                    size={24}
                    className={`${
                      job.savedBy?.includes(currentUserId)
                        ? "fill-indigo-600"
                        : "fill-white stroke-indigo-600"
                    }`}
                  />
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-800">{job.jobTitle}</h2>
              <p className="text-gray-700 font-medium">{job.companyName}</p>
              <p className="text-gray-500 text-sm mt-1">{job.location}</p>

              <div className="flex items-center space-x-2 mt-3 text-sm">
                <span className="bg-yellow-100 text-yellow-800 font-semibold px-2 py-1 rounded">
                  ₹{job.salaryMin} - ₹{job.salaryMax} / month
                </span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  {job.employmentType || "Full-time"}
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-3">{job.jobDescription}</p>

              <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                View in Detail
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseJobs;

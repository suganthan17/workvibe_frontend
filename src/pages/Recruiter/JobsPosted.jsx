import React, { useEffect, useState } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";
import { Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function JobsPosted() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/jobs/getjobs`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch jobs");
        setJobs(data.jobs);
        localStorage.setItem("jobsCount", data.jobs.length); // store count
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error(error.message || "Error fetching jobs");
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/jobs/deletejobs/${jobId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete job");

      toast.success(data.message || "Job deleted successfully");

      const updatedJobs = jobs.filter((job) => job._id !== jobId);
      setJobs(updatedJobs);
      localStorage.setItem("jobsCount", updatedJobs.length); 
      
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete job");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      
      <SidebarRecruiter />
      <div className="flex-1  p-10">
       <div className="flex flex-col mb-5 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 pb-2">Jobs Posted</h1>
          <p className="text-sm text-gray-600 mb-5">
            View all the jobs you have published.
          </p>
        </div>

        <div className="max-w-5xl ml-4 space-y-6">
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="border border-gray-200 rounded-xl p-6 bg-white shadow hover:shadow-md transition-shadow"
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
                    onClick={() => handleDelete(job._id)}
                    className="ml-auto cursor-pointer text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={22} />
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                  {job.jobTitle}
                </h2>
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
                <p className="text-gray-600 text-sm mt-3">
                  {job.jobDescription}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default JobsPosted;

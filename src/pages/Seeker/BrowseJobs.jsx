import React, { useEffect, useState } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";


const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com"; 

function BrowseJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/getalljobs`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || `HTTP error! status: ${res.status}`);
        }

        // Backend returns { jobs: [...] }
        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]); // fallback to empty array
      }
    };

    fetchAllJobs();
  }, []);

  const cardTitleClass = "text-lg font-bold text-black";
  const cardTextClass = "text-black text-sm mt-1";

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SidebarSeeker />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between border-b border-gray-300 px-8 py-3 shadow-sm bg-gray-50">
          <div>
            <h1 className="text-2xl font-bold text-black">Find The Job</h1>
            <p className="text-black text-sm">
              View all the available jobs.
            </p>
          </div>
        </div>

        <div className="max-w-5xl ml-4 p-5 space-y-6">
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs available yet.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="border border-gray-300 rounded-xl p-6 bg-gray-200 shadow-sm shadow-black"
              >
                {/* Tags */}
                <div className="flex space-x-2 mb-3">
                  {job.experienceLevel && (
                    <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                      {job.experienceLevel}
                    </span>
                  )}
                  <span className="bg-gray-300 text-black text-xs px-2 py-1 rounded-full">
                    Hiring multiple candidates
                  </span>
                </div>

                {/* Job title & company */}
                <h2 className={cardTitleClass}>{job.jobTitle}</h2>
                <p className="text-black font-medium">{job.companyName}</p>
                <p className={cardTextClass}>{job.location}</p>

                {/* Salary & type */}
                <div className="flex items-center space-x-2 mt-3 text-sm text-gray-700">
                  <span className="bg-gray-400 text-black font-semibold px-2 py-1 rounded">
                    ₹{job.salaryMin} - ₹{job.salaryMax} / month
                  </span>
                  <span className="bg-gray-800 text-white px-2 py-1 rounded">
                    {job.employmentType || "Full-time"}
                  </span>
                </div>

                {/* Job description */}
                <p className={cardTextClass + " mt-3"}>{job.jobDescription}</p>

                {/* Apply button */}
                <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                 View in Detail
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseJobs;

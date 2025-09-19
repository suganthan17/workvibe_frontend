import React, { useEffect, useState } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";

function JobsPosted() {
  const [jobcard, setJobcard] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/getjobs", {
          method: "GET",
          credentials: "include", // ✅ important
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setJobcard(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const cardTitleClass = "text-lg font-bold text-black";
  const cardTextClass = "text-black text-sm mt-1";

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SidebarRecruiter />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between border-b border-gray-300 px-8 py-4 shadow-sm bg-gray-50">
          <div>
            <h1 className="text-2xl font-bold text-black">Jobs Posted</h1>
            <p className="text-black text-sm">
              View all the jobs you have published.
            </p>
          </div>
        </div>

        {/* Job Cards */}
        <div className="max-w-5xl mx-auto p-5 space-y-6">
          {jobcard.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            jobcard.map((job) => (
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

                {/* Job Info */}
                <h2 className={cardTitleClass}>{job.jobTitle}</h2>
                <p className="text-black font-medium">{job.companyName}</p>
                <p className={cardTextClass}>{job.location}</p>

                {/* Salary & Employment Type */}
                <div className="flex items-center space-x-2 mt-3 text-sm text-gray-700">
                  <span className="bg-gray-400 text-black font-semibold px-2 py-1 rounded">
                    ₹{job.salaryMin} - ₹{job.salaryMax} / month
                  </span>
                  <span className="bg-gray-800 text-white px-2 py-1 rounded">
                    {job.employmentType || "Full-time"}
                  </span>
                </div>

                {/* Description */}
                <p className={cardTextClass + " mt-3"}>{job.jobDescription}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default JobsPosted;

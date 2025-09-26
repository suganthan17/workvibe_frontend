import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/jobs/getjob/${jobId}`);
        const data = await res.json();

        if (data.job) {
          setJob(data.job);
        } else {
          toast.error(data.message || "Failed to fetch job details");
        }
      } catch (err) {
        console.error("Fetch job error:", err);
        toast.error(`Server Error: ${err.message}`);
      }
    };

    fetchJob();
  }, [jobId]);

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
        >
          ← Back
        </button>
      </div>

      {/* Job Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">{job.jobTitle}</h1>
          <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
            {job.employmentType}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <strong>Company:</strong> {job.companyName}
          </span>
          <span className="flex items-center gap-1">
            <strong>Location:</strong> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <strong>Experience:</strong> {job.experienceLevel}
          </span>
          <span className="flex items-center gap-1">
            <strong>Salary:</strong> ₹{job.salaryMin} - ₹{job.salaryMax}
          </span>
          <span className="flex items-center gap-1">
            <strong>Category:</strong> {job.jobCategory}
          </span>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Job Description
          </h2>
          <p className="text-gray-600">{job.jobDescription}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Responsibilities
          </h2>
          <p className="text-gray-600">{job.responsibilities}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Requirements
          </h2>
          <p className="text-gray-600">{job.requirements}</p>
        </div>

        <div className="text-right text-gray-500">
          <span>
            Apply before:{" "}
            {new Date(job.applicationDeadline).toLocaleDateString()}
          </span>
        </div>

        {/* Apply Now Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => toast.success("Application Submitted!")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;

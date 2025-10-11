import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Briefcase, Building2, MapPin, Clock, Tag } from "lucide-react";

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
        if (data.job) setJob(data.job);
        else toast.error(data.message || "Failed to fetch job details");
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
    <div className="max-w-5xl mx-auto p-6">
      <Toaster position="top-right" />
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition font-medium"
        >
          ← Back to Jobs
        </button>
      </div>

      {/* Job Header */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job.jobTitle}
            </h1>
            <p className="text-gray-700 text-sm md:text-base">
              <Briefcase className="inline-block mr-1" size={16} />{" "}
              {job.experienceLevel} |{" "}
              <Building2 className="inline-block mr-1" size={16} />{" "}
              {job.companyName}
            </p>
          </div>
          <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
            {job.employmentType}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin size={16} /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Tag size={16} /> {job.jobCategory}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} /> Apply by:{" "}
            {new Date(job.applicationDeadline).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <strong>Salary:</strong> ₹{job.salaryMin} - ₹{job.salaryMax} / month
          </span>
        </div>
      </div>

      {/* Job Details + Sidebar */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Job Description
            </h2>
            <p className="text-gray-600">{job.jobDescription}</p>
          </section>
          <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Responsibilities
            </h2>
            <p className="text-gray-600">{job.responsibilities}</p>
          </section>
          <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Requirements
            </h2>
            <p className="text-gray-600">{job.requirements}</p>
          </section>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Quick Info */}
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-100 text-gray-800">
            <h3 className="text-lg font-bold mb-3">Quick Info</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Company:</strong> {job.companyName}
              </li>
              <li>
                <strong>Location:</strong> {job.location}
              </li>
              <li>
                <strong>Experience:</strong> {job.experienceLevel}
              </li>
              <li>
                <strong>Category:</strong> {job.jobCategory}
              </li>
              <li>
                <strong>Salary:</strong> ₹{job.salaryMin} - ₹{job.salaryMax}
              </li>
            </ul>
          </div>

          {/* Recruiter Info */}
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-100 text-gray-800">
            <h3 className="text-lg font-bold mb-3">Recruiter Info</h3>
            <p className="text-gray-700">
              <strong>Name:</strong> John Doe
            </p>
            <p className="text-gray-700">
              <strong>Role:</strong> HR Manager
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> john.doe@company.com
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> +91 9876543210
            </p>
          </div>

          <button
            onClick={() => toast.success("Application Submitted!")}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition shadow-lg"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;

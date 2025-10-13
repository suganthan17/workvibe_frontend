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
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg bg-gradient-to-b from-gray-50 to-white">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Toaster position="top-right" />

      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:shadow-sm rounded-lg text-sm text-gray-700 transition"
        >
          ← Back to Jobs
        </button>
      </div>

      {/* Job Header */}
      <div className="bg-gradient-to-r from-white via-indigo-50 to-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Left Side */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-white shadow-inner flex items-center justify-center text-indigo-600 text-2xl font-bold">
              {job.companyName?.charAt(0) || "C"}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                {job.jobTitle}
              </h1>
              <p className="mt-1 text-sm text-gray-600 flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1">
                  <Briefcase size={16} className="opacity-80" />{" "}
                  {job.experienceLevel}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Building2 size={16} className="opacity-80" />{" "}
                  {job.companyName}
                </span>
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start md:items-end">
            <div className="text-right">
              <div className="text-sm text-gray-500">Salary</div>
              <div className="font-semibold text-gray-900">
                ₹{job.salaryMin} - ₹{job.salaryMax}
                <span className="text-gray-400 text-sm"> / month</span>
              </div>
            </div>
            <span className="mt-2 inline-flex items-center text-sm font-semibold bg-gradient-to-br from-indigo-600 to-indigo-500 text-white px-3 py-1.5 rounded-full shadow">
              {job.employmentType}
            </span>
          </div>
        </div>

        {/* Job Info */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-2 bg-white/70 px-3 py-1 rounded-md border border-gray-100 shadow-sm">
            <MapPin size={14} /> {job.location}
          </span>
          <span className="flex items-center gap-2 bg-white/70 px-3 py-1 rounded-md border border-gray-100 shadow-sm">
            <Tag size={14} /> {job.jobCategory}
          </span>
          <span className="flex items-center gap-2 bg-white/70 px-3 py-1 rounded-md border border-gray-100 shadow-sm">
            <Clock size={14} /> Apply by:{" "}
            <strong className="ml-1 text-gray-800">
              {job.applicationDeadline
                ? new Date(job.applicationDeadline).toLocaleDateString()
                : "N/A"}
            </strong>
          </span>
        </div>
      </div>

      {/* Main Content (Flex layout) */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.jobDescription || "No description provided."}
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Responsibilities
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.responsibilities || "No responsibilities listed."}
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Requirements
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.requirements || "No requirements provided."}
            </p>
          </section>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-5 border border-indigo-100 shadow-sm">
            <h3 className="text-md font-bold text-gray-800 mb-3">Quick Info</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Company</span>
                <span className="font-medium">{job.companyName}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span className="font-medium">{job.location}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{job.experienceLevel}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{job.jobCategory}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Salary</span>
                <span className="font-medium">
                  ₹{job.salaryMin} - ₹{job.salaryMax}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-md font-bold text-gray-800 mb-3">Recruiter</h3>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold text-lg">
                HR
              </div>
              <div className="text-sm text-gray-700">
                <div className="font-medium">John Doe</div>
                <div className="mt-1 text-xs text-gray-500">HR Manager</div>
                <div className="mt-2 text-xs text-gray-600">
                  john.doe@company.com
                </div>
                <div className="text-xs text-gray-600">+91 9876543210</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => toast.success("Application Submitted!")}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-lg transition transform hover:-translate-y-0.5"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;

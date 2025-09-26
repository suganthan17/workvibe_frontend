import React, { useState } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    employmentType: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    jobCategory: "",
    jobDescription: "",
    responsibilities: "",
    requirements: "",
    applicationDeadline: "",
    applicationLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/jobs/postjob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to post job");

      toast.success("Job posted successfully ✅");

      // Reset form
      setFormData({
        jobTitle: "",
        companyName: "",
        location: "",
        employmentType: "",
        experienceLevel: "",
        salaryMin: "",
        salaryMax: "",
        jobCategory: "",
        jobDescription: "",
        responsibilities: "",
        requirements: "",
        applicationDeadline: "",
        applicationLink: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to post job");
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      <SidebarRecruiter />
      <div className="flex-1 p-5 bg-gray-100">
        {/* Header - same as SeekerProfile style */}
        <div className="flex items-center bg-gray-50 justify-between rounded-md border-gray-200 px-8 py-3 shadow-sm ">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Post a Job</h1>
            <p className="text-gray-600 text-sm">
              Publish a new job listing and connect with the right talent.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto p-8 space-y-10"
        >
          {/* Job Details */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-bold text-gray-800">Job Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g., WorkVibe Pvt Ltd"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Remote / New York, NY"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Employment Type</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select employment type</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Experience Level</label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select experience</option>
                  <option>Entry</option>
                  <option>Mid</option>
                  <option>Senior</option>
                  <option>Manager</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Job Category</label>
                <select
                  name="jobCategory"
                  value={formData.jobCategory}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select category</option>
                  <option>IT</option>
                  <option>Marketing</option>
                  <option>HR</option>
                  <option>Finance</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Salary Min</label>
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="e.g., 40000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Salary Max</label>
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="e.g., 80000"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-bold text-gray-800">Description</h2>
            <div>
              <label className={labelClass}>Job Description</label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the role, responsibilities, and required skills"
                className={inputClass}
                required
              ></textarea>
            </div>
            <div>
              <label className={labelClass}>Responsibilities</label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows="3"
                placeholder="List key responsibilities"
                className={inputClass}
                required
              ></textarea>
            </div>
            <div>
              <label className={labelClass}>Requirements / Skills Needed</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="3"
                placeholder="List required skills"
                className={inputClass}
                required
              ></textarea>
            </div>
          </div>

          {/* Application Info */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-bold text-gray-800">
              Application Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Application Deadline</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>How to Apply</label>
                <input
                  type="text"
                  name="applicationLink"
                  value={formData.applicationLink}
                  onChange={handleChange}
                  placeholder="e.g., careers@company.com or link"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              onClick={() =>
                setFormData({
                  jobTitle: "",
                  companyName: "",
                  location: "",
                  employmentType: "",
                  experienceLevel: "",
                  salaryMin: "",
                  salaryMax: "",
                  jobCategory: "",
                  jobDescription: "",
                  responsibilities: "",
                  requirements: "",
                  applicationDeadline: "",
                  applicationLink: "",
                })
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;

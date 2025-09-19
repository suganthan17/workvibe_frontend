// src/pages/PostJob.jsx
import React, { useState } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";

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
      const res = await fetch("http://localhost:5000/postjob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to post job");

      alert("Job posted successfully ✅");

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
      alert(err.message);
    }
  };

  // reduced input height
  const inputClass =
    "w-full border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SidebarRecruiter />
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-3 shadow-sm bg-white">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Post a Job</h1>
            <p className="text-gray-500 text-sm">
              Fill in the job details to publish a new job listing.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-w-5xl mx-auto p-8 ml-5 space-y-8">
            {/* Job Details */}
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800">Job Details</h2>
              <p className="text-sm text-gray-600">
                Provide essential information about the job, such as title,
                company, location, and type.
              </p>
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
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
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
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Manager">Manager</option>
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
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800">Description</h2>
              <p className="text-sm text-gray-600">
                Craft a compelling description that reflects the role and your
                company culture.
              </p>
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
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800">Application Info</h2>
              <p className="text-sm text-gray-600">
                Specify how candidates should apply and provide additional
                instructions.
              </p>
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
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
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
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
              >
                Post Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;

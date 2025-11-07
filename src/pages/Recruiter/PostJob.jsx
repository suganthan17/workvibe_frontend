// src/pages/recruiter/PostJob.jsx
import React, { useState, useEffect } from "react";
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
    companyWebsite: "",
    companyAbout: "",
    applicationDeadline: "",
    applicationLink: "",
  });

  const [activeSection, setActiveSection] = useState("jobDetails");
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchRecruiterProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/recruiter/profile/get`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch recruiter profile");
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          companyName: data.companyInfo?.name || "",
          location: data.companyInfo?.location || "",
          companyWebsite: data.companyInfo?.website || "",
          companyAbout: data.companyInfo?.about || "",
        }));
      } catch (err) {
        toast.error("Could not load company details", err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchRecruiterProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        companyWebsite: "",
        companyAbout: "",
        applicationDeadline: "",
        applicationLink: "",
      });
      setActiveSection("jobDetails");
    } catch (err) {
      toast.error(err.message || "Failed to post job");
    }
  };

  const goNext = () =>
    setActiveSection((s) =>
      s === "jobDetails"
        ? "description"
        : s === "description"
        ? "companyInfo"
        : s === "companyInfo"
        ? "application"
        : "application"
    );

  const goBack = () =>
    setActiveSection((s) =>
      s === "application"
        ? "companyInfo"
        : s === "companyInfo"
        ? "description"
        : s === "description"
        ? "jobDetails"
        : "jobDetails"
    );

  const clearForm = () =>
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
      companyWebsite: "",
      companyAbout: "",
      applicationDeadline: "",
      applicationLink: "",
    });

  const inputClass =
    "w-full h-12 px-4 text-sm bg-white rounded-xl border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition";
  const textareaClass =
    "w-full px-4 py-3 text-sm bg-white rounded-xl border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition resize-y";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  if (loadingProfile)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-700">
        Loading company details...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      <SidebarRecruiter />
      <div className="flex-1 p-10">
        <div className="flex flex-col mb-5 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">Post a Job</h1>
          <p className="text-sm text-gray-600 mt-1">
            Publish a new job listing and connect with the right talent.
          </p>
        </div>
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex gap-3 flex-wrap">
            {["jobDetails", "description", "companyInfo", "application"].map(
              (section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition ${
                    activeSection === section
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-indigo-50"
                  }`}
                >
                  {section === "jobDetails"
                    ? "Job Details"
                    : section === "description"
                    ? "Description"
                    : section === "companyInfo"
                    ? "Company Details"
                    : "Application Info"}
                </button>
              )
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
          {activeSection === "jobDetails" && (
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Job Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Software Engineer"
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
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Minimum Salary (₹)</label>
                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="40000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Maximum Salary (₹)</label>
                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="80000"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>
          )}
          {activeSection === "description" && (
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Description
              </h2>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Job Description</label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Describe the role and responsibilities"
                    className={textareaClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Responsibilities</label>
                  <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    rows="4"
                    placeholder="List key responsibilities"
                    className={textareaClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Requirements / Skills</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows="4"
                    placeholder="List required skills"
                    className={textareaClass}
                    required
                  />
                </div>
              </div>
            </section>
          )}
          {activeSection === "companyInfo" && (
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Company Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company name"
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
                    placeholder="City, Country"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Website</label>
                  <input
                    type="text"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://company.com"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>
          )}
          {activeSection === "application" && (
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
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
                    placeholder="careers@company.com or link"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </section>
          )}
          <div className="flex justify-between max-w-5xl mx-auto">
            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              {activeSection !== "jobDetails" && (
                <button
                  type="button"
                  onClick={goBack}
                  className="px-6 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                >
                  Back
                </button>
              )}
              {activeSection !== "application" ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow"
                >
                  Post Job
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;

// src/pages/RecruiterProfile.jsx
import React, { useState } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";
import { SquarePenIcon, CheckCheck, User } from "lucide-react";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com"; 

const RecruiterProfile = () => {
  const [profilePic, setProfilePic] = useState(null);

  // Company Info
  const [company, setCompany] = useState({
    name: "",
    industry: "",
    size: "",
    location: "",
  });
  const [editCompany, setEditCompany] = useState(false);

  // Contact Info
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editContact, setEditContact] = useState(false);

  // About Company
  const [about, setAbout] = useState("");
  const [editAbout, setEditAbout] = useState(false);

  // Posted Jobs
  const [jobs, setJobs] = useState("");
  const [editJobs, setEditJobs] = useState(false);

  const inputClass =
    "border border-gray-300 p-2 rounded-md w-full focus:ring-1 focus:ring-gray-500 focus:outline-none text-sm";

  const handlePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveSection = (setter) => {
    setter(false);
    alert("Section updated successfully!");
  };

  const buttonClass = (isEditing) =>
    isEditing
      ? "flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
      : "flex items-center gap-2 px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800 text-sm";

  return (
    <div className="flex bg-gray-200 min-h-screen">
      <SidebarRecruiter />
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-3 shadow-sm bg-white">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500 text-sm">
              Manage and update your recruiter profile details.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="col-span-1 space-y-6">
            {/* Profile Picture */}
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6 text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                Profile Picture
              </h2>
              <div className="relative w-28 h-28 mx-auto mb-4">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gray-500 flex items-center justify-center text-black text-2xl border-4 border-white shadow">
                    <User size={30} />
                  </div>
                )}
              </div>
              <label className="px-4 py-2 bg-gray-700 text-white text-sm rounded-lg cursor-pointer hover:bg-gray-800">
                Upload New
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePicChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Company Info */}
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">
                  Company Information
                </h2>
                <button
                  onClick={() =>
                    editCompany ? saveSection(setEditCompany) : setEditCompany(true)
                  }
                  className={buttonClass(editCompany)}
                >
                  {editCompany ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
                  {editCompany ? "Save" : "Edit"}
                </button>
              </div>
              {editCompany ? (
                <div className="space-y-2">
                  <input
                    placeholder="Company Name"
                    value={company.name}
                    onChange={(e) =>
                      setCompany({ ...company, name: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Industry"
                    value={company.industry}
                    onChange={(e) =>
                      setCompany({ ...company, industry: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Company Size"
                    value={company.size}
                    onChange={(e) =>
                      setCompany({ ...company, size: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Location"
                    value={company.location}
                    onChange={(e) =>
                      setCompany({ ...company, location: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              ) : (
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="font-semibold">Name:</span> {company.name}
                  </li>
                  <li>
                    <span className="font-semibold">Industry:</span> {company.industry}
                  </li>
                  <li>
                    <span className="font-semibold">Size:</span> {company.size}
                  </li>
                  <li>
                    <span className="font-semibold">Location:</span> {company.location}
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Contact Information</h2>
                <button
                  onClick={() =>
                    editContact ? saveSection(setEditContact) : setEditContact(true)
                  }
                  className={buttonClass(editContact)}
                >
                  {editContact ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
                  {editContact ? "Save" : "Edit"}
                </button>
              </div>
              {editContact ? (
                <div className="space-y-2">
                  <input
                    placeholder="Name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Phone"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ) : (
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="font-semibold">Name:</span> {contact.name}
                  </li>
                  <li>
                    <span className="font-semibold">Email:</span> {contact.email}
                  </li>
                  <li>
                    <span className="font-semibold">Phone:</span> {contact.phone}
                  </li>
                </ul>
              )}
            </div>

            {/* About Company */}
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">About Company</h2>
                <button
                  onClick={() =>
                    editAbout ? saveSection(setEditAbout) : setEditAbout(true)
                  }
                  className={buttonClass(editAbout)}
                >
                  {editAbout ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
                  {editAbout ? "Save" : "Edit"}
                </button>
              </div>
              {editAbout ? (
                <textarea
                  className={inputClass + " h-20"}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              ) : (
                <p className="text-sm">{about}</p>
              )}
            </div>

            {/* Posted Jobs */}
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Posted Jobs</h2>
                <button
                  onClick={() =>
                    editJobs ? saveSection(setEditJobs) : setEditJobs(true)
                  }
                  className={buttonClass(editJobs)}
                >
                  {editJobs ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
                  {editJobs ? "Save" : "Edit"}
                </button>
              </div>
              {editJobs ? (
                <textarea
                  className={inputClass + " h-20"}
                  value={jobs}
                  onChange={(e) => setJobs(e.target.value)}
                />
              ) : (
                <p className="text-sm">{jobs}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;

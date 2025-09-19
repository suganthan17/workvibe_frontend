// src/pages/RecruiterProfile.jsx
import React, { useState } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";
import { SquarePen } from "lucide-react";

const RecruiterProfile = () => {
  const [logo, setLogo] = useState(null);

  // Sections with separate states
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    location: "",
  });
  const [editCompanyInfo, setEditCompanyInfo] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    designation: "",
  });
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);

  // About & Mission are edited together using a single state (editAbout)
  const [about, setAbout] = useState("");
  const [mission, setMission] = useState("");
  const [editAbout, setEditAbout] = useState(false);

  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    twitter: "",
    other: "",
  });
  const [editSocial, setEditSocial] = useState(false);

  const [expertise, setExpertise] = useState("");
  const [editExpertise, setEditExpertise] = useState(false);

  const inputClass =
    "border border-gray-400 shadow-lg p-2 rounded w-full focus:ring-1 focus:ring-purple-400 focus:outline-none bg-white font-semibold text-sm";

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveSection = (setter) => {
    setter(false);
    alert("Section updated successfully!");
  };

  return (
    <div className="flex">
      <SidebarRecruiter />
      <div className="flex-1 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-1 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Recruiter Profile</h1>
            <p className="text-gray-500 text-sm">Manage your company profile and contact info.</p>
          </div>
        </div>

        <div className="relative px-8 mt-6">
          {/* Logo Card */}
          <div className="bg-gray-300 w-279 ml-8 p-6 rounded-lg shadow-black shadow-sm relative z-0 mt-16">
            <div className="absolute -top-12 left-8 z-10">
              <div className="relative w-24 h-24">
                {logo ? (
                  <img
                    src={logo}
                    alt="Company Logo"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center  text-gray-600 text-2xl border-4 border-white shadow-black shadow-sm ">
                    ?
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-gray-800 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-2 border-white">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <SquarePen size={14} color="white" />
                </label>
              </div>
            </div>
          </div>

          {/* Grid Sections */}
          <div className="p-8 grid grid-cols-2 gap-6 text-sm">
            {/* Company Info */}
            <div className="bg-gray-200 border border-gray-300 p-4 rounded-lg shadow-black shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">Company Info</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => (editCompanyInfo ? saveSection(setEditCompanyInfo) : setEditCompanyInfo(true))}
                    className="flex items-center gap-1 text-black px-2 py-1 cursor-pointer"
                  >
                    <SquarePen size={20} />
                    {editCompanyInfo ? "Save" : ""}
                  </button>
                  {editCompanyInfo && (
                    <button
                      onClick={() => setEditCompanyInfo(false)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {editCompanyInfo ? (
                <div className="space-y-2">
                  <input
                    placeholder="Company Name"
                    value={companyInfo.companyName}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Industry"
                    value={companyInfo.industry}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Company Size"
                    value={companyInfo.companySize}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, companySize: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Website"
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Location"
                    value={companyInfo.location}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ) : (
                <ul className="space-y-1">
                  <li>
                    <span className="font-medium">Company Name:</span> {companyInfo.companyName}
                  </li>
                  <li>
                    <span className="font-medium">Industry:</span> {companyInfo.industry}
                  </li>
                  <li>
                    <span className="font-medium">Size:</span> {companyInfo.companySize}
                  </li>
                  <li>
                    <span className="font-medium">Website:</span> {companyInfo.website}
                  </li>
                  <li>
                    <span className="font-medium">Location:</span> {companyInfo.location}
                  </li>
                </ul>
              )}
            </div>

            {/* Personal Info */}
            <div className="bg-gray-200 border border-gray-300 p-4 rounded-lg shadow-black shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">Personal Info</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => (editPersonalInfo ? saveSection(setEditPersonalInfo) : setEditPersonalInfo(true))}
                    className="flex items-center gap-1 text-black px-2 py-1 cursor-pointer"
                  >
                    <SquarePen size={20} />
                    {editPersonalInfo ? "Save" : ""}
                  </button>
                  {editPersonalInfo && (
                    <button
                      onClick={() => setEditPersonalInfo(false)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {editPersonalInfo ? (
                <div className="space-y-2">
                  <input
                    placeholder="Full Name"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Designation"
                    value={personalInfo.designation}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, designation: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ) : (
                <ul className="space-y-1">
                  <li>
                    <span className="font-medium">Full Name:</span> {personalInfo.fullName}
                  </li>
                  <li>
                    <span className="font-medium">Email:</span> {personalInfo.email}
                  </li>
                  <li>
                    <span className="font-medium">Phone:</span> {personalInfo.phone}
                  </li>
                  <li>
                    <span className="font-medium">Designation:</span> {personalInfo.designation}
                  </li>
                </ul>
              )}
            </div>

            {/* About & Mission (now controlled by single editAbout state) */}
            <div className="bg-gray-200 border border-gray-300 p-4 rounded-lg shadow-black shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">About & Mission</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => (editAbout ? saveSection(setEditAbout) : setEditAbout(true))}
                    className="flex items-center gap-1 text-black px-2 py-1 cursor-pointer"
                  >
                    <SquarePen size={20} />
                    {editAbout ? "Save" : ""}
                  </button>
                  {editAbout && (
                    <button
                      onClick={() => setEditAbout(false)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {editAbout ? (
                <>
                  <textarea
                    placeholder="About Company"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className={inputClass + " h-20 mb-2"}
                  />
                  <textarea
                    placeholder="Mission / Vision"
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    className={inputClass + " h-20"}
                  />
                </>
              ) : (
                <>
                  <p>
                    <span className="font-medium">About:</span> {about}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Mission:</span> {mission}
                  </p>
                </>
              )}
            </div>

            {/* Social Links */}
            <div className="bg-gray-200 border border-gray-300 p-4 rounded-lg shadow-black shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">Social Links</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => (editSocial ? saveSection(setEditSocial) : setEditSocial(true))}
                    className="flex items-center gap-1 text-black px-2 py-1 cursor-pointer"
                  >
                    <SquarePen size={20} />
                    {editSocial ? "Save" : ""}
                  </button>
                  {editSocial && (
                    <button
                      onClick={() => setEditSocial(false)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {editSocial ? (
                <div className="space-y-2">
                  <input
                    placeholder="LinkedIn URL"
                    value={socialLinks.linkedin}
                    onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Twitter URL"
                    value={socialLinks.twitter}
                    onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Other Platform"
                    value={socialLinks.other}
                    onChange={(e) => setSocialLinks({ ...socialLinks, other: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ) : (
                <ul className="space-y-1">
                  <li>
                    <span className="font-medium">LinkedIn:</span> {socialLinks.linkedin}
                  </li>
                  <li>
                    <span className="font-medium">Twitter:</span> {socialLinks.twitter}
                  </li>
                  <li>
                    <span className="font-medium">Other:</span> {socialLinks.other}
                  </li>
                </ul>
              )}
            </div>

            {/* Expertise */}
            <div className="bg-gray-200 border border-gray-300 p-4 rounded-lg shadow-black shadow-sm col-span-2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">Expertise</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => (editExpertise ? saveSection(setEditExpertise) : setEditExpertise(true))}
                    className="flex items-center gap-1 text-black px-2 py-1 cursor-pointer"
                  >
                    <SquarePen size={20} />
                    {editExpertise ? "Save" : ""}
                  </button>
                  {editExpertise && (
                    <button
                      onClick={() => setEditExpertise(false)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {editExpertise ? (
                <textarea
                  placeholder="Expertise / Skills"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  className={inputClass + " h-20"}
                />
              ) : (
                <p>{expertise}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;

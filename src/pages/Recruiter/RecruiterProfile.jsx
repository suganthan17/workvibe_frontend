// src/pages/RecruiterProfile.jsx
import React, { useState } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";
import { Edit2 } from "lucide-react";

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

  const [about, setAbout] = useState("");
  const [editAbout, setEditAbout] = useState(false);

  const [mission, setMission] = useState("");
  const [editMission, setEditMission] = useState(false);

  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    twitter: "",
    other: "",
  });
  const [editSocial, setEditSocial] = useState(false);

  const [expertise, setExpertise] = useState("");
  const [editExpertise, setEditExpertise] = useState(false);

  const inputClass =
    "border border-gray-400 p-2 rounded w-full focus:ring-1 focus:ring-purple-400 focus:outline-none bg-white text-sm";

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex">
      <SidebarRecruiter />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between border-b px-8 py-3 shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold text-purple-800">
              Recruiter Profile
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your company profile and contact info.
            </p>
          </div>
        </div>

        <div className="relative px-8 mt-6">
          {/* Logo */}
          <div className="bg-purple-100 p-6 rounded-lg shadow relative z-0 mt-16">
            <div className="absolute -top-12 left-8 z-10">
              <div className="relative w-24 h-24">
                {logo ? (
                  <img
                    src={logo}
                    alt="Company Logo"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl border-4 border-white shadow">
                    ?
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-purple-600 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-2 border-white">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <Edit2 size={14} color="white" />
                </label>
              </div>
            </div>
          </div>

          {/* Grid Sections */}
          <div className="p-8 grid grid-cols-2 gap-6 text-sm">
            {/* Company Info */}
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Company Info</h2>
                <button
                  onClick={() => setEditCompanyInfo(!editCompanyInfo)}
                  className="bg-purple-600 text-white px-2 py-1 text-xs rounded"
                >
                  {editCompanyInfo ? "Cancel" : "Edit"}
                </button>
              </div>
              {editCompanyInfo ? (
                <div className="space-y-2">
                  <input
                    placeholder="Company Name"
                    value={companyInfo.companyName}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, companyName: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Industry"
                    value={companyInfo.industry}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, industry: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Company Size"
                    value={companyInfo.companySize}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, companySize: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Website"
                    value={companyInfo.website}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, website: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Location"
                    value={companyInfo.location}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, location: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              ) : (
                <ul className="space-y-1">
                  <li><span className="font-medium">Company Name:</span> {companyInfo.companyName}</li>
                  <li><span className="font-medium">Industry:</span> {companyInfo.industry}</li>
                  <li><span className="font-medium">Size:</span> {companyInfo.companySize}</li>
                  <li><span className="font-medium">Website:</span> {companyInfo.website}</li>
                  <li><span className="font-medium">Location:</span> {companyInfo.location}</li>
                </ul>
              )}
            </div>

            {/* Personal Info */}
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Personal Info</h2>
                <button
                  onClick={() => setEditPersonalInfo(!editPersonalInfo)}
                  className="bg-purple-600 text-white px-2 py-1 text-xs rounded"
                >
                  {editPersonalInfo ? "Cancel" : "Edit"}
                </button>
              </div>
              {editPersonalInfo ? (
                <div className="space-y-2">
                  <input
                    placeholder="Full Name"
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, email: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Phone"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, phone: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Designation"
                    value={personalInfo.designation}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, designation: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              ) : (
                <ul className="space-y-1">
                  <li><span className="font-medium">Full Name:</span> {personalInfo.fullName}</li>
                  <li><span className="font-medium">Email:</span> {personalInfo.email}</li>
                  <li><span className="font-medium">Phone:</span> {personalInfo.phone}</li>
                  <li><span className="font-medium">Designation:</span> {personalInfo.designation}</li>
                </ul>
              )}
            </div>

            {/* About & Mission */}
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">About & Mission</h2>
                <button
                  onClick={() => { setEditAbout(!editAbout); setEditMission(!editMission); }}
                  className="bg-purple-600 text-white px-2 py-1 text-xs rounded"
                >
                  {editAbout ? "Cancel" : "Edit"}
                </button>
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
                  <p><span className="font-medium">About:</span> {about}</p>
                  <p className="mt-2"><span className="font-medium">Mission:</span> {mission}</p>
                </>
              )}
            </div>

            {/* Social Links */}
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Social Links</h2>
                <button
                  onClick={() => setEditSocial(!editSocial)}
                  className="bg-purple-600 text-white px-2 py-1 text-xs rounded"
                >
                  {editSocial ? "Cancel" : "Edit"}
                </button>
              </div>
              {editSocial ? (
                <div className="space-y-2">
                  <input
                    placeholder="LinkedIn URL"
                    value={socialLinks.linkedin}
                    onChange={(e) =>
                      setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Twitter URL"
                    value={socialLinks.twitter}
                    onChange={(e) =>
                      setSocialLinks({ ...socialLinks, twitter: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Other Platform"
                    value={socialLinks.other}
                    onChange={(e) =>
                      setSocialLinks({ ...socialLinks, other: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              ) : (
                <ul className="space-y-1">
                  <li><span className="font-medium">LinkedIn:</span> {socialLinks.linkedin}</li>
                  <li><span className="font-medium">Twitter:</span> {socialLinks.twitter}</li>
                  <li><span className="font-medium">Other:</span> {socialLinks.other}</li>
                </ul>
              )}
            </div>

            {/* Expertise */}
            <div className="bg-purple-100 p-4 rounded-lg shadow col-span-2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Expertise</h2>
                <button
                  onClick={() => setEditExpertise(!editExpertise)}
                  className="bg-purple-600 text-white px-2 py-1 text-xs rounded"
                >
                  {editExpertise ? "Cancel" : "Edit"}
                </button>
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

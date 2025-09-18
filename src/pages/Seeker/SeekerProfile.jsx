// src/pages/SeekerProfile.jsx
import React, { useState } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import { Edit2 } from "lucide-react";

const SeekerProfile = () => {
  const [profilePic, setProfilePic] = useState(null);

  // Personal Info
  const [info, setInfo] = useState({ name: "", email: "", phone: "", location: "" });
  const [editInfo, setEditInfo] = useState(false);

  // Education
  const [education, setEducation] = useState({ degree: "", institution: "", cgpa: "" });
  const [editEducation, setEditEducation] = useState(false);

  // Skills
  const [skills, setSkills] = useState("");
  const [editSkills, setEditSkills] = useState(false);

  // Experience
  const [experience, setExperience] = useState("");
  const [editExperience, setEditExperience] = useState(false);

  // Projects
  const [projects, setProjects] = useState("");
  const [editProjects, setEditProjects] = useState(false);

  // Achievements
  const [achievements, setAchievements] = useState("");
  const [editAchievements, setEditAchievements] = useState(false);

  const inputClass =
    "border border-gray-400 shadow-lg p-2 rounded w-full focus:ring-1 focus:ring-purple-400 focus:outline-none bg-white font-semibold text-sm";

  const handlePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveSection = (setter) => {
    setter(false);
    alert("Section updated successfully!");
  };

  return (
    <div className="flex">
      <SidebarSeeker />
      <div className="flex-1 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-3 shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold text-purple-800">Welcome</h1>
            <p className="text-gray-500 text-sm">Let’s find your next opportunity.</p>
          </div>
        </div>

        <div className="relative px-8 mt-6">
          {/* Profile Card */}
          <div className="bg-purple-100 p-6 rounded-lg shadow relative z-0 mt-16">
            {/* Profile Picture */}
            <div className="absolute -top-12 left-8 z-10">
              <div className="relative w-24 h-24">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl border-4 border-white shadow">
                    ?
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-purple-600 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-2 border-white">
                  <input type="file" accept="image/*" onChange={handlePicChange} className="hidden" />
                  <Edit2 size={14} color="white" />
                </label>
              </div>
            </div>

            {/* Personal Info */}
            <div className="flex justify-between items-center mb-2 mt-16">
              <h2 className="font-semibold text-lg">Personal Info</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => editInfo ? saveSection(setEditInfo) : setEditInfo(true)}
                  className="flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                >
                  <Edit2 size={14} />
                  {editInfo ? "Save" : "Edit"}
                </button>
                {editInfo && (
                  <button
                    onClick={() => setEditInfo(false)}
                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {editInfo ? (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <input
                  placeholder="Name"
                  value={info.name}
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                  className={inputClass}
                />
                <input
                  placeholder="Email"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  className={inputClass}
                />
                <input
                  placeholder="Phone"
                  value={info.phone}
                  onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                  className={inputClass}
                />
                <input
                  placeholder="Location"
                  value={info.location}
                  onChange={(e) => setInfo({ ...info, location: e.target.value })}
                  className={inputClass}
                />
              </div>
            ) : (
              <ul className="space-y-1 mt-2 text-sm">
                <li><span className="font-medium">Name:</span> {info.name}</li>
                <li><span className="font-medium">Email:</span> {info.email}</li>
                <li><span className="font-medium">Phone:</span> {info.phone}</li>
                <li><span className="font-medium">Location:</span> {info.location}</li>
              </ul>
            )}
          </div>

          {/* Other Sections Grid */}
          <div className="p-8 grid grid-cols-2 gap-6 text-sm">
            {/* Education */}
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Education</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => editEducation ? saveSection(setEditEducation) : setEditEducation(true)}
                    className="flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                  >
                    <Edit2 size={14} />
                    {editEducation ? "Save" : "Edit"}
                  </button>
                  {editEducation && (
                    <button
                      onClick={() => setEditEducation(false)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {editEducation ? (
                <div className="space-y-2">
                  <input
                    placeholder="Degree"
                    value={education.degree}
                    onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Institution"
                    value={education.institution}
                    onChange={(e) => setEducation({ ...education, institution: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="CGPA"
                    value={education.cgpa}
                    onChange={(e) => setEducation({ ...education, cgpa: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ) : (
                <ul className="space-y-1">
                  <li><span className="font-medium">Degree:</span> {education.degree}</li>
                  <li><span className="font-medium">Institution:</span> {education.institution}</li>
                  <li><span className="font-medium">CGPA:</span> {education.cgpa}</li>
                </ul>
              )}
            </div>

            {/* Skills */}
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Skills</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => editSkills ? saveSection(setEditSkills) : setEditSkills(true)}
                    className="flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                  >
                    <Edit2 size={14} />
                    {editSkills ? "Save" : "Edit"}
                  </button>
                  {editSkills && (
                    <button
                      onClick={() => setEditSkills(false)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {editSkills ? (
                <textarea
                  className={inputClass + " h-20"}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              ) : (
                <p>{skills}</p>
              )}
            </div>

            {/* Experience */}
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Experience</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => editExperience ? saveSection(setEditExperience) : setEditExperience(true)}
                    className="flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                  >
                    <Edit2 size={14} />
                    {editExperience ? "Save" : "Edit"}
                  </button>
                  {editExperience && (
                    <button
                      onClick={() => setEditExperience(false)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {editExperience ? (
                <textarea
                  className={inputClass + " h-20"}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              ) : (
                <p>{experience}</p>
              )}
            </div>

            {/* Projects */}
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Projects</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => editProjects ? saveSection(setEditProjects) : setEditProjects(true)}
                    className="flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                  >
                    <Edit2 size={14} />
                    {editProjects ? "Save" : "Edit"}
                  </button>
                  {editProjects && (
                    <button
                      onClick={() => setEditProjects(false)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {editProjects ? (
                <textarea
                  className={inputClass + " h-20"}
                  value={projects}
                  onChange={(e) => setProjects(e.target.value)}
                />
              ) : (
                <p>{projects}</p>
              )}
            </div>

            {/* Achievements */}
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Achievements</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => editAchievements ? saveSection(setEditAchievements) : setEditAchievements(true)}
                    className="flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                  >
                    <Edit2 size={14} />
                    {editAchievements ? "Save" : "Edit"}
                  </button>
                  {editAchievements && (
                    <button
                      onClick={() => setEditAchievements(false)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {editAchievements ? (
                <textarea
                  className={inputClass + " h-20"}
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                />
              ) : (
                <p>{achievements}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;

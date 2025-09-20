import React, { useState, useEffect } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import { SquarePenIcon, CheckCheck, User } from "lucide-react";

const SeekerProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [info, setInfo] = useState({ name: "", email: "", phone: "", location: "" });
  const [editInfo, setEditInfo] = useState(false);
  const [education, setEducation] = useState({ degree: "", institution: "", cgpa: "" });
  const [editEducation, setEditEducation] = useState(false);
  const [skills, setSkills] = useState("");
  const [editSkills, setEditSkills] = useState(false);
  const [experience, setExperience] = useState("");
  const [editExperience, setEditExperience] = useState(false);
  const [projects, setProjects] = useState("");
  const [editProjects, setEditProjects] = useState(false);
  const [achievements, setAchievements] = useState("");
  const [editAchievements, setEditAchievements] = useState(false);

  const inputClass = "border border-gray-300 p-2 rounded-md w-full focus:ring-1 focus:ring-gray-500 focus:outline-none text-sm";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/seeker/profile", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setInfo(data.info || { name: "", email: "", phone: "", location: "" });
          setEducation(data.education || { degree: "", institution: "", cgpa: "" });
          setSkills(data.skills || "");
          setExperience(data.experience || "");
          setProjects(data.projects || "");
          setAchievements(data.achievements || "");
          setProfilePic(data.profilePic || null);
        }
      } catch (err) {
        setInfo({ name: "", email: "", phone: "", location: "" });
        setEducation({ degree: "", institution: "", cgpa: "" });
        setSkills("");
        setExperience("");
        setProjects("");
        setAchievements("");
        setProfilePic(null);
        console.log(err)
      }
    };
    fetchProfile();
  }, []);

  const handlePicChange = (e) => {
    if (e.target.files && e.target.files[0]) setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const saveSection = async (setter) => {
    setter(false);
    try {
      const body = { info, education, skills, experience, projects, achievements, profilePic };
      const res = await fetch("http://localhost:5000/api/seeker/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (res.ok) alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const buttonClass = (isEditing) =>
    isEditing
      ? "flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
      : "flex items-center gap-2 px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800 text-sm";

  return (
    <div className="flex bg-gray-200 min-h-screen">
      <SidebarSeeker />
      <div className="flex-1 bg-gray-100">
        <div className="flex items-center justify-between border-b px-8 py-3 shadow-sm bg-white">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500 text-sm">Manage and update your personal details.</p>
          </div>
        </div>
        <div className="p-6 grid grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6 text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Profile Picture</h2>
              <div className="relative w-28 h-28 mx-auto mb-4">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow" />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gray-500 flex items-center justify-center text-black text-2xl border-4 border-white shadow">
                    <User size={30} />
                  </div>
                )}
              </div>
              <label className="px-4 py-2 bg-gray-700 text-white text-sm rounded-lg cursor-pointer hover:bg-gray-800">
                Upload New
                <input type="file" accept="image/*" onChange={handlePicChange} className="hidden" />
              </label>
            </div>
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
                <button onClick={() => (editInfo ? saveSection(setEditInfo) : setEditInfo(true))} className={buttonClass(editInfo)}>
                  {editInfo ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
                  {editInfo ? "Save" : "Edit"}
                </button>
              </div>
              {editInfo ? (
                <div className="space-y-2">
                  <input placeholder="Name" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} className={inputClass} />
                  <input placeholder="Email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className={inputClass} />
                  <input placeholder="Phone" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} className={inputClass} />
                  <input placeholder="Location" value={info.location} onChange={(e) => setInfo({ ...info, location: e.target.value })} className={inputClass} />
                </div>
              ) : (
                <ul className="space-y-2 text-sm">
                  <li><span className="font-semibold">Name:</span> {info.name}</li>
                  <li><span className="font-semibold">Email:</span> {info.email}</li>
                  <li><span className="font-semibold">Phone:</span> {info.phone}</li>
                  <li><span className="font-semibold">Location:</span> {info.location}</li>
                </ul>
              )}
            </div>
          </div>
          <div className="col-span-2 space-y-6">
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Education</h2>
                <button onClick={() => (editEducation ? saveSection(setEditEducation) : setEditEducation(true))} className={buttonClass(editEducation)}>
                  {editEducation ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
                  {editEducation ? "Save" : "Edit"}
                </button>
              </div>
              {editEducation ? (
                <div className="space-y-2">
                  <input placeholder="Degree" value={education.degree} onChange={(e) => setEducation({ ...education, degree: e.target.value })} className={inputClass} />
                  <input placeholder="Institution" value={education.institution} onChange={(e) => setEducation({ ...education, institution: e.target.value })} className={inputClass} />
                  <input placeholder="CGPA" value={education.cgpa} onChange={(e) => setEducation({ ...education, cgpa: e.target.value })} className={inputClass} />
                </div>
              ) : (
                <ul className="space-y-1 text-sm">
                  <li><span className="font-semibold">Degree:</span> {education.degree}</li>
                  <li><span className="font-semibold">Institution:</span> {education.institution}</li>
                  <li><span className="font-semibold">CGPA:</span> {education.cgpa}</li>
                </ul>
              )}
            </div>
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Skills</h2>
                <button onClick={() => (editSkills ? saveSection(setEditSkills) : setEditSkills(true))} className={buttonClass(editSkills)}>
                  {editSkills ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
                  {editSkills ? "Save" : "Edit"}
                </button>
              </div>
              {editSkills ? (
                <textarea className={inputClass + " h-20"} value={skills} onChange={(e) => setSkills(e.target.value)} />
              ) : (
                <p className="text-sm">{skills}</p>
              )}
            </div>
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Experience</h2>
                <button onClick={() => (editExperience ? saveSection(setEditExperience) : setEditExperience(true))} className={buttonClass(editExperience)}>
                  {editExperience ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
                  {editExperience ? "Save" : "Edit"}
                </button>
              </div>
              {editExperience ? (
                <textarea className={inputClass + " h-20"} value={experience} onChange={(e) => setExperience(e.target.value)} />
              ) : (
                <p className="text-sm">{experience}</p>
              )}
            </div>
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Projects</h2>
                <button onClick={() => (editProjects ? saveSection(setEditProjects) : setEditProjects(true))} className={buttonClass(editProjects)}>
                  {editProjects ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
                  {editProjects ? "Save" : "Edit"}
                </button>
              </div>
              {editProjects ? (
                <textarea className={inputClass + " h-20"} value={projects} onChange={(e) => setProjects(e.target.value)} />
              ) : (
                <p className="text-sm">{projects}</p>
              )}
            </div>
            <div className="bg-gray-200 border border-gray-300 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Achievements</h2>
                <button onClick={() => (editAchievements ? saveSection(setEditAchievements) : setEditAchievements(true))} className={buttonClass(editAchievements)}>
                  {editAchievements ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
                  {editAchievements ? "Save" : "Edit"}
                </button>
              </div>
              {editAchievements ? (
                <textarea className={inputClass + " h-20"} value={achievements} onChange={(e) => setAchievements(e.target.value)} />
              ) : (
                <p className="text-sm">{achievements}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;

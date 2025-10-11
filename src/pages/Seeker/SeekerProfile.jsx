import React, { useState, useEffect } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import { SquarePenIcon, CheckCheck, User, FileText } from "lucide-react";
import toast from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

const SeekerProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [workvibeResume, setWorkvibeResume] = useState(null);
  const [existingResume, setExistingResume] = useState("");

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    other_links: "",
  });
  const [bio, setBio] = useState("");
  const [education, setEducation] = useState({
    degree: "",
    institution: "",
    yearofgraduation: "",
    cgpa: "",
  });
  const [technicalskills, setTechnicalSkills] = useState("");
  const [softskills, setSoftSkills] = useState("");
  const [experience, setExperience] = useState({
    companyname: "",
    timeperiod: "",
    position: "",
  });
  const [projects, setProjects] = useState("");
  const [achievements, setAchievements] = useState("");
  const [additionaldetails, setAdditionalDetails] = useState({
    languagesknown: "",
    interests: "",
  });

  const [editFlags, setEditFlags] = useState({
    info: false,
    bio: false,
    education: false,
    technicalskills: false,
    softskills: false,
    experience: false,
    projects: false,
    achievements: false,
    additionaldetails: false,
  });

  const commonInputClass =
    "border border-gray-300 p-2 rounded-md w-full focus:ring-1 focus:ring-indigo-400 focus:outline-none text-sm bg-white";
  const commonButtonClass =
    "flex items-center gap-2 px-3 py-1 rounded-md text-white text-sm";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/seeker/profile`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setInfo(data.info || info);
          setBio(data.bio || "");
          setEducation(data.education || education);
          setTechnicalSkills(data.technicalskills || "");
          setSoftSkills(data.softskills || "");
          setExperience(data.experience || experience);
          setProjects(data.projects || "");
          setAchievements(data.achievements || "");
          setAdditionalDetails(data.additionaldetails || additionaldetails);
          setProfilePic(data.profilePic || null);
          setExistingResume(data.resume || "");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  const toggleEdit = (section) => {
    setEditFlags({ ...editFlags, [section]: !editFlags[section] });
  };

  const saveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("info", JSON.stringify(info));
      formData.append("bio", bio);
      formData.append("education", JSON.stringify(education));
      formData.append("technicalskills", technicalskills);
      formData.append("softskills", softskills);
      formData.append("experience", JSON.stringify(experience));
      formData.append("projects", projects);
      formData.append("achievements", achievements);
      formData.append("additionaldetails", JSON.stringify(additionaldetails));
      if (profilePic instanceof File) formData.append("profilePic", profilePic);

      const res = await fetch(`${BASE_URL}/api/seeker/profile`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        toast.success("Profile updated successfully!");
        setProfilePic(data.profilePic || profilePic);
        setEditFlags(
          Object.fromEntries(Object.keys(editFlags).map((k) => [k, false]))
        );
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  const uploadWorkVibeResume = async () => {
    if (!workvibeResume) return toast.error("Please select a resume first");

    try {
      const formData = new FormData();
      formData.append("workvibeResume", workvibeResume);

      const res = await fetch(`${BASE_URL}/api/seeker/profile/workvibe`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        toast.success("Resume uploaded successfully!");
        setExistingResume(workvibeResume.name);
        setWorkvibeResume(null);
      } else {
        toast.error("Failed to upload resume");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading resume");
    }
  };

  const useWorkVibeResume = () => {
    if (!existingResume) return toast.error("No WorkVibe resume uploaded yet");
    toast.success("Using WorkVibe Resume!");
  };

  const renderInput = (section) => {
    if (editFlags[section.key]) {
      if (section.textarea) {
        return (
          <textarea
            className={commonInputClass + " h-20"}
            value={section.data}
            onChange={(e) => section.setter(e.target.value)}
          />
        );
      } else if (typeof section.data === "object") {
        return Object.keys(section.data).map((key) => (
          <input
            key={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={section.data[key]}
            onChange={(e) =>
              section.setter({ ...section.data, [key]: e.target.value })
            }
            className={commonInputClass}
          />
        ));
      } else {
        return (
          <input
            value={section.data}
            onChange={(e) => section.setter(e.target.value)}
            className={commonInputClass}
          />
        );
      }
    } else {
      if (typeof section.data === "object") {
        return (
          <ul className="space-y-1 text-sm text-gray-700">
            {Object.keys(section.data).map((key) => (
              <li key={key}>
                <span className="font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </span>{" "}
                {section.data[key]}
              </li>
            ))}
          </ul>
        );
      } else {
        return <p className="text-sm text-gray-700">{section.data}</p>;
      }
    }
  };

  const buttonClass = (isEditing) =>
    isEditing
      ? commonButtonClass + " bg-green-600 hover:bg-green-700"
      : commonButtonClass + " bg-indigo-600 hover:bg-indigo-700";

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SidebarSeeker />
      <div className="flex-1 p-5 bg-gray-100">
        <div className="flex items-center justify-between border-b border-gray-300 px-8 py-3 shadow-sm bg-gray-50 mb-5 rounded-md">
          <div>
            <h1 className="text-2xl font-bold text-black">My Profile</h1>
            <p className="text-black text-sm">
              Manage and update your personal details.
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Profile</h2>
              <div className="relative w-28 h-28 mx-auto mb-4">
                {profilePic ? (
                  typeof profilePic === "string" ? (
                    <img
                      src={`${BASE_URL}/${profilePic}`}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
                    />
                  )
                ) : (
                  <div className="w-28 h-28 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 text-2xl border-4 border-white shadow">
                    <User size={30} />
                  </div>
                )}
              </div>
              <label className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg cursor-pointer hover:bg-indigo-700 mb-3 block">
                Choose Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <button
                onClick={saveProfile}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center justify-center gap-2 mx-auto"
              >
                <CheckCheck size={16} /> Save Profile
              </button>
            </div>

            <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <FileText size={20} /> WorkVibe Resume
              </h2>
              {existingResume ? (
                <p className="text-sm text-gray-700 mb-2">
                  Uploaded Resume: {existingResume}
                </p>
              ) : (
                <p className="text-sm text-gray-500 mb-2">
                  No resume uploaded yet
                </p>
              )}
              <label className="px-4 py-2 mt-2 bg-indigo-600 text-white text-sm rounded-lg cursor-pointer hover:bg-indigo-700 block">
                Choose Resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setWorkvibeResume(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <div className="flex justify-center gap-3 mt-3">
                <button
                  onClick={uploadWorkVibeResume}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <CheckCheck size={16} /> Upload
                </button>
                <button
                  onClick={useWorkVibeResume}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                  Use WorkVibe Resume
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-2 space-y-6">
            {[
              {
                title: "Personal Info",
                data: info,
                key: "info",
                setter: setInfo,
              },
              {
                title: "Bio",
                data: bio,
                key: "bio",
                setter: setBio,
                textarea: true,
              },
              {
                title: "Education",
                data: education,
                key: "education",
                setter: setEducation,
              },
              {
                title: "Technical Skills",
                data: technicalskills,
                key: "technicalskills",
                setter: setTechnicalSkills,
                textarea: true,
              },
              {
                title: "Soft Skills",
                data: softskills,
                key: "softskills",
                setter: setSoftSkills,
                textarea: true,
              },
              {
                title: "Experience",
                data: experience,
                key: "experience",
                setter: setExperience,
              },
              {
                title: "Projects",
                data: projects,
                key: "projects",
                setter: setProjects,
                textarea: true,
              },
              {
                title: "Achievements",
                data: achievements,
                key: "achievements",
                setter: setAchievements,
                textarea: true,
              },
              {
                title: "Additional Details",
                data: additionaldetails,
                key: "additionaldetails",
                setter: setAdditionalDetails,
              },
            ].map((section, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 shadow-md rounded-xl p-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-gray-800">
                    {section.title}
                  </h2>
                  <button
                    onClick={() =>
                      editFlags[section.key]
                        ? saveProfile()
                        : toggleEdit(section.key)
                    }
                    className={buttonClass(editFlags[section.key])}
                  >
                    {editFlags[section.key] ? (
                      <CheckCheck size={16} />
                    ) : (
                      <SquarePenIcon size={16} />
                    )}
                    {editFlags[section.key] ? "Save" : "Edit"}
                  </button>
                </div>
                {renderInput(section)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;

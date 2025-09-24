import React, { useState, useEffect } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import { SquarePenIcon, CheckCheck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

const SeekerProfile = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [info, setInfo] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
  });
  const [editInfo, setEditInfo] = useState(false);
  const [education, setEducation] = useState({
    degree: "",
    institution: "",
    cgpa: "",
  });
  const [editEducation, setEditEducation] = useState(false);
  const [skills, setSkills] = useState("");
  const [editSkills, setEditSkills] = useState(false);
  const [experience, setExperience] = useState("");
  const [editExperience, setEditExperience] = useState(false);
  const [projects, setProjects] = useState("");
  const [editProjects, setEditProjects] = useState(false);
  const [achievements, setAchievements] = useState("");
  const [editAchievements, setEditAchievements] = useState(false);

  const inputClass =
    "border border-gray-300 p-2 rounded-md w-full focus:ring-1 focus:ring-indigo-400 focus:outline-none text-sm bg-white";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/seeker/profile`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setInfo(
            data.info || { username: "", email: "", phone: "", location: "" }
          );
          setEducation(
            data.education || { degree: "", institution: "", cgpa: "" }
          );
          setSkills(data.skills || "");
          setExperience(data.experience || "");
          setProjects(data.projects || "");
          setAchievements(data.achievements || "");
          setProfilePic(data.profilePic || null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  const handlePicChange = (e) => {
    if (e.target.files && e.target.files[0])
      setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const saveSection = async (setter) => {
    setter(false);
    try {
      const body = {
        info,
        education,
        skills,
        experience,
        projects,
        achievements,
        profilePic,
      };
      const res = await fetch(`${BASE_URL}/api/seeker/profile`, {
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
      : "flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm";

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
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() =>
              navigate("/createresume", {
                state: {
                  profile: {
                    info,
                    education,
                    skills,
                    experience,
                    projects,
                    achievements,
                    summary: "",
                  },
                },
              })
            }
          >
            View Resume
          </button>
        </div>

        <div className="p-6 grid grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 text-center">
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
                  <div className="w-28 h-28 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 text-2xl border-4 border-white shadow">
                    <User size={30} />
                  </div>
                )}
              </div>
              <label className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg cursor-pointer hover:bg-indigo-700">
                Upload New
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePicChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">
                  Personal Information
                </h2>
                <button
                  onClick={() =>
                    editInfo ? saveSection(setEditInfo) : setEditInfo(true)
                  }
                  className={buttonClass(editInfo)}
                >
                  {editInfo ? (
                    <CheckCheck size={16} />
                  ) : (
                    <SquarePenIcon size={16} />
                  )}
                  {editInfo ? "Save" : "Edit"}
                </button>
              </div>
              {editInfo ? (
                <div className="space-y-2">
                  <input
                    placeholder="Username"
                    value={info.username}
                    onChange={(e) =>
                      setInfo({ ...info, username: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Email"
                    value={info.email}
                    onChange={(e) =>
                      setInfo({ ...info, email: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Phone"
                    value={info.phone}
                    onChange={(e) =>
                      setInfo({ ...info, phone: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    placeholder="Location"
                    value={info.location}
                    onChange={(e) =>
                      setInfo({ ...info, location: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              ) : (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <span className="font-semibold">Username:</span>{" "}
                    {info.username}
                  </li>
                  <li>
                    <span className="font-semibold">Email:</span> {info.email}
                  </li>
                  <li>
                    <span className="font-semibold">Phone:</span> {info.phone}
                  </li>
                  <li>
                    <span className="font-semibold">Location:</span>{" "}
                    {info.location}
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="col-span-2 space-y-6">
            {[
              {
                title: "Education",
                data: education,
                edit: editEducation,
                setEdit: setEditEducation,
                inputSetter: setEducation,
              },
              {
                title: "Skills",
                data: skills,
                edit: editSkills,
                setEdit: setEditSkills,
                inputSetter: setSkills,
                textarea: true,
              },
              {
                title: "Experience",
                data: experience,
                edit: editExperience,
                setEdit: setEditExperience,
                inputSetter: setExperience,
                textarea: true,
              },
              {
                title: "Projects",
                data: projects,
                edit: editProjects,
                setEdit: setEditProjects,
                inputSetter: setProjects,
                textarea: true,
              },
              {
                title: "Achievements",
                data: achievements,
                edit: editAchievements,
                setEdit: setEditAchievements,
                inputSetter: setAchievements,
                textarea: true,
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
                      section.edit
                        ? saveSection(section.setEdit)
                        : section.setEdit(true)
                    }
                    className={buttonClass(section.edit)}
                  >
                    {section.edit ? (
                      <CheckCheck size={16} />
                    ) : (
                      <SquarePenIcon size={16} />
                    )}
                    {section.edit ? "Save" : "Edit"}
                  </button>
                </div>
                {section.edit ? (
                  section.textarea ? (
                    <textarea
                      className={inputClass + " h-20"}
                      value={section.data}
                      onChange={(e) => section.inputSetter(e.target.value)}
                    />
                  ) : (
                    Object.keys(section.data).map((key) => (
                      <input
                        key={key}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={section.data[key]}
                        onChange={(e) =>
                          section.inputSetter({
                            ...section.data,
                            [key]: e.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    ))
                  )
                ) : section.textarea ? (
                  <p className="text-sm text-gray-700">{section.data}</p>
                ) : (
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;

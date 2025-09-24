import React, { useState } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";
import { SquarePenIcon, CheckCheck, User } from "lucide-react";

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

  // Jobs Posted
  const [jobs, setJobs] = useState("");
  const [editJobs, setEditJobs] = useState(false);

  const inputClass =
    "border border-gray-300 p-2 rounded-md w-full focus:ring-1 focus:ring-indigo-400 focus:outline-none text-sm bg-white";

  const handlePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveSection = (setter) => {
    setter(false);
    alert("Profile updated successfully!");
  };

  const buttonClass = (isEditing) =>
    isEditing
      ? "flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
      : "flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm";

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SidebarRecruiter />
      <div className="flex-1 p-5 bg-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-300 px-8 py-3 shadow-sm bg-gray-50 mb-5 rounded-md">
          <div>
            <h1 className="text-2xl font-bold text-black">My Profile</h1>
            <p className="text-black text-sm">
              Manage and update your recruiter profile details.
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-1 space-y-6">
            {/* Profile Picture */}
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

            {/* Company Info */}
            <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6">
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
                  {Object.keys(company).map((key) => (
                    <input
                      key={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={company[key]}
                      onChange={(e) =>
                        setCompany({ ...company, [key]: e.target.value })
                      }
                      className={inputClass}
                    />
                  ))}
                </div>
              ) : (
                <ul className="space-y-2 text-sm text-gray-700">
                  {Object.keys(company).map((key) => (
                    <li key={key}>
                      <span className="font-semibold">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>{" "}
                      {company[key]}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-6">
            {[
              {
                title: "Contact Information",
                data: contact,
                edit: editContact,
                setEdit: setEditContact,
                inputSetter: setContact,
              },
              {
                title: "About Company",
                data: about,
                edit: editAbout,
                setEdit: setEditAbout,
                inputSetter: setAbout,
                textarea: true,
              },
              {
                title: "Jobs Posted",
                data: jobs,
                edit: editJobs,
                setEdit: setEditJobs,
                inputSetter: setJobs,
                textarea: true,
              },
            ].map((section, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 shadow-md rounded-xl p-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>
                  <button
                    onClick={() =>
                      section.edit
                        ? saveSection(section.setEdit)
                        : section.setEdit(true)
                    }
                    className={buttonClass(section.edit)}
                  >
                    {section.edit ? <CheckCheck size={16} /> : <SquarePenIcon size={16} />}
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

export default RecruiterProfile;

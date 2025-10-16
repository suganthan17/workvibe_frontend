// src/pages/seeker/SeekerProfile.jsx
import React, { useState, useEffect } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import { SquarePenIcon, CheckCheck, User, Upload } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../utils/api"; // ✅ centralized axios instance

const SeekerProfile = () => {
  const [profilePic, setProfilePic] = useState(null);

  const [basicInfo, setBasicInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [locationInfo, setLocationInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const [linkedin, setLinkedin] = useState("");

  const [editFlags, setEditFlags] = useState({
    basicInfo: false,
    locationInfo: false,
    linkedin: false,
    profilePic: false,
  });

  const commonInput =
    "border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm bg-white transition-all duration-200 shadow-sm hover:border-indigo-200 placeholder-gray-400";

  // ✅ Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/api/seeker/profile");
        setBasicInfo(data.basicInfo || {});
        setLocationInfo(data.locationInfo || {});
        setLinkedin(data.linkedin || "");
        setProfilePic(data.profilePic || null);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  // ✅ Update user profile
  const saveSection = async (section) => {
    try {
      const formData = new FormData();

      if (section === "profilePic" && profilePic instanceof File)
        formData.append("profilePic", profilePic);
      if (section === "basicInfo")
        formData.append("basicInfo", JSON.stringify(basicInfo));
      if (section === "locationInfo")
        formData.append("locationInfo", JSON.stringify(locationInfo));
      if (section === "linkedin") formData.append("linkedin", linkedin);

      await api.put("/api/seeker/profile", formData);
      toast.success("Profile updated successfully!");
      setEditFlags((prev) => ({ ...prev, [section]: false }));
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      <SidebarSeeker />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight border-b border-gray-200 pb-2">
          My Profile
        </h1>

        {/* Profile Banner Section */}
        <div className="relative rounded-3xl shadow-md overflow-hidden mb-10">
          <div className="relative h-40 w-full bg-gradient-to-r from-sky-200 via-blue-300 to-indigo-300 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="absolute bottom-0 left-0 w-full opacity-40"
            >
              <path
                fill="#38BDF8"
                fillOpacity="0.75"
                d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,160C672,139,768,149,864,176C960,203,1056,245,1152,256C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between px-8 pb-6 pt-2 bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-6 -mt-12">
              {/* Profile Picture */}
              <div className="relative w-26 h-26 rounded-full overflow-hidden ring-4 ring-white shadow-md bg-gray-100">
                {profilePic ? (
                  typeof profilePic === "string" ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${profilePic}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User size={48} strokeWidth={1.5} />
                  </div>
                )}
              </div>

              {/* Basic Details */}
              <div>
                <h2 className="text-xl font-bold mb-1 font-mono text-gray-800">
                  {basicInfo.fullName || "Your Full Name"}
                </h2>
                <p className="text-sm text-gray-800">
                  {basicInfo.email || "Enter your email address"}
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  {basicInfo.phone || "Enter your phone number"}
                </p>
              </div>
            </div>

            {/* Edit / Save buttons */}
            <div className="flex items-center gap-3">
              {editFlags.profilePic ? (
                <>
                  <label className="px-4 py-2 bg-indigo-300 text-indigo-900 rounded-lg cursor-pointer hover:bg-indigo-200 transition-all text-sm shadow-sm flex items-center gap-2">
                    <Upload size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={() => saveSection("profilePic")}
                    className="p-2 text-green-600 hover:text-green-800 cursor-pointer transition-all"
                  >
                    <CheckCheck size={25} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() =>
                    setEditFlags({ ...editFlags, profilePic: true })
                  }
                  className="p-2 text-black hover:text-white cursor-pointer transition-all"
                >
                  <SquarePenIcon size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="bg-white/90 rounded-3xl shadow-sm border border-indigo-100 p-8 mb-8 transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Personal Information
            </h2>
            <button
              onClick={() =>
                editFlags.basicInfo
                  ? saveSection("basicInfo")
                  : setEditFlags({ ...editFlags, basicInfo: true })
              }
              className="p-4 text-indigo-700 rounded-lg cursor-pointer"
            >
              {editFlags.basicInfo ? (
                <CheckCheck size={25} color="green" />
              ) : (
                <SquarePenIcon size={18} />
              )}
            </button>
          </div>

          {editFlags.basicInfo ? (
            <div className="flex flex-wrap gap-4">
              <input
                placeholder="Enter your full name"
                value={basicInfo.fullName}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, fullName: e.target.value })
                }
                className={`${commonInput} flex-1 min-w-[45%]`}
              />
              <input
                placeholder="Enter your email address"
                value={basicInfo.email}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, email: e.target.value })
                }
                className={`${commonInput} flex-1 min-w-[45%]`}
              />
              <input
                placeholder="Enter your phone number"
                value={basicInfo.phone}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, phone: e.target.value })
                }
                className={`${commonInput} flex-1 min-w-[45%]`}
              />
              <input
                placeholder="Select your date of birth"
                type="date"
                value={basicInfo.dob}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, dob: e.target.value })
                }
                className={`${commonInput} flex-1 min-w-[45%]`}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 text-sm text-gray-700">
              {[["Full Name", basicInfo.fullName], ["Email", basicInfo.email], ["Phone", basicInfo.phone], ["Date of Birth", basicInfo.dob]].map(([label, value]) => (
                <div key={label} className="flex-1 min-w-[22%]">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="mt-1 font-medium text-gray-800">
                    {value || `Enter your ${label.toLowerCase()}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Info Section */}
        <div className="bg-white/90 rounded-3xl shadow-sm border border-indigo-100 p-8 mb-8 transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Location Details
            </h2>
            <button
              onClick={() =>
                editFlags.locationInfo
                  ? saveSection("locationInfo")
                  : setEditFlags({ ...editFlags, locationInfo: true })
              }
              className="p-4 text-indigo-700 rounded-lg cursor-pointer"
            >
              {editFlags.locationInfo ? (
                <CheckCheck size={25} color="green" />
              ) : (
                <SquarePenIcon size={18} />
              )}
            </button>
          </div>

          {editFlags.locationInfo ? (
            <div className="flex flex-wrap gap-4">
              {["address", "city", "state", "country"].map((field) => (
                <input
                  key={field}
                  placeholder={`Enter your ${field}`}
                  value={locationInfo[field]}
                  onChange={(e) =>
                    setLocationInfo({
                      ...locationInfo,
                      [field]: e.target.value,
                    })
                  }
                  className={`${commonInput} flex-1 min-w-[45%]`}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 text-sm text-gray-700">
              {[["Address", locationInfo.address], ["City / Location", locationInfo.city], ["State", locationInfo.state], ["Country", locationInfo.country]].map(
                ([label, value]) => (
                  <div key={label} className="flex-1 min-w-[22%]">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="mt-1 font-medium text-gray-800">
                      {value || `Enter your ${label.toLowerCase()}`}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* LinkedIn Section */}
        <div className="bg-white/90 rounded-3xl shadow-sm border border-indigo-100 p-8 transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">LinkedIn</h2>
            <button
              onClick={() =>
                editFlags.linkedin
                  ? saveSection("linkedin")
                  : setEditFlags({ ...editFlags, linkedin: true })
              }
              className="p-4 text-indigo-700 rounded-lg cursor-pointer"
            >
              {editFlags.linkedin ? (
                <CheckCheck size={25} color="green" />
              ) : (
                <SquarePenIcon size={18} />
              )}
            </button>
          </div>

          {editFlags.linkedin ? (
            <input
              placeholder="Paste your LinkedIn URL (optional)"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className={commonInput}
            />
          ) : (
            <p className="text-gray-700 text-sm font-medium">
              {linkedin || "Paste your LinkedIn URL (optional)"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;

// src/pages/recruiter/RecruiterProfile.jsx
import React, { useState, useEffect } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";
import { SquarePenIcon, CheckCheck, User, Upload } from "lucide-react";
import toast from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

const RecruiterProfile = () => {
  const [logo, setLogo] = useState(null);

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    position: "",
  });

  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    location: "",
    website: "",
  });

  const [editFlags, setEditFlags] = useState({
    basicInfo: false,
    companyInfo: false,
    logo: false,
  });

  const commonInput =
    "border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm bg-white transition-all duration-200 shadow-sm hover:border-indigo-200 placeholder-gray-400";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/recruiter/profile/get`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          // Backend uses nested fields; use optional chaining and sensible fallbacks
          setBasicInfo({
            name: data.basicInfo?.name || "",
            email: data.basicInfo?.email || "",
            position: data.basicInfo?.position || "",
          });
          setCompanyInfo({
            name: data.companyInfo?.name || "",
            location: data.companyInfo?.location || "",
            website: data.companyInfo?.website || "",
          });
          setLogo(data.companyInfo?.logo || null); // logo is nested in companyInfo
        } else {
          toast.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  const saveSection = async (section) => {
    try {
      const formData = new FormData();
      if (section === "logo" && logo instanceof File)
        formData.append("logo", logo);
      if (section === "basicInfo")
        formData.append("basicInfo", JSON.stringify(basicInfo));
      if (section === "companyInfo")
        formData.append("companyInfo", JSON.stringify(companyInfo));

      const res = await fetch(`${BASE_URL}/api/recruiter/profile/update`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        const updated = await res.json();
        toast.success("Profile updated successfully!");
        // Update local state from returned profile (keeps UI consistent)
        setBasicInfo({
          name: updated.basicInfo?.name || basicInfo.name,
          email: updated.basicInfo?.email || basicInfo.email,
          position: updated.basicInfo?.position || basicInfo.position,
        });
        setCompanyInfo({
          name: updated.companyInfo?.name || companyInfo.name,
          location: updated.companyInfo?.location || companyInfo.location,
          website: updated.companyInfo?.website || companyInfo.website,
        });
        setLogo(updated.companyInfo?.logo || logo);
        setEditFlags((prev) => ({ ...prev, [section]: false }));
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      <SidebarRecruiter />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight border-b border-gray-200 pb-2">
          My Profile
        </h1>

        {/* Company Banner */}
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
              <div
                className="relative w-26 h-26 rounded-full overflow-hidden ring-4 ring-white shadow-md bg-gray-100"
                style={{ width: 96, height: 96 }}
              >
                {logo ? (
                  typeof logo === "string" ? (
                    // logo from server (path like uploads/...)
                    <img
                      src={`${BASE_URL}/${logo}`}
                      alt="Company Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // local File object
                    <img
                      src={URL.createObjectURL(logo)}
                      alt="Company Logo"
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User size={48} strokeWidth={1.5} />
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-1 font-mono text-gray-800">
                  {companyInfo.name || "Your Company Name"}
                </h2>
                <p className="text-sm text-gray-800">
                  {basicInfo.name || "Recruiter Name"}
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  {basicInfo.position || "Position / Role"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {editFlags.logo ? (
                <>
                  <label className="px-4 py-2 bg-indigo-300 text-indigo-900 rounded-lg cursor-pointer hover:bg-indigo-200 transition-all text-sm shadow-sm flex items-center gap-2">
                    <Upload size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogo(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={() => saveSection("logo")}
                    className="p-2 text-green-600 hover:text-green-800 cursor-pointer transition-all"
                    title="Save logo"
                  >
                    <CheckCheck size={25} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditFlags((p) => ({ ...p, logo: true }))}
                  className="p-2 text-black hover:text-white cursor-pointer transition-all"
                >
                  <SquarePenIcon size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white/90 rounded-3xl shadow-sm border border-indigo-100 p-8 mb-8 transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Personal Information
            </h2>
            <button
              onClick={() =>
                editFlags.basicInfo
                  ? saveSection("basicInfo")
                  : setEditFlags((p) => ({ ...p, basicInfo: true }))
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
                placeholder="Your full name"
                value={basicInfo.name}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, name: e.target.value })
                }
                className={`${commonInput} flex-1 min-w-[45%]`}
              />
              <input
                placeholder="Email address"
                value={basicInfo.email}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, email: e.target.value })
                }
                className={`${commonInput} flex-1 min-w-[45%]`}
              />
              <input
                placeholder="Your role or position"
                value={basicInfo.position}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, position: e.target.value })
                }
                className={`${commonInput} flex-1 min-w-[45%]`}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 text-sm text-gray-700">
              {[
                ["Name", basicInfo.name],
                ["Email", basicInfo.email],
                ["Position", basicInfo.position],
              ].map(([label, value]) => (
                <div key={label} className="flex-1 min-w-[30%]">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="mt-1 font-medium text-gray-800">
                    {value || `Enter your ${label.toLowerCase()}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Company Info */}
        <div className="bg-white/90 rounded-3xl shadow-sm border border-indigo-100 p-8 mb-8 transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Company Information
            </h2>
            <button
              onClick={() =>
                editFlags.companyInfo
                  ? saveSection("companyInfo")
                  : setEditFlags((p) => ({ ...p, companyInfo: true }))
              }
              className="p-4 text-indigo-700 rounded-lg cursor-pointer"
            >
              {editFlags.companyInfo ? (
                <CheckCheck size={25} color="green" />
              ) : (
                <SquarePenIcon size={18} />
              )}
            </button>
          </div>

          {editFlags.companyInfo ? (
            <div className="flex flex-wrap gap-4">
              {["name", "location", "website"].map((field) => (
                <input
                  key={field}
                  placeholder={`Enter company ${field}`}
                  value={companyInfo[field] || ""}
                  onChange={(e) =>
                    setCompanyInfo({ ...companyInfo, [field]: e.target.value })
                  }
                  className={`${commonInput} flex-1 min-w-[45%]`}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 text-sm text-gray-700">
              {[
                ["Company Name", companyInfo.name],
                ["Location", companyInfo.location],
                ["Website", companyInfo.website],
              ].map(([label, value]) => (
                <div key={label} className="flex-1 min-w-[30%]">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="mt-1 font-medium text-gray-800">
                    {value || `Enter company ${label.toLowerCase()}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;

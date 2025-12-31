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

  const input =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/recruiter/profile/get`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setBasicInfo(data.basicInfo || basicInfo);
          setCompanyInfo(data.companyInfo || companyInfo);
          setLogo(data.companyInfo?.logo || null);
        } else {
          toast.error("Failed to fetch profile");
        }
      } catch {
        toast.error("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  const saveSection = async (section) => {
    try {
      const formData = new FormData();
      formData.append("basicInfo", JSON.stringify(basicInfo));
      formData.append("companyInfo", JSON.stringify(companyInfo));
      if (section === "logo" && logo instanceof File)
        formData.append("logo", logo);

      const res = await fetch(`${BASE_URL}/api/recruiter/profile/update`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        const updated = await res.json();
        toast.success("Profile updated");
        setBasicInfo(updated.basicInfo);
        setCompanyInfo(updated.companyInfo);
        setLogo(updated.companyInfo.logo);
        setEditFlags((p) => ({ ...p, [section]: false }));
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <SidebarRecruiter />

      <main className="flex-1 px-10 py-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal and company information.
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 mb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {logo ? (
                  typeof logo === "string" ? (
                    <img
                      src={`${BASE_URL}/${logo}`}
                      alt="Company Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(logo)}
                      alt="Company Logo"
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <User className="text-gray-400" size={40} />
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {companyInfo.name || "Company Name"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {basicInfo.name || "Recruiter Name"}
                </p>
                <p className="text-sm text-gray-500">
                  {basicInfo.position || "Role / Position"}
                </p>
              </div>
            </div>

            {editFlags.logo ? (
              <div className="flex gap-3">
                <label className="text-sm text-indigo-600 cursor-pointer flex items-center gap-2">
                  <Upload size={16} />
                  Change logo
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setLogo(e.target.files[0])}
                  />
                </label>
                <button
                  onClick={() => saveSection("logo")}
                  className="text-green-600 cursor-pointer"
                >
                  <CheckCheck size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditFlags((p) => ({ ...p, logo: true }))}
                className="text-indigo-600 cursor-pointer"
              >
                <SquarePenIcon size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-gray-900">
              Personal Information
            </h2>
            <button
              onClick={() =>
                editFlags.basicInfo
                  ? saveSection("basicInfo")
                  : setEditFlags((p) => ({ ...p, basicInfo: true }))
              }
              className="text-indigo-600 cursor-pointer"
            >
              {editFlags.basicInfo ? (
                <CheckCheck size={18} />
              ) : (
                <SquarePenIcon size={16} />
              )}
            </button>
          </div>

          {editFlags.basicInfo ? (
            <div className="grid grid-cols-2 gap-4">
              <input
                className={input}
                placeholder="Full name"
                value={basicInfo.name}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, name: e.target.value })
                }
              />
              <input
                className={input}
                placeholder="Email"
                value={basicInfo.email}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, email: e.target.value })
                }
              />
              <input
                className={input}
                placeholder="Position"
                value={basicInfo.position}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, position: e.target.value })
                }
              />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 text-sm">
              {[
                ["Name", basicInfo.name],
                ["Email", basicInfo.email],
                ["Position", basicInfo.position],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-500">{label}</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-gray-900">
              Company Information
            </h2>
            <button
              onClick={() =>
                editFlags.companyInfo
                  ? saveSection("companyInfo")
                  : setEditFlags((p) => ({ ...p, companyInfo: true }))
              }
              className="text-indigo-600 cursor-pointer"
            >
              {editFlags.companyInfo ? (
                <CheckCheck size={18} />
              ) : (
                <SquarePenIcon size={16} />
              )}
            </button>
          </div>

          {editFlags.companyInfo ? (
            <div className="grid grid-cols-2 gap-4">
              <input
                className={input}
                placeholder="Company name"
                value={companyInfo.name}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, name: e.target.value })
                }
              />
              <input
                className={input}
                placeholder="Location"
                value={companyInfo.location}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, location: e.target.value })
                }
              />
              <input
                className={input}
                placeholder="Website"
                value={companyInfo.website}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, website: e.target.value })
                }
              />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 text-sm">
              {[
                ["Company Name", companyInfo.name],
                ["Location", companyInfo.location],
                ["Website", companyInfo.website],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-500">{label}</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecruiterProfile;

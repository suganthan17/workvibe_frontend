import React, { useEffect, useState } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";
import { User, FileText, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

export default function Applicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/application/recruiter/all`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch applicants");
        setApplications(data.applications || []);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${BASE_URL}/api/application/update/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");
      setApplications((apps) =>
        apps.map((a) => (a._id === id ? { ...a, status } : a))
      );
      toast.success(`Application marked as ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getResumeUrl = (path) => {
    if (!path) return null;
    const fixed = path.replace(/\\/g, "/");
    if (/^https?:\/\//i.test(fixed)) return fixed;
    return `${BASE_URL.replace(/\/$/, "")}/${fixed.replace(/^\//, "")}`;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      <SidebarRecruiter />
      <main className="flex-1 p-10">
       <div className="flex flex-col mb-5 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 pb-2">Applicants</h1>
          <p className="text-sm text-gray-600 mb-5">
            View and track candidates who have applied to your job postings.
          </p>
        </div>

        {loading ? (
          <div className="text-gray-500">Loading applicants...</div>
        ) : applications.length === 0 ? (
          <div className="text-gray-500">No applications yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <User size={22} className="text-blue-600" />
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {app.userId?.Username ||
                        app.userId?.fullname ||
                        app.userId?.name ||
                        "Unknown Applicant"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {app.userId?.Email ||
                        app.userId?.email ||
                        app.userId?.userEmail ||
                        "No email"}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-3 space-y-1">
                  <p>
                    <span className="font-medium text-gray-800">Job:</span>{" "}
                    {app.jobId?.jobTitle || "N/A"}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">Status:</span>{" "}
                    <span
                      className={`${
                        app.status === "Hired"
                          ? "text-green-600"
                          : app.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      } font-semibold `}
                    >
                      {app.status || "Pending"}
                    </span>
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  {app.resumeUrl ? (
                    <a
                      href={getResumeUrl(app.resumeUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <FileText size={16} />
                      Resume
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">No resume</span>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(app._id, "Hired")}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 cursor-pointer"
                      title="Hire"
                    >
                      <CheckCircle size={18} className="text-green-600" />
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "Rejected")}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 cursor-pointer"
                      title="Reject"
                    >
                      <XCircle size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

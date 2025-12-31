import React, { useState, useEffect } from "react";
import SidebarSeeker from "../../components/SidebarSeeker";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

const SeekerHome = () => {
  const [saved, setSaved] = useState(0);
  const [applied, setApplied] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/jobs/savedjobs`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSaved(data?.jobs?.length || 0))
      .catch(() => setSaved(0));

    fetch(`${BASE_URL}/api/application/seeker/applications/count`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setApplied(data?.count || 0))
      .catch(() => setApplied(0));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <SidebarSeeker />

      <main className="flex-1 px-12 py-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your job activity
          </p>
        </div>

        {/* Stat Cards */}
        <div className="flex gap-8 mb-14">
          {/* Jobs Saved */}
          <Link
            to="/savedjobs"
            className="relative w-80 h-40 rounded-3xl p-6 text-white
                       bg-gradient-to-br from-indigo-500 to-indigo-400
                       hover:scale-[1.02] transition cursor-pointer"
          >
            <div className="absolute top-5 right-5 bg-white/20 rounded-full p-2">
              <ArrowUpRight size={16} />
            </div>

            <p className="text-sm font-medium opacity-90">
              Jobs Saved
            </p>
            <p className="text-5xl font-extrabold mt-6">
              {saved}
            </p>
          </Link>

          {/* Jobs Applied */}
          <Link
            to="/appliedjobs"
            className="relative w-80 h-40 rounded-3xl p-6 bg-white
                       border border-gray-200 hover:scale-[1.02]
                       transition cursor-pointer"
          >
            <div className="absolute top-5 right-5 bg-black text-white rounded-full p-2">
              <ArrowUpRight size={16} />
            </div>

            <p className="text-sm font-medium text-gray-600">
              Jobs Applied
            </p>
            <p className="text-5xl font-extrabold text-gray-900 mt-6">
              {applied}
            </p>
          </Link>
        </div>

        {/* Job Search Status */}
        <div className="max-w-4xl bg-white rounded-3xl border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Job Search Status
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            {applied > 0 ? (
              <p>
                You’ve applied to{" "}
                <span className="font-semibold text-gray-900">
                  {applied}
                </span>{" "}
                job{applied > 1 ? "s" : ""}. Keep tracking responses
                and refining your profile.
              </p>
            ) : (
              <p>
                You haven’t applied to any jobs yet. Start applying
                to increase your visibility.
              </p>
            )}

            {saved > 0 && (
              <p>
                You also have{" "}
                <span className="font-semibold text-gray-900">
                  {saved}
                </span>{" "}
                saved job{saved > 1 ? "s" : ""}. Review them regularly.
              </p>
            )}
          </div>

          <div className="mt-6">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full
                         bg-white text-indigo-700 font-semibold
                         border border-indigo-200
                         hover:bg-indigo-50 hover:border-indigo-300
                         transition cursor-pointer"
            >
              Explore Jobs
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeekerHome;

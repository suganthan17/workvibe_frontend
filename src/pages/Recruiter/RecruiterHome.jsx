import React, { useState, useEffect } from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

function RecruiterHome() {
  const [jobposted, setJobposted] = useState(0);
  const totalapplicants = 0;
  const totalhired = 0;

  useEffect(() => {
    const fetchjobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/getjobs`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.ok) {
          setJobposted(data.jobs.length);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchjobs();
  }, []);
  return (
    <>
      <div className="flex">
        <SidebarRecruiter />

        <div className="flex-1 p-5 bg-gray-100 min-h-screen">
          <div className="flex items-center justify-between border-b border-gray-300 px-8 py-3 shadow-sm bg-gray-50 mb-5 rounded-md">
            <div>
              <h1 className="text-2xl font-bold text-black">My Profile</h1>
              <p className="text-black text-sm">
                Manage and update your personal details.
              </p>
            </div>
          </div>

          {/* Quick Stats (like SeekerDashboard) */}
          <div className="p-8">
            <h2 className="font-semibold text-xl mb-4">Quick Stats</h2>
            <div className="flex flex-wrap gap-10">
              <div className="border border-gray-200 rounded-xl w-52 h-30 bg-white shadow-md flex flex-col justify-center items-center">
                <p className="font-medium text-gray-600">Jobs Posted</p>
                <span className="font-bold text-2xl">{jobposted}</span>
              </div>
              <div className="border border-gray-200 rounded-xl w-52 h- bg-white shadow-md flex flex-col justify-center items-center">
                <p className="font-medium text-gray-600">Total Applicants</p>
                <span className="font-bold text-2xl">{totalapplicants}</span>
              </div>
              <div className="border border-gray-200 rounded-xl w-52 h-30 bg-white shadow-md flex flex-col justify-center items-center">
                <p className="font-medium text-gray-600">Total Hired</p>
                <span className="font-bold text-2xl">{totalhired}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecruiterHome;

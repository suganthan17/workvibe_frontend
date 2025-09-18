import React from "react";
import SidebarSeeker from "../../components/SidebarSeeker";

function SeekerDashboard() {
  const jobsapplied = 0;
  const jobssaved = 0;
  return (
    <div className="flex">
      <SidebarSeeker />

      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between border-b  px-8 py-2 shadow-sm">
          <div className="">
            <h1 className="text-2xl font-semibold">Welcome</h1>
            <p className="text-gray-500 text-sm">
              Let’s find your next opportunity.
            </p>
          </div>
          <img src="" alt="Profile" className="w-10 h-10 rounded-full" />
        </div>

        <div className="p-8">
          <h2 className="font-semibold text-xl mb-4">Quick Stats</h2>
          <div className="flex mt-10 gap-10">
            <div className="border border-gray-300 rounded w-52 h-24 bg-purple-100 shadow-md">
              <p className="font-medium text-gray-600 p-3">Jobs Applied</p>
              <span className="p-3 font-bold text-2xl">{jobsapplied}</span>
            </div>
            <div className="border border-gray-300 rounded w-52 h-24 bg-purple-100 shadow-md">
              <p className="font-medium text-gray-600 p-3">Jobs Saved</p>
              <span className="p-3 font-bold text-2xl">{jobssaved}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeekerDashboard;

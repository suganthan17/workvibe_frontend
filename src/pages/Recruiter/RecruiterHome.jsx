import React from "react";
import SidebarRecruiter from "../../components/SidebarRecruiter";

function RecruiterHome() {
  const jobposted = 0;
  const totalapplicants = 0;
  const totalhired = 0;
  return (
    <>
      <div className="flex">
        <SidebarRecruiter />

        <div className="flex-1 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-between border-b  px-8 py-1 shadow-sm">
            <div className="">
              <h1 className="text-2xl font-bold">Welcome</h1>
              <p className="text-gray-800 text-sm">
                Let’s find the right employee for your company
              </p>
            </div>
            <img src="" alt="Profile" className="w-10 h-10 rounded-full" />
          </div>

          <div className="p-8">
            <h2 className="font-semibold text-xl mb-4">Quick Stats</h2>
            <div className="flex mt-10 gap-10">
              <div className="border border-gray-300 rounded w-52 h-24 bg-gray-200 shadow-md">
                <p className="font-medium text-gray-600 p-3">Jobs Posted</p>
                <span className="p-3 font-bold text-2xl">{jobposted}</span>
              </div>
              <div className="border border-gray-300 rounded w-52 h-24 bg-gray-200 shadow-md">
                <p className="font-medium text-gray-600 p-3">Total Applicants</p>
                <span className="p-3 font-bold text-2xl">
                  {totalapplicants}
                </span>
              </div>
              <div className="border border-gray-300 rounded w-52 h-24 bg-gray-200 shadow-md">
                <p className="font-medium text-gray-600 p-3">Total Hired</p>
                <span className="p-3 font-bold text-2xl">
                  {totalhired}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecruiterHome;

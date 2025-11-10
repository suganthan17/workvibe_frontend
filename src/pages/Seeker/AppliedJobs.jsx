import React from "react";
import SidebarSeeker from "../../components/SidebarSeeker";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://workvibe-backend.onrender.com";

// const [getAppliedJobs, setGetAppliedJobs] =useState([]);

// useEffect(() => {
//   const fetchAppliedJobs = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/applications/seeker/applications`, {
//         method: "GET",
//         credentials: "include",
//       });
//       const data = await res.json();
//       setGetAppliedJobs(data.applications || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   fetchAppliedJobs();
// }, []);


function AppliedJobs() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100">
      <SidebarSeeker />
      <div className="flex-1 p-10">
        <div className="flex flex-col mb-5 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 pb-2">
            Applied Jobs
          </h1>
          <p>xxx</p>
        </div>
      </div>
    </div>
  );
}

export default AppliedJobs;

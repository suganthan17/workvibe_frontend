import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Common Pages
import Loginpage from "./pages/Common/Loginpage";
import Signuppage from "./pages/Common/Signuppage";

// Seeker Pages
import SeekerHome from "./pages/Seeker/SeekerHome";
import SeekerProfile from "./pages/Seeker/SeekerProfile";
import BrowseJobs from "./pages/Seeker/BrowseJobs";
import JobDetails from "./pages/Seeker/JobDetails";
import AppliedJobs from "./pages/Seeker/AppliedJobs";
import SavedJobs from "./pages/Seeker/SavedJobs";
import CreateResume from "./pages/Seeker/CreateResume";

// Recruiter Pages
import RecruiterHome from "./pages/Recruiter/RecruiterHome";
import RecruiterProfile from "./pages/Recruiter/RecruiterProfile";
import PostJob from "./pages/Recruiter/PostJob";
import JobsPosted from "./pages/Recruiter/JobsPosted";
import Applicants from "./pages/Recruiter/Applicants";

function App() {
  return (
    <Router>
     <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    duration: 2200,
    style: {
      background: "#ffffff",
      color: "#0f172a",
      borderRadius: "10px",
      padding: "10px 16px",
      fontSize: "14px",
      fontWeight: 500,
      border: "1px solid #e2e8f0",
      boxShadow: "0 4px 20px rgba(30,64,175,0.15)",
      transformOrigin: "center",
      animation:
        "toastPopIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), toastPopOut 0.25s ease 1.9s forwards",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    success: {
      iconTheme: { primary: "#2563eb", secondary: "#ffffff" },
      style: {
        background: "#f0f7ff",
        color: "#1e40af",
        borderLeft: "4px solid #2563eb",
      },
    },
    error: {
      iconTheme: { primary: "#1e3a8a", secondary: "#ffffff" },
      style: {
        background: "#f5f3ff",
        color: "#312e81",
        borderLeft: "4px solid #1e3a8a",
      },
    },
    loading: {
      iconTheme: { primary: "#0ea5e9", secondary: "#ffffff" },
      style: {
        background: "#f0f9ff",
        color: "#075985",
        borderLeft: "4px solid #0ea5e9",
      },
    },
  }}
/>


      <Routes>
        {/* Auth Pages */}
        <Route path="/" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />

        {/* Seeker Dashboard Pages */}
        <Route path="/seekerhome" element={<SeekerHome />} />
        <Route path="/seekerprofile" element={<SeekerProfile />} />
        <Route path="/browsejobs" element={<BrowseJobs />} />
        <Route path="/jobdetails/:jobId" element={<JobDetails />} />
        <Route path="/appliedjobs" element={<AppliedJobs />} />
        <Route path="/savedjobs" element={<SavedJobs />} />
        <Route path="/createresume" element={<CreateResume />} />

        {/* Recruiter Dashboard Pages */}
        <Route path="/recruiterhome" element={<RecruiterHome />} />
        <Route path="/recruiterprofile" element={<RecruiterProfile />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/jobsposted" element={<JobsPosted />} />
        <Route path="/applicants" element={<Applicants />} />

        {/* Catch-all */}
        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-gray-500 text-lg">
              Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

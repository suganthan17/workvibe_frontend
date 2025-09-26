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
          duration: 2000,
          style: { background: "#333", color: "#fff", fontSize: "15px" },
          success: { style: { background: "#16a34a", color: "#fff" } },
          error: { style: { background: "#dc2626", color: "#fff" } },
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

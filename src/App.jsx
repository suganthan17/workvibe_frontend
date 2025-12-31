import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Common
import LandingPage from "./pages/Common/LandingPage";
import Loginpage from "./pages/Common/Loginpage";
import Signuppage from "./pages/Common/Signuppage";
import Footer from "./components/Footer";

// Seeker
import SeekerHome from "./pages/Seeker/SeekerHome";
import SeekerProfile from "./pages/Seeker/SeekerProfile";
import BrowseJobs from "./pages/Seeker/BrowseJobs";
import JobDetails from "./pages/Seeker/JobDetails";
import AppliedJobs from "./pages/Seeker/AppliedJobs";
import SavedJobs from "./pages/Seeker/SavedJobs";
import CreateResume from "./pages/Seeker/CreateResume";

// Recruiter
import RecruiterHome from "./pages/Recruiter/RecruiterHome";
import RecruiterProfile from "./pages/Recruiter/RecruiterProfile";
import PostJob from "./pages/Recruiter/PostJob";
import JobsPosted from "./pages/Recruiter/JobsPosted";
import Applicants from "./pages/Recruiter/Applicants";

function AppContent() {
  const location = useLocation();
  const hideFooter =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />

        {/* Seeker */}
        <Route path="/seekerhome" element={<SeekerHome />} />
        <Route path="/seekerprofile" element={<SeekerProfile />} />
        <Route path="/browsejobs" element={<BrowseJobs />} />
        <Route path="/jobdetails/:jobId" element={<JobDetails />} />
        <Route path="/appliedjobs" element={<AppliedJobs />} />
        <Route path="/savedjobs" element={<SavedJobs />} />
        <Route path="/createresume" element={<CreateResume />} />

        {/* Recruiter */}
        <Route path="/recruiterhome" element={<RecruiterHome />} />
        <Route path="/recruiterprofile" element={<RecruiterProfile />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/jobsposted" element={<JobsPosted />} />
        <Route path="/applicants" element={<Applicants />} />

        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-gray-500 text-lg">
              Page Not Found
            </div>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
     
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          className: "custom-toast", 
          style: {
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "14px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            backdropFilter: "blur(6px)",
          },
        }}
      />
      <AppContent />
    </Router>
  );
}

export default App;

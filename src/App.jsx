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

import ProfileGuard from "./components/ProfileGuard";

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
        <Route path="/seeker/profile" element={<SeekerProfile />} />

        <Route
          path="/seekerhome"
          element={
            <ProfileGuard role="seeker">
              <SeekerHome />
            </ProfileGuard>
          }
        />
        <Route
          path="/browsejobs"
          element={
            <ProfileGuard role="seeker">
              <BrowseJobs />
            </ProfileGuard>
          }
        />
        <Route
          path="/jobdetails/:jobId"
          element={
            <ProfileGuard role="seeker">
              <JobDetails />
            </ProfileGuard>
          }
        />
        <Route
          path="/appliedjobs"
          element={
            <ProfileGuard role="seeker">
              <AppliedJobs />
            </ProfileGuard>
          }
        />
        <Route
          path="/savedjobs"
          element={
            <ProfileGuard role="seeker">
              <SavedJobs />
            </ProfileGuard>
          }
        />
        <Route
          path="/createresume"
          element={
            <ProfileGuard role="seeker">
              <CreateResume />
            </ProfileGuard>
          }
        />

        {/* Recruiter */}
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />

        <Route
          path="/recruiterhome"
          element={
            <ProfileGuard role="recruiter">
              <RecruiterHome />
            </ProfileGuard>
          }
        />
        <Route
          path="/postjob"
          element={
            <ProfileGuard role="recruiter">
              <PostJob />
            </ProfileGuard>
          }
        />
        <Route
          path="/jobsposted"
          element={
            <ProfileGuard role="recruiter">
              <JobsPosted />
            </ProfileGuard>
          }
        />
        <Route
          path="/applicants"
          element={
            <ProfileGuard role="recruiter">
              <Applicants />
            </ProfileGuard>
          }
        />

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

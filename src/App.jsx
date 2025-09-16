import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signuppage from './pages/Signuppage';
import Loginpage from './pages/Loginpage';
import SeekerDashboard from './pages/SeekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard'; // ✅ add this import

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Pages */}
        <Route path='/' element={<Signuppage />} />
        <Route path='/login' element={<Loginpage />} />

        {/* Dashboards */}
        <Route path='/seeker' element={<SeekerDashboard />} />
        <Route path='/recruiter' element={<RecruiterDashboard />} />
      </Routes>
    </Router>
  )
}

export default App;

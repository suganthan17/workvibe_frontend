import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
<<<<<<< HEAD
=======
import Signuppage from './pages/Signuppage';
import Loginpage from './pages/Loginpage';
>>>>>>> 9ac492f (added auth)

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<LandingPage/>}/>
=======
        {/* <Route path='/' element={<LandingPage/>}/> */}
        <Route path='/' element={<Signuppage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
>>>>>>> 9ac492f (added auth)
      </Routes>
    </Router>
  )
}

export default App

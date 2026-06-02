import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Contact from "../pages/Contact.jsx";
import Faq from "../pages/Faq.jsx";
import Terms from "../pages/Terms.jsx";
import Aboutus from '../pages/Aboutus.jsx';
const AppRoutes = () => {
  return (
    <Routes>
           <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login appName="Freshora"/>} />

        <Route path="/signup" element={<Signup appName="Freshora"/>} />

        <Route path="/contact" element={<Contact appName="Freshora"/>} />

        <Route path="/faq" element={<Faq />} />

        <Route path="/terms" element={<Terms />} />
         <Route path="/about" element={<Aboutus />} />
    </Routes>
  )
}

export default AppRoutes
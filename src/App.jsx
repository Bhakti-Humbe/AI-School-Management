import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/navbar/navbar'
import Home from './components/Homepage/home'
import ContactSection from './components/ContactSection/ContactSection'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Admission from './components/Admission/Admission'
import Campus from './components/Campus/Campus'
import LoginForm from './components/LoginForm/LoginForm'
import RegisterForm from './components/LoginForm/RegisterForm'
import Dashboard from './components/Dashboard/Dashboard'

import { LayoutDashboard } from 'lucide-react'
const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/admissions" element={<Admission />} />
        <Route path="/campus" element={<Campus/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
      <Footer />
    </Router>
  )
}

export default App

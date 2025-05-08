import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/head_foot/Header";
import Footer from "./components/head_foot/Footer";
import Home from "./components/home/Home";
import About from "./components/aboutMe/About";
import Experience from "./components/experience1/Experience";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
import Meeting from "./components/meetings/Meeting";
import Signin from "./components/authorization/Signin";
import Skills from "./components/skills/Skills";
import Register from "./components/authorization/Register";


function App() {
  
  return (
    <Router>
    <div className="app-container">
      
      <Header />
      
      <main className="main-content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </main>
      <Footer />
      
    </div>
    
    </Router>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Meeting from "./components/Meeting";
import Signin from "./components/Signin";
import Skills from "./components/Skills";
import Register from "./components/Register";
import Testing from "./components/AddSkillCategory";

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
            <Route path="/register" element={<Register/>} />
            <Route path="/testing" element={<Testing/>} />
          </Routes>
      </main>
      <Footer /> 
    </div>
    </Router>
  );
}

export default App;

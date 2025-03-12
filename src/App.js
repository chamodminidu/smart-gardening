import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Plans from "./pages/Plans";
import Profile from "./pages/Profile";
import LayoutDesign from "./components/LayoutDesign";
import SketchGarden from './components/SketchGarden';
import MockSketch from "./components/MockSketch";
import MotionTest from "./components/MotionTest";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/layout-design" element={<LayoutDesign />} />
                <Route path="/sketch-garden" element={<SketchGarden />} />
                <Route path="/mock-sketch" element={<MockSketch />} />
                <Route path="/motion-test" element={<MotionTest />} />
            </Routes>
        </Router>
    );
};

export default App;

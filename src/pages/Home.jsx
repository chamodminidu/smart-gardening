import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; 

const Home = () => {
    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-green-gradient text-center text-white">
            <div className="p-5 bg-white bg-opacity-25 rounded-4 shadow-lg text-black w-75">
                <h1 className="fw-bold display-4">WELCOME</h1>
                <h2 className="fs-3 fw-semibold mt-2">“Smart Gardening”</h2>
                <p className="mt-4 fs-5">
                    Plan, manage, and grow your garden with ease. From plant recommendations to sunlight tracking, we’re here to help you create a vibrant green space. Let’s get started!
                </p>
                <Link to="/login" className="btn btn-lg btn-light fw-bold mt-4 px-5 py-3 shadow rounded-pill">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Home;

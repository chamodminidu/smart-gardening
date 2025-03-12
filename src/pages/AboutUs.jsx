import React from 'react';
import '../styles/styles.css'; 

const AboutUs = () => {
    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-items-center bg-green-gradient text-center">
            <h1 className="fw-bold display-5 mb-3">ABOUT US</h1>

            <div className="p-4 bg-white bg-opacity-25 rounded-4 shadow-lg w-75 text-black">
                <p className="fs-5">
                    Welcome to <strong>Smart Gardening</strong>! Our mission is to help gardeners, both beginners and experts, plan their gardens effectively and sustainably.
                    By integrating technology, we aim to simplify gardening tasks like layout design, sunlight analysis, and plant recommendations.
                </p>
                <p className="fs-5">
                    Join us on our journey to make gardening smarter and more efficient!
                </p>
            </div>
        </div>
    );
};

export default AboutUs;

import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/styles.css'; 

const Profile = () => {
    const navigate = useNavigate();
    
    const user = {
        username: 'gardener123',
        email: 'gardener@example.com',
        profilePic: 'https://i.pravatar.cc/100', // Placeholder profile image
    };

    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-items-center bg-green-gradient text-center">
            <h1 className="fw-bold display-5 mb-3">PROFILE</h1>

            {/* Profile Card */}
            <div className="p-4 bg-white bg-opacity-25 rounded-4 shadow-lg" style={{ width: '350px' }}>
                <img 
                    src={user.profilePic} 
                    alt="Profile" 
                    className="rounded-circle mb-3" 
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <div className="mb-3">
                    <label className="form-label fw-bold">User Name</label>
                    <input type="text" className="form-control rounded-pill px-3 text-center" value={user.username} readOnly />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control rounded-pill px-3 text-center" value={user.email} readOnly />
                </div>

                {/* View Plans Button */}
                <button 
                    className="btn btn-success w-100 rounded-pill py-2 fw-bold"
                    onClick={() => navigate('/plans')} // Navigate to Plans page
                >
                    View Plans
                </button>
            </div>
        </div>
    );
};

export default Profile;

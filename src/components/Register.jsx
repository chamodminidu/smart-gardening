import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.css'; 

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', formData);
            setMessage(response.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-green-gradient text-center">
            <div className="p-4 bg-white bg-opacity-25 rounded-4 shadow-lg" style={{ width: '350px' }}>
                <h1 className="fw-bold display-5 mb-3">REGISTER</h1>
                {message && <p className="text-danger">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">User Name</label>
                        <input type="text" className="form-control rounded-pill px-3" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input type="email" className="form-control rounded-pill px-3" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input type="password" className="form-control rounded-pill px-3" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Confirm Password</label>
                        <input type="password" className="form-control rounded-pill px-3" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-pill py-2 fw-bold">Register</button>
                </form>
                <p className="mt-3">
                    Already have an account? <Link to="/login" className="text-white fw-bold">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

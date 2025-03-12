import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; 

const Login = () => {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-green-gradient text-center">
            <div className="p-4 bg-white bg-opacity-25 rounded-4 shadow-lg" style={{ width: '350px' }}>
                <h1 className="fw-bold display-5 mb-3">LOGIN</h1>
                <form>
                    <div className="mb-3">
                        <label className="form-label fw-bold">User Name</label>
                        <input type="text" className="form-control rounded-pill px-3" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input type="password" className="form-control rounded-pill px-3" />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-pill py-2 fw-bold">
                        Log In
                    </button>
                </form>
                <p className="mt-3">
                    Don't have an account? <Link to="/register" className="text-white fw-bold">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

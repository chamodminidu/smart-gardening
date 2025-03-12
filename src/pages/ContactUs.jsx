import React, { useState } from 'react';
import '../styles/styles.css'; 

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic here
    };

    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-items-center bg-green-gradient text-center">
            <h1 className="fw-bold display-5 mb-3">CONTACT US</h1>

            <div className="p-4 bg-white bg-opacity-25 rounded-4 shadow-lg" style={{ width: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Name</label>
                        <input
                            type="text"
                            className="form-control rounded-pill px-3 text-center"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: '300px', margin: 'auto' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                        <input
                            type="email"
                            className="form-control rounded-pill px-3 text-center"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: '300px', margin: 'auto' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label fw-bold">Message</label>
                        <textarea
                            className="form-control rounded-4 px-3 text-center"
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            style={{ width: '300px', margin: 'auto' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-pill py-2 fw-bold">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;

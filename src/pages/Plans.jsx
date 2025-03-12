import React from 'react';
import '../styles/styles.css'; 
import gardenImage from '../assets/doneGarden.png'; 

const Plans = () => {
    const plans = [
        { id: 1, name: 'Backyard Plan', date: '2025-01-10' },
        { id: 2, name: 'Front Yard Plan', date: '2025-01-05' },
        { id: 3, name: 'Terrace Garden', date: '2025-02-15' },
    ];

    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-items-center bg-green-gradient text-center">
            <h1 className="fw-bold display-5 mb-3">YOUR PLANS</h1>

            {/* Plans List */}
            <div className="p-4 bg-white bg-opacity-25 rounded-4 shadow-lg w-75">
                {plans.map(plan => (
                    <div key={plan.id} className="d-flex align-items-center p-3 mb-3 rounded-4 bg-white bg-opacity-50">
                        {/* Plan Image Preview */}
                        <img 
                            src={gardenImage} 
                            alt="Plan Preview" 
                            className="rounded-3"
                            style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px' }}
                        />

                        {/* Plan Details */}
                        <div className="flex-grow-1 text-start">
                            <h5 className="mb-1">{plan.name}</h5>
                            <small>Created on: {plan.date}</small>
                        </div>

                        {/* View & Edit Buttons */}
                        <div className="d-flex flex-column">
                            <button className="btn btn-outline-dark mb-2">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn btn-outline-dark">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plans;

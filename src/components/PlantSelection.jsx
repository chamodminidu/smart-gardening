import React from 'react';
import Navbar from './Navbar';


const PlantSelection = () => {
    return (
        <div className="container mt-5">
            <h2>Select Plants</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <img src="plant1.jpg" className="card-img-top" alt="Plant 1" />
                        <div className="card-body">
                            <h5 className="card-title">Plant 1</h5>
                        </div>
                    </div>
                </div>
                {/* Repeat for more plants */}
            </div>
            <button className="btn btn-success mt-3">Next</button>
        </div>
    );
};

export default PlantSelection;

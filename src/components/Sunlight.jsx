import React from 'react';

const Sunlight = () => {
    return (
        <div className="container mt-5">
            <h2>Sunlight Input</h2>
            <div>
                <p>Select sunlight percentages and apply to grid:</p>
                <button className="btn btn-warning">25%</button>
                <button className="btn btn-primary">50%</button>
                <button className="btn btn-success">75%</button>
                <button className="btn btn-dark">100%</button>
            </div>
            <canvas id="sunlightGrid" style={{ border: '1px solid black', marginTop: '20px' }}></canvas>
            <button className="btn btn-success mt-3">Next</button>
        </div>
    );
};

export default Sunlight;

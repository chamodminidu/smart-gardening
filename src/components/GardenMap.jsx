import React from 'react';

const GardenMap = () => {
    return (
        <div className="container mt-5">
            <h2>Sketch the Area</h2>
            <canvas id="gardenCanvas" style={{ border: '1px solid black' }}></canvas>
            <button className="btn btn-success mt-3">Next</button>
        </div>
    );
};

export default GardenMap;

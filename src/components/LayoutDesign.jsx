import React, { useState } from 'react';
import Navbar from './Navbar';


const LayoutDesign = () => {
    const [plants, setPlants] = useState(['🌱 Plant 1', '🌿 Plant 2', '🌷 Plant 3']);
    const [grid, setGrid] = useState(Array(25).fill(null));

    const handleDrop = (index, plant) => {
        const updatedGrid = [...grid];
        updatedGrid[index] = plant;
        setGrid(updatedGrid);
    };

    return (
        <div className="container mt-5">
            <h2>Design Your Garden</h2>
            <div className="d-flex">
                <div className="me-5">
                    <h5>Available Plants</h5>
                    <ul className="list-group">
                        {plants.map((plant, index) => (
                            <li
                                key={index}
                                className="list-group-item"
                                draggable
                                onDragStart={(e) => e.dataTransfer.setData('plant', plant)}
                            >
                                {plant}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h5>Garden Layout</h5>
                    <div className="grid-container">
                        {grid.map((cell, index) => (
                            <div
                                key={index}
                                className="grid-cell"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDrop(index, e.dataTransfer.getData('plant'))}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button className="btn btn-success mt-3">Save Layout</button>
        </div>
    );
};

export default LayoutDesign;

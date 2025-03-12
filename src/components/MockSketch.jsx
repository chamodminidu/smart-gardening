import React, { useRef, useEffect, useState } from "react";
import gardenImage from "../assets/garden.jpg"; 
import plant1 from "../assets/one.png"; 
import plant2 from "../assets/two.png"; 
import plant3 from "../assets/three.png"; 
import plant4 from "../assets/four.png"; 
import "../styles/styles.css"; 

const CELL_SIZE = 50;

const MockSketch = () => {
    const canvasRef = useRef(null);
    const [step, setStep] = useState(1); // Step 1: Blank, Step 2: Sketch, Step 3: Sunlight, Step 4: Plants, Step 5: Save
    const [selectedColor, setSelectedColor] = useState(null);
    const [coloredCells, setColoredCells] = useState({});
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [placedPlants, setPlacedPlants] = useState({});

    // Define garden boundary
    const sketchBoundary = [
        [75, 50], [275, 50], [325, 150], [225, 275], [125, 275], [75, 150]
    ];

    const isInsidePolygon = (x, y) => {
        let inside = false;
        for (let i = 0, j = sketchBoundary.length - 1; i < sketchBoundary.length; j = i++) {
            const xi = sketchBoundary[i][0], yi = sketchBoundary[i][1];
            const xj = sketchBoundary[j][0], yj = sketchBoundary[j][1];
            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    };

    const drawSketch = (ctx) => {
        const img = new Image();
        img.src = gardenImage;
        img.onload = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);

            if (step >= 2) {
                ctx.beginPath();
                sketchBoundary.forEach(([x, y], index) => {
                    if (index === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });
                ctx.closePath();
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            if (step >= 3) drawGrid(ctx);
        };
    };

    const drawGrid = (ctx) => {
        ctx.strokeStyle = "#00000080";
        ctx.lineWidth = 1;

        for (let x = 0; x <= canvasRef.current.width; x += CELL_SIZE) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasRef.current.height);
            ctx.stroke();
        }

        for (let y = 0; y <= canvasRef.current.height; y += CELL_SIZE) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasRef.current.width, y);
            ctx.stroke();
        }

        Object.keys(coloredCells).forEach((key) => {
            const [gridX, gridY] = key.split(",").map(Number);
            const x = gridX * CELL_SIZE + CELL_SIZE / 2;
            const y = gridY * CELL_SIZE + CELL_SIZE / 2;

            if (isInsidePolygon(x, y)) {
                ctx.fillStyle = coloredCells[key];
                ctx.globalAlpha = 0.4;
                ctx.fillRect(gridX * CELL_SIZE, gridY * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                ctx.globalAlpha = 1;
            }
        });

        Object.keys(placedPlants).forEach((key) => {
            const [gridX, gridY] = key.split(",").map(Number);
            const img = new Image();
            img.src = placedPlants[key];
            img.onload = () => {
                ctx.drawImage(img, gridX * CELL_SIZE + 5, gridY * CELL_SIZE + 5, 40, 40);
            };
        });
    };

    const handleCanvasClick = (event) => {
        if (step === 3 && !selectedColor) return;
        if (step === 4 && !selectedPlant) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const gridX = Math.floor((event.clientX - rect.left) / CELL_SIZE);
        const gridY = Math.floor((event.clientY - rect.top) / CELL_SIZE);
        const centerX = gridX * CELL_SIZE + CELL_SIZE / 2;
        const centerY = gridY * CELL_SIZE + CELL_SIZE / 2;

        if (isInsidePolygon(centerX, centerY)) {
            if (step === 3) {
                setColoredCells({ ...coloredCells, [`${gridX},${gridY}`]: selectedColor });
            } else if (step === 4) {
                setPlacedPlants({ ...placedPlants, [`${gridX},${gridY}`]: selectedPlant });
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        drawSketch(ctx);
    }, [step, coloredCells, placedPlants]);

    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-items-center bg-green-gradient text-center">
            <h1 className="fw-bold display-5 mb-2">SKETCHER</h1>
            <p className="fs-5">
                {step === 1 ? "Garden Layout" : step === 2 ? "Sketching the Area" : step === 3 ? "Enter Sunlight" : step === 4 ? "Select Plants" : "Plan Is Ready"}
            </p>

            <canvas
                ref={canvasRef}
                width={350}
                height={350}
                style={{ borderRadius: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)", cursor: "pointer" }}
                onClick={handleCanvasClick}
            ></canvas>

            {step === 3 && (
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <button className="btn" style={{ backgroundColor: "green", width: "50px", height: "50px" }} onClick={() => setSelectedColor("green")}></button>
                    <button className="btn" style={{ backgroundColor: "yellow", width: "50px", height: "50px" }} onClick={() => setSelectedColor("yellow")}></button>
                    <button className="btn" style={{ backgroundColor: "red", width: "50px", height: "50px" }} onClick={() => setSelectedColor("red")}></button>
                </div>
            )}

            {step === 4 && (
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <img src={plant1} alt="Plant 1" width="50" height="50" onClick={() => setSelectedPlant(plant1)} />
                    <img src={plant2} alt="Plant 2" width="50" height="50" onClick={() => setSelectedPlant(plant2)} />
                    <img src={plant3} alt="Plant 3" width="50" height="50" onClick={() => setSelectedPlant(plant3)} />
                    <img src={plant4} alt="Plant 4" width="50" height="50" onClick={() => setSelectedPlant(plant4)} />
                </div>
            )}

            <button className="btn btn-success mt-3 px-5 py-2 rounded-pill" onClick={() => setStep(step + 1)}>
                {step < 5 ? "Next" : "Save"}
            </button>
        </div>
    );
};

export default MockSketch;

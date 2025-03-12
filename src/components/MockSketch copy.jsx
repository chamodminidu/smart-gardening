import React, { useRef, useEffect, useState } from "react";
import gardenImage from "../assets/garden.jpg"; // Correct image import
import '../styles/styles.css'; 

const CELL_SIZE = 50; // Size of grid cells

const MockSketch = () => {
    const canvasRef = useRef(null);
    const [isGridView, setIsGridView] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [coloredCells, setColoredCells] = useState({});

    // Define the shape boundary for checking
    const sketchBoundary = [
        [75, 50], [275, 50], [325, 150], [225, 275], [125, 275], [75, 150]
    ];

    // Function to check if a point (cell) is inside the polygon
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

    // Function to draw the mock sketch
    const drawSketch = (ctx) => {
        const img = new Image();
        img.src = gardenImage;
        img.onload = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);

            // Draw the sketch shape
            ctx.beginPath();
            sketchBoundary.forEach(([x, y], index) => {
                if (index === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.closePath();
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 3;
            ctx.stroke();

            // If grid mode is enabled, draw the grid on top
            if (isGridView) {
                drawGrid(ctx);
            }
        };
    };

    // Function to draw the grid ON TOP of the sketch
    const drawGrid = (ctx) => {
        ctx.strokeStyle = "#00000080"; // Semi-transparent black grid
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

        // Apply sunlight-colored cells inside the sketch only
        Object.keys(coloredCells).forEach((key) => {
            const [gridX, gridY] = key.split(",").map(Number);
            const x = gridX * CELL_SIZE + CELL_SIZE / 2;
            const y = gridY * CELL_SIZE + CELL_SIZE / 2;

            if (isInsidePolygon(x, y)) {
                ctx.fillStyle = coloredCells[key];
                ctx.globalAlpha = 0.4; // Apply transparency
                ctx.fillRect(gridX * CELL_SIZE, gridY * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                ctx.globalAlpha = 1; // Reset transparency
            }
        });
    };

    // Function to handle grid cell clicks (coloring)
    const handleCanvasClick = (event) => {
        if (!isGridView || !selectedColor) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const gridX = Math.floor((event.clientX - rect.left) / CELL_SIZE);
        const gridY = Math.floor((event.clientY - rect.top) / CELL_SIZE);

        // Convert cell to actual pixel coordinates
        const centerX = gridX * CELL_SIZE + CELL_SIZE / 2;
        const centerY = gridY * CELL_SIZE + CELL_SIZE / 2;

        // Only allow coloring inside the sketch shape
        if (isInsidePolygon(centerX, centerY)) {
            setColoredCells({ ...coloredCells, [`${gridX},${gridY}`]: selectedColor });
        }
    };

    // Re-draw canvas when grid view or coloredCells change
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        drawSketch(ctx);
    }, [isGridView, coloredCells]);

    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-items-center bg-green-gradient text-center">
            <h1 className="fw-bold display-5 mb-2">SKETCHER</h1>
            <p className="fs-5">{isGridView ? "Enter Sunlight" : "Sketch The Area"}</p>

            {/* Sketch Box */}
            <canvas
                ref={canvasRef}
                width={350}
                height={350}
                style={{ borderRadius: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)", cursor: isGridView ? "pointer" : "default" }}
                onClick={handleCanvasClick}
            ></canvas>

            {/* Sunlight Selection (Only in Grid View) */}
            {isGridView && (
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <div className="text-center">
                        <button
                            className="btn"
                            style={{ backgroundColor: "green", width: "50px", height: "50px" }}
                            onClick={() => setSelectedColor("green")}
                        ></button>
                        <p className="fw-bold mt-1">25</p>
                    </div>
                    <div className="text-center">
                        <button
                            className="btn"
                            style={{ backgroundColor: "yellow", width: "50px", height: "50px" }}
                            onClick={() => setSelectedColor("yellow")}
                        ></button>
                        <p className="fw-bold mt-1">50</p>
                    </div>
                    <div className="text-center">
                        <button
                            className="btn"
                            style={{ backgroundColor: "red", width: "50px", height: "50px" }}
                            onClick={() => setSelectedColor("red")}
                        ></button>
                        <p className="fw-bold mt-1">100</p>
                    </div>
                </div>
            )}

            {/* Next Button */}
            <button
                className="btn btn-success mt-3 px-5 py-2 rounded-pill"
                onClick={() => setIsGridView(!isGridView)}
            >
                {isGridView ? "Back to Sketch" : "Next"}
            </button>
        </div>
    );
};

export default MockSketch;

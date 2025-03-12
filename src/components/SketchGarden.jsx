import React, { useRef, useEffect, useState } from 'react';

const SketchGarden = () => {
    const canvasRef = useRef(null);
    const [isSketching, setIsSketching] = useState(false);
    const [position, setPosition] = useState({ x: 200, y: 200 }); // Start in the center
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [prevPosition, setPrevPosition] = useState(null); // Store last position for smoother drawing

    // ✅ Request motion permissions (for iOS devices)
    const requestPermission = async () => {
        if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
            try {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission !== "granted") {
                    alert("Motion tracking permission denied.");
                    return false;
                }
            } catch (error) {
                alert("Motion permissions request failed.");
                return false;
            }
        }
        return true;
    };

    // ✅ Start Sketching
    const startSketching = async () => {
        if (!(await requestPermission())) return; // Request permission (for iOS)

        console.log("🚀 Motion Tracking Started!");
        setIsSketching(true);
        setPrevPosition(null); // Reset previous position
        window.addEventListener("devicemotion", handleMotion);
    };

    // ✅ Stop Sketching
    const stopSketching = () => {
        console.log("🛑 Motion Tracking Stopped!");
        setIsSketching(false);
        window.removeEventListener("devicemotion", handleMotion);
    };

    // ✅ Handle Device Motion (Accelerometer Data)
    const handleMotion = (event) => {
        if (!isSketching) return;

        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) {
            console.warn("⚠️ No acceleration data received!");
            return;
        }

        let ax = acceleration.x || 0; // Acceleration in X direction
        let ay = acceleration.y || 0; // Acceleration in Y direction

        console.log(`📡 Acceleration - X: ${ax}, Y: ${ay}`);

        // ✅ Adjust sensitivity (higher = smoother movement)
        const sensitivity = 1.5;

        // ✅ Update velocity based on acceleration
        setVelocity((prev) => ({
            x: prev.x + ax * sensitivity,
            y: prev.y - ay * sensitivity, // Invert Y because canvas Y-axis is flipped
        }));

        console.log(`🚀 Velocity - X: ${velocity.x}, Y: ${velocity.y}`);

        // ✅ Update position based on velocity (Keep within bounds)
        setPosition((prev) => ({
            x: Math.max(0, Math.min(400, prev.x + velocity.x)), // Keep within canvas
            y: Math.max(0, Math.min(400, prev.y + velocity.y)),
        }));

        console.log(`📍 Position - X: ${position.x}, Y: ${position.y}`);
    };

    // ✅ Draw Path on Canvas
    useEffect(() => {
        if (!isSketching) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!prevPosition) {
            // ✅ Draw the start position dot
            ctx.beginPath();
            ctx.arc(position.x, position.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();
        } else {
            // ✅ Draw continuous lines for movement
            ctx.beginPath();
            ctx.moveTo(prevPosition.x, prevPosition.y);
            ctx.lineTo(position.x, position.y);
            ctx.strokeStyle = "green";
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Update previous position
        setPrevPosition(position);
    }, [position, isSketching]);

    return (
        <div className="container mt-5 text-center">
            <h1>Sketch Your Garden (Accelerometer)</h1>
            <p>Move around with your phone to sketch the shape.</p>

            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                style={{ border: "1px solid black", marginTop: "20px" }}
            ></canvas>

            {/* ✅ Debugging Info */}
            <div className="mt-3 text-center">
                <h5>📍 Current Position:</h5>
                <p>X: {position.x.toFixed(2)}, Y: {position.y.toFixed(2)}</p>
                <h5>🚀 Velocity:</h5>
                <p>X: {velocity.x.toFixed(2)}, Y: {velocity.y.toFixed(2)}</p>
            </div>

            <div className="mt-3">
                {!isSketching ? (
                    <button className="btn btn-success" onClick={startSketching}>
                        Start Sketching
                    </button>
                ) : (
                    <button className="btn btn-danger" onClick={stopSketching}>
                        Stop Sketching
                    </button>
                )}
            </div>
        </div>
    );
};

export default SketchGarden;

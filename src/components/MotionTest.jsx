import React, { useEffect, useState } from "react";

const MotionTest = () => {
    const [motionData, setMotionData] = useState({
        ax: "Waiting...",
        ay: "Waiting...",
        az: "Waiting...",
        status: "⏳ Checking motion sensor...",
    });

    const requestPermission = async () => {
        // ✅ Check if DeviceMotionEvent is available
        if (typeof DeviceMotionEvent === "undefined") {
            alert("❌ Motion tracking is not supported in this browser.");
            setMotionData({
                ax: "❌ Not Supported",
                ay: "❌ Not Supported",
                az: "❌ Not Supported",
                status: "❌ Motion sensors are unavailable in this browser.",
            });
            return;
        }

        // ✅ Request Permission (Only if browser supports it)
        if (typeof DeviceMotionEvent.requestPermission === "function") {
            try {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission === "granted") {
                    alert("✅ Motion permission granted!");
                    startMotionTracking(); // Start tracking after permission is granted
                } else {
                    alert("❌ Motion permission denied.");
                }
            } catch (error) {
                alert("⚠️ Motion permissions request failed.");
            }
        } else {
            alert("✅ Your browser does not require motion permission.");
            startMotionTracking(); // Start tracking immediately if no permission is required
        }
    };

    const startMotionTracking = () => {
        alert("📡 Trying to add motion event listener...");

        const handleMotion = (event) => {
            if (!event.acceleration) {
                setMotionData({
                    ax: "❌ No Data",
                    ay: "❌ No Data",
                    az: "❌ No Data",
                    status: "⚠️ Motion data not available! Your browser may not support motion tracking.",
                });
                return;
            }

            let ax = event.acceleration.x || 0;
            let ay = event.acceleration.y || 0;
            let az = event.acceleration.z || 0;

            setMotionData({
                ax: ax.toFixed(2),
                ay: ay.toFixed(2),
                az: az.toFixed(2),
                status: "✅ Motion detected! Move your phone to see updates.",
            });
        };

        window.addEventListener("devicemotion", handleMotion);
        alert("✅ Motion event listener added!");
    };

    return (
        <div className="container mt-5 text-center">
            <h1>📡 Motion Sensor Test</h1>
            <p>{motionData.status}</p>

            <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
                <p>➡️ X: {motionData.ax}</p>
                <p>⬆️ Y: {motionData.ay}</p>
                <p>🔄 Z: {motionData.az}</p>
            </div>

            <button onClick={requestPermission} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
                Request Motion Permission
            </button>
        </div>
    );
};

export default MotionTest;

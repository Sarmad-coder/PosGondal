import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';
import GraphDashboard from "./GraphDashboard";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SecondSectionDashBoard = () => {
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: [
                { y: 20, label: "Orange" },
                { y: 24, label: "Banana" },
                { y: 20, label: "Avocat" },
                { y: 14, label: "Ones" },
                { y: 12, label: "PineApple" }
            ]
        }]
    }
    return (
        <div className="row mb-4 mx-4">
            <div className="col-lg-7 col-md-12 dashboardSectionBox">
                <div className="card-title me-3">
                    <p className="dashboardTxtHead">
                        This Week Sales & Purchases
                    </p>
                    <GraphDashboard />
                </div>
            </div>
            <div className="col-lg-5 col-md-12 dashboardSectionBox">
                <p className="dashboardTxtHead">
                    Top Selling Products (2023)
                </p>
                <div className="px-5">
                    <CanvasJSChart options={options} />
                </div>
            </div>
        </div>
    )
}

export default SecondSectionDashBoard
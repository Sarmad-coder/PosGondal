import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const GraphDashboard = () => {
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        axisY: {
            includeZero: true
        },
        axisY: {
            includeZero: true,
            interval: 300,
            maximum: 1500,
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: [
                { x: 10, y: 310 },
                { x: 20, y: 1250 },
                { x: 30, y: 320 },
                { x: 40, y: 565 },
                { x: 50, y: 330 },
                { x: 60, y: 1168 },
                { x: 70, y: 1468 },
                { x: 80, y: 968 },
                { x: 90, y: 350 },
                { x: 100, y: 560 }
            ],
            color: "#86C8FF"
        }],
    }
    return (
        <>
            <div><CanvasJSChart options={options} /></div></>
    )
}

export default GraphDashboard
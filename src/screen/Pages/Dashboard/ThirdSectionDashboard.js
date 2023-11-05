import React, { useEffect, useState } from "react";
import CanvasJSReact from '@canvasjs/react-charts';
import axios from "axios";
import URL from "../../Url";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ThirdSectionDashBoard = () => {

    const [showCustomerOrder, setShowCustomerOrder] = useState([]);
    useEffect(() => {
        return () => {
            axios.get(`${URL}/customerOrder`).then((res) => {
                if (res?.data?.status === 200) {
                    setShowCustomerOrder(res?.data?.data)
                }
            })
        };
    }, [showCustomerOrder.length]);
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: [
                { y: 40, label: "Bever" },
                { y: 30, label: "Phyliss J. Polite" },
                { y: 20, label: "walk-in-customer" },
                { y: 14, label: "Fred C. Rasmussen" },
                { y: 10, label: "Thomas M. Martin" }
            ]
        }]
    }
    return (
        <div className="row mb-4 mx-4">
            <div className="col-12">
                <p className="dashboardTxtHead">
                    Recent Sales
                </p>
                <div className="card-title me-3 dashboardSectionBox" style={{ "overflow-y": "scroll", "height": "16rem" }}>
                    <table className="dashBoardTableSales " >
                        <tr className="dashBoardTableSalesHead">
                            <td>Ref#</td>
                            <td>Warehouse</td>
                            <td>Customer</td>
                            <td>Paid</td>
                            <td>Payment Status</td>


                        </tr>

                        {
                            showCustomerOrder?.map((d, i) => (

                                <tr className="dashBoardTableSalesTxt" key={i}>
                                    <td>{d?.invoiceNo}</td>
                                    <td>{d?.warehouseId?.name}</td>
                                    <td>{d?.customerId?.name}</td>
                                    <td>{d?.grandTotal}</td>
                                    <td>Paid</td>



                                </tr>
                            ))
                        }

                    </table>
                </div>
            </div>

        </div>
    )
}

export default ThirdSectionDashBoard
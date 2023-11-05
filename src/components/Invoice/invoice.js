import React, { useEffect, useState, useContext } from "react";
import "./invoice.css"
import { MyContext } from "../context";
import moment from "moment";
import { useNavigate } from "react-router-dom";
export default function Invoice() {
    const navigate = useNavigate();
    const { invoiceData, setInvoiceData } = useContext(MyContext);
    console.log(invoiceData)
    useEffect(()=>{
        window.print()
        navigate("/salereport");

    },[])
    return <div>
       {invoiceData? <div className="container">
            <div className="row">
                <div className="span4">
                    <img
                        src="http://webivorous.com/wp-content/uploads/2020/06/brand-logo-webivorous.png"
                        className="img-rounded logo"
                    />
                    <address>
                        <strong>Gondal Pvt. Ltd.</strong>
                        <br />
                        35, Lajpat Nagar
                        <br />
                        Gurugram, Haryana-122001 (India)
                    </address>
                </div>
                <div className="span4 well">
                    <table className="invoice-head">
                        <tbody>
                            <tr>
                                <td className="pull-right">
                                    <strong>Customer Name</strong>
                                </td>
                                <td>{invoiceData.customer.name}</td>
                            </tr>
                            <tr>
                                <td className="pull-right">
                                    <strong>Invoice #</strong>
                                </td>
                                <td>{invoiceData.invoiceNo}</td>
                            </tr>
                            <tr>
                                <td className="pull-right">
                                    <strong>Date</strong>
                                </td>
                                <td>{moment(new Date()).format("DD-MM-YY")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="span8">
                    <h2>Invoice</h2>
                </div>
            </div>
            <div className="row">
                <div className="span8 well invoice-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.products.map((product) => {
                                return <tr>

                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}/- RS</td>
                                    <td>{product.totalPrice}/- RS</td>
                                </tr>
                            })}

                            <tr>
                                <td colSpan={4} />
                            </tr>
                            <tr>
                                <td colSpan={2}>&nbsp;</td>
                                <td>
                                    <strong>Shipping Cost</strong>
                                </td>
                                <td>
                                    <strong>{invoiceData.shippingCost}/- RS</strong>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>&nbsp;</td>
                                <td>
                                    <strong>Discount</strong>
                                </td>
                                <td>
                                    <strong>{invoiceData.discount}/- RS</strong>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>&nbsp;</td>
                                <td>
                                    <strong>Sub Total</strong>
                                </td>
                                <td>
                                    <strong>{invoiceData.grandTotal}/- RS</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="span8 well invoice-thank">
                    <h5 style={{ textAlign: "center" }}>Thank You Very Much!</h5>
                </div>
            </div>
            <div className="row">
                <div className="span3">
                    <strong>Phone:</strong>+91-124-111111
                </div>
                <div className="span3">
                    <strong>Email:</strong>{" "}
                    <a href="web@webivorous.com">web@webivorous.com</a>
                </div>
                <div className="span3">
                    <strong>Website:</strong>{" "}
                    <a href="http://webivorous.com">http://webivorous.com</a>
                </div>
            </div>
        </div>:null}


    </div>
}
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { FiEye } from 'react-icons/fi';
import { Button, Modal } from 'antd';
import URL from '../../Url'
// import ViewPayment from '../Purchase/ViewPayment';
import DateComp from '../../../components/Date';
import { toast } from 'react-toastify';
import { BsFillPencilFill } from "react-icons/bs";
import { MyContext } from "../../../components/context";
import { useNavigate } from "react-router-dom";
const SaleReport = () => {
    const navigate = useNavigate();
    const [allOrders, setAllOrders] = useState([])
    let [previousOrder, setPreviousOrder] = useState({})
    const [updateSale, setUpdateSale] = useState({})
    const [dateFilterRes, setDateFilterRes] = useState(null)
    const [customerName, setCustomerName] = useState('')
    const { invoiceData, setInvoiceData } = useContext(MyContext);
    let [admin, setAdmin] = useState(false)


    useEffect(() => {
        axios.get(`${URL}/customerorder`).then((res) => {
            setAllOrders(res?.data?.data)
        })

        if (localStorage.getItem("login") == "admin") {
            setAdmin(true)
        }
    }, [])

    const fn_viewPayment = (item) => {


        

        var products = []
        item.productDetail.forEach((product, index) => {
            let data = {}

            data = {
                "name": product.productName,
                "quantity": product.cartQty,
                "price": product.productPrice,
                "totalPrice": product.productPrice * product.cartQty

            }




            products.push({ ...data })
        })
        invoiceData.customer = item.customerId
        invoiceData.products = products
        invoiceData.shippingCost = item.shipping
        invoiceData.discount = item.discount
        invoiceData.grandTotal = item.grandTotal
        invoiceData.invoiceNo = item.invoiceNo

        setInvoiceData({ ...invoiceData })
        
        navigate("/invoice")



    }


    const fn_updateSale = () => {
        // axios.patch(`${URL}/customerorder/previousOrder/${previousOrder._id}`, updateSale).then((res) => {
        //     toast.success("Sale has been Updated")
        //     setPreviousOrder({ ...previousOrder, invoiceNo: updateSale.invoiceNo, grandTotal: updateSale.grandTotal })
        //     setEditModal(false)
        //     setViewPaymentModal(false)
        //     axios.get(`${URL}/customerorder`).then((res) => {
        //         setAllOrders(res?.data?.data)
        //     })
        // })
    }
    const fn_editSale = (id) => {
        
        navigate(`/pos/${id}`)
    }



    return (
        <div className="content-section p-3 pt-0">


            <p className='dashboadHeading' >Sale</p >
            <hr className='dashboardLine' />
            <DateComp
                from="Sale From"
                to="Sale upto"
                dataArray={allOrders}
                setDateFilterRes={setDateFilterRes}

            />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">

                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>




                                </div>
                                {/* <div>
                                    <label><input type="search" class="form-control form-control-sm" placeholder="Search..." aria-controls="warehouse_table" /></label>
                                </div> */}
                            </section>
                            <div className="table-responsive mt-3">
                                <table
                                    id="warehouse_table"
                                    className="display table dataTable no-footer"
                                    aria-describedby="warehouse_table_info"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr >
                                            <th>Date</th>
                                            <th>Ref#</th>
                                            <th>Customer Name</th>

                                            <th>Grand Total</th>
                                            <th>Payment Status</th>
                                            <th>Invoice</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(dateFilterRes ?? allOrders)?.map(item => (
                                            <tr>
                                                <td>{new Date(item.createdAt)?.toLocaleDateString()}</td>
                                                <td>{item?.invoiceNo}</td>
                                                <td>{item?.customerId?.name}</td>
                                                <td>PKR {item?.grandTotal}</td>
                                                <td style={{ textTransform: "capitalize" }}>Paid</td>
                                                <td>
                                                    <div class="dropdown drp_action">

                                                        <span style={{ cursor: "pointer", marginRight: "1rem" }}
                                                            onClick={() => fn_viewPayment(item)}>
                                                            <FiEye /></span>
                                                        {admin?<i className='text-success' style={{ cursor: "pointer" }} onClick={() => { fn_editSale(item._id)}}><BsFillPencilFill /></i>:null}



                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <h5 style={{ textAlign: "end", paddingRight: "1rem" }}><span style={{ color: "red", marginRight: "0.6rem" }}>Total Sale:</span>{(dateFilterRes ?? allOrders)?.reduce((acc, item) => {
                                    return acc + item?.grandTotal
                                }, 0)} Rs</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="app-footer">
                <div class="row">
                    <div class="col-md-9">
                        <p><strong>Gondal - POS With Ultimate Inventory</strong></p>
                        <div class="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
                            <img class="logo" src="https://Gondal.getstocky.com/images/logo-default.svg" alt="" />
                            <div>
                                <p class="m-0">© 2023  Gondal v1.1</p>
                                <p class="m-0">All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleReport;

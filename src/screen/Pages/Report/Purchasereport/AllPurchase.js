import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import URL from '../../../Url';
import { useNavigate } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import CreatePayment from './CreatePayment';
import { toast } from 'react-toastify';
import { Button, Modal } from 'antd';
import ViewPayment from './ViewPayment';
import DateComp from '../../../../components/Date';

const Purchase = () => {
    // const navigate = useNavigate()
    const [viewPaymentModal, setViewPaymentModal] = useState(false);
    const [createPaymentModal, setCreatePaymentModal] = useState(false);
    const [singlePurchase, setSinglePurchase] = useState({})
    const [allProduct, setAllProduct] = useState([])
    const [allSupplier, setAllSupplier] = useState([])
    const [allWarehouse, setAllWarehouse] = useState([])
    const [allPayment, setAllPayment] = useState([])
    const [dateFilterRes, setDateFilterRes] = useState(null)
    useEffect(() => {
        // axios.get(`${URL}/purchasedetail/get`).then((res) => {
        //     setAllProduct(res?.data?.data)
        // })
        axios.get(`${URL}/purchasedetail/get`).then((res) => {
            setAllSupplier(res?.data?.data)
            console.log(res.data.data);
        })
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
        axios.get(`${URL}/paymentmethod`).then((res) => {
            setAllPayment(res?.data?.data)
        })
    }, [])
    // const fn_createPayment = (item) => {
    //     setSinglePurchase(item)
    //     setCreatePaymentModal(true)
    // }
    const fn_viewPayment = (item) => {
        setSinglePurchase(item)
        setViewPaymentModal(true)
    }
    return (
        <div className="content-section p-3 pt-0">
            <ViewPayment Modal={Modal} Button={Button} viewPaymentModal={viewPaymentModal} setViewPaymentModal={setViewPaymentModal} URL={URL} toast={toast} supplierDetail={allSupplier} singlePurchase={singlePurchase} allSupplier={allSupplier} allWarehouse={allWarehouse} />
            <CreatePayment Modal={Modal} Button={Button} createPaymentModal={createPaymentModal} setCreatePaymentModal={setCreatePaymentModal} URL={URL} toast={toast} supplierDetail={allSupplier} singlePurchase={singlePurchase} allPayment={allPayment} setAllProduct={setAllProduct} />
            <p className='dashboadHeading' >Purchase</p >
            <hr className='dashboardLine' />
            <DateComp
                from="Purchase From"
                to="Purchase upto"
                dataArray={allSupplier}
                setDateFilterRes={setDateFilterRes}

            />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            {/* <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/createpurchase")}>
                                    Create
                                </button>
                            </div> */}
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                {/* <div className='d-flex '>
                                    <label>
                                        <select name="warehouse_table_length" aria-controls="warehouse_table" class="form-select form-select-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="-1">All</option>
                                        </select>
                                    </label>

                                    <label style={{ marginLeft: "5px" }}>
                                        <select name="warehouse_table_length" aria-controls="warehouse_table" class="form-select form-select-sm">
                                            <option value="10">Export</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="-1">All</option>
                                        </select>
                                    </label>

                                </div> */}
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
                                            <th>Supplier</th>

                                            <th>Paid</th>
                                            <th>Due</th>
                                            <th>Grand Total</th>
                                            <th>Payment Status</th>
                                            <th>Invoice</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(dateFilterRes ?? allSupplier)?.map(item => (
                                            <tr>
                                                <td>{new Date(item.createdAt)?.toLocaleDateString()}</td>
                                                <td>{item?.invoiceNo}</td>
                                                <td>{item?.supplier?.name}</td>

                                                <td>PKR {item?.paid}</td>
                                                <td>PKR {item?.due}</td>
                                                <td>PKR {item?.total}</td>
                                                <td style={{ textTransform: "capitalize" }}>{item?.due > 0 ? "Unpaid" : "Paid"}</td>
                                                <td>
                                                    <div class="dropdown drp_action">

                                                        <span style={{ cursor: "pointer" }} onClick={() => fn_viewPayment(item)}><BsEye /></span>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <h5 style={{ textAlign: "end", paddingRight: "1rem" }}><span style={{ color: "red", marginRight: "0.6rem" }}>Total Purchase:</span>{(dateFilterRes ?? allSupplier)?.reduce((acc, item) => {
                                    return acc + item?.total
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

export default Purchase;

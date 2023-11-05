import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { BsFillPencilFill } from "react-icons/bs";

import { useNavigate } from 'react-router-dom';
import URL from '../../Url';
import DateComp from '../../../components/Date';
const SalesReturn = ({ allRoles }) => {
    const navigate = useNavigate()
    const [allSaleReturn, setAllSaleReturn] = useState([])
    const [allCustomer, setAllCustomer] = useState([])
    const [allWarehouse, setAllWarehouse] = useState([])
    const [dateFilterRes, setDateFilterRes] = useState(null)
    const isAdmin = allRoles?.role?.toLowerCase() === 'admin'
    useEffect(() => {
        axios.get(`${URL}/salesreturn`).then((res) => {
            setAllSaleReturn(res?.data?.data)
            console.log(res?.data?.data, "test")
        })
        axios.get(`${URL}/customer`).then((res) => {
            setAllCustomer(res?.data?.data)
        })
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
    }, [])
    return (
        <div className="content-section p-3 pt-0">
            <p className='dashboadHeading' >Sale Returns</p >
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">

                            {(isAdmin || allRoles?.sellReturn?.addSellReturn) && <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/createsalesreturn")}>
                                    Create
                                </button>

                            </div>}
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>
                                    {/* <label> */}

                                    {/* </label> */}



                                </div>
                                <div>
                                    <DateComp
                                        from="SR From"
                                        to="SR upto"
                                        dataArray={allSaleReturn}
                                        setDateFilterRes={setDateFilterRes}

                                    />
                                    {/* <label><input type="search" class="form-control form-control-sm" placeholder="Search..." aria-controls="warehouse_table" /></label> */}
                                </div>
                            </section>
                            <hr className='dashboardLine' />

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
                                            <th>Customer</th>
                                            <th>Warehouse</th>
                                            <th>Product</th>
                                            <th>Return Qty</th>
                                            <th>Unit Price</th>
                                            {/* <th>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(dateFilterRes ?? allSaleReturn)?.map((item) => (
                                            <tr>
                                                <td>{item?.setDate}</td>
                                                <td>{allCustomer?.find(cus => cus?._id === item?.customerId)?.name}</td>
                                                <td>{allWarehouse?.find(wh => wh?._id === item?.warehouseId)?.name}</td>
                                                <td>{item?.product?.productName}</td>
                                                <td>{item?.returnQty} {item?.product?.unitProduct}</td>
                                                <td>PKR {item?.product?.productPrice}</td>
                                                {/* <td>
                                                    <BsFillPencilFill className='text-success' />&nbsp;&nbsp;
                                                    <FiDelete className='text-danger' />
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Creating Warehouse */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div role="document" className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create</h5>
                            <button type="button" data-bs-dismiss="modal" aria-label="Close" className="btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <form enctype="multipart/form-data">
                                <div className="row">
                                    {/* Form Fields */}
                                    <div className="form-group col-md-6">
                                        <label htmlFor="name">Name <span className="field_required">*</span></label>
                                        <input type="text" name="name" id="name" placeholder="Enter Warehouse Name" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="mobile">Phone </label>
                                        <input type="text" name="mobile" id="mobile" placeholder="Enter Warehouse Phone" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="country">Country </label>
                                        <input type="text" name="country" id="country" placeholder="Enter Warehouse Country" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="city">City </label>
                                        <input type="text" name="city" id="city" placeholder="Enter Warehouse City" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Email </label>
                                        <input type="text" name="email" id="email" placeholder="Enter Warehouse Email" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="zip">Zip Code </label>
                                        <input type="text" name="zip" id="zip" placeholder="Enter Warehouse Zip Code" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <button type="submit" className="btn " style={{ backgroundColor: "#4E97FD", color: "white" }}>
                                            <i className="i-Yes me-2 font-weight-bold"></i> Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
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

export default SalesReturn;

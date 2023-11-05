import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import URL, { imgURL } from '../../Url';
import { useState } from 'react';

const AllTransfer = ({ allRoles }) => {
    const navigate = useNavigate()
    const [getTransfer, setGetTransfer] = useState([])
    const [allGroup, setAllGroup] = useState([])
    const [query, setQuery] = useState("")
    const isAdmin = allRoles?.role?.toLowerCase() === 'admin'
    useEffect(() => {
        axios.get(`${URL}/transferreport`).then((res) => {
            setGetTransfer(res.data?.data)
        })
        axios.get(`${URL}/group`).then(res => {
            setAllGroup(res?.data?.data)
        })
    }, [])

    const searchoutbyname = useMemo(() => (getTransfer?.filter((d) => (
        d?.productIds?.productName.toLowerCase().includes(query?.toLowerCase())
    ))), [query, getTransfer]);

    return (
        <div className="content-section p-3">
            <p className='dashboadHeading' >All Transfer</p>
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            {(isAdmin || allRoles?.transfer?.addTransfer) && <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/createtransfer")}>
                                    Create
                                </button>
                            </div>}
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>
                                    <label>

                                    </label>

                                    <label style={{ marginLeft: "5px" }}>

                                    </label>

                                </div>
                                <div>
                                    <label><input type="search" class="form-control form-control-sm" placeholder="Search by name..." value={query} onChange={(e) => { setQuery(e?.target?.value) }} aria-controls="warehouse_table" /></label>
                                </div>
                            </section>
                            <div className="table-responsive mt-3">
                                <table
                                    id="warehouse_table"
                                    className="display table dataTable no-footer"
                                    aria-describedby="warehouse_table_info"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Group</th>
                                            <th>Transfer Quantity</th>
                                            <th>From Warehouse</th>
                                            <th>To Warehouse</th>
                                            {/* <th>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchoutbyname?.map((item) => (
                                            <tr>
                                                <td>
                                                    <div>
                                                        <img src={`${imgURL}/${item?.productIds?.imageUrl}`} style={{ "borderRadius": "0.5rem", "height": "4em", "width": "4em" }} alt='missing' />
                                                    </div>
                                                </td>
                                                <td>{item?.productIds?.productName}</td>
                                                <td>{allGroup?.filter(i => i?._id === item?.productIds?.group)[0]?.grpName}</td>
                                                <td>{item?.qty} {item?.productIds?.unitProduct}</td>
                                                <td>{item?.fromWareHouseId?.name}</td>
                                                <td>{item?.toWareHouseId?.name}</td>
                                                {/* <td>
                                                    <a id="1" className="edit cursor-pointer ul-link-action text-success" data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <i className="" data-bs-toggle="modal" data-bs-target="#exampleModal"> <FiEye /></i>
                                                    </a>&nbsp;&nbsp;
                                                    <a id="1" className="delete cursor-pointer ul-link-action text-danger" data-toggle="tooltip" data-placement="top" title="Remove">
                                                        <i className="i-Close-Window"><FiDelete /></i>
                                                    </a>&nbsp;&nbsp;
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

export default AllTransfer;

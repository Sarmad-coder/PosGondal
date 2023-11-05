import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { BsFillPencilFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import URL from '../../../Url';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import Update from './UpdateCustomer';
const { confirm } = Modal;

const Customer = ({ allRoles }) => {
    const navigate = useNavigate()
    const [allCustomer, setAllCustomer] = useState([])
    const [updateIt, setUpdateIt] = useState({});
    const [modal1Open, setModal1Open] = useState(false);
    const [query, setQuery] = useState("");
    const isAdmin = allRoles?.role?.toLowerCase() === 'admin'

    useEffect(() => {
        axios.get(`${URL}/customer`).then((res) => {
            setAllCustomer(res?.data?.data)
        })
    }, [])

    const filteredData = useMemo(() => (
        allCustomer?.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
    ), [query, allCustomer])

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure you want to  delete this  customer?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`${URL}/customer/${id}`).then((res) => {
                    if (res?.data?.status === 200) {
                        toast.success("Deleted!")
                        axios.get(`${URL}/customer`).then((res) => {
                            console.log(res?.data?.data)
                            setAllCustomer(res?.data?.data)

                        })
                    }
                    else {
                        console.error("Customer Deleted Error")
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    return (
        <div className="content-section p-3">
            {(isAdmin || allRoles?.client?.editClient) && <Update updateIt={updateIt} Modal={Modal} setAllCustomer={setAllCustomer} setUpdateIt={setUpdateIt} modal1Open={modal1Open} setModal1Open={setModal1Open} />}
            <p className='dashboadHeading' >Customers</p>
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            {(isAdmin || allRoles?.client?.addClient) && <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/customer/create")}>
                                    Create
                                </button>
                            </div>
                            }
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>
                                    <label>

                                    </label>
                                    <label style={{ marginLeft: "5px" }}>

                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="search" value={query} onChange={(e) => { setQuery(e.target.value) }} class="form-control form-control-sm" placeholder="Search..." aria-controls="warehouse_table" />
                                    </label>
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
                                        <tr >
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>City</th>
                                            {/* <th>Total Purchase Due</th>
                                            <th>Total Purchase Return Due</th> */}
                                            {(isAdmin || allRoles?.client?.editClient || allRoles?.client?.deleteClient) && <th>Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData?.map((item) => (
                                            <tr>
                                                <td>{item?.name}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.city}</td>
                                                {/* <td>PKR 0</td>
                                                <td>PKR 0</td> */}
                                                {(isAdmin || allRoles?.client?.editClient || allRoles?.client?.deleteClient) && <td>
                                                    {(isAdmin || allRoles?.client?.editClient) && <i className='text-success' style={{ cursor: "pointer" }} onClick={() => { setUpdateIt(item); setModal1Open(true) }}><BsFillPencilFill /></i>}
                                                    &nbsp;&nbsp;
                                                    {(isAdmin || allRoles?.client?.deleteClient) && <i className='text-danger' style={{ cursor: "pointer" }} onClick={() => { showDeleteConfirm(item?._id) }}><FiDelete /></i>}
                                                </td>}
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

export default Customer;

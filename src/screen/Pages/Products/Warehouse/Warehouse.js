import React, { useEffect, useState } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { Button, Modal } from 'antd';
import CreateWarehouse from './CreateWarehouse';
import URL from '../../../Url';
import UpdateWarehouse from './UpdateWarehouse';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { BsFillPencilFill } from "react-icons/bs";
const { confirm } = Modal;

const Warehouse = () => {
    const [allWarehouse, setAllWarehouse] = useState([])
    const [updateWarehouse, setUpdateWarehouse] = useState({})
    const [modalOpen, setModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    useEffect(() => {
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
    }, [])
    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this Warehouse?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`${URL}/warehouse/${id}`).then((res) => {
                    if (res?.data?.status === 200) {
                        toast.success("Deleted")
                        axios.get(`${URL}/warehouse`).then((res) => {
                            setAllWarehouse(res?.data?.data)
                        })
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <div className="content-section">
            <CreateWarehouse Modal={Modal} Button={Button} modalOpen={modalOpen} setModalOpen={setModalOpen} URL={URL} setAllWarehouse={setAllWarehouse} />
            <UpdateWarehouse Modal={Modal} Button={Button} updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen} URL={URL} warehouseDetails={updateWarehouse} setAllWarehouse={setAllWarehouse} />
            <p className='dashboadHeading' >Warehouse</p >
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => setModalOpen(true)}>
                                    Create
                                </button>
                            </div>
                            <div className="table-responsive">
                                <table
                                    id="warehouse_table"
                                    className="display table dataTable no-footer"
                                    aria-describedby="warehouse_table_info"
                                    style={{ width: "100%", tableLayout: "fixed" }}
                                >
                                    {/* Table Header */}
                                    <thead>
                                        <tr>
                                            <th style={{ width: "105px" }} >Name</th>
                                            <th style={{ width: "105px" }}>Phone</th>
                                            <th style={{ width: "105px" }}>Country</th>
                                            <th style={{ width: "105px" }}>City</th>
                                            <th style={{ width: "161px" }}>Email</th>
                                            <th style={{ width: "105px" }}>Zip Code</th>
                                            <th style={{ width: "105px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    {/* Table Body */}
                                    <tbody>
                                        {allWarehouse && allWarehouse?.map((item) => (
                                            <tr className="odd">
                                                <td>{item?.name}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.country}</td>
                                                <td>{item?.city}</td>
                                                <td>{item?.email}</td>
                                                <td>{item?.zipCode}</td>
                                                <td className='d-flex'>
                                                    <BsFillPencilFill
                                                        style={{ cursor: "pointer" }}
                                                        className='text-success'
                                                        onClick={() => {
                                                            setUpdateWarehouse(item)
                                                            setUpdateModalOpen(true)
                                                        }}
                                                    />
                                                    &nbsp;&nbsp;
                                                    <FiDelete
                                                        style={{ cursor: "pointer" }}
                                                        className='text-danger'
                                                        onClick={() => showDeleteConfirm(item?._id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Warehouse;

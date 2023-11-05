import React, { useEffect, useMemo, useState } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { BsFillPencilFill } from "react-icons/bs";
import { ExclamationCircleFilled } from '@ant-design/icons';
import CreateUnit from './CreateUnit';
import { Button, Modal } from 'antd';
import URL from '../../../Url';
import axios from 'axios';
import { toast } from 'react-toastify';
import UpdateUnit from './UpdateUnit';
const { confirm } = Modal;
const Unit = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [allUnit, setAllUnit] = useState([])
    const [query, setQuery] = useState("")
    const [updateUnit, setUpdateUnit] = useState({})
    const [modal1Open, setModal1Open] = useState(false);


    useEffect(() => {
        axios.get(`${URL}/unit`).then((res) => {
            setAllUnit(res?.data?.data?.reverse())
        })
    })
    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`${URL}/unit/${id}`).then((res) => {
                    if (res?.data?.status === 200) {
                        toast.success("Unit Deleted")
                        axios.get(`${URL}/unit`).then((res) => {
                            setAllUnit(res?.data?.data?.reverse())
                        })
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const searchIt = useMemo(() => (allUnit?.filter((d) => (
        d?.title?.toLowerCase().includes(query?.toLowerCase())
    ))), [query, allUnit]);
    return (
        <div className="content-section p-3">
            <CreateUnit Modal={Modal} Button={Button} modalOpen={modalOpen} setModalOpen={setModalOpen} URL={URL} setAllUnit={setAllUnit} />
            <UpdateUnit updateUnit={updateUnit} setUpdateUnit={setUpdateUnit} allUnit={allUnit}
                modal1Open={modal1Open} setModal1Open={setModal1Open} setAllUnit={setAllUnit} />
            <div className="breadcrumb">
                <h5>Unit</h5>
            </div>
            <div className="separator-breadcrumb border-top"></div>

            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => setModalOpen(true)}>
                                    Create
                                </button>
                            </div>
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
                                            <th style={{ width: "105px" }}>Name</th>
                                            <th style={{ width: "105px" }}>Short Name</th>
                                            <th style={{ width: "105px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchIt?.map((item) => (
                                            <tr>
                                                <td>{item?.title}</td>
                                                <td>{item?.shortName}</td>
                                                <td>
                                                    <BsFillPencilFill className='text-success' onClick={() => { setUpdateUnit(item); setModal1Open(true) }} />
                                                    &nbsp;
                                                    <FiDelete className='text-danger' onClick={() => showDeleteConfirm(item?._id)} style={{ cursor: "pointer" }} />
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

            <div className="app-footer">
                <div className="row">
                    <div className="col-md-9">
                        <p><strong>Gondal - POS With Ultimate Inventory</strong></p>
                        <div className="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
                            <img className="logo" src="https://Gondal.getstocky.com/images/logo-default.svg" alt="" />
                            <div>
                                <p className="m-0">© 2023  Gondal v1.1</p>
                                <p className="m-0">All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unit;

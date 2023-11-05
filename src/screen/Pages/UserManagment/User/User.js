import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import URL, { imgURL } from '../../../Url';
import { FiDelete } from 'react-icons/fi';
import { BsFillPencilFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import { Oval } from 'react-loader-spinner';
const { confirm } = Modal;

const User = ({ allRoles }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    const [allUsers, setAllUsers] = useState([])
    const [query, setQuery] = useState("");
    const isAdmin = allRoles?.role?.toLowerCase() === 'admin'
    console.log(allRoles);
    useEffect(() => {
        axios.get(`${URL}/user`).then((res) => {
            setAllUsers(res?.data?.data.reverse())
        })
    }, [])
    const filteredData = useMemo(() => (
        allUsers.filter((d) => {
            return d?.fullName?.toLowerCase().includes(query?.toLowerCase())
        })
    ), [allUsers, query]);
    // useMemo(() => , input);
    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure you want to delete this User?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`${URL}/user/${id}`).then((res) => {
                    if (res?.data?.status === 200) {
                        toast.success("User Deleted")
                        axios.get(`${URL}/user`).then((res) => {
                            setAllUsers(res?.data?.data?.reverse())
                        })
                    }
                    else {
                        console.log(res?.data?.error)
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <div className="content-section p-3">
            {(isAdmin || allRoles?.user?.addUser) && <CreateUser Modal={Modal} Button={Button} modalOpen={modalOpen} setModalOpen={setModalOpen} URL={URL} toast={toast} setAllUsers={setAllUsers} Oval={Oval} />}
            {(isAdmin || allRoles?.user?.editUser) && <UpdateUser Modal={Modal} Button={Button} modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen} URL={URL} toast={toast} setAllUsers={setAllUsers} userDetail={userDetail} />}
            <p className='dashboadHeading' >User</p>
            <hr className='dashboardLine' />
            <div className="separator-breadcrumb border-top"></div>
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            {(isAdmin || allRoles?.user?.addUser) && <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => setModalOpen(true)}>
                                    Create
                                </button>
                            </div>
                            }
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex'>
                                    <label>

                                    </label>
                                    <label style={{ marginLeft: "5px" }}>

                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="search" class="form-control form-control-sm" placeholder="Search by name..." aria-controls="warehouse_table" value={query}
                                            onChange={(e) => { setQuery(e?.target?.value) }} /></label>
                                </div>
                            </section>
                            <div className="table-responsive">
                                <table
                                    id="warehouse_table"
                                    className="table mt-3"
                                    aria-describedby="warehouse_table_info"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "105px" }}>Avatar</th>
                                            <th style={{ width: "105px" }}>Username</th>
                                            <th style={{ width: "105px" }}>Email</th>
                                            <th style={{ width: "105px" }}>Status</th>
                                            <th style={{ width: "105px" }}>Role</th>
                                            {(isAdmin || allRoles?.user?.editUser || allRoles?.user?.deleteUser) && <th style={{ width: "105px" }}>Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData?.map((item) => (
                                            <tr style={{ lineHeight: "4rem" }}>
                                                <td>
                                                    <div>
                                                        <img src={`${imgURL}/${item?.imageUrl}`} height={"65px"} alt='missingImage' style={{ "borderRadius": "0.5rem", "height": "4em", "width": "4em" }} />
                                                    </div>
                                                </td>
                                                <td>{item?.fullName}</td>
                                                <td>{item?.email}</td>
                                                <td>{item?.status}</td>
                                                <td>{item?.role}</td>
                                                {(isAdmin || allRoles?.user?.editUser || allRoles?.user?.deleteUser) && <td>
                                                    {(isAdmin || allRoles?.user?.editUser) && <BsFillPencilFill className='text-info' style={{ cursor: "pointer", fontSize: "1.2rem" }} onClick={() => {
                                                        setUserDetail(item)
                                                        setUpdateModalOpen(true)
                                                    }} />}
                                                    &nbsp;
                                                    {(isAdmin || allRoles?.user?.deleteUser) && <FiDelete className='text-danger ms-2' style={{ cursor: "pointer", fontSize: "1.2rem" }} onClick={() => showDeleteConfirm(item?._id)} />}
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

export default User;

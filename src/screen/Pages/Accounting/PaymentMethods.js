import React, { useEffect, useMemo, useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { Button, Modal } from 'antd';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import URL from '../../Url';
import { toast } from 'react-toastify';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const PaymentMethod = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [title, setTitle] = useState("")
    const [allMethod, setAllMethod] = useState([])
    // const [delPay , setDelPay] = useState("")
    const [query, setQuery] = useState("")


    useEffect(() => {
        axios.get(`${URL}/paymentmethod`).then((res) => {
            setAllMethod(res?.data?.data)
        })
    }, [])
    const fn_submit = () => {
        setLoader(true)
        axios.post(`${URL}/paymentmethod`, { title }).then((res) => {
            if (res?.data?.status === 200) {
                setLoader(false)
                setModalOpen(false)
                toast.success("Payment method Added")
                setTitle("")
                axios.get(`${URL}/paymentmethod`).then((res) => {
                    setAllMethod(res?.data?.data)
                })
            } else {
                setLoader(false)
                toast.error(res?.data?.message)
            }
        })
    }

    const searchIt = useMemo(() => (allMethod?.filter((d) => (
        d?.title?.toLowerCase().includes(query?.toLowerCase())
    ))), [query, allMethod]);

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure you want to delete this?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`${URL}/paymentmethod/${id}`).then((res) => {
                    if (res?.data?.status === 200) {
                        toast.success("Deleted");

                    }
                    else {
                        toast.error("Not Deleted")
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <div className="content-section p-3 pt-0">
            <p className='dashboadHeading' >Payment Method</p >
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
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>
                                    <label>

                                    </label>
                                    <label style={{ marginLeft: "5px" }}>

                                    </label>
                                </div>
                                <div>
                                    <label><input type="search" class="form-control form-control-sm" placeholder="Search..." value={query} onChange={(e) => { setQuery(e?.target?.value) }} aria-controls="warehouse_table" /></label>
                                </div>
                            </section>
                            <div className="table-responsive">
                                <table
                                    id="warehouse_table"
                                    className="display table dataTable no-footer"
                                    aria-describedby="warehouse_table_info"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr >
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchIt?.map(item => (
                                            <tr className="odd">
                                                <td>{item?.title}</td>
                                                <td>
                                                    {/* <FiEye className='text-success' style={{ cursor: "pointer" }} /> */}
                                                    &nbsp;&nbsp;
                                                    <FiDelete className='text-danger' style={{ cursor: "pointer" }} onClick={() => { showDeleteConfirm(item?._id) }} />

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

            <Modal
                title="Add Payment Method"
                style={{ top: 20 }}
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                width={500}
                footer={[
                    <div>
                        {loader === true ? (
                            <div className="row">
                                <div className="col-10">
                                    <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>
                                    <Button key="ok" type="primary" onClick={fn_submit}>Create</Button>
                                </div>
                                <div className="col-2 text-end">
                                    <Oval
                                        height={33}
                                        width={33}
                                        color="#4fa94d"
                                        visible={true}
                                        secondaryColor="#4fa94d"
                                        strokeWidth={6}
                                        strokeWidthSecondary={7}
                                        style={{
                                            display: 'block',
                                            margin: '0 auto',
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>
                                <Button key="ok" type="primary" onClick={fn_submit}>Create</Button>
                            </>
                        )}
                    </div>
                ]}
            >
                <hr />
                <div className="row">
                    <div className="d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Title*</label>
                        <input type="text" className="productCreateInput" placeholder="Enter Payment Method" required value={title} onChange={(e) => setTitle(e?.target?.value)} />
                    </div>
                </div>
            </Modal>

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

export default PaymentMethod;

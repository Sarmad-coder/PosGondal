/* eslint-disable no-undef */
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import URL from '../../Url';
import { Link, useNavigate } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import CreatePayment from './CreatePayment';
import { toast } from 'react-toastify';
import { Button, Modal } from 'antd';
import ViewPayment from './ViewPayment';
import { FiDelete, FiEye } from 'react-icons/fi';
import Warehouse from '../Products/Warehouse/Warehouse';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const Purchase = ({ allRoles }) => {
    const navigate = useNavigate()
    const [viewPaymentModal, setViewPaymentModal] = useState(false);
    const [createPaymentModal, setCreatePaymentModal] = useState(false);
    const [singlePurchase, setSinglePurchase] = useState({})
    const [allProduct, setAllProduct] = useState([])
    const [allSupplier, setAllSupplier] = useState([])
    const [allWarehouse, setAllWarehouse] = useState([])
    const [allPayment, setAllPayment] = useState([])
    const [purchaseDetail, setPurchaseDetail] = useState([])
    const [query, setQuery] = useState("")
    const isAdmin = allRoles?.role?.toLowerCase() === 'admin'
    // purchaseDetail/delete/id
    console.log(allRoles, isAdmin);
    useEffect(() => {
        // axios.get(`${URL}/product`).then((res) => {
        //     setAllProduct(res?.data?.data)
        // })
        axios.get(`${URL}/supplier`).then((res) => {
            setAllSupplier(res?.data?.data)
        })
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
        axios.get(`${URL}/paymentmethod`).then((res) => {
            setAllPayment(res?.data?.data)
        })
        axios.get(`${URL}/purchasedetail/get`).then((res) => {
            setPurchaseDetail(res?.data?.data?.reverse())


        })
    }, [])

    const searchQuery = useMemo(() => (purchaseDetail?.filter((d) => (
        d?.productName?.toLowerCase().includes(query?.toLowerCase())
    ))), [purchaseDetail, query])
    // const fn_createPayment = (item) => {
    //     setSinglePurchase(item)
    //     setCreatePaymentModal(true)
    // }
    // const fn_viewPayment = (item) => {
    //     setSinglePurchase(item)
    //     setViewPaymentModal(true)
    // }
    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const all = () => {
    }
    // const deletePurchaseDetail = (id)=>{
    //     axios.delete(`${URL}/purchaseDetail/delete/${id}`).then((res)=>{
    //         if(res?.data?.status===200){
    //             toast.success("Deleted")
    //             axios.get(`${URL}/purchasedetail/get`).then((res) => {
    //                 setPurchaseDetail(res?.data?.data?.reverse())
    //             })
    //         }
    //         else{
    //             toast.error("Not Deleted")
    //         }
    //     })
    // }
    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure you want delete this?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`${URL}/purchasedetail/delete/${id}`).then((res) => {
                    if (res?.data?.status === 200) {
                        toast.success("Deleted")
                        axios.get(`${URL}/purchasedetail/get`).then((res) => {
                            setPurchaseDetail(res?.data?.data?.reverse())
                        })
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
            <ViewPayment Modal={Modal} Button={Button} viewPaymentModal={viewPaymentModal} setViewPaymentModal={setViewPaymentModal} URL={URL} toast={toast} singlePurchase={singlePurchase} allSupplier={allSupplier} allWarehouse={allWarehouse} />
            <CreatePayment Modal={Modal} Button={Button} createPaymentModal={createPaymentModal} setCreatePaymentModal={setCreatePaymentModal} URL={URL} toast={toast} singlePurchase={singlePurchase} allPayment={allPayment} setAllProduct={setAllProduct} />
            <p className='dashboadHeading' >Purchase</p >
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            {(isAdmin || allRoles?.purchase?.addPurchase) && <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/createpurchase")}>
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
                                    <label><input type="search" class="form-control form-control-sm" placeholder="Search by Product Name..." value={query} onChange={(e) => { setQuery(e?.target?.value) }} aria-controls="warehouse_table" /></label>
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
                                            <th>Date</th>
                                            <th>Supplier</th>
                                            <th>Product Name</th>
                                            <th>Warehouse</th>
                                            <th>Qty</th>
                                            <th>Grand Total</th>
                                            {(isAdmin || allRoles?.purchase?.deletePurchase || allRoles?.purchase?.editPurchase) && <th>Action</th>}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchQuery && searchQuery?.map((item, i) => (
                                            <tr key={i}>
                                                <td>{new Date(item?.createdAt).toLocaleDateString(undefined, dateOptions)}</td>
                                                <td>{item?.supplier?.name}</td>
                                                <td>{item?.productName}</td>
                                                <td>{item?.warehouse?.name}</td>

                                                {/* <td> {item?.warehouse?.name}</td>                                                 */}
                                                <td>{item?.quantity} {item?.unitProduct}</td>
                                                <td>PKR {item?.total}</td>
                                                {(isAdmin || allRoles?.purchase?.deletePurchase || allRoles?.purchase?.editPurchase) && <td>
                                                    {/* <Link id="1" className="text-success" title="Edit" style={{ cursor: "pointer" }}>
                                                        <FiEye />
                                                    </Link> */}
                                                    <Link id="1" className="text-danger" title="Remove" style={{ cursor: "pointer" }}>
                                                        <FiDelete onClick={() => { showDeleteConfirm(item?._id) }} />
                                                    </Link>

                                                </td>}
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                                <h5 style={{ textAlign: "end", paddingRight: "1rem" }}><span style={{ color: "red", marginRight: "0.6rem" }}>Total Purchase:</span>{searchQuery?.reduce((acc, item) => {
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

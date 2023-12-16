import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { FiDelete, } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import URL from '../../Url';
import { useState } from 'react';
import { BsFillPencilFill } from "react-icons/bs";
import DateComp from '../../../components/Date';
import { Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
const PurchaseReturn = ({ allRoles }) => {
    const navigate = useNavigate()
    const [allPurchaseReturn, setAllPurchaseReturn] = useState([])
    const [filterData, setFilterData] = useState([])
    const [allSupplier, setAllSupplier] = useState([])
    const [allWarehouse, setAllWarehouse] = useState([])
    const [dateFilterRes, setDateFilterRes] = useState(null)
    const isAdmin = allRoles?.role?.toLowerCase() === 'admin'
    useEffect(() => {
        axios.get(`${URL}/purchasereturn`).then((res) => {
            setAllPurchaseReturn(res?.data?.data)
            setFilterData(res?.data?.data)
        })
        axios.get(`${URL}/supplier`).then((res) => {
            setAllSupplier(res?.data?.data)
        })
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
    }, [])
console.log(allPurchaseReturn);
    const fn_searchProduct = (e) => {
        const searchTerm = e?.target?.value;
        setFilterData(
            allPurchaseReturn?.filter((product) =>
                product?.product.productName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }
    return (
        <div className="content-section p-3 pt-0">
            <p className='dashboadHeading' >Purchase Return</p >
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            {(isAdmin || allRoles?.purchaseReturn?.addPurchaseReturn) && <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/createpurchasereturn")}>
                                    Create
                                </button>
                            </div>}
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <section style={{ display: "flex", justifyContent: "space-between",width:"50%" }}>
                                   
                                    <div style={{width:"100%"}}>
                                        <Space.Compact size="large" style={{ backgroundColor: "rgba(40, 129, 201, 0.055)",width:"100%" }}>
                                            <Input addonBefore={<SearchOutlined />} placeholder="Search By Product" width={"100%"} onChange={(e) => fn_searchProduct(e)} />
                                        </Space.Compact>
                                    </div>
                                </section>
                                <div>
                                    <DateComp
                                        from="PR From"
                                        to="PR upto"
                                        dataArray={allPurchaseReturn}
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
                                            <th>Supplier</th>
                                            <th>Warehouse</th>
                                            <th>Product</th>
                                            <th>Return Qty</th>
                                            {/* <th>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(dateFilterRes ??filterData)?.map((item) => (
                                            <tr>
                                                <td>{item?.setDate}</td>
                                                <td>{allSupplier?.find(sup => sup?._id === item?.supplierId)?.name}</td>
                                                <td>{allWarehouse?.find(sup => sup?._id === item?.warehouseId)?.name}</td>
                                                <td>{item?.product?.productName}</td>
                                                <td>{item?.product?.returnQty} {item?.product?.unitProduct}</td>
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

export default PurchaseReturn;

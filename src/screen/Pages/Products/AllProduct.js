/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { BsFillPencilFill } from "react-icons/bs";
import URL, { imgURL } from '../../Url';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Modal } from "antd";
import { useForm } from 'react-hook-form'
import UpdateProduct from './UpdateProduct';
const AllProducts = ({ allRoles }) => {
    const {
        register,
        reset,
        handleSubmit,
        // formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [newallproduct, setAllProduct] = useState()
    const [searchSelectedProduct, setSearchSelectedProduct] = useState([])
    const [allGroup, setAllGroup] = useState()
    const [allBrand, setAllBrand] = useState()
    const [singleStock, setSingleStock] = useState({});
    const [allCate, setAllcate] = useState([])
    const [up, setUp] = useState()
    const [modal, setModal] = useState()
    const isAdmin = allRoles?.role?.toLowerCase() === 'admin'
    const [updatNewProduct, setUpdateNewProduct] = useState();
    useEffect(() => {
        axios.get(`${URL}/product`).then((res) => {
            setAllProduct(res.data.data)
            setSearchSelectedProduct(res?.data?.data)
        })
        axios.get(`${URL}/brand`).then((res) => {
            setAllBrand(res.data.data)
        })
        axios.get(`${URL}/group`).then((res) => {
            setAllGroup(res.data.data)
        })
        axios.get(`${URL}/category/getAll`).then((res) => {
            setAllcate(res.data.data)
        })
    }, [])
    const fn_searchProduct = (e) => {
        const searchTerm = e?.target?.value;
        setSearchSelectedProduct(
            newallproduct?.filter((product) =>
                product?.productName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }

    useEffect(()=>{
        axios.get(`${URL}/product`).then((res) => {
            setAllProduct(res.data.data)
            setSearchSelectedProduct(res?.data?.data)
        })
    },[modal])
    
    const onDeleteStudent = (id) => {
        Modal.confirm({
            title: "Are you sure you want to Delete?",
            onOk: () => {
                axios.delete(`${URL}/product/${id}`).then((res) => {
                    if (res?.data?.status === 200) {
                        toast.success('Product Deleted')
                        axios.get(`${URL}/product`).then((res) => {
                            setAllProduct(res?.data?.data)
                            setSearchSelectedProduct(res?.data?.data)
                        })
                    } else {
                        toast.error(res?.data?.message)
                    }
                })
            },
        });
    };
    return (
        <div className="content-section p-3 pt-0">
            {(isAdmin || allRoles?.product?.editProduct) && <UpdateProduct up={up} setUp={setUp} modal={modal} setModal={setModal} searchSelectedProduct={searchSelectedProduct} setAllProduct={setAllProduct} />
            }
            <p className='dashboadHeading' >All Products</p >
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            {(isAdmin || allRoles?.product?.addProduct) && <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/createproduct")}>
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
                                    <Space.Compact size="large" style={{ backgroundColor: "rgba(40, 129, 201, 0.055)" }}>
                                        <Input addonBefore={<SearchOutlined />} placeholder="Search Product By Name" onChange={(e) => fn_searchProduct(e)} />
                                    </Space.Compact>
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
                                            <th>Image</th>
                                            <th>Name</th>
                                            {/* <th>Type</th> */}
                                            <th>Code</th>
                                            <th>Group</th>
                                            <th>Brand</th>
                                            <th>Product Cost</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchSelectedProduct?.map((i, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div>
                                                            <img src={`${imgURL}/${i?.imageUrl}`} alt='missing' style={{ "borderRadius": "0.5rem", "height": "4em", "width": "4em" }} />
                                                        </div>
                                                    </td>
                                                    <td>{i.productName}</td>
                                                    {/* <td>{i.productType}</td> */}
                                                    <td>{i.productCode}</td>
                                                    <td>{allGroup?.filter(item => item?._id === i?.group)[0]?.grpName}</td>
                                                    <td>{allBrand?.filter(item => item?._id === i?.brand)[0]?.brandName}</td>
                                                    <td>PKR {i.productCost}</td>
                                                    <td>PKR {i.productPrice}</td>
                                                    <td>{i.quantity} {i?.unitProduct}</td>
                                                    {(isAdmin || allRoles?.product?.editProduct || allRoles?.product?.deleteProduct) && <td>
                                                        {(isAdmin || allRoles?.product?.editProduct) && <a id="1" className="edit cursor-pointer ul-link-action text-success" title="Edit">
                                                            <i
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => {
                                                                    setUp(i);
                                                                    setModal(true);
                                                                    setUpdateNewProduct(i?._id)
                                                                    axios.get(`${URL}/product/${i?._id}`).then((res) => {
                                                                        reset(res?.data?.data)
                                                                        setSingleStock(res?.data?.data)
                                                                    })
                                                                }}
                                                            > <BsFillPencilFill /></i>
                                                        </a>}
                                                        &nbsp;&nbsp;
                                                        {(isAdmin || allRoles?.product?.deleteProduct) && <a id="1" className="delete cursor-pointer ul-link-action text-danger" style={{ cursor: "pointer" }} title="Remove">
                                                            <a id="1" className="delete cursor-pointer ul-link-action text-danger" title="Remove" onClick={() => {
                                                                onDeleteStudent(i?._id);
                                                            }}>
                                                                <FiDelete />
                                                            </a>
                                                        </a>
                                                        }
                                                        &nbsp;&nbsp;
                                                    </td>}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Updading product */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div role="document" className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update</h5>
                            <button type="button" data-bs-dismiss="modal" aria-label="Close" className="btn-close"></button>
                        </div>
                        
                    </div>
                </div>
            </div>
            {/* Modal for Updading product End */}
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

export default AllProducts;

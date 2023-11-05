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
    const updateProduct = async (values) => {
        const params = new FormData()
        params.append('id', updatNewProduct)
        params.append('productName', values.productName)
        params.append('productCode', values.productCode)
        params.append('group', values.group)
        params.append('brand', values.brand)
        params.append('tax', values.tax)
        params.append('taxMethod', values.taxMethod)
        params.append('imageUrl', document.getElementById("imageUrl")?.files[0])
        params.append('details', values.details)
        params.append('productType', values.productType)
        params.append('productCost', values.productCost)
        params.append('productPrice', values.productPrice)
        params.append('unitProduct', values.unitProduct)
        params.append('unitSale', values.unitSale)
        params.append('unitPurchase', values.unitPurchase)
        params.append('quantity', values.quantity)
        params.append('stockAlert', values.stockAlert)
        params.append('imeiNum', values.imeiNum)
        axios.patch(`${URL}/product/${updatNewProduct}`, params).then((res) => {
            console.log(res)
            if (res?.data?.status === 200) {
                toast.success("Product Update Successfully")
            } else {
                toast.error("Updating Err")
            }
        })
    }
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
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(updateProduct)}>
                                {/* box-1 */}
                                <div className="productMainBox">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Product Name*</label>
                                            <input type="text" className="productCreateInput" placeholder="Product Name" name="productName"  {...register('productName')} />
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Product Code*</label>
                                            <input type="text" className="productCreateInput" placeholder="Product Code" name="productCode"  {...register('productCode')} />
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Group*</label>
                                            <select className="productCreateInput" name="productGroup"  {...register('group')}>
                                                {allGroup?.map((item) => (
                                                    <option value={item?._id}>{item?.grpName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Brand</label>
                                            <select className="productCreateInput" name="productBrand"  {...register('brand')}>
                                                {allBrand?.map((item) => (
                                                    <option value={item?._id}>{item?.brandName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Order Tax</label>
                                            <input type="number" className="productCreateInput" placeholder="Order Tax" name="orderTax"  {...register('tax')} />
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Tax Method</label>
                                            <select className="productCreateInput" name="taxMethod" {...register('taxMethod')}>
                                                <option selected value={"exclusive"}>Exclusive</option>
                                                <option value={"inclusive"}>Inclusive</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Product Image*</label>
                                            <input type="file" className="productCreateInput" placeholder="Order Tax" defaultValue={singleStock?.imageUrl} id="imageUrl" style={{ paddingTop: "2.5px" }}
                                            />
                                        </div>
                                        <div className="col-12 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Please Prove any Details*</label>
                                            <textarea type="number" className="productCreateTextArea" name="productDetails" {...register('details')} />
                                        </div>
                                    </div>
                                </div>
                                {/* box-2 */}
                                <div className="productMainBox">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Product Category*</label>
                                            <select className="productCreateInput" name="productType"  {...register('productType')}>
                                                <option selected value={""}>---Select Product Category---</option>
                                                {
                                                    allCate.map((d, i) => {
                                                        return <option key={i} value={d?.name}>{d?.name}</option>

                                                    })
                                                }
                                                {/* <option value={"Variable Product"}>Variable Product</option>
                                                <option value={"Service Product"}>Service Product</option> */}
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Product Cost*</label>
                                            <input type="number" className="productCreateInput" placeholder="Product Cost" name="productCost"  {...register('productCost')} />
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Product Price*</label>
                                            <input type="number" className="productCreateInput" placeholder="Product Price" name="productPrice"  {...register('productPrice')} />
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Unit Product*</label>
                                            <select className="productCreateInput" name="unitProduct"  {...register('unitProduct')}>
                                                <option selected value={""}>---Choose Product Unit---</option>
                                                <option value={"kg"}>kilogram</option>
                                                <option value={"meter"}>meter</option>
                                                <option value={"piece"}>piece</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Unit Sale*</label>
                                            <select className="productCreateInput" name="unitSale"  {...register('unitSale')}>
                                                <option selected value={""}>---Choose Sale Unit---</option>
                                                <option value={"option1"}>Option 1</option>
                                                <option value={"option2"}>Option 2</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Unit Purchase*</label>
                                            <select className="productCreateInput" name="unitPurchase"  {...register('unitPurchase')}>
                                                <option selected value={""}>---Choose Purchase Unit---</option>
                                                <option value={"option1"}>Option 1</option>
                                                <option value={"option2"}>Option 2</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Minimum Sale Quantity</label>
                                            <input type="number" className="productCreateInput" defaultValue={0} name="minSaleQty"  {...register('quantity')} />
                                        </div>
                                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                            <label className="productCreateTxt">Stock Alert</label>
                                            <input type="number" className="productCreateInput" defaultValue={0} name="stockAlert"  {...register('stockAlert')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="productMainBox ps-5">
                                    <input type="checkbox" name="imeiNum" />
                                    <label className="ms-3 productCreateTxt">Product has Imei/Serial Number</label>
                                </div>
                                <button type="submit" className="productSubmitBtn"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
                            </form>
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

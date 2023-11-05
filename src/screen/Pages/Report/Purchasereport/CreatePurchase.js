/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineCheckCircle, AiOutlineSearch } from "react-icons/ai"
import axios from "axios";
import URL, { imgURL } from "../../Url";
import { Oval } from 'react-loader-spinner';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiDelete, FiEye } from "react-icons/fi";

const CreatePurchase = () => {
    const navigate = useNavigate()
    const [proloader, setProLoader] = useState(false)
    const [allSupplier, setAllSupplier] = useState([])
    const [allWarehouse, setAllWarehouse] = useState([])
    const [allProduct, setAllProduct] = useState([])
    const [prod, setProd] = useState([])
    const [supplierId, setSupplierId] = useState("")
    const [warehouseId, setWarehouseId] = useState("")

    const [proArr, setProArr] = useState([])

    const [checkPurchase, setCheckPurchase] = useState(
        { purchaseDetail: [{ "prodId": "", "productPrice": 0, "qty": 0 }], "warehouse": "", "supplierId": "" });

    const purchaseProduct = (e, item) => {
        if (e.target.checked) {
            setProArr((preV) => [...preV, {
                prodId: item?._id,
                productPrice: item?.productPrice
            }])
            console.log(item)
        } else {
            console.log("Unchecked")
        }

    }



    const [purchQuantity, setPurchQuantity] = useState(0)
    useEffect(() => {
        axios.get(`${URL}/supplier`).then((res) => {
            setAllSupplier(res?.data?.data)
        })
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
        axios.get(`${URL}/product`).then((res) => {
            const productsArr = res?.data?.data.map(item => ({ ...item, total: 0 }))
            setProd(productsArr)

        })
    }, [])
    const searchProduct = (e) => {
        if (e?.target?.id === "supplierId") {
            setSupplierId(e?.target?.value)
        } else if (e?.target?.id === "warehouseId") {
            setWarehouseId(e?.target?.value)
        }
    }
    const fn_searchProduct = () => {
        setAllProduct([])
        setProLoader(true)
        axios.post(`${URL}/purchasereport`, {
            supplierId: supplierId,
            warehouseId: warehouseId
        }).then((res) => {
            setProLoader(false)
            for (var i = 0; i < (res?.data?.data[1]?.qtyResult?.length); i++) {
                test.push(res?.data?.data[1]?.qtyResult[i][0]?.productIds)
            }
            setAllProduct(res?.data?.data[0]?.allPurchaseProducts)
        })
    }
    const fn_submit = () => {
        return console.log(proArr)
        if (supplierId === "") {
            return toast.error("Select Supplier")
        } else if (warehouseId === "") {
            return toast.error("Select Warehouse")
        } else if (!localStorage.getItem("dateSet")) {
            return toast.error("First Set Date")
        }
        const params = allProduct?.map(item => ({
            ...item,
            whQty: test?.filter(i => i?.proId === item?._id)[0]?.qty,
            wh: warehouseId,
            setDate: localStorage.getItem("dateSet")
        }))
        axios.post(`${URL}/purchasedetail/create`, params).then((res) => {
            console.log(res?.data)
            if (res?.data?.status === 200) {
                toast.success("Purchase Created")
                navigate("/allpurchase")
            }
        })
    }

    const checkTotal = (e, i) => {

        const tempProducts = [...prod]
        tempProducts[i].total = parseInt(e.target.value) * tempProducts[i]?.productPrice
        setProArr(tempProducts)

    }


    return (
        <div>
            <p className='dashboadHeading' >Add Purchase</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Supplier*</label>
                        <select className="productCreateInput" id="supplierId" onChange={(e) => searchProduct(e)}>
                            <option selected value={""}>---Choose Supplier---</option>
                            {allSupplier && allSupplier?.map((item) => (
                                <option value={item?._id}>{item?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-5 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Warehouse*</label>
                        <select className="productCreateInput" id="warehouseId" onChange={(e) => searchProduct(e)}>
                            <option selected value={""}>---Choose Warehouse---</option>
                            {allWarehouse && allWarehouse?.map((item) => (
                                <option value={item?._id}>{item?.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="productMainBox">
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt mb-1">Products</label>
                    <Space.Compact size="large"
                        style={{ backgroundColor: "rgba(40, 129, 201, 0.055)" }}
                    >
                        <Input addonBefore={<SearchOutlined />} placeholder="Search Product" />
                    </Space.Compact>
                </div>
                <div className="table-responsive-md mt-5 mx-3">
                    <table className="table">
                        <thead>
                            <tr className="table-primary">
                                <td scope="col" className="productCreateTxt fw-semibold">#</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Image</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Product Name</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Unit Cost</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Available Stock</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Purchase Quantity</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Grand Total</td>
                                {/* <td scope="col" className="productCreateTxt fw-semibold">Action</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            {prod && prod.map((p, i) => (

                                <tr key={i}>
                                    <td>
                                        <input type="checkbox" onClick={(e) => purchaseProduct(e, p)} />
                                    </td>
                                    <td><img src={`${imgURL}/${p?.imageUrl}`} alt="missing img" height={"60px"}  ></img></td>
                                    <td>{p.productName}</td>
                                    <td>{p.productPrice}</td>
                                    <td>{p.quantity}</td>
                                    <td><input type="number" id="qty" onChange={(e) => {
                                        checkTotal(e, i)
                                    }} /></td>
                                    <td>
                                        <input disabled value={p?.total} />

                                    </td>


                                </tr>
                            ))}
                        </tbody>
                        {proloader === true && (
                            <Oval
                                height={33}
                                width={33}
                                color="#0F5ABB"
                                visible={true}
                                secondaryColor="#B2C4FF"
                                strokeWidth={6}
                                strokeWidthSecondary={7}
                                style={{
                                    display: 'block',
                                    margin: '0 auto',
                                }}
                            />
                        )}
                        {allProduct && allProduct?.map((item, index) => (
                            <tr style={{ height: "2rem", borderBottom: "1px solid rgba(128, 128, 128, 0.253)" }}>
                                <td className="ps-2 productCreateTxt">{index + 1}</td>
                                <td className="ps-2 productCreateTxt">
                                    <div>
                                        <img src={`${imgURL}/${item?.imageUrl}`} height={"50px"} />
                                    </div>
                                </td>
                                <td className="ps-2 productCreateTxt">{item?.productName}</td>
                                <td className="ps-2 productCreateTxt">PKR {item?.productPrice}</td>
                                <td className="ps-2 productCreateTxt">
                                    {test?.filter(i => i?.proId === item?._id)[0]?.qty} {item?.unitProduct}
                                </td>
                                <td className="ps-2 productCreateTxt">
                                    PKR {item?.productPrice * test?.filter(i => i?.proId === item?._id)[0]?.qty}
                                </td>
                                <td className="ps-2 productCreateTxt">Action</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            <div className="productMainBox">
                <div className="row">
                    <div className="col-12 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Please Prove any Details*</label>
                        <textarea type="number" className="productCreateTextArea" placeholder="Please Prove any Details" />
                    </div>
                </div>
            </div>
            <button className="btn btn-info btn-md ms-4" style={{ width: "120px" }} onClick={fn_submit} >
                <AiOutlineCheckCircle className="submitProductIcon text-dark" />Submit
            </button>
            <br /><br />
        </div>
    )
}

export default CreatePurchase
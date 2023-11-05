/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";
import { Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineCheckCircle, AiOutlineSearch } from "react-icons/ai"
import axios from "axios";
import URL, { imgURL } from "../../Url";
import { Oval } from 'react-loader-spinner';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CreatePurchase = () => {
    const Navigate = useNavigate()
    const [proloader, setProLoader] = useState(false)
    const [allSupplier, setAllSupplier] = useState([])
    const [allWarehouse, setAllWarehouse] = useState([])
    const [allProduct, setAllProduct] = useState([])
    const [prod, setProd] = useState([])
    const [supplierId, setSupplierId] = useState("")
    const [warehouseId, setWarehouseId] = useState("")
    const [allData, setAllData] = useState([]);
    const [query, setQuery] = useState("")
    const [checkboxes, setCheckboxes] = useState(Array(allData.length).fill(false));
    const purchaseProduct = (e, index, item) => {
        if (e.target.checked) {
            setAllData((prevProArr) => [
                ...prevProArr, {
                    ...item,
                    qty: 0,
                    proId: item._id,
                    productPrice: item.productCost,
                },
            ]);
            const newCheckboxes = [...checkboxes];
            newCheckboxes[index] = e.target.checked;
            setCheckboxes(newCheckboxes);
        }

        else {
            const upData = allData?.filter((i) => i?._id !== item?._id)
            setAllData(upData)
        }
    }

    const searchQD = useMemo(() => (prod?.filter((d) => (
        d.productName.toLowerCase().includes(query.toLowerCase())
    ))), [prod, query])
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
        if (supplierId === "") {
            return toast.error("Select Supplier")
        } else if (warehouseId === "") {
            return toast.error("Select Warehouse")
        } else if (!localStorage.getItem("dateSet")) {
            return toast.error("First Set Date")
        }

        const params = {
            supplierId: supplierId,
            warehouse: warehouseId,
            purchaseDetail: allData
        }
        console.log(params)
        axios.post(`${URL}/purchasedetail/create`, params).then((res) => {
            if (res?.data?.status === 200) {
                toast.success("Send")
                axios.get(`${URL}/product`).then((res) => {
                    const productsArr = res?.data?.data.map(item => ({ ...item, total: 0 }))
                    setProd(productsArr)
                    Navigate("/allpurchase")
                })
            }
            else {
                console.log("Not submitted")
            }
        })


    }
    const checkTotal = (e, i, item) => {
        const tempProducts = [...prod]
        tempProducts[i].total = parseInt(e.target.value) * tempProducts[i]?.productCost
        const newData = [...allData]
        const index = newData.findIndex((element) => element?._id === item?._id);
        newData[index].qty = parseInt(e.target.value)
        setAllData(newData)
    }

    return (
        <div>
            <p className='dashboadHeading' >Add Purchase</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Supplier*</label>
                        <select className="productCreateInput" id="supplierId" onChange={(e) => searchProduct(e)}>
                            <option selected value={""}>---Choose Supplier---</option>
                            {allSupplier && allSupplier?.map((item) => (
                                <option value={item?._id}>{item?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
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
                    <Space.Compact size="large" style={{ backgroundColor: "rgba(40, 129, 201, 0.055)" }}>
                        <Input addonBefore={<SearchOutlined />} placeholder="Search Product" value={query} onChange={(e) => { setQuery(e?.target?.value) }} />
                    </Space.Compact>
                </div>
                <div className="table-responsive-md mt-5 mx-3">
                    <table className="table">
                        <thead>
                            <tr className="table-primary">
                                <td scope="col" className="productCreateTxt fw-semibold">#</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Image</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Product Name</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Purchase Price</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Sale Price</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Available Stock</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Purchase Quantity</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Grand Total</td>
                                {/* <td scope="col" className="productCreateTxt fw-semibold">Action</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            {searchQD && searchQD.map((p, i) => (
                                <tr key={i}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={checkboxes[i]}
                                            onChange={(e) => {
                                                purchaseProduct(e, i, p);
                                            }}
                                        />
                                    </td>
                                    <td><img src={`${imgURL}/${p?.imageUrl}`} alt="missing img" style={{ "borderRadius": "0.5rem", "height": "4em", "width": "4em" }} ></img></td>
                                    <td>{p.productName}</td>
                                    <td>PKR {p.productCost}</td>
                                    <td>PKR {p.productPrice}</td>
                                    <td>{p.quantity} {p?.unitProduct}</td>
                                    <td style={{ width: "150px" }}>
                                        <input
                                            type="number"
                                            id="qty"
                                            disabled={!checkboxes[i]}
                                            onChange={(e) => {
                                                checkTotal(e, i, p);
                                            }}
                                            className="productCreateInput"
                                            style={{ width: "100px" }}
                                        />
                                    </td>
                                    <td style={{ width: "120px" }}>
                                        <input
                                            disabled
                                            value={p?.total}
                                            className="productCreateInput"
                                            style={{ width: "100px" }}
                                        />
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
            <button className="btn btn-info btn-md ms-4" style={{ width: "120px" }} onClick={fn_submit} >
                <AiOutlineCheckCircle className="submitProductIcon text-dark" />Submit
            </button>
            <br /><br />
        </div>
    )
}

export default CreatePurchase
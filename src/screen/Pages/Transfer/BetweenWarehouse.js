import React, { useEffect, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd'
import { AiOutlineCheckCircle } from "react-icons/ai"
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { imgURL } from "../../Url";

const BetweenWarehouse = ({ URL, allWarehouse, Oval }) => {
    const navigate = useNavigate()
    const [proloader, setProLoader] = useState(false)
    const [submitloader, setSubmitLoader] = useState(false)
    const [fromWarehoue, setFromWarehoue] = useState("")
    const [toWarehoue, setToWarehoue] = useState("")
    const [Check, setCheck] = useState({});
    const [wareCh, setWareCH] = useState([])
    const [wareValueCh, setWareValueCH] = useState([])

    const [warehouseAll, setWarehouseAll] = useState([]);
    const [allProduct, setAllProduct] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [searchSelectedProduct, setSearchSelectedProduct] = useState([])
    const [checkboxes, setCheckboxes] = useState(Array(selectedProduct.length).fill(false));
    useEffect(() => {
        setProLoader(true)
        setSearchSelectedProduct([])
        axios.get(`${URL}/product/getwhproduct/${fromWarehoue}`).then((res) => {
            setProLoader(false)
            setAllProduct(res?.data?.data)
            setSearchSelectedProduct(res?.data?.data)
        })
        axios.get(`${URL}/warehouse`).then((res) => {
            setWarehouseAll(res?.data?.data)
        })
    }, [fromWarehoue])
    const fn_selectProduct = (e, i) => {
        if (e?.target?.checked) {
            setSelectedProduct(prevItems => [...selectedProduct, { proId: e.target.value, groupId: e?.target?.id, qty: "" }])
        } else {
            setSelectedProduct(perItems => perItems?.filter(i => i?.proId !== e?.target?.value))
        }
        const newCheckboxes = [...checkboxes];
        newCheckboxes[i] = e.target.checked;
        setCheckboxes(newCheckboxes);
    }
    const handleQtyChange = (event, productId, it) => {
        const newQty = event.target.value;
        setWareValueCH(event.target.value)
        const itemConf = it?.filter(i => i?.proId === productId)[0]?.qty
        setCheck((pre) => { return { ...pre, newQty: newQty, itemConf: itemConf } })

        setSelectedProduct(prevSelectedProducts =>
            prevSelectedProducts.map(item =>
                item.proId === productId ? { ...item, qty: parseInt(newQty) } : item
            )
        )
    }
    const fn_searchProduct = (e) => {
        const searchTerm = e?.target?.value;
        setSearchSelectedProduct(
            allProduct?.filter((product) =>
                product?.productName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }
    const fn_submit = () => {
        console.log("wareCh", wareCh)
        if (fromWarehoue === toWarehoue) {
            return toast.error("Incorrect Warehouses")
        } else if (selectedProduct?.length === 0) {
            return toast.error("Select Product")
        }

        else {


            const params = {
                fromWareHouseId: fromWarehoue,
                toWareHouseId: toWarehoue,
                prodIds: selectedProduct
            }
            axios.patch(`${URL}/warehouse/wareToware`, params).then((res) => {
                setSubmitLoader(true)
                if (res?.data?.status === 200) {
                    setSubmitLoader(false)
                    toast.success("Product Transferred")
                    navigate("/alltransfer")
                }
                else {
                    toast.error(res?.data?.error)
                }
            })
        }
    }
    return (
        <>
            <div className="productMainBox">
                <div className="row">
                    {/* <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Date*</label>
                        <input type="date" className="productCreateInput" />
                    </div> */}
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">From Warehouse*</label>
                        <select className="productCreateInput" required value={fromWarehoue} onChange={(e) => setFromWarehoue(e?.target?.value)}>
                            <option selected value={""}>---Select Warehouse---</option>
                            {allWarehouse && allWarehouse?.map((item) => (
                                <option value={item?._id}>{item?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">To Warehouse*</label>
                        <select className="productCreateInput" required onChange={(e) => setToWarehoue(e?.target?.value)}>
                            <option selected value={""}>---Select Warehouse---</option>
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
                        <Input addonBefore={<SearchOutlined />} placeholder="Search Product By Name" onChange={(e) => fn_searchProduct(e)} />
                    </Space.Compact>
                </div>
                <div className="table-responsive-md mt-5 mx-3">
                    <table className="table">
                        <thead>
                            <tr className="table-primary">
                                <td className="productCreateTxt fw-semibold">Select</td>
                                <td className="productCreateTxt fw-semibold">Product Image</td>
                                <td className="productCreateTxt fw-semibold">Product Name</td>
                                <td className="productCreateTxt fw-semibold">Group</td>
                                <td className="productCreateTxt fw-semibold">Net Unit Cost</td>
                                <td className="productCreateTxt fw-semibold">Current Stock</td>
                                <td className="productCreateTxt fw-semibold">Transfer Stock</td>
                            </tr>
                        </thead>
                        <tbody>
                            {proloader === true && (
                                <Oval
                                    height={40}
                                    width={40}
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
                            {searchSelectedProduct && searchSelectedProduct?.map((item, i) => (
                                <tr>
                                    <td><input type="checkbox" checked={checkboxes[i]} value={item?._id} id={item?.group?._id} onChange={(e) => fn_selectProduct(e, i)} /></td>
                                    <td>
                                        <div>
                                            <img src={`${imgURL}/${item?.imageUrl}`} style={{ "borderRadius": "0.5rem", "height": "4em", "width": "4em" }} alt="missing" />
                                        </div>
                                    </td>
                                    <td>{item?.productName}</td>
                                    <td>{item?.group?.grpName}</td>
                                    <td>PKR {item?.productPrice}</td>
                                    <td>{item?.warehouse?.find((wh) => wh?._id === fromWarehoue)?.productIds?.find((pWh) => pWh?.proId === item?._id)?.qty > 0 ? item?.warehouse?.find((wh) => wh?._id === fromWarehoue)?.productIds?.find((pWh) => pWh?.proId === item?._id)?.qty : 0}</td>
                                    <td><input type="number" disabled={!checkboxes[i]} className="productCreateInput" id={item?.warehouse[0]?.productIds?.filter(i => i?.proId === item?._id)[0]?.qty} onChange={e => {
                                        handleQtyChange(e, item?._id, item?.warehouse[i]?.productIds); 
                                    }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="productMainBox">
                <div className="row">
                    {/* <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Order Tax</label>
                        <input type="date" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Discount</label>
                        <input type="text" className="productCreateInput" defaultValue={0} />
                        <select className="productCreateInput">
                            <option selected>Fixed</option>
                            <option>Percent %</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Shipping</label>
                        <input type="text" className="productCreateInput" defaultValue={0} />
                    </div> */}
                    {/* <div className="col-12 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Please Prove any Details*</label>
                        <textarea type="number" className="productCreateTextArea" placeholder="Please Prove any Details" />
                    </div> */}
                </div>
                <div className="d-flex align-items-center gap-3">
                    <button className="new_Warehouse btn btn-info btn-md m-1" onClick={fn_submit}>
                        <AiOutlineCheckCircle className="submitProductIcon text-dark" />Submit
                    </button>
                    {submitloader === true && (
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
                </div>
            </div>
        </>
    )
}

export default BetweenWarehouse
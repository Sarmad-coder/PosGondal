import React, { useEffect, useState } from "react"
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd'
import axios from "axios";
import URL from "../../Url";
import { AiOutlineCheckCircle } from "react-icons/ai"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePurchaseReturn = () => {
    const navigate = useNavigate()
    const [allPurchase, setAllPurchase] = useState([])
    // const [allSupplier, setAllSupplier] = useState([])
    // const [allWarehouse, setAllWarehouse] = useState([])
    const [productArr, setproductArr] = useState([])

    useEffect(() => {
        axios.get(`${URL}/purchasedetail/get`).then((res) => {
            const updatedOrders = res?.data?.data.map((order) => ({
                ...order,
                returnQty: 1,
            }));
            setAllPurchase(updatedOrders)
        })
        // axios.get(`${URL}/supplier`).then((res) => {
        //     setAllSupplier(res.data?.data)
        // })
        // axios.get(`${URL}/warehouse`).then((res) => {
        //     setAllWarehouse(res.data?.data)
        // })
    }, [])
    const fn_addProduct = (e, item) => {
        if (e?.target?.checked === true) {
            setproductArr(prev => [...prev, {
                supplierId: item?.supplier?._id,
                warehouseId: item?.warehouse?._id,
                product: item,
                returnQty: item?.returnQty,
                setDate: localStorage.getItem("dateSet")
            }])
        } else {
            const filArr = productArr?.filter(i => i?.product?._id !== item?._id)
            setproductArr(filArr)
        }
    }
    const handleDecrement = (item) => {

        const Order = [...allPurchase]
        const pro = [...productArr]
        const findPro = (pro?.find(i => i?.product?._id === item?._id))

        // if (!findPro?.supplierId || !findPro?.warehouseId) {
        //     return toast.error("Please select product first")
        // }
        const findItem = (Order?.find(i => i?._id === item?._id))
        item.returnQty -= 1
        const index = Order?.findIndex(i => i?._id === item?._id)
        const indexPro = pro?.findIndex(i => i?.product?._id === item?._id)
        Order[index] = findItem
        pro[indexPro] = findPro
        setAllPurchase(Order)


    };
    const handleIncrement = (item) => {

        const Order = [...allPurchase]
        const pro = [...productArr]
        const findPro = (pro?.find(i => i?.product?._id === item?._id))
        // if (!findPro?.supplierId || !findPro?.warehouseId) {
        //     return toast.error("Please select product first")
        // }
        const findItem = (Order?.find(i => i?._id === item?._id))
        item.returnQty += 1
        const index = Order?.findIndex(i => i?._id === item?._id)
        const indexPro = pro?.findIndex(i => i?.product?._id === item?._id)
        Order[index] = findItem
        pro[indexPro] = findPro
        setAllPurchase(Order)
    };
    const fn_submit = () => {
        if (productArr?.length < 1) {
            return toast.error("Select Product")
        }
        // return console.log(productArr)
        axios.post(`${URL}/purchasereturn/purchasereturn`, productArr).then((res) => {
            if (res?.data?.status === 200) {
                toast.success("Task Updated")
                navigate("/purchasereturn")
            } else {
                toast.error(res?.data?.message)
            }
        })
    }
    return (
        <div>
            <p className='dashboadHeading' >Create Purchase Return</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">

                <div className="table-responsive-md mt-5 mx-3">
                    <table className="table">
                        <thead>
                            <tr className="table-primary">
                                <td className="productCreateTxt fw-semibold">Select</td>
                                <td className="productCreateTxt fw-semibold">Date</td>
                                <td className="productCreateTxt fw-semibold">Supplier</td>
                                <td className="productCreateTxt fw-semibold">Warehouse</td>
                                <td className="productCreateTxt fw-semibold">Product</td>
                                <td className="productCreateTxt fw-semibold">Quantity</td>
                                <td className="productCreateTxt fw-semibold">Total Amount</td>
                                <td className="productCreateTxt fw-semibold">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {allPurchase && allPurchase?.map((item) => (

                                <tr>
                                    <td className="productCreateTxt">
                                        <input type="checkbox" onChange={(e) => fn_addProduct(e, item)} />
                                    </td>
                                    <td className="productCreateTxt">{new Date(item?.createdAt).toDateString()}</td>
                                    <td className="productCreateTxt">{item?.supplier?.name}</td>
                                    <td className="productCreateTxt">{item?.warehouse?.name}</td>
                                    <td className="productCreateTxt">{item?.productName}</td>
                                    <td className="productCreateTxt">{item?.quantity} {item?.unitProduct}</td>
                                    <td className="productCreateTxt">PKR {item?.productPrice * item?.quantity}</td>
                                    <td className="productCreateTxt">
                                        <td className="productCreateTxt">
                                            <button
                                                // disabled={productArr?.find(k => k?.product?._id === item?._id)?.returnQty > 0 ? false : true}
                                                disabled={item?.returnQty === 1 ? true : false}
                                                className="btn btn-sm btn-info me-1" style={{ lineHeight: "1rem" }} onClick={() => handleDecrement(item)}>-</button>
                                            <span>{item?.returnQty}</span>
                                            <button
                                                disabled={item?.returnQty === item?.quantity ? true : false}
                                                className="btn btn-sm btn-info ms-1" style={{ lineHeight: "1rem" }} onClick={() => handleIncrement(item)}>+</button>
                                        </td>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="new_Warehouse btn btn-info btn-md m-1" onClick={fn_submit}>
                        <AiOutlineCheckCircle className="submitProductIcon text-dark" />Submit
                    </button>
                </div>
            </div>
        </div>)
}

export default CreatePurchaseReturn
import React, { useEffect, useState } from "react"
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd'
import axios from "axios";
import URL from "../../Url";
import { AiOutlineCheckCircle } from "react-icons/ai"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateSaleReturn = () => {
    const navigate = useNavigate()
    const [allOrder, setAllOrder] = useState([])
    // const [allCustomer, setAllCustomer] = useState([])
    // const [allWarehouse, setAllWarehouse] = useState([])
    const [productArr, setproductArr] = useState([])
    useEffect(() => {
        axios.get(`${URL}/customerorder`).then((res) => {
            const updatedOrders = res?.data?.data.map((order) => ({
                ...order,
                productDetail: order.productDetail.map((product) => ({
                    ...product,
                    returnQty: 1,
                })),
            }));
            setAllOrder(updatedOrders)
        })
        // axios.get(`${URL}/customer`).then((res) => {
        //     setAllCustomer(res?.data?.data)
        // })
        // axios.get(`${URL}/warehouse`).then((res) => {
        //     setAllWarehouse(res?.data?.data)
        // })
    }, [])
    const fn_addProduct = (e, item, cus, wh, invoiceNo, index) => {

        if (e?.target?.checked === true) {
            setproductArr(prev => [...prev, {
                customerId: cus,
                warehouseId: wh,
                product: item,
                returnQty: item?.returnQty,
                invoiceNo,
                setDate: localStorage.getItem("dateSet")
            }])
        } else {
            // const filArr = productArr?.filter(i => i?.product?._id !== item?._id && i?.customerId !== cus)
            const tempProducts = [...productArr]
            tempProducts.splice(index, 1)
            setproductArr(tempProducts)
        }
    }
    const handleDecrement = (item, customerId) => {
        const updatedOrder = allOrder.map(orderItem => {
            if (orderItem.customerId === customerId) {
                const updatedProductDetail = orderItem.productDetail.map(detail => {
                    if (detail._id === item._id) {
                        // Ensure returnQty doesn't go below 0
                        const updatedReturnQty = Math.max(detail.returnQty - 1, 0);
                        return { ...detail, returnQty: updatedReturnQty };
                    }
                    return detail;
                });

                return { ...orderItem, productDetail: updatedProductDetail };
            }
            return orderItem;
        });

        setAllOrder(updatedOrder);
    };


    // const handleIncrement = (item, cus) => {

    //     const Order = [...allOrder]
    //     const pro = [...productArr]
    //     const findItem = (Order?.find(i => i?.customerId === cus && i?.productDetail?.map(i => i?._id === item?._id)))
    //     const findPro = (pro?.find(i => i?.customerId === cus && i?.product?._id === item?._id))
    //     findPro.returnQty += 1
    //     item.returnQty += 1
    //     // if (item?.returnQty < item?.whQty) {
    //     //     return item.returnQty === item.whQty
    //     // }
    //     const index = Order?.findIndex(i => i?.customerId === cus && i?.productDetail?.map(i => i?._id === item?._id))
    //     const indexPro = pro?.findIndex(i => i?.customerId === cus && i?.product?._id === item?._id)
    //     Order[index] = findItem
    //     pro[indexPro] = findPro
    //     setAllOrder(Order)
    // };
    const handleIncrement = (item, cus) => {
        const Order = [...allOrder]
        const pro = [...productArr]
        const findItem = (Order?.find(i => i?.customerId === cus && i?.productDetail?.map(i => i?._id === item?._id)))
        const findPro = (pro?.find(i => i?.customerId === cus && i?.product?._id === item?._id))
        console.log(findPro)
        if (!findPro) {
            return toast.error("Please select product first")
        }
        findPro.returnQty += 1
        item.returnQty += 1
        if (item?.returnQty < item?.whQty) {
            return item.returnQty === item.whQty
        }
        const index = Order?.findIndex(i => i?.customerId === cus && i?.productDetail?.map(i => i?._id === item?._id))
        const indexPro = pro?.findIndex(i => i?.customerId === cus && i?.product?._id === item?._id)
        Order[index] = findItem
        pro[indexPro] = findPro
        setAllOrder(Order)
    };
    const fn_submit = () => {

        if (productArr?.length === 0) {
            return toast.error("Select Product")
        }
        productArr.map((item) => {
            if (item.returnQty > item.cartQty) {
                return toast.error("Quantity is high")
            }
        })

        // return console.log(productArr)
        axios.post(`${URL}/customerorder/salesreturn`, productArr).then((res) => {

            if (res?.data?.status === 200) {
                toast.success("Data Updated")
                navigate("/salesreturn")
            } else {
                toast.error(res?.data?.message)
            }
        })
    }
    return (
        <div>
            <p className='dashboadHeading' >Create Sale Return</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt mb-1">Search</label>
                    <Space.Compact style={{ backgroundColor: "rgba(40, 129, 201, 0.055)" }}>
                        <Input addonBefore={<SearchOutlined />} placeholder="Search Order By Customer Name" />
                    </Space.Compact>
                </div>
                <div className="table-responsive-md mt-5 mx-3">
                    <table className="table">
                        <thead>
                            <tr className="table-primary">
                                <td className="productCreateTxt fw-semibold">Select</td>
                                <td className="productCreateTxt fw-semibold">Date</td>
                                <td className="productCreateTxt fw-semibold">Customer</td>
                                <td className="productCreateTxt fw-semibold">Warehouse</td>
                                <td className="productCreateTxt fw-semibold">Product</td>
                                <td className="productCreateTxt fw-semibold">Quantity</td>
                                <td className="productCreateTxt fw-semibold">Total</td>
                                <td className="productCreateTxt fw-semibold">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrder && allOrder?.map((item) => (
                                item?.productDetail && (
                                    item?.productDetail?.map((i) => (
                                        <tr key={i.productId}>
                                            <td className="productCreateTxt">
                                                <input type="checkbox" value={item} onChange={(e, index) => fn_addProduct(e, i, item?.customerId, item?.warehouseId, item?.invoiceNo, index)} />
                                            </td>
                                            <td className="productCreateTxt">{new Date(item?.createdAt).toDateString()}</td>
                                            <td className="productCreateTxt">{item?.customerId?.name}</td>
                                            <td className="productCreateTxt">{item?.warehouseId?.name}</td>
                                            <td className="productCreateTxt">{i?.productName}</td>
                                            <td className="productCreateTxt">{i?.cartQty} {i?.unitProduct}</td>
                                            <td className="productCreateTxt">PKR {i?.cartQty * i?.productPrice}</td>
                                            <td className="productCreateTxt">
                                                <button
                                                    disabled={i?.returnQty === 1 ? true : false}
                                                    // disabled={productArr && productArr?.find(k => k?.product?._id === i?._id) ? false : true}
                                                    className="btn btn-sm btn-info me-1" style={{ lineHeight: "1rem" }} onClick={() => handleDecrement(i, item?.customerId)}>-</button>
                                                <span>{i?.returnQty}</span>
                                                <button disabled={i?.returnQty === i?.cartQty ? true : false} className="btn btn-sm btn-info ms-1" style={{ lineHeight: "1rem" }} onClick={() => handleIncrement(i, item?.customerId)}>+</button>
                                                {/* <button disabled={productArr && productArr?.find(k => k?.product?._id === i?._id) ? false : true} className="btn btn-sm btn-info ms-1" style={{ lineHeight: "1rem" }} onClick={() => handleIncrement(i, item?.customerId)}>+</button> */}
                                            </td>
                                        </tr>
                                    ))
                                )
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

export default CreateSaleReturn
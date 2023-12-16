import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MagnifyingGlass } from 'react-loader-spinner';
import { imgURL } from '../../../Url';

const UpdateProduct = ({ modalOpen, setModalOpen, URL,setCost,cost }) => {
    const [allGroup, setAllGroup] = useState([])
    const [foundProduct, setFoundProduct] = useState([])
    const [loader, setLoader] = useState(false)
    const [updatedCost, setUpdatedCost] = useState(0)
    const [updatedPrice, setUpdatedPrice] = useState(0)
    const [updatedBase, setUpdatedBase] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [percentage, setPercentage] = useState(false)
    useEffect(() => {
        axios.get(`${URL}/group`).then((res) => {
            setAllGroup(res?.data?.data)
        })
    }, [])
    const fn_selectGroup = (id) => {
        if (id === "") {
            setLoader(false)
            setFoundProduct([])
            return toast.error("Select Group")
        } else {
            let pGroup=allGroup.find((item)=>{
                return item._id == id
            })
            if (pGroup.grpType=="percent") {
                setPercentage(true)
            }else{
                setPercentage(false)
            }
            setLoader(true)
            axios.get(`${URL}/product/bygroup/${id}`).then((res) => {
                if (res?.data?.status === 200) {
                    setLoader(false)
                    setFoundProduct(res?.data?.data)
                } else {
                    setFoundProduct([])
                    setLoader(false)
                    return toast.error(res?.data?.message)
                }
            })
        }
    }
    const fn_selectProduct = (e) => {
        if (e?.target?.checked) {
            selectedProduct.push(e?.target?.value)
        } else {
            const filter = selectedProduct?.filter(i => i !== e?.target?.value)
            setSelectedProduct(filter)
        }
    }
    const fn_update = () => {
        if (selectedProduct?.length === 0) {
            return toast.error("Select Product to Update")
        } else if (updatedPrice === "") {
            return toast.error("Enter Price")
        } else {
            
            const params = {
                ids: selectedProduct,
                price: parseInt(updatedPrice),
                cost:updatedCost,
                base:updatedBase,
                percentage: percentage
            }
            
            axios.put(`${URL}/product/updateprices`, params).then((res) => {
                console.log(res?.data)
                if (res?.data?.status === 200) {
                    setUpdatedPrice(0)
                    setUpdatedBase(0)
                    setUpdatedCost(0)
                    setSelectedProduct([])
                    setModalOpen(false)
                    document.getElementById("selectGroup").value=""
                    setFoundProduct([])
                    setCost(false)
                    axios.get(`${URL}/group`).then((res) => {
                        setAllGroup(res?.data?.data)
                    })
                    return toast.success("Price Updated")
                } else {
                    return toast.error(res?.data?.message)
                }
            })
        }
    }
    return (
        <div>
            <Modal
                title="Update Product"
                style={{ top: 20 }}
                open={modalOpen}
                onOk={() => { setModalOpen(false) }}
                onCancel={() => { setModalOpen(false) }}
                width={700}
                footer={[
                    <Button key="primary" onClick={() => {
                        setModalOpen(false)
                        setFoundProduct([])
                        document.getElementById("selectGroup").value=""
                        setUpdatedPrice(0)
                        setUpdatedBase(0)
                        setUpdatedCost(0)
                        setCost(false)
                    }}>Cancel</Button>,
                    <Button key="ok" type="primary" onClick={fn_update}>Update Products</Button>
                ]}
            >
                <hr />
                <div className="row">
                    <div className="d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Select Group*</label>
                        <select id='selectGroup' className="productCreateInput" name="productBrand" required onChange={(e) => fn_selectGroup(e?.target?.value)}>
                            <option selected value={""}>---Choose Group---</option>
                            {allGroup && allGroup?.map((item) => (
                                <option value={item?._id}>{item?.grpName}</option>
                            ))}
                        </select>
                    </div>
                    {loader === true && (
                        <MagnifyingGlass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="MagnifyingGlass-loading"
                            wrapperClass="MagnifyingGlass-wrapper"
                            glassColor='#fff'
                            color='#B2C4FF'
                        />
                    )}

                    {foundProduct?.length > 0 && (
                        <>
                            <table style={{ width: "100%", tableLayout: "fixed" }} className='table'>
                                <tr style={{ lineHeight: "3rem" }} className='bg-info'>
                                    <th className='ps-2'>Select</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Avaiable Qty</th>
                                    <th>Cost (PKR)</th>
                                    {!cost&&<th>Price (PKR)</th>}
                                    {cost&&percentage&&<th>Base Price (PKR)</th>}
                                </tr>
                                {foundProduct?.map((item) => (
                                    <tr style={{ borderBottom: "1px solid #B2C4FF" }}>
                                        <td><input className='checkbox' type='checkbox' value={item?._id} onChange={(e) => fn_selectProduct(e)} /></td>
                                        <td>
                                            <div>
                                                <img src={`${imgURL}/${item?.imageUrl}`} height={"50px"} />
                                            </div>
                                        </td>
                                        <td>{item?.productName}</td>
                                        <td>{item?.quantity}</td>
                                        {cost&&percentage&&<td>PKR{item?.basePrice}</td>}
                                        <td>PKR{item?.productCost}</td>
                                        {!cost&&<td>PKR{item?.productPrice}</td>}
                                    </tr>
                                ))}
                            </table>
                            {percentage&&cost&&<div className="d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Base Price to Update</label>
                                <input type='number' className="productCreateInput" placeholder="Enter percentage to update price" value={updatedBase} required onChange={(e) => setUpdatedBase(e?.target?.value)} />
                            </div>}
                            {percentage&&cost&&<div className="d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Cost Price to Update By Percent</label>
                                <input type='number' className="productCreateInput" placeholder="Enter percentage to update price" value={updatedCost} required onChange={(e) => setUpdatedCost(e?.target?.value)} />
                            </div>}
                            {!percentage&&cost&&<div className="d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Cost Price to Update</label>
                                <input type='number' className="productCreateInput" placeholder="Enter percentage to update price" value={updatedCost} required onChange={(e) => setUpdatedCost(e?.target?.value)} />
                            </div>}
                            {!cost&&percentage?<div className="d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Price to Update By Percent</label>
                                <input type='number' className="productCreateInput" placeholder="Enter percentage to update price" value={updatedPrice} required onChange={(e) => setUpdatedPrice(e?.target?.value)} />
                            </div>:
                           !cost&& <div className="d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Price to Update(PKR)*</label>
                                <input type='number' className="productCreateInput" placeholder="Enter Price to Update" value={updatedPrice} required onChange={(e) => setUpdatedPrice(e?.target?.value)} />
                            </div>}

                            <Button type="primary" onClick={() => {
                                let checkbox = document.getElementsByClassName("checkbox");
                                for (let index = 0; index < checkbox.length; index++) {
                                    
                                    checkbox[index].checked = true
                                    const e = { target: checkbox[index] };
                                    fn_selectProduct(e);

                                }
                            }}>Select All</Button>
                        </>
                    )}


                </div>
            </Modal>
        </div>
    );
}

export default UpdateProduct;

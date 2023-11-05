import axios from "axios"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"


const UpdateWarehouse = ({ Modal, Button, updateModalOpen, setUpdateModalOpen, URL, setAllWarehouse, warehouseDetails }) => {
    const [propsDetails, setPropsDetails] = useState({name:"",phone:"",country:"",city:"",email:"",zipCode:""})
    useEffect(() => {
        setPropsDetails({
            name:warehouseDetails.name,
            phone:warehouseDetails.phone,
            country:warehouseDetails.country,
            city:warehouseDetails.city,
            email:warehouseDetails.email,
            zipCode:warehouseDetails.zipCode
        })
    }, [warehouseDetails])


    const ChangeSet = (e)=>{
        const {value, name} = e.target
        setPropsDetails({...propsDetails , [name]:value})
    }
    const fn_handleUpdate = (id) => {
        console.log(propsDetails)
        // const params = {
            // propsDetails
            // name: document.getElementById("warehouseName") onChange={(e)=>ChangeSet(e)} .value,
            // phone: document.getElementById("warehousePhone") onChange={(e)=>ChangeSet(e)} .value,
            // country: document.getElementById("warehouseCountry") onChange={(e)=>ChangeSet(e)} .value,
            // city: document.getElementById("warehouseCity") onChange={(e)=>ChangeSet(e)} .value,
            // email: document.getElementById("warehouseEmail") onChange={(e)=>ChangeSet(e)} .value,
            // zipCode: document.getElementById("warehouseZipCode") onChange={(e)=>ChangeSet(e)} .value
        // }
        axios.patch(`${URL}/warehouse/${id}`, propsDetails).then((res) => {
            if (res?.data?.status === 200) {
                toast.success("Updated")
                setUpdateModalOpen(false)
                setPropsDetails("")
                axios.get(`${URL}/warehouse`).then((res) => {
                    setAllWarehouse(res?.data?.data)
                })
            } else {
                toast.error(res?.data?.message)
            }
        })
    }
    return (
        <Modal
            title="Update Warehouse"
            style={{ top: 20 }}
            open={updateModalOpen}
            onOk={() => setUpdateModalOpen(false)}
            onCancel={() => setUpdateModalOpen(false)}
            width={800}
            footer={[
                <Button key="cancel" onClick={() => setUpdateModalOpen(false)}>Cancel</Button>,
                <Button key="ok" type="primary" onClick={() => {
                    fn_handleUpdate(warehouseDetails?._id)
                }}>Update</Button>
            ]}
        >
            <hr />
            <div className="row">
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Name*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Name" id="warehouseName" required onChange={(e)=>ChangeSet(e)} name="name"  value={propsDetails?.name} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Phone*</label>
                    <input type="text" className="productCreateInput" name="phone" placeholder="Enter Warehouse Phone" id="warehousePhone" required onChange={(e)=>ChangeSet(e)}  value={propsDetails?.phone} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Country*</label>
                    <input type="text" className="productCreateInput" name="country" placeholder="Enter Warehouse Country" id="warehouseCountry" required onChange={(e)=>ChangeSet(e)}  value={propsDetails?.country} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">City*</label>
                    <input type="text" className="productCreateInput" name="city" placeholder="Enter Warehouse City" id="warehouseCity" required onChange={(e)=>ChangeSet(e)}  value={propsDetails?.city} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Email*</label>
                    <input type="text" className="productCreateInput" name="email" placeholder="Enter Warehouse Email" id="warehouseEmail" required onChange={(e)=>ChangeSet(e)}  value={propsDetails?.email} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Zip Code*</label>
                    <input type="text" className="productCreateInput" name="zipcode" placeholder="Enter Warehouse Zip Code" id="warehouseZipCode" required onChange={(e)=>ChangeSet(e)}  value={propsDetails?.zipCode} />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateWarehouse
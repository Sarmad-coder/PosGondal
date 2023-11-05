import axios from "axios"
import React from "react"
import { toast } from "react-toastify"


const CreateWarehouse = ({ Modal, Button, modalOpen, setModalOpen, URL, setAllWarehouse }) => {
    const fn_handleCreate = () => {
        const params = {
            name: document.getElementById("warehouseName").value,
            phone: document.getElementById("warehousePhone").value,
            country: document.getElementById("warehouseCountry").value,
            city: document.getElementById("warehouseCity").value,
            email: document.getElementById("warehouseEmail").value,
            zipCode: document.getElementById("warehouseZipCode").value,
            password: document.getElementById("warehousePassword").value
        }
        console.log(params)
        axios.post(`${URL}/warehouse`, params).then((res) => {
            console.log(res?.data)
            if (res?.data?.status === 200) {
                toast.success("Warehouse Created")
                setModalOpen(false)
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
            title="Create Warehouse"
            style={{ top: 20 }}
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
            width={800}
            footer={[
                <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>,
                <Button key="ok" type="primary" onClick={() => {
                    fn_handleCreate()
                }}>Create</Button>
            ]}
        >
            <hr />
            <div className="row">
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Name*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Name" id="warehouseName" required />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Phone*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Phone" id="warehousePhone" required />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Country*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Country" id="warehouseCountry" required />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">City*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse City" id="warehouseCity" required />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Email*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Email" id="warehouseEmail" required />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Zip Code*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Zip Code" id="warehouseZipCode" required />
                </div>
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Password*</label>
                    <input type="password" className="productCreateInput" placeholder="Enter Warehouse Password" id="warehousePassword" required />
                </div>
            </div>
        </Modal>
    )
}

export default CreateWarehouse
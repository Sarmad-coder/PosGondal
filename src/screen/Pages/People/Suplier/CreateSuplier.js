import React, { useState } from 'react'
import axios from 'axios';
import URL from '../../../Url';
import { toast } from 'react-toastify';
const CreateSuplier = ({ modalOpen, setModalOpen, Modal, Button, setGetSuplier, title }) => {

    const [suplierData, setSuplierData] = useState({ name: "", email: "", country: "", city: "", phone: "", address: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSuplierData({ ...suplierData, [name]: value })
    }

    const submit = () => {
        console.log("Submitted!")
        console.log(suplierData);
        if (suplierData.name === "" || suplierData.email === "" || suplierData.country === "" || suplierData.city === "" || suplierData.phone === "" || suplierData.address === "") {
            toast.error("Fill all the fields")
        }
        else {
            axios.post(`${URL}/supplier`, suplierData)
                .then((res) => {
                    if (res?.data?.status === 200) {
                        setModalOpen(false)
                        toast.success("Supplier Added!")
                        axios.get(`${URL}/supplier`)
                            .then((res) => {
                                console.log(res?.data?.data)
                                setGetSuplier(res?.data?.data?.reverse())
                            })
                    }
                    else {
                        toast.success(res.data.message)
                    }
                })
        }
    }
    return (
        <div>
            <Modal
                title="Create"
                style={{ top: 20 }}
                width={800}
                open={modalOpen}
                onOk={() => { setModalOpen(false) }}
                onCancel={() => { setModalOpen(false) }}
                footer={[<Button key="cancel" onClick={() => { setModalOpen(false) }}>Cancel</Button>,
                <Button key="ok" type="primary" onClick={submit}>Submit</Button>]
                }
            >

                <div className="row">
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Name*</label>
                        <input type="text" name="name" value={suplierData.name} onChange={handleChange} className="productCreateInput" placeholder="Name" required />
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Email*</label>
                        <input type="text" name="email" value={suplierData.email} onChange={handleChange} className="productCreateInput" placeholder="Email" required />
                    </div>

                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Country*</label>
                        <input type="text" name="country" value={suplierData.country} onChange={handleChange} className="productCreateInput" placeholder="Country" required />
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">City*</label>
                        <input type="text" name="city" value={suplierData.city} onChange={handleChange} className="productCreateInput" placeholder="City" required />
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Phone*</label>
                        <input type="text" name="phone" value={suplierData.phone} onChange={handleChange} className="productCreateInput" placeholder="Phone" required />
                    </div><div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Address*</label>
                        <input type="text" name="address" value={suplierData.purchaseReturnDue} onChange={handleChange} className="productCreateInput" placeholder="Address" required />
                    </div>

                </div>



            </Modal>


        </div>
    )
}

export default CreateSuplier 

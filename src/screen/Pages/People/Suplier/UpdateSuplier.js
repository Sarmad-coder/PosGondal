import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import URL from '../../../Url';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateSuplier = ({ modalUpdate, setModalUpdate,setGetSuplier, dataToupdate }) => {

    // const [name , setName] = useState("")
    const [data, setData] = useState({ name: "", email: "", country: "", city: "", phone: "", address: "" })


    useEffect(() => {
        setData({ name: dataToupdate.name, email: dataToupdate.email, country: dataToupdate.country, city: dataToupdate.city, phone: dataToupdate.phone, address: dataToupdate.address });

    }, [dataToupdate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }



    const submit = (id) => {
        axios.patch(`${URL}/supplier/${id}`,data).then((res)=>{
            if(res?.data?.status===200){
                toast.success("Updated!")
                setModalUpdate(false)
                axios.get(`${URL}/supplier`).then((res)=>{
                    setGetSuplier(res?.data?.data);
                })
            }
            else{
                console.error("Not Updated!")
            }
        })
    }

    return (
        <div>
            <Modal
                title={"Update"}
                style={{ top: 20 }}
                width={800}
                open={modalUpdate}
                onOk={() => { setModalUpdate(false) }}
                onCancel={() => { setModalUpdate(false) }}
                footer={[<Button key="cancel" onClick={() => { setModalUpdate(false) }}>Cancel</Button>,
                <Button key="ok" type="primary" onClick={()=>{submit(dataToupdate._id); }}>Submit</Button>]
                }
            >

                <div className="row">
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Name*</label>
                        <input type="text" name="name" value={data.name} onChange={(e) => { handleChange(e) }} className="productCreateInput" placeholder="Name" required />
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Email*</label>
                        <input type="text" name="email" value={data.email} onChange={(e) => { handleChange(e) }} className="productCreateInput" placeholder="Email" />
                    </div>

                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Country*</label>
                        <input type="text" name="country" value={data.country} onChange={(e) => { handleChange(e) }} className="productCreateInput" placeholder="Country" required />
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">City*</label>
                        <input type="text" name="city" value={data.city} onChange={(e) => { handleChange(e) }} className="productCreateInput" placeholder="City" required />
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Phone*</label>
                        <input type="text" name="phone" value={data.phone} onChange={(e) => { handleChange(e) }} className="productCreateInput" placeholder="Phone" required />
                    </div><div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Address*</label>
                        <input type="text" name="address" value={data.address} onChange={(e) => { handleChange(e) }} className="productCreateInput" placeholder="Address" required />
                    </div>

                </div>



            </Modal>
        </div>
    );
}

export default UpdateSuplier;

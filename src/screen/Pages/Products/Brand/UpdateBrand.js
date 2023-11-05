import { Button, Modal, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import URL from '../../../Url';
import { toast } from 'react-toastify';
// import { imgURL } from '../../../Url';

const UpdateBrand = ({ modalUpdateData, setAllBrand, modalOpenTwo, setModalOpenTwo }) => {
    const [data, setData] = useState({});
    const [im, setIm] = useState({})
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            // image: modalUpdateData?.imageUrl || null,
            name: modalUpdateData?.brandName,
            desc: modalUpdateData?.brandDetail,
        }));
        setIm(modalUpdateData?.imageUrl)
    }, [modalUpdateData]);


    const updateData = (e) => {
        const { name, value } = e?.target;
        setData({ ...data, [name]: value });
    }
    const updateImg = (e)=>{
        setIm(e?.target?.files[0])
    }


    const update = (id) => {
        const formData = new FormData();
        formData.append('brandName', data.name);
        formData.append('brandDetail', data.desc);
        formData.append('imageUrl', im);
        axios.patch(`${URL}/brand/${id}`, formData).then((res) => {
            if (res?.data?.status === 200) {
                console.log("updated");
                toast.success("Updated!");
                setModalOpenTwo(false);
                axios.get(`${URL}/brand`).then((res) => {
                    setAllBrand(res?.data?.data)
                })
            }
            else {
                toast.error("Data Not Updated!")
            }
        })
        setData({})
        setIm({})
    }

    return (
        <div>
            <Modal
                title="Update"
                style={{ "top": "20", "fontSize": "2em" }}
                open={modalOpenTwo}
                onOk={() => setModalOpenTwo(false)}
                onCancel={() => setModalOpenTwo(false)}
                footer={[
                    <Button onClick={() => { setModalOpenTwo(false) }} style={{ "color": "green" }}>Cancel</Button>,
                    <Button onClick={() => { update(modalUpdateData._id); }} style={{ "color": "red" }}>Update</Button>
                ]
                }
            >
                <div className="container-fluid">
                    <div className="row">
                        <div className="container">
                            <div className="col-md-12 pt-3">
                                <div className='d-flex align-center d-flex justify-content-between'>
                                    <label htmlFor="image" className='fs-5  pr-5' style={{ "marginTop": "1em" }}>Image</label>
                                    {/* <img src={`${imgURL}/${data?.image?.name}`} style={{"width":"5em", "height":"5em !important"}} alt="Current missing" name="image" /> */}
                                </div>
                                <Input
                                    type="file"
                                    placeholder="Enter new image URL"
                                    accept='image/*'
                                    name='image'
                                    onChange={(e) =>updateImg(e)}
                                />
                            </div>
                            <div className="col-md-12 pt-2">
                                <label htmlFor="Name" className='fs-5'>Name</label>
                                <Input type='text' name='name' value={data?.name} onChange={(e) => { updateData(e) }} />

                            </div>
                            <div className="col-md-12 py-2">
                                <label htmlFor="Description" className='fs-5'>Description</label>
                                <Input type='text' name='desc' value={data?.desc} onChange={(e) => { updateData(e) }} />
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default UpdateBrand;

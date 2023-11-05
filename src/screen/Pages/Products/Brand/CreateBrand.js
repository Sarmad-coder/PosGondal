import axios from "axios"
import React from "react"
import { toast } from "react-toastify"


const CreateBrand = ({ Modal, Button, modalOpen, setModalOpen, URL, setAllBrand }) => {
    const fn_handleCreate = () => {
        const params = new FormData()
        params.append('brandName', document.getElementById("brandName").value)
        params.append('brandDetail', document.getElementById("brandDes").value)
        params.append('imageUrl', document.getElementById("image").files[0])
        axios.post(`${URL}/brand`, params).then((res) => {
            console.log(res?.data)
            if (res?.data?.status === 200) {
                toast.success("Brand Created")
                setModalOpen(false)
                axios.get(`${URL}/brand`).then((res) => {
                    setAllBrand(res?.data?.data)
                })
            } else {
                toast.error(res?.data?.message)
            }
        })
    }
    return (
        <Modal
            title="Create"
            style={{ top: 20 }}
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
            width={600}
            footer={[
                <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>,
                <Button key="ok" type="primary" onClick={() => {
                    fn_handleCreate()
                }}>Create</Button>
            ]}
        >
            <hr />
            <div className="row">
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Name of Brand*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Brand Name" id="brandName" required />
                </div>
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Please provide any details</label>
                    <textarea type="text" className="productCreateTextArea" placeholder="Write Description" id="brandDes" required />
                </div>
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Image*</label>
                    <input type="file" className="productCreateInput" id="image" required style={{ paddingTop: "2.5px" }} />
                </div>
            </div>
        </Modal>
    )
}

export default CreateBrand
import axios from "axios"
import React from "react"
import { toast } from "react-toastify"


const CreateUnit = ({ Modal, Button, modalOpen, setModalOpen, URL, setAllUnit }) => {
    const fn_handleCreate = () => {
        const params = {
            title: document.getElementById("unitName").value,
            shortName: document.getElementById("shortName").value,
        }
        axios.post(`${URL}/unit`, params).then((res) => {
            if (res?.data?.status === 200) {
                toast.success("Unit Created")
                setModalOpen(false)
                axios.get(`${URL}/unit`).then((res) => {
                    setAllUnit(res?.data?.data?.reverse())
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
                    <label className="productCreateTxt">Title*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Unit Name" id="unitName" required />
                </div>
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Short Name*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Short Name" id="shortName" required />
                </div>
            </div>
        </Modal>
    )
}

export default CreateUnit
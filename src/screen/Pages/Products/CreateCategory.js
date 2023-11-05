import axios from "axios";
import React from "react"
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal } from 'antd';
const CreateCategory = ({ key, modalOpen, setModalOpen, setDate, URL }) => {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");

    const obj = {
        grpName: name,
        grpCode: code
    }
    const submit = () => {
        if (obj?.name === "" || obj?.code === "") {
            toast.error("Fill all Fields")
        } else {
            axios.post(`${URL}/group`, obj).then((res) => {
                if (res?.data?.status === 200) {
                    toast.success("Group Added")
                    setModalOpen(false)
                    axios.get(`${URL}/group`).then((res) => {
                        setDate(res?.data?.data?.reverse())
                    })
                } else {
                    toast.success(res.data.message)
                }
            })
        }
    }

    return (
        <>
            <Modal
                title="Create Group"
                style={{ top: 20 }}
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                width={500}
                key={key}
                footer={[
                    <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>,
                    <Button key="ok" type="primary" onClick={submit}>Submit</Button>
                ]}
            >
                <hr />
                <div className="row">
                    <div className="d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Code of Group*</label>
                        <input type="text" name="code" value={code} onChange={(e) => { setCode(e.target.value) }} className="productCreateInput" placeholder="Enter category code" required />
                    </div>
                    <div className="d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Name of Group*</label>
                        <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="productCreateInput" placeholder="Enter category name" required />
                    </div>
                </div>
            </Modal>
            {/* <Category code={code} name={name} /> */}

        </>
    )
}

export default CreateCategory
import axios from "axios"
import React, { useEffect, useState } from "react"


const CreateUser = ({ Modal, Button, modalOpen, setModalOpen, URL, toast, setAllUsers, Oval }) => {
    const [loader, setLoader] = useState(false)
    const [allWarehouse, setAllWarehouse] = useState([])
    useEffect(() => {
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
    }, [])
    const fn_handleCreate = () => {
        if (document.getElementById("fullName").value === "") {
            return toast.error("Enter User Name")
        } else if (document.getElementById("emailAddress").value === "") {
            return toast.error("Enter User Email")
        } else if (document.getElementById("password").value === "") {
            return toast.error("Enter User Password")
        } else if (document.getElementById("repeatPassword").value === "") {
            return toast.error("ReEnter User Password")
        } else if (document.getElementById("repeatPassword").value !== document.getElementById("password").value) {
            return toast.error("Password Not Matched")
        } else if (document.getElementById("status").value === "") {
            return toast.error("Select Status")
        }
        // else if (document.getElementById("role").value === "") {
        //     return toast.error("Select Role")
        // } 
        else if (document.getElementById("image").files.length === 0) {
            return toast.error("Select Image")
        } else if (document.getElementById("warehouse").value === "") {
            return toast.error("Select Warehouse")
        } else {
            const params = new FormData()
            params.append('fullName', document.getElementById("fullName").value)
            params.append('email', document.getElementById("emailAddress").value)
            params.append('password', document.getElementById("password").value)
            params.append('repeatPassword', document.getElementById("repeatPassword").value)
            params.append('status', document.getElementById("status").value)
            // params.append('role', document.getElementById("role").value)
            params.append('imageUrl', document.getElementById("image").files[0])
            params.append('warehouseId', document.getElementById("warehouse").value)
            setLoader(true)
            axios.post(`${URL}/user`, params).then((res) => {
                if (res?.data?.status === 200) {
                    toast.success("User Created")
                    setLoader(false)
                    setModalOpen(false)
                    document.getElementById("fullName").value = null;
                    document.getElementById("emailAddress").value = null;
                    document.getElementById("password").value = null;
                    document.getElementById("repeatPassword").value = null;
                    document.getElementById("image").value = null
                    document.getElementById("status").value = null
                    // document.getElementById("role").value=null;
                    document.getElementById("warehouse").value = null;
                    axios.get(`${URL}/user`).then((res) => {
                        setAllUsers(res?.data?.data.reverse())
                    })
                } else {
                    setLoader(false)
                    return toast.error(res?.data?.message)
                }
            })
        }
    }
    return (
        <Modal
            title="Create User"
            style={{ top: 20 }}
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
            width={600}
            footer={[
                <div>
                    {loader === true ? (
                        <div className="row">
                            <div className="col-10">
                                <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>
                                <Button key="ok" type="primary" onClick={() => {
                                    fn_handleCreate()
                                }}>
                                    Create
                                </Button>
                            </div>
                            <div className="col-2 text-end">
                                <Oval
                                    height={33}
                                    width={33}
                                    color="#4fa94d"
                                    visible={true}
                                    secondaryColor="#4fa94d"
                                    strokeWidth={6}
                                    strokeWidthSecondary={7}
                                    style={{
                                        display: 'block',
                                        margin: '0 auto',
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>
                            <Button key="ok" type="primary" onClick={() => {
                                fn_handleCreate()
                            }}>
                                Create
                            </Button>
                        </>
                    )}

                </div>
            ]}
        >
            <hr />
            <div className="row">
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Full Name*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Full Name" id="fullName" required />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Email Address*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Email Address" id="emailAddress" required />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Password*</label>
                    <input type="password" className="productCreateInput" placeholder="minimum: 6 character" id="password" required />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Repeat Password*</label>
                    <input type="password" className="productCreateInput" placeholder="ReEnter Password" id="repeatPassword" required />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Status*</label>
                    <select className="productCreateInput" id="status" required>
                        <option value={"Active"}>Active</option>
                        <option value={"Inactive"}>Inactive</option>
                    </select>
                </div>
                {/* <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Role*</label>
                    <select className="productCreateInput" id="role" required>
                        <option value={""}>---Choose Role---</option>
                        <option value={"Super Admin"}>Super Admin</option>
                    </select>
                </div> */}
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Choose Avatar*</label>
                    <input type="file" className="productCreateInput" id="image" required style={{ paddingTop: "2.5px" }} />
                </div>
                <hr />
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Choose Warehouse*</label>
                    <select className="productCreateInput" id="warehouse" required>
                        <option value={""}>---Choose Warehouse---</option>
                        {allWarehouse && allWarehouse?.map((item) => (
                            <option value={item?._id}>{item?.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </Modal>
    )
}

export default CreateUser
import axios from "axios"
import React, { useState } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"
import URL from "../../../Url"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Oval } from 'react-loader-spinner';

const CreateCutomer = () => {
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const fn_createClient = () => {
        try {
            if (document.getElementsByName("clientName")?.[0].value === "") {
                return toast.error("Name Field is Empty")
            } else if (document.getElementsByName("phoneNumber")?.[0].value === "") {
                return toast.error("Enter Phone Number")
            } else if (document.getElementsByName("clientCity")?.[0].value === "") {
                return toast.error("Enter Customer City")
            } else if (document.getElementsByName("clientEmail")?.[0].value === "") {
                return toast.error("Enter Customer Email")
            } else if (document.getElementsByName("clientAddress")?.[0].files?.length === 0) {
                return toast.error("Enter Address")
            } else {
                const params = new FormData()
                params.append('name', document.getElementsByName("clientName")?.[0].value);
                params.append('phone', document.getElementsByName("phoneNumber")?.[0].value);
                params.append('city', document.getElementsByName("clientCity")?.[0].value);
                params.append('email', document.getElementsByName("clientEmail")?.[0].value);
                params.append('imageUrl', document.getElementsByName("clientImage")?.[0].files[0]);
                params.append('address', document.getElementsByName("clientAddress")?.[0].value);
                setLoader(true)
                axios.post(`${URL}/customer`, params).then((res) => {
                    if (res?.data?.status === 200) {
                        setLoader(false)
                        toast.success("Customer Created")
                        navigate("/customer")
                    } else {
                        toast.error(res?.data?.message)
                    }
                })
            }
        } catch (error) {
            toast.error("Network Error")
            console.log(error)
        }
    }
    return (
        <div>
            <p className='dashboadHeading' >Create Customer</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <div className="row">
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Full Name*</label>
                        <input type="text" className="productCreateInput" placeholder="Client Name" name="clientName" required />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Phone*</label>
                        <input type="text" className="productCreateInput" placeholder="Phone Number" name="phoneNumber" required />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">City*</label>
                        <input type="text" className="productCreateInput" placeholder="City" name="clientCity" required />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Email*</label>
                        <input type="text" className="productCreateInput" placeholder="Enter Email" name="clientEmail" required />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Image*</label>
                        <input type="file" className="productCreateInput" name="clientImage"  style={{ paddingTop: "2.5px" }} />
                    </div>
                    <div className="col-12 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Address*</label>
                        <textarea className="productCreateTextArea" name="clientAddress" required />
                    </div>
                    <div className="d-flex gap-3">
                        <button className="btn btn-info btn-md ms-3" style={{ width: "120px" }} onClick={fn_createClient}>
                            <AiOutlineCheckCircle className="submitProductIcon text-dark" />Submit
                        </button>
                        {loader === true && (
                            <Oval
                                height={33}
                                width={33}
                                color="#0F5ABB"
                                visible={true}
                                secondaryColor="#B2C4FF"
                                strokeWidth={6}
                                strokeWidthSecondary={7}
                                style={{
                                    display: 'block',
                                    margin: '0 auto',
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCutomer
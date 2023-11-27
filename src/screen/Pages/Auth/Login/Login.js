import React, { useState } from "react";
import "./Login.css"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../../../Url";

const Login = ({ setAllRoles }) => {
    const navigate = useNavigate()
    const fn_submit = () => {
        if (document.getElementById("username").value === "") {
            return toast.error("Enter Username Or Email")
        } else if (document.getElementById("password").value === "") {
            return toast.error("Enter Password")
        } else {
            const currentDate = new Date();
            const monthAbbreviation = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ];
            // if (document.getElementById("username").value === "admin" && document.getElementById("password").value === "admin123") {
            //     toast.success("Logged in as Admin!")
            //     navigate("/dashboard")


            //     localStorage.setItem("login", "admin")
            //     if (!localStorage.getItem("dateSet")) {
            //         localStorage.setItem("dateSet", currentDate?.getDate() + "-" + monthAbbreviation[currentDate?.getMonth()] + "-" + currentDate?.getFullYear())
            //     }
            //     window.location.reload()
            // } 
            // else {
            const params = {
                email: document.getElementById("username").value,
                password: document.getElementById("password").value
            }
            axios.post(`${URL}/user/auth/signin`, params).then((res) => {
                if (res?.data?.status === 200) {
                    toast.success(`Logged In as ${res?.data?.data?.fullName}`)
                    navigate("/dashboard")
                    localStorage.setItem("login", res?.data?.data?.fullName)
                    localStorage.setItem("id", res?.data?.data?._id)
                    setAllRoles({
                        ...res?.data?.data?.permissionsId?.allObject,
                        role: res?.data?.data?.role
                    })
                   
                        localStorage.setItem("dateSet", currentDate?.getDate() + "-" + monthAbbreviation[currentDate?.getMonth()] + "-" + currentDate?.getFullYear())
                    
                    // window.location.reload()
                } else {
                    return toast.error(res?.data?.message)
                }
            })
            // }
        }
    }
    return (
        <div className="loginMain">
            <div className="loginSecondary pb-4">
                <h3 className="text-center">Login</h3>
                <div className="d-flex flex-column px-3 mb-3 mt-5">
                    <label className="productCreateTxt">Email*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Username" id="username" required />
                </div>
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Password*</label>
                    <input type="password" className="productCreateInput" placeholder="Enter Password" id="password" required />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-info btn-md ms-3" style={{ width: "120px" }} onClick={fn_submit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
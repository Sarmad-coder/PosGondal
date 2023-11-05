import React from "react";

const Register = () => {
    return (
        <div className="loginMain">
            <div className="loginSecondary pb-4">
                <h3 className="text-center">Register</h3>
                <div className="d-flex flex-column px-3 mb-3 mt-5">
                    <label className="productCreateTxt">Your Name*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Your Name" name="productName" required />
                </div>
                <div className="d-flex flex-column px-3 mb-3 mt-5">
                    <label className="productCreateTxt">Email Address*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Email Address" name="productName" required />
                </div>
                <div className="d-flex flex-column px-3 mb-3 mt-5">
                    <label className="productCreateTxt">Phone Number*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Email Address" name="productName" required />
                </div>
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Password*</label>
                    <input type="text" className="productCreateInput" placeholder="Product Name" name="productName" required />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-info btn-md ms-3" style={{ width: "120px" }}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register
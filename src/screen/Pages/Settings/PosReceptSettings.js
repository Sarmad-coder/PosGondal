import React from "react";
import { Switch } from 'antd';
import { AiOutlineCheckCircle } from "react-icons/ai"

const PosSettings = () => {
    return (
        <div>
            <p className='dashboadHeading' >Pos Receipt Settings</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Note to customer*</label>
                    <input type="text" className="productCreateInput" defaultValue={"Thank You For Shopping With Us . Please Come Again"} />
                </div>
                <div className="row mt-5">
                    <div className="d-flex px-3 mb-3 col-4">
                        <div className="d-flex px-3 mb-3 col-1"><Switch defaultChecked /></div>
                        <label className="productCreateTxt ms-5">Show Phone</label>
                    </div>
                    <div className="d-flex px-3 mb-3 col-4">
                        <div className="d-flex px-3 mb-3 col-1"><Switch defaultChecked /></div>
                        <label className="productCreateTxt ms-5">Show Address</label>
                    </div>
                    <div className="d-flex px-3 mb-3 col-4">
                        <div className="d-flex px-3 mb-3 col-1"><Switch defaultChecked /></div>
                        <label className="productCreateTxt ms-5">Show Email</label>
                    </div>
                    <div className="d-flex px-3 mb-3 col-4">
                        <div className="d-flex px-3 mb-3 col-1"><Switch defaultChecked /></div>
                        <label className="productCreateTxt ms-5">Show Customer</label>
                    </div>
                    <div className="d-flex px-3 mb-3 col-4">
                        <div className="d-flex px-3 mb-3 col-1"><Switch defaultChecked /></div>
                        <label className="productCreateTxt ms-5">Show Warehouse</label>
                    </div>
                    <div className="d-flex px-3 mb-3 col-4">
                        <div className="d-flex px-3 mb-3 col-1"><Switch defaultChecked /></div>
                        <label className="productCreateTxt ms-5">Show Tax & Discount & Shipping</label>
                    </div>
                    <div className="d-flex px-3 mb-3 col-4">
                        <div className="d-flex px-3 mb-3 col-1"><Switch defaultChecked /></div>
                        <label className="productCreateTxt ms-5">Note to Customer</label>
                    </div>
                    <div className="d-flex px-3 mb-3 col-4">
                        <div className="d-flex px-3 mb-3 col-1"><Switch defaultChecked /></div>
                        <label className="productCreateTxt ms-5">Print Invoice automatically</label>
                    </div>
                </div>
                <button className="productSubmitBtn"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
        </div>
    )
}

export default PosSettings
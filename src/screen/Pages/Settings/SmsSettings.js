import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai"

const SmsSettings = () => {
    return (
        <div>
            <p className='dashboadHeading' >SMS Settings</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <p className="fs-5 mb-4">Default SMS</p>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Default SMS</label>
                    <select className="productCreateInput">
                        <option selected>Twilio</option>
                        <option>Nexmo (now Vonage)</option>
                        <option>Infobip</option>
                    </select>
                </div>
                <button className="productSubmitBtn ms-0"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
            <div className="productMainBox">
                <p className="fs-5 mb-4">Twilio API</p>
                <div className="row">
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Twilio SID</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Twilio TOKEN</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Twilio FROM</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                </div>
                <button className="productSubmitBtn ms-0"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
            <div className="productMainBox">
                <p className="fs-5 mb-4">Nexmo (now Vonage)</p>
                <div className="row">
                    <div className="col-md-4 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">NEXMO KEY</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">NEXMO SECRET</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">NEXMO FROM</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                </div>
                <button className="productSubmitBtn ms-0"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
            <div className="productMainBox">
                <p className="fs-5 mb-4">Nexmo (now Vonage)</p>
                <div className="row">
                    <div className="col-md-4 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">BASE URL</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">API KEY</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Sender From</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                </div>
                <button className="productSubmitBtn ms-0"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
        </div>
    )
}

export default SmsSettings
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai"

const SystemSettings = () => {
    return (
        <div>
            <p className='dashboadHeading' >System settings</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <p className="fs-5 mb-4">System settings</p>
                <div className="row">
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Default Currency*</label>
                        <select className="productCreateInput">
                            <option selected>Pakistani Rupee</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Default email*</label>
                        <input type="text" className="productCreateInput" defaultValue={"admin@example.com"} />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Change logo</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Company Name*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Company phone*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Pdf footer*</label>
                        <input type="text" className="productCreateInput" placeholder="Pdf footer" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Developed by*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">App name*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Footer*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Default Language*</label>
                        <select className="productCreateInput">
                            <option selected>English</option>
                            <option>French</option>
                            <option>Arabic</option>
                            <option>Turkish</option>
                            <option>Hindi</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Default Customer</label>
                        <select className="productCreateInput">
                            <option selected>Customer 1</option>
                            <option>Customer 2</option>
                            <option>Customer 3</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Default Warehouse</label>
                        <select className="productCreateInput">
                            <option selected>Warehouse 1</option>
                            <option>Warehouse 2</option>
                            <option>Warehouse 3</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Time Zone</label>
                        <select className="productCreateInput">
                            <option selected>Time Zone 1</option>
                            <option>Time Zone 2</option>
                            <option>Time Zone 3</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Symbol Placement*</label>
                        <select className="productCreateInput">
                            <option selected>Before (PKR 0.00)</option>
                            <option>After (PKR 0.00)</option>
                        </select>
                    </div>
                    <div className="col-12 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Company Address*</label>
                        <textarea type="number" className="productCreateTextArea" />
                    </div>
                </div>
                <button className="productSubmitBtn ms-0"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
            <div className="productMainBox">
                <p className="fs-5 mb-4">Email settings</p>
                <div className="row">
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">MAIL_MAILER*</label>
                        <input type="text" className="productCreateInput" defaultValue={"smtp"} />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">MAIL_HOST*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">MAIL_FROM_NAME*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">MAIL_FROM_ADDRESS*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">MAIL_PORT*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">MAIL_USERNAME*</label>
                        <input type="text" className="productCreateInput" placeholder="Pdf footer" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">MAIL_PASSWORD*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">MAIL_ENCRYPTION*</label>
                        <input type="text" className="productCreateInput" />
                    </div>
                </div>
                <button className="productSubmitBtn ms-0"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
            <div className="productMainBox">
                <p className="fs-5 mb-4">Backup Settings</p>
                <div className="row">
                    <div className="col-md-4 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">DUMP_PATH*</label>
                        <input type="text" className="productCreateInput" defaultValue={"smtp"} />
                    </div>
                    <ul className="ms-3">
                        <li className="productCreateTxt" style={{ color: "black" }}>
                            <span style={{ fontWeight: "500" }}>Live Server (Hosting) :&nbsp;</span>
                            mysqldump
                        </li>
                        <li className="productCreateTxt" style={{ color: "black" }}>
                            <span style={{ fontWeight: "500" }}>Xampp :&nbsp;</span>
                            C:\xampp\mysql\bin\mysqldump.exe
                        </li>
                        <li className="productCreateTxt" style={{ color: "black" }}>
                            <span style={{ fontWeight: "500" }}>Laragon :&nbsp;</span>
                            C:\laragon\bin\mysql\mysql-5.7.24-winx64\bin\mysqldump.exe
                        </li>
                    </ul>
                </div>
                <button className="productSubmitBtn ms-0"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
        </div>
    )
}

export default SystemSettings
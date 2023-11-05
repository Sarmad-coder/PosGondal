import React from "react";
import { Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineCheckCircle } from "react-icons/ai"

const CreateSale = () => {
    return (
        <div>
            <p className='dashboadHeading' >Add Sale</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <div className="row">
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Date*</label>
                        <input type="date" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Customer*</label>
                        <select className="productCreateInput">
                            <option selected>---Choose Customer---</option>
                            <option>Customer 1</option>
                            <option>Customer 2</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Warehouse*</label>
                        <select className="productCreateInput">
                            <option selected>---Choose Warehouse---</option>
                            <option>Warehouse 1</option>
                            <option>Warehouse 2</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="productMainBox">
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt mb-1">Products</label>
                    <Space.Compact size="large" style={{ backgroundColor: "rgba(40, 129, 201, 0.055)" }}>
                        <Input addonBefore={<SearchOutlined />} placeholder="Search Product" />
                    </Space.Compact>
                </div>
                <div className="table-responsive-md mt-5 mx-3">
                    <table className="table">
                        <thead>
                            <tr className="table-primary">
                                <td scope="col" className="productCreateTxt fw-semibold">#</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Product Name</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Net Unit Cost</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Current Stock</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Qty</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Discount</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Tax</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Subtotal</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Action</td>
                            </tr>
                        </thead>
                        <tr style={{ height: "2rem", borderBottom: "1px solid rgba(128, 128, 128, 0.253)" }}>
                            <td scope="row" className="ps-2 productCreateTxt">01</td>
                            <td scope="row" className="ps-2 productCreateTxt">Shirt</td>
                            <td scope="row" className="ps-2 productCreateTxt">E1242343443</td>
                            <td scope="row" className="ps-2 productCreateTxt">30 Piece</td>
                            <td scope="row" className="ps-2 productCreateTxt">100 Piece</td>
                            <td scope="row" className="ps-2 productCreateTxt">0.5%</td>
                            <td scope="row" className="ps-2 productCreateTxt">2%</td>
                            <td scope="row" className="ps-2 productCreateTxt">PKR 200</td>
                            <td scope="row" className="ps-2 productCreateTxt">Action</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="productMainBox">
                <div className="row">
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Order Tax</label>
                        <input type="date" className="productCreateInput" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Discount</label>
                        <input type="text" className="productCreateInput" defaultValue={0} />
                        <select className="productCreateInput">
                            <option selected>Fixed</option>
                            <option>Percent %</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Shipping</label>
                        <input type="text" className="productCreateInput" defaultValue={0} />
                    </div>
                    <div className="col-12 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Please Prove any Details*</label>
                        <textarea type="number" className="productCreateTextArea" placeholder="Please Prove any Details" />
                    </div>
                </div>
                <button className="productSubmitBtn ms-0"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
        </div>
    )
}

export default CreateSale
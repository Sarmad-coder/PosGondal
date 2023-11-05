import React from "react"
import { Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineCheckCircle } from "react-icons/ai"
const CreateAdjustment = () => {
    return (
        <div>
            <p className='dashboadHeading' >Add Adjustment</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Date*</label>
                        <input type="date" className="productCreateInput" />
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
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
                                <td scope="col" className="productCreateTxt fw-semibold">Code Product</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Product Name</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Current Stock</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Qty</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Type</td>
                            </tr>
                        </thead>
                        <tr style={{ height: "2rem", borderBottom: "1px solid rgba(128, 128, 128, 0.253)" }}>
                            <td scope="row" className="ps-2 productCreateTxt">01</td>
                            <td scope="row" className="ps-2 productCreateTxt">E1242343443</td>
                            <td scope="row" className="ps-2 productCreateTxt">Shirt</td>
                            <td scope="row" className="ps-2 productCreateTxt">30 Piece</td>
                            <td scope="row" className="ps-2 productCreateTxt">100 Piece</td>
                            <td scope="row" className="ps-2 productCreateTxt">Garments</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="productMainBox">
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt mb-1">Please provide any details</label>
                    <textarea type="number" className="productCreateTextArea" placeholder="Please provide any details" />
                </div>
            </div>
            <button className="productSubmitBtn"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            <br /><br />
        </div >
    )
}

export default CreateAdjustment
import React, { useEffect, useState } from "react"
import { Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { BiRefresh } from "react-icons/bi"
import { RiShutDownLine } from "react-icons/ri"
import { BsPrinter } from "react-icons/bs"
import axios from "axios";
import URL from "../../Url";

const PrintLabels = () => {
    const [allWarehouse, setAllWarehouse] = useState([])
    useEffect(() => {
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
    }, [])
    return (
        <div>
            <p className='dashboadHeading' >Print Labels</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Warehouse*</label>
                    <select className="productCreateInput">
                        <option selected value={""}>---Choose Warehouse---</option>
                        {allWarehouse && allWarehouse?.map((item) => (
                            <option value={item?._id}>{item?.name}</option>
                        ))}
                    </select>
                </div>
                <div className="d-flex flex-column px-3 mb-3 mt-4">
                    <label className="productCreateTxt mb-1">Products</label>
                    <Space.Compact size="large" style={{ backgroundColor: "rgba(40, 129, 201, 0.055)" }}>
                        <Input addonBefore={<SearchOutlined />} placeholder="Search Product" />
                    </Space.Compact>
                </div>
                <div className="table-responsive-md mt-5">
                    <table className="table">
                        <thead>
                            <tr className="table-primary">
                                <td scope="col" className="productCreateTxt fw-semibold">Product Name</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Product Code</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Product Price</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Product Quantity</td>
                            </tr>
                        </thead>
                        <tr style={{ height: "2rem", borderBottom: "1px solid rgba(128, 128, 128, 0.253)" }}>
                            <td scope="row" className="ps-2 productCreateTxt">Shirt</td>
                            <td scope="row" className="ps-2 productCreateTxt">E1242343443</td>
                            <td scope="row" className="ps-2 productCreateTxt">PKR 450</td>
                            <td scope="row" className="ps-2 productCreateTxt">100 Piece</td>
                        </tr>
                    </table>
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3 mt-4">
                    <label className="productCreateTxt mb-1">Paper size*</label>
                    <select className="productCreateInput">
                        <option selected>---Choose Paper Size---</option>
                        <option>40 per sheet (a4) (1.799 * 1.003)</option>
                        <option>30 per sheet (2.625 * 1)</option>
                        <option>24 per sheet (a4) (2.48 * 1.334)</option>
                        <option>18 per sheet (a4) (2.5 * 1.835)</option>
                    </select>
                </div>
                <div className="col-md-6 d-flex px-3 mb-3 mt-4">
                    <button className="btn btn-info btn-md" style={{ width: "120px" }}>
                        <BiRefresh className="submitProductIcon text-dark" />Submit
                    </button>
                    <button className="btn btn-warning btn-md ms-3" style={{ width: "120px" }}>
                        <RiShutDownLine className="submitProductIcon text-dark" />Reset
                    </button>
                    <button className="btn btn-primary btn-md ms-3 text-dark" style={{ width: "120px" }}>
                        <BsPrinter className="submitProductIcon text-dark" />Print
                    </button>
                </div>
            </div >
        </div >
    )
}

export default PrintLabels
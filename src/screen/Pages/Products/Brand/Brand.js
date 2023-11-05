/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useMemo, useState } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { BsFillPencilFill } from "react-icons/bs";
import { Button, Modal } from 'antd';
import URL, { imgURL } from '../../../Url';
import CreateBrand from './CreateBrand';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { toast } from 'react-toastify';
import UpdateBrand from './UpdateBrand';
const { confirm } = Modal;

const Brands = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [allBrand, setAllBrand] = useState([])
    const [modalUpdateData, setModalUpdateData] = useState()
    const [modalOpenTwo, setModalOpenTwo] = useState(false)
    const [query , setQuery] = useState("")
    useEffect(() => {
        axios.get(`${URL}/brand`).then((res) => {
            setAllBrand(res?.data?.data)
        })
    }, [])

    const searchdata = useMemo(() => (allBrand?.filter((d)=>(
        d?.brandName.toLowerCase().includes(query?.toLowerCase())
    ))), [allBrand , query]);

    const ShowDeleteModal = (id) => {
        confirm({
            title: "Are you sure you want to delete this?",
            icon: <ExclamationCircleFilled />,
            onOk() {
                axios.delete(`${URL}/brand/${id}`).then((res) => {
                    if (res?.data?.status === 200) {
                        toast.success("Deleted Successfully!")
                        axios.get(`${URL}/brand`).then((res) => {
                            setAllBrand(res?.data?.data)
                        })
                    }
                })
            },
            onCancel() {
                console.log("Cancel")
            }


        })
    }



    return (
        <div className="content-section p-3">
            <CreateBrand Modal={Modal} Button={Button} modalOpen={modalOpen} setModalOpen={setModalOpen} URL={URL} allBrand={allBrand} setAllBrand={setAllBrand} />
            <UpdateBrand modalUpdateData={modalUpdateData} setAllBrand={setAllBrand} setModalUpdateData={setModalUpdateData} modalOpenTwo={modalOpenTwo} setModalOpenTwo={setModalOpenTwo} />
            <p className='dashboadHeading' >Brands</p >
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => setModalOpen(true)}>
                                    Create
                                </button>
                            </div>
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>
                                    <label>
                                      
                                    </label>

                                    <label style={{ marginLeft: "5px" }}>
                                        
                                    </label>
                                </div>
                                <div>
                                    <label><input type="search" value={query} onChange={(e)=>{setQuery(e?.target?.value)}} class="form-control form-control-sm" placeholder="Search by brand name..." aria-controls="warehouse_table" /></label>
                                </div>
                            </section>
                            <div className="table-responsive mt-3">
                                <table
                                    id="warehouse_table"
                                    className="display table dataTable no-footer"
                                    aria-describedby="warehouse_table_info"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr>
                                            <th >Image</th>
                                            <th >Name</th>
                                            <th >Description</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchdata?.map((item, i) => (
                                            <tr key={i}>
                                                <td >
                                                    <div>
                                                        <img src={`${imgURL}/${item?.imageUrl}`} style={{ "borderRadius": "0.5rem", "height": "4em", "width": "4em" }} />
                                                    </div>
                                                </td>
                                                <td >{item?.brandName}</td>
                                                <td >{item?.brandDetail}</td>
                                                <td>
                                                    <i className='text-success' style={{ cursor: "pointer" }} onClick={() => { setModalUpdateData(item); setModalOpenTwo(true); }}><BsFillPencilFill /></i>
                                                    &nbsp;&nbsp;
                                                    <i className='text-danger' style={{ cursor: "pointer" }} onClick={() => { ShowDeleteModal(item?._id) }}><FiDelete /></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="app-footer">
                <div class="row">
                    <div class="col-md-9">
                        <p><strong>Gondal - POS With Ultimate Inventory</strong></p>
                        <div class="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
                            <img class="logo" src="https://Gondal.getstocky.com/images/logo-default.svg" alt="" />
                            <div>
                                <p class="m-0">© 2023  Gondal v1.1</p>
                                <p class="m-0">All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;

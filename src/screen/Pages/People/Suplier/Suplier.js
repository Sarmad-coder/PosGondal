import React, { useMemo, useState } from 'react';
import { Button, Modal } from 'antd';
import CreateSuplier from './CreateSuplier';
import { useEffect } from 'react';
import URL from '../../../Url';
import axios from 'axios';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { LiaCommentDollarSolid } from 'react-icons/lia';
import { FiDelete, FiEdit } from 'react-icons/fi'
import { BsEye, BsFillPencilFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import ViewSuplier from './ViewSuplier';
import { toast } from 'react-toastify';
import UpdateSuplier from './UpdateSuplier';

const Suplier = ({ allRoles }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false)
    const [dataToupdate, setDataToUpdate] = useState({})
    const [getSuplier, setGetSuplier] = useState([{}]);
    const [title, setTitle] = useState("")
    const [query, setQuery] = useState("")
    const isAdmin = allRoles?.role?.toLowerCase() === 'admin'

    useEffect(() => {
        axios.get(`${URL}/supplier`)
            .then((res) => {
                if (res?.data?.status === 200) {
                    setGetSuplier(res?.data?.data)
                }
                else {
                    console.log("Error: getting supplier error")
                }
            })
            .catch((error) => {
                console.error("Fetching data error : ", error);
            })
    }, []);

    const filteredData = useMemo(() => (getSuplier.filter((f) => (
        typeof f.name === 'string' &&
        f.name.toLowerCase().includes(query.toLowerCase()))
    )), [query, getSuplier]);

    const fn_deleteSupplier = (id) => {

        axios.delete(`${URL}/supplier/${id}`).then((res) => {
            if (res?.data?.status === 500) {
                toast.error(res?.data?.message)
            }
            else if (res?.data?.status === 200) {
                toast.success("Record Deleted")
                axios.get(`${URL}/supplier`).then((res) => {
                    setGetSuplier(res?.data?.data)
                })
            } else {
                toast.error(res?.data?.msg)
            }
        })
    }
    return (
        <div className="content-section p-3 pt-3">
            {(isAdmin || allRoles?.supplier?.addSupplier) && <CreateSuplier modalOpen={modalOpen} setModalOpen={setModalOpen} Modal={Modal} Button={Button} setGetSuplier={setGetSuplier} />}
            {(isAdmin || allRoles?.supplier?.editSupplier) && <UpdateSuplier modalUpdate={modalUpdate} setGetSuplier={setGetSuplier} setModalUpdate={setModalUpdate} setDataToUpdate={setDataToUpdate} dataToupdate={dataToupdate} />}
            <p className='dashboadHeading' >Supplier</p >
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            {(isAdmin || allRoles?.supplier?.addSupplier) && <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => { setModalOpen(true); setTitle("Create"); }}>
                                    Create
                                </button>
                            </div>}
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>
                                    <label>

                                    </label>

                                </div>
                                <div>
                                    <label><input type="search" value={query} onChange={(e) => { setQuery(e.target.value) }} class="form-control form-control-sm" placeholder="Search by Name..." aria-controls="warehouse_table" /></label>
                                </div>
                            </section>

                            <div className="table-res">
                                <table
                                    className="display table dataTable no-footer"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr >
                                            <th style={{ width: "105px" }}>Name</th>
                                            <th style={{ width: "105px" }}>Phone</th>
                                            <th style={{ width: "105px" }}>City</th>
                                            <th style={{ width: "105px" }}>Total Purchase Due</th>
                                            <th style={{ width: "135px" }}>Total Purchase Return Due</th>
                                            {(isAdmin || allRoles?.supplier?.editSupplier || allRoles?.supplier?.viewSupplier || allRoles?.supplier?.deleteSupplier) && <th style={{ width: "105px" }}>Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData?.map((item, i) => (
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.city}</td>
                                                <td>{item?.purchaseDue}</td>
                                                <td>{item?.returnDue} </td>
                                                {(isAdmin || allRoles?.supplier?.editSupplier || allRoles?.supplier?.viewSupplier || allRoles?.supplier?.deleteSupplier) && <td>


                                                    {(isAdmin || allRoles?.supplier?.viewSupplier) && <Link to={`/viewsupplier/${item?._id}`}
                                                        className='text-success' style={{ cursor: "pointer" }} ><BsEye />
                                                    </Link>}
                                                    &nbsp;
                                                    {(isAdmin || allRoles?.supplier?.editSupplier) && <Link onClick={() => {
                                                        setModalUpdate(true);
                                                        setDataToUpdate(item)
                                                    }}
                                                        className='text-success'
                                                        style={{ cursor: "pointer" }}
                                                    ><BsFillPencilFill />
                                                    </Link>
                                                    }
                                                    &nbsp;
                                                    {(isAdmin || allRoles?.supplier?.deleteSupplier) && <Link className='text-danger'
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => fn_deleteSupplier(item?._id)}>
                                                        <FiDelete />
                                                    </Link>}

                                                </td>}
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

export default Suplier;

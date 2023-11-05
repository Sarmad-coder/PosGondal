import React, { useEffect, useMemo, useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import URL from '../../../Url';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {  Modal  } from 'antd';
import { toast } from 'react-toastify';
const { confirm } = Modal;
const Role = () => {
    const navigate = useNavigate()
    const [perm, setperm] = useState([]);
    const [query, setQuery] = useState("");
    const accessingDataPerm = ()=>{
        axios.get(`${URL}/permissions`).then((res)=>{
            console.log(res?.data?.data)
            if(res?.data?.status===200){
                setperm(res?.data?.data)
            }
        })
    }

    const PermissionData = useMemo(() => perm.filter((d)=>( d?.userRole?.toLowerCase().includes(query?.toLowerCase()))), [query, perm]);
    useEffect(() => {
      return () => {
        accessingDataPerm();
      };
    }, []);
    const showDeleteConfirm = (id) => {
        confirm({
          title: 'Are you sure you want to delete this?',
          icon: <ExclamationCircleFilled />,
        //   content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            axios.delete(`${URL}/permissions/${id}`).then((res)=>{
                if(res?.data?.status===200){
                    toast.success("Deleted");
                    accessingDataPerm();

                }
            })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };
    return (
        <div className="content-section p-3 pt-0">
            <p className='dashboadHeading' >Permissions</p >
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/roles/permission")}>
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
                                    <label><input type="search" className="form-control form-control-sm" placeholder="Search by name..." aria-controls="warehouse_table" value={query} onChange={(e)=>{setQuery(e?.target?.value)}} /></label>
                                </div>
                            </section>
                            <div className="table-responsive">
                                <table
                                    id="warehouse_table"
                                    className="display table dataTable no-footer"
                                    aria-describedby="warehouse_table_info"
                                    style={{ width: "100%" }}
                                >
                                    {/* Table Header */}
                                    <thead>
                                        <tr >
                                            <th className="sorting" tabIndex="0" aria-controls="warehouse_table" rowspan="1" colspan="1" style={{ width: "33%" }} aria-label="Name: activate to sort column ascending">Name</th>
                                            {/* <th className="sorting" tabIndex="0" aria-controls="warehouse_table" rowspan="1" colspan="1" style={{ width: "105px" }} aria-label="Phone: activate to sort column ascending">Phone</th>
                                            <th className="sorting" tabIndex="0" aria-controls="warehouse_table" rowspan="1" colspan="1" style={{ width: "105px" }} aria-label="Country: activate to sort column ascending">Country</th>
                                            <th className="sorting" tabIndex="0" aria-controls="warehouse_table" rowspan="1" colspan="1" style={{ width: "105px" }} aria-label="City: activate to sort column ascending">City</th>
                                            <th className="sorting" tabIndex="0" aria-controls="warehouse_table" rowspan="1" colspan="1" style={{ width: "161px" }} aria-label="Email: activate to sort column ascending">Email</th>
                                            <th className="sorting" tabIndex="0" aria-controls="warehouse_table" rowspan="1" colspan="1" style={{ width: "105px" }} aria-label="Zip Code: activate to sort column ascending">Zip Code</th> */}
                                               <th className="not_show sorting_disabled" rowspan="1" colspan="1" style={{ width: "33%" }} aria-label="Description">Description</th>
                                            <th className="not_show sorting_disabled" rowspan="1" colspan="1" style={{ width: "33%" }} aria-label="Action">Action</th>
                                        </tr>
                                    </thead>
                                    {/* Table Body */}
                                    <tbody>
                                        {
                                            PermissionData?.map((data,i)=>(

                                        <tr className="odd" key={i}>
                                            <td>{data?.userRole}</td>
                                            <td>{data?.description}</td>
                                            {/* <td>USA</td>
                                            <td>New york</td>
                                            <td>warehouse2@example.com</td>
                                            <td>342A34</td> */}
                                            <td>
                                                {/* <a id="1" className="edit cursor-pointer ul-link-action text-success" data-toggle="tooltip" data-placement="top" title="Edit">
                                                    <i className="" data-bs-toggle="modal" data-bs-target="#exampleModal"> <FiEye /></i>
                                                </a>&nbsp;&nbsp; */}
                                                &nbsp;&nbsp;&nbsp;
                                                <a id="1" style={{"cursor":"pointer"}} className="delete cursor-pointer ul-link-action text-danger" data-toggle="tooltip" data-placement="top" title="Remove">
                                                    <i className="i-Close-Window"><FiDelete onClick={()=>showDeleteConfirm(data?._id)}/></i>
                                                </a>&nbsp;&nbsp;
                                                {/* Cannot change default permissions */}
                                            </td>
                                        </tr>
                                            ))
                                        }
                                        {/* <tr className="even">
                                            <td>Warehouse 1</td>
                                            <td>240-737-7321</td>
                                            <td>USA</td>
                                            <td>Washington</td>
                                            <td>warehouse1@example.com</td>
                                            <td>7321</td>
                                            <td>
                                                <a id="1" className="edit cursor-pointer ul-link-action text-success" data-toggle="tooltip" data-placement="top" title="Edit">
                                                    <i className="" data-bs-toggle="modal" data-bs-target="#exampleModal"> <FiEye /></i>
                                                </a>&nbsp;&nbsp;
                                                <a id="1" className="delete cursor-pointer ul-link-action text-danger" data-toggle="tooltip" data-placement="top" title="Remove">
                                                    <FiDelete />
                                                </a>&nbsp;&nbsp;
                                            </td> 
                                        </tr>*/}
                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Creating Warehouse */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div role="document" className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create</h5>
                            <button type="button" data-bs-dismiss="modal" aria-label="Close" className="btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <form enctype="multipart/form-data">
                                <div className="row">
                                    {/* Form Fields */}
                                    <div className="form-group col-md-6">
                                        <label htmlFor="name">Name <span className="field_required">*</span></label>
                                        <input type="text" name="name" id="name" placeholder="Enter Warehouse Name" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="mobile">Phone </label>
                                        <input type="text" name="mobile" id="mobile" placeholder="Enter Warehouse Phone" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="country">Country </label>
                                        <input type="text" name="country" id="country" placeholder="Enter Warehouse Country" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="city">City </label>
                                        <input type="text" name="city" id="city" placeholder="Enter Warehouse City" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Email </label>
                                        <input type="text" name="email" id="email" placeholder="Enter Warehouse Email" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="zip">Zip Code </label>
                                        <input type="text" name="zip" id="zip" placeholder="Enter Warehouse Zip Code" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <button type="submit" className="btn " style={{ backgroundColor: "#4E97FD", color: "white" }}>
                                            <i className="i-Yes me-2 font-weight-bold"></i> Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="app-footer">
                <div className="row">
                    <div className="col-md-9">
                        <p><strong>Gondal - POS With Ultimate Inventory</strong></p>
                        <div className="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
                            <img className="logo" src="https://Gondal.getstocky.com/images/logo-default.svg" alt="" />
                            <div>
                                <p className="m-0">© 2023  Gondal v1.1</p>
                                <p className="m-0">All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Role;

import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import URL from '../../Url';
import { FiEye } from 'react-icons/fi';
import { Button, Modal } from 'antd';

const AllSale = ({ allRoles }) => {
    const navigate = useNavigate()
    const [allOrder, setAllOrder] = useState([])
    const [viewPaymentModal, setViewPaymentModal] = useState(false);
    const [singleSale, setSingleSale] = useState({})
    // const [allCustomer, setAllCustomer] = useState([])
    // const [allWarehouse, setAllWarehouse] = useState([])
    const [query, setQuery] = useState("")
    const isAdmin = allRoles?.role?.toLowerCase() === 'admin'
    useEffect(() => {
        axios.get(`${URL}/customerorder`).then((res) => {
            setAllOrder(res?.data?.data)
        })
        // axios.get(`${URL}/customer`).then((res) => {
        //     setAllCustomer(res?.data?.data)
        // })
        // axios.get(`${URL}/warehouse`).then((res) => {
        //     setAllWarehouse(res?.data?.data)
        // })
    }, [])
    const searchOut = useMemo(() => (allOrder?.filter((d) => (
        d?.customerId?.name.toLowerCase().includes(query?.toLowerCase()))
    )), [query, allOrder])

    const fn_viewPayment = (item) => {

        setSingleSale(item)
        setViewPaymentModal(true)
    }
    const printInvoice = (sale) => {
        const invoiceContent = `
       <html>
      <head>
        <title>Document</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          h3{
            text-align: center;
          }
          table {
            margin: 0 auto; /* Center the table horizontally */
            border-collapse: collapse;
            width: 50%; /* Adjust the width as needed */
          }
          th, td {
            border-bottom: 1px solid #000;
            padding: 8px;
          }
        </style>
      </head>
      <body>
     
        <h4 className="printHeading">Order No: ${sale?.invoiceNo}</h4>
        <p>Date: ${new Date(sale?.createdAt).toLocaleDateString()}</p>
        <hr>
        <table>
        <div>
        <tr>
        <td>Customer Name</td>
        <td>${sale?.customerId?.name}</td>
        </tr>
            <tr>
              <td>Item</td>
              <td>${sale?.productDetail[0]?.productName}</td>
              
              <tr>


              <td>Quantity</td>
              <td>${sale?.productDetail[0]?.cartQty} ${sale?.productDetail[0]?.unitProduct}</td>
              <tr>
              </tr>
              <td>Total</td>
                 <td>Rs ${sale?.grandTotal}</td>
            </tr>
       
            <tr>
             
          
           
            </tr>

          </div>
        </table>
      </body>
    </html>
  `;
        const printWindow = window.open('', '', 'width=1000,height=1000,top:300,left:200');
        printWindow.document.open();
        printWindow.document.write(invoiceContent);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();


    }
    return (
        <div className="content-section p-3 pt-0">
            <Modal
                title="Sale Report"
                style={{ top: 20 }}
                open={viewPaymentModal}
                onOk={() => setViewPaymentModal(false)}
                onCancel={() => setViewPaymentModal(false)}
                width={600}
                footer={null}
            >
                <hr />
                <div className="row">
                    <div className="col-md-12">


                        <div className="table-responsive mt-3">
                            <table
                                id="warehouse_table"
                                className="display table dataTable no-footer"
                                aria-describedby="warehouse_table_info"
                                style={{ width: "100%" }}
                            >
                                <thead>
                                    <tr >
                                        {/* <th>Date</th>
                                        <th>Ref#</th>
                                        <th>Customer Name</th>
                                        <th>Paid</th> */}
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>{new Date(singleSale.createdAt)?.toLocaleDateString()}</td>
                                        <td>{singleSale?.invoiceNo}</td>
                                        <td>{singleSale?.customerId?.name}</td>
                                        <td>PKR {singleSale?.grandTotal}</td>

                                    </tr>


                                </tbody>

                            </table>
                            <div style={{ textAlign: "right", width: "100%" }}>

                                <Button style={{ background: "#B2C4FF", color: "#111" }} onClick={() => printInvoice(singleSale)}>Print</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
            <p className='dashboadHeading' >All Sales</p>
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            {(isAdmin || allRoles?.sale?.viewSale) && <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/pos")}>
                                    Create
                                </button>
                            </div>}
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>
                                    <label>

                                    </label>



                                </div>
                                <div>
                                    <label><input type="search" class="form-control form-control-sm" placeholder="Search by customer..." value={query} onChange={(e) => { setQuery(e?.target?.value) }} aria-controls="warehouse_table" /></label>
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
                                        <tr >
                                            <th>Date</th>
                                            <th>Customer</th>
                                            <th>Warehouse</th>
                                            <th>Product</th>
                                            <th>Grand Total</th>
                                            <th>Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchOut && searchOut?.map((item) => (
                                            <tr>
                                                <td>{item?.setDate}</td>
                                                <td>{item?.customerId?.name}</td>
                                                <td>{item?.warehouseId?.name}</td>
                                                <td>{item?.productDetail?.length}</td>

                                                <td>PKR {item?.grandTotal}</td>

                                                <td>
                                                    <div class="dropdown drp_action">

                                                        <span style={{ cursor: "pointer", marginRight: "1rem" }}
                                                            onClick={() => fn_viewPayment(item)}>
                                                            <FiEye /></span>



                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <h5 style={{ textAlign: "end", paddingRight: "1rem" }}><span style={{ color: "red", marginRight: "0.6rem" }}>Total Sale:</span>{searchOut?.reduce((acc, item) => {
                                    return acc + item?.grandTotal
                                }, 0)} Rs</h5>
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

export default AllSale;

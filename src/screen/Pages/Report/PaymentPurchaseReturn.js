import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import URL from '../../Url';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import DateComp from '../../../components/Date';
const PurchaseReturn = () => {
    const navigate = useNavigate()
    const [allPurchaseReturn, setAllPurchaseReturn] = useState([])
    const [allSupplier, setAllSupplier] = useState([])
    const [allWarehouse, setAllWarehouse] = useState([])
    const [viewPaymentModal, setViewPaymentModal] = useState(false);
    const [singleSale, setSingleSale] = useState({})
    const [dateFilterRes, setDateFilterRes] = useState(null)
    useEffect(() => {
        axios.get(`${URL}/purchasereturn`).then((res) => {
            setAllPurchaseReturn(res?.data?.data)
        })
        axios.get(`${URL}/supplier`).then((res) => {
            setAllSupplier(res?.data?.data)
        })
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
    }, [])
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
     
        <p>Date: ${new Date(sale?.createdAt).toLocaleDateString()}</p>
        <hr>
        <table>
        <div>
        <tr>
        <td>Supplier</td>
         <td>${allSupplier?.find(sup => sup?._id === sale?.supplierId)?.name}</td>
        </tr>
            <tr>
              <td>Item</td>
               <td>${sale?.product?.productName}</td>
              
              <tr>


              <td>Return Qty</td>
               <td>${sale?.product?.returnQty} ${sale?.product?.unitProduct} </td>
              <tr>
              </tr>
              <td>Amount</td>
             <td>Rs ${sale?.product?.returnQty * sale?.product?.productPrice}</td>
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
    const fn_viewPayment = (item) => {
        setSingleSale(item)
        setViewPaymentModal(true)
    }
    return (
        <div className="content-section p-3 pt-0">
            <Modal
                title="Purchase Return Report"
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
                                        <th>Date</th>

                                        <th>Supplier</th>

                                        <th>Product</th>
                                        <th>Return Qty</th>
                                        <th>Amount</th>




                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>{new Date(singleSale.createdAt)?.toLocaleDateString()}</td>
                                        <td>{allSupplier?.find(sup => sup?._id === singleSale?.supplierId)?.name}</td>


                                        <td>{singleSale?.product?.productName}</td>
                                        <td>{singleSale?.product?.returnQty} {singleSale?.product?.unitProduct} </td>
                                        <td>Rs {singleSale?.product?.returnQty * singleSale?.product?.productPrice}</td>

                                    </tr>

                                </tbody>

                            </table>
                            <div style={{ textAlign: "right", width: "100%" }}>

                                <Button style={{ background: "#B2C4FF", color: "#111", }}
                                    onClick={() => printInvoice(singleSale)}>Print</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
            <p className='dashboadHeading' >Purchase Return Report</p >
            <hr className='dashboardLine' />
            <DateComp
                from="PR From"
                to="PR upto"
                dataArray={allPurchaseReturn}
                setDateFilterRes={setDateFilterRes}

            />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">

                            <section style={{ display: "flex", justifyContent: "space-between" }}>


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
                                            <th>Supplier</th>
                                            <th>Warehouse</th>
                                            <th>Product</th>
                                            <th>Return Qty</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(dateFilterRes ?? allPurchaseReturn)?.map((item) => (
                                            <tr>
                                                <td>{new Date(item?.createdAt)?.toLocaleDateString()}</td>
                                                <td>{allSupplier?.find(sup => sup?._id === item?.supplierId)?.name}</td>
                                                <td>{allWarehouse?.find(sup => sup?._id === item?.warehouseId)?.name}</td>
                                                <td>{item?.product?.productName}</td>
                                                <td>{item?.product?.returnQty} {item?.product?.unitProduct} </td>
                                                <td>Rs {item?.product?.returnQty * item?.product?.productPrice}</td>
                                                <td style={{ cursor: "pointer" }}
                                                    onClick={() => fn_viewPayment(item)}>

                                                    <FiEye className='text-success' />&nbsp;&nbsp;
                                                    {/* <FiDelete className='text-danger' /> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <h5 style={{ textAlign: "end", paddingRight: "1rem" }}><span style={{ color: "red", marginRight: "0.6rem" }}>Total Purchase Returns:</span>{(dateFilterRes ?? allPurchaseReturn)?.reduce((acc, item) => {
                                    return acc + (item?.product?.returnQty * item?.product?.productPrice)
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

export default PurchaseReturn;

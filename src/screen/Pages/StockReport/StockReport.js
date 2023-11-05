import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import URL from '../../Url';

const SalesReturn = () => {
    const navigate = useNavigate()
    const [allStockReport, setStockReport] = useState([])
    const [filterRes, setFilterRes] = useState(null)

    const [allProducts, setAllProducts] = useState([])
    const [allWarehouse, setAllWarehouse] = useState([])



    const [viewPaymentModal, setViewPaymentModal] = useState(false);
    const [singleSale, setSingleSale] = useState({})


    useEffect(() => {
        axios.get(`${URL}/warehouse/stockReport/get`).then((res) => {
            setStockReport(res?.data?.data)
            console.log(res?.data?.data, "test")
        })
        axios.get(`${URL}/warehouse/stockReport/get`).then((res) => {
            setStockReport(res?.data?.data)
            console.log(res?.data?.data, "test")
        })
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
        axios.get(`${URL}/product`).then((res) => {
            setAllProducts(res?.data?.data)
        })
    }, [])
    const handleFilter = (id) => {

        if (id === 'all') {
            return setFilterRes(allStockReport)
        }
        const res = allStockReport.filter(item => item?._id?.warehouseId === id)
        setFilterRes(res)
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
     
        <hr>
        <table>
        <div>
        <tr>
        <td>Product Name</td>
         <td>${allProducts?.find(sup => sup?._id === singleSale?._id?.pId)?.productName}</td>
        </tr>
            <tr>
              
              <tr>


              <td>Warehouse Name</td>
               <td>${sale?.name} </td>
              <tr>
              </tr>
              <td>Amount</td>
             <td>PKR ${sale?.totalQty * allProducts?.find(sup => sup?._id === sale?._id?.pId)?.productPrice}</td>
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
            <p className='dashboadHeading' >Stock Report</p >
            <Modal
                title="Stock Detail"
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
                                        <th>Product Name</th>
                                        <th>Warehouse</th>
                                        <th>Qty</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>

                                        <td>{allProducts?.find(sup => sup?._id === singleSale?._id?.pId)?.productName}</td>

                                        <td>{singleSale?.name}</td>
                                        <td>{singleSale?.totalQty} {allProducts?.find(sup => sup?._id === singleSale?._id?.pId)?.unitProduct}</td>
                                        <td>PKR {singleSale?.totalQty * allProducts?.find(sup => sup?._id === singleSale?._id?.pId)?.productPrice}</td>

                                    </tr>

                                </tbody>

                            </table>
                            <div style={{ textAlign: "right", width: "100%" }}>

                                <Button style={{ background: "#B2C4FF", color: "#111", }} onClick={() => printInvoice(singleSale)}>Print</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">

                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>
                                    <label>

                                    </label>



                                </div>
                                <div>

                                    <label>
                                    </label>
                                    <select style={{ border: "1px solid rgba(0,0,0,0.2)", outline: "none", padding: "0.3rem" }} onChange={(e) => handleFilter(e.target.value)}>
                                        <option value='all' >All</option>
                                        {allWarehouse?.map(i => (
                                            <>


                                                <option value={i?._id}>{i.name}</option>
                                            </>
                                        ))}
                                    </select>
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

                                            <th>Product Name</th>
                                            <th>Warehouse</th>
                                            <th>Current Stock</th>
                                            <th>Total Amount</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {(filterRes ?? allStockReport)?.map((item) => {
                                            const findProduct = allProducts?.find(p => p?._id === item?._id?.pId)
                                            return (
                                                <tr>

                                                    <td>{findProduct?.productName}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.totalQty} {findProduct?.unitProduct}</td>
                                                    <td>PKR {item?.totalQty * findProduct?.productPrice}</td>
                                                    <td style={{ cursor: "pointer" }}
                                                        onClick={() => fn_viewPayment(item)}>

                                                        <FiEye className='text-success' />&nbsp;&nbsp;
                                                    </td>
                                                </tr>
                                            )

                                        })}
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

export default SalesReturn;

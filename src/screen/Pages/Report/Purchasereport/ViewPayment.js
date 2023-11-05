import React, { useEffect, useState } from "react"


const ViewPayment = ({ Modal, Button, viewPaymentModal, setViewPaymentModal, URL, toast, singlePurchase, allSupplier, allWarehouse }) => {
    const [supplier, setSupplier] = useState()
    const [warehouse, setWarehouse] = useState()
    const [invoice, setInvoice] = useState([])

    useEffect(() => {
        // setSupplier(allSupplier?.filter(i => i?._id === singlePurchase?.supplier)?.[0])
        setWarehouse(allWarehouse?.filter(i => i?._id === singlePurchase?.wh)?.[0])
        // const groupObjects = allSupplier.reduce((acc, item) => {
        //     const findItem = acc.find((i) => i?.invoiceNo === item?.invoiceNo)
        //     if (!findItem) {
        //         acc.push({
        //             name: item.name,
        //             purchaseDue: item.purchaseDue,
        //             purchaseTotal: item.purchaseTotal,
        //             paid: item.paid,
        //             phone: item.phone,
        //             invoiceNo: item.invoiceNo,
        //             createdAt: item.createdAt
        //         })
        //     } else {
        //         const findProduct = acc.find((i) => i.invoiceNo === item.invoiceNo)
        //         if (findProduct) {
        //             findProduct.purchaseDue += item?.purchaseDue
        //             findProduct.paid += item?.paid
        //             findProduct.purchaseTotal += item?.purchaseTotal
        //         } else {
        //             findItem.push({
        //                 name: item.name,
        //                 purchaseDue: item.purchaseDue,
        //                 purchaseTotal: item.purchaseTotal,
        //                 paid: item.paid,
        //                 phone: item.phone,
        //                 invoiceNo: item.invoiceNo,
        //                 createdAt: item.createdAt
        //             })
        //         }
        //     }
        //     return acc

        // }, [])
        // setInvoice(groupObjects)
    }, [singlePurchase])

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
        <td>Ref#</td>
         <td>${sale?.invoiceNo}</td>
        </tr>
        <tr>
        <td>Supplier</td>
         <td>${sale?.supplier?.name}</td>
        </tr>
          

              <td>Purchase Due</td>
               <td>${sale?.due} Rs </td>
              <tr>
              </tr>
              <td>Paid</td>
             <td>${sale?.paid} Rs</td>
            </tr>
       
            <tr>
            <td>Total</td>
            <td>${sale?.total} Rs</td>
          
           
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
        <Modal
            title="Purchase Report"
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

                    {/* <p style={{ margin: "0", padding: "0" }}>{supplier?.name}</p>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.email}</p>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.phone}</p>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.city}</p>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.country}</p>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.address}</p> */}
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
                                    <th>Ref#</th>
                                    <th>Supplier</th>

                                    <th>Due</th>
                                    <th>Paid</th>
                                    <th>Grand Total</th>



                                </tr>
                            </thead>
                            <tbody>
                                {/* {invoice && invoice?.map(item => ( */}

                                <tr>
                                    <td>{new Date(singlePurchase.createdAt)?.toLocaleDateString()}</td>
                                    <td>{singlePurchase?.invoiceNo}</td>
                                    <td>{singlePurchase?.supplier?.name}</td>

                                    <td>PKR {singlePurchase?.due}</td>
                                    <td>PKR {singlePurchase?.paid}</td>
                                    <td>PKR {singlePurchase?.total}</td>

                                </tr>

                            </tbody>
                        </table>
                        <div style={{ textAlign: "right", width: "100%" }}>

                            <Button style={{ background: "#B2C4FF", color: "#111", }}
                                onClick={() => printInvoice(singlePurchase)}>Print</Button>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-6">
                    <h5 className="mb-3">Warehouse Info</h5>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.name}</p>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.email}</p>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.phone}</p>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.city}</p>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.country}</p>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.zipCode}</p>
                </div> */}
            </div>
        </Modal>
    )
}

export default ViewPayment
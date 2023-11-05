import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import './Supplier.css'
import { GiShoppingCart } from 'react-icons/gi'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import URL from '../../../Url';
import { MagnifyingGlass } from 'react-loader-spinner';
// import { LiaCommentsDollarSolid } from 'react-icons/lia'
// import { FaSackDollar } from 'react-icons/fa'
import { MdOutlinePaid } from 'react-icons/md'
import { PiHandCoinsBold } from 'react-icons/pi'
import { toast } from 'react-toastify';

const ViewSuplier = () => {
  const { id } = useParams()
  const [loader, setLoader] = useState(true)
  const [supplierDetail, setSupplierDetail] = useState({})
  const [modalOpen, setModalOpen] = useState(false);
  const [payment, setPayment] = useState(0);
  const [method, setSingleMethod] = useState("");
  const [allMethod, setAllMethod] = useState([]);
  const [recentPay, setRecentPay] = useState([]);
  const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  useEffect(() => {
    axios.get(`${URL}/paymentmethod`).then((res) => {
      setAllMethod(res?.data?.data)
    })
  }, [])
  useEffect(() => {
    axios.get(`${URL}/supplier/getAllPayment/${id}`).then((res) => {
      setRecentPay(res?.data?.data)
    })
  }, [])
  useEffect(() => {
    axios.get(`${URL}/supplier/${id}`).then((res) => {
      if (res?.data?.status === 200) {
        setSupplierDetail(res?.data?.data)
        setLoader(false)
      }
    })
  }, [id])


  const ParAllDues = (id) => {

    if (!payment || !method?.length) {

      return toast.error("Fill fields first");
    }
    if (payment > supplierDetail?.purchaseDue) {
      return toast.error("Payment is greater than due amount");
    }


    axios.patch(`${URL}/supplier/payment/${id}`, { payment: parseInt(payment), method }).then((res) => {
      if (res?.data?.status === 200) {
        toast.success("Dues Paid");
        axios.get(`${URL}/supplier/getAllPayment/${id}`).then((res) => {
          setRecentPay(res?.data?.data)
        })
        axios.get(`${URL}/supplier/${id}`).then((res) => {
          if (res?.data?.status === 200) {
            setSupplierDetail(res?.data?.data)
          }
        })
        setModalOpen(false)
      }
      else {
        toast.error("Error...")
      }
    })

  }


  return (
    <div className='complete-detail'>
      <Modal
        title="Pay Dues"
        style={{ top: 20 }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={600}
        footer={[
          <Button key="cancel" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={() => { ParAllDues(supplierDetail?._id) }}>
            Pay
          </Button>,
        ]}
      >
        <hr />
        <div className="row">

          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Enter Amount</label>
            <input type="number" name="payment" onChange={(e) => setPayment(e.target?.value)} className="productCreateInput" placeholder="Enter amount to pay" id="emailAddress" required />
          </div>
          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Payment Method</label>

            <select
              className="productCreateInput"
              name="method"
              value={method}
              onChange={(e) => setSingleMethod(e.target?.value)}
              required
            >
              <option value="" disabled selected>---Select---</option>

              {allMethod?.map((item) => <option value={item.title}>{item.title}</option>)}
            </select>
          </div>
        </div>
      </Modal >
      <p className='dashboadHeading'>Provider Details</p >
      <div className="container-fluid">
        <hr className='dashboardLine' />
      </div>
      <div className="productMainBox">
        {loader === true ? (
          <div className='text-center'>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor='#fff'
              color='#B2C4FF'
            />
          </div>
        ) : (
          <div className="col-md-12">
            <div className='col-md-6'>
              <table className="table display table  ">
                <tbody>
                  <tr>
                    <th>Full name</th>
                    <td>{supplierDetail?.name}</td>
                  </tr>
                  <tr>
                    <th>Code</th>
                    <td>{supplierDetail?._id}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{supplierDetail?.phone}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{supplierDetail?.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4">
                  <div className="containe  ">
                    <div className="text-center">
                      <GiShoppingCart className='color' />
                      <p className='text-color'> Purchase Total</p>
                      <span className=' color-price'>{supplierDetail?.purchaseTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="containe  ">
                    <div className="text-center">
                      <MdOutlinePaid className='color' />
                      <p className='text-color'> Paid</p>
                      <span className=' color-price'>{supplierDetail?.paid}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="containe  ">
                    <div className="text-center">
                      <PiHandCoinsBold className='color' />
                      <p className='text-color'>Purchase Due</p>
                      <p className=' color-price'>{supplierDetail?.purchaseDue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{ textAlign: "end", marginTop: "1rem" }}>




          <button style={{ border: "none", background: "#A7CCFE", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
            onClick={() => setModalOpen(true)}
          >Pay Dues</button>
        </div>
      </div>
      {/* recent payment */}
      <div className="table-responsive container-fluid">
        <h5>Recent Payments</h5>
        <table
          id="warehouse_table"
          className="table mt-3"
          aria-describedby="warehouse_table_info"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th style={{ width: "55px" }}>Sr#</th>
              <th style={{ width: "105px" }}>Date</th>
              <th style={{ width: "105px" }}>Supplier</th>
              <th style={{ width: "105px" }}>Amount Paid</th>
              <th style={{ width: "105px" }}>Payment Method</th>

            </tr>
          </thead>
          <tbody>
            {recentPay?.map((item, i) => (
              <tr style={{ lineHeight: "4rem" }}>

                <td>{i + 1}</td>
                <td>{new Date(item?.createdAt).toLocaleDateString(undefined, dateOptions)}</td>
                <td>{item?.supplierId?.name}</td>
                <td>{item?.amount}</td>
                <td>{item?.paymentMethod}</td>

              </tr>
            ))}
          </tbody>
        </table>
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
}

export default ViewSuplier;
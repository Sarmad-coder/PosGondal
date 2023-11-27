import React, { useEffect, useState } from 'react'
import URL from '../screen/Url'
import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'
const ViewReport = ({ modalOpen, setModalOpen, Modal, Button }) => {
    const [totalSale, setTotalSale] = useState(0)
    const [totalPurchase, setTotalPurchase] = useState(0)
    const [totalSaleReturn, setTotalSaleReturn] = useState(0)
    const [totalPurchaseReturn, setPurchaseSaleReturn] = useState(0)
    useEffect(() => {
        axios.get(`${URL}/customerorder`).then((res) => {
            const dateFilter = res?.data?.data?.filter(i => i?.setDate === localStorage.getItem("dateSet"))
            setTotalSale(dateFilter?.reduce((acc, i) => {
                return i?.grandTotal + acc
            }, 0))
        })
        axios.get(`${URL}/purchasedetail/get`).then((res) => {
            const dateString = localStorage.getItem("dateSet");
            const date = moment.utc(dateString, "DD-MMMM-YYYY")
            const dateFilter = res?.data?.data?.filter(i => {
               return new Date(i?.createdAt).toISOString().slice(0, 10)  ===date.format("YYYY-MM-DD")
            })
            setTotalPurchase(dateFilter?.reduce((acc, i) => {
                return (i?.productPrice * i?.quantity) + acc
            }, 0))
        })
        axios.get(`${URL}/salesreturn`).then((res) => {
            const dateFilter = res?.data?.data?.filter(i => i?.setDate === localStorage.getItem("dateSet"))
            setTotalSaleReturn(dateFilter?.reduce((acc, i) => {
                return (i?.product?.productPrice * i?.returnQty) + acc
            }, 0))
        })
        axios.get(`${URL}/purchasereturn`).then((res) => {
            const dateFilter = res?.data?.data?.filter(i => i?.setDate === localStorage.getItem("dateSet"))
            setPurchaseSaleReturn(dateFilter?.reduce((acc, i) => {
                return (i?.product?.productPrice * i?.product?.returnQty) + acc
            }, 0))
        })
    })
    const fn_Submit = () => {
        window.print()
        // localStorage.removeItem("dateSet")
        // toast.success("Day Closed")
        setTimeout(() => {
            window.location.reload()
        }, 1500)
    }
    return (
        <div>
            <Modal
                title="Today Report"
                style={{ top: 20 }}
                width={800}
                open={modalOpen}
                onOk={() => { setModalOpen(false) }}
                onCancel={() => { setModalOpen(false) }}
                footer={[<Button key="cancel" onClick={() => { setModalOpen(false) }}>Cancel</Button>,
                <Button key="ok" type="primary" onClick={fn_Submit}>Print and Close</Button>]
                }
            >
                <hr />
                <div className="row">
                    <h5 className='mb-5'>Date : {localStorage.getItem("dateSet")}</h5>
                    <div>
                        <div className='d-flex gap-5'>
                            <h6>Today Total Sale</h6>
                            <h5>PKR{totalSale}</h5>
                        </div>
                        <hr />
                        <div className='d-flex gap-5'>
                            <h6>Today Total Purchase</h6>
                            <h5>PKR{totalPurchase}</h5>
                        </div>
                        <hr />
                        <div className='d-flex gap-5'>
                            <h6>Today Total Sale Return</h6>
                            <h5>PKR{totalSaleReturn}</h5>
                        </div>
                        <hr />
                        <div className='d-flex gap-5'>
                            <h6>Today Total Purchase Return</h6>
                            <h5>PKR{totalPurchaseReturn}</h5>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ViewReport 

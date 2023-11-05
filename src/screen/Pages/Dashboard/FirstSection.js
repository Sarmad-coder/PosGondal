import axios from "axios";
import React, { useEffect, useState } from "react";
import URL from "../../Url";

const FirstSectionDashBoard = () => {
    const [totalSale, setTotalSale] = useState(0)
    const [filterTotalSale, setFilterTotalSale] = useState(0)
    const [filterTotalPurchase, setFilterTotalPurchase] = useState(0)
    const [totalPurchase, setTotalPurchase] = useState(0)
    const [totalSaleReturn, setTotalSaleReturn] = useState(0)
    const [totalPurchaseReturn, setPurchaseSaleReturn] = useState(0)
    useEffect(() => {
        axios.get(`${URL}/customerorder`).then((res) => {
            setTotalSale(res?.data?.data?.reduce((acc, i) => {
                return i?.grandTotal + acc
            }, 0))
            const dateFilter = res?.data?.data?.filter(i => i?.setDate === localStorage.getItem("dateSet"))
            setFilterTotalSale(dateFilter?.reduce((acc, i) => {
                return i?.grandTotal + acc
            }, 0))
        })
        axios.get(`${URL}/purchasedetail/get`).then((res) => {
            setTotalPurchase(res?.data?.data?.reduce((acc, i) => {
                return (i?.productPrice * i?.quantity) + acc
            }, 0))
            const dateFilter = res?.data?.data?.filter(i => i?.setDate === localStorage.getItem("dateSet"))
            setFilterTotalPurchase(dateFilter?.reduce((acc, i) => {
                return (i?.productPrice * i?.quantity) + acc
            }, 0))
        })
        axios.get(`${URL}/salesreturn`).then((res) => {
            setTotalSaleReturn(res?.data?.data?.reduce((acc, i) => {
                return (i?.product?.productPrice * i?.returnQty) + acc
            }, 0))
        })
        axios.get(`${URL}/purchasereturn`).then((res) => {
            setPurchaseSaleReturn(res?.data?.data?.reduce((acc, i) => {
                return (i?.product?.productPrice * i?.product?.returnQty) + acc
            }, 0))
        })
    }, [])
    return (
        <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
                <div className="dashboardSectionBox ms-4 p-4 d-flex flex-row align-items-center justify-content-between">
                    <div>
                        <p className="text-primary fw-semibold mb-1">
                            {/* Good Morning, Sir */}
                        </p>
                        <p className="p-0 mb-4 dashboardTxt">
                            {/* Here’s what happening with your store today! */}
                        </p>
                        <p className="fw-semibold mb-1">
                            Total Sale
                        </p>
                        <p className="p-0 mb-4 dashboardTxt">
                            PKR {filterTotalSale}
                        </p>
                        <p className="fw-semibold mb-1">
                            Total Purchase
                        </p>
                        <p className="p-0 mb-4 dashboardTxt">
                            PKR {totalPurchase}
                        </p>
                    </div>
                    <img className="pe-lg-3" width="194" height="170" src="https://posly.getstocky.com/images/overview.png" alt="" />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="row me-3">
                    <div className="col-md-6 col-sm-6">
                        <div className="mb-4 dashboardSectionBox ps-4">
                            <p className="dashboardTxt">
                                Sales
                            </p>
                            <h4 className="dashboardTxtHead">
                                PKR {totalSale}
                            </h4>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="mb-4 dashboardSectionBox ps-4">
                            <p className="dashboardTxt">
                                Purchases
                            </p>
                            <h4 className="dashboardTxtHead">
                                PKR {totalPurchase}
                            </h4>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="mb-4 dashboardSectionBox ps-4">
                            <p className="dashboardTxt">
                                Sales Return
                            </p>
                            <h4 className="dashboardTxtHead">
                                PKR {totalSaleReturn}
                            </h4>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="mb-4 dashboardSectionBox ps-4">
                            <p className="dashboardTxt">
                                Purchases Return
                            </p>
                            <h4 className="dashboardTxtHead">
                                PKR {totalPurchaseReturn}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstSectionDashBoard
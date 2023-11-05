import axios from "axios"
import React from "react"


const CreatePayment = ({ Modal, Button, createPaymentModal, setCreatePaymentModal, URL, toast, singlePurchase, allPayment, setAllProduct }) => {
    const fn_submit = () => {
        if (
            document.getElementById("paymentdate").value === "" ||
            document.getElementById("paymentAmount").value === "" ||
            document.getElementById("paymentChoice").value === "" ||
            document.getElementById("account").value === "" ||
            document.getElementById("details").value === ""
        ) {
            return toast.error("Fill All Flieds")
        }
        const params = {
            id: singlePurchase?._id,
            date: document.getElementById("paymentdate").value,
            paymentAmount: parseInt(document.getElementById("paymentAmount").value),
            paymentChoice: document.getElementById("paymentChoice").value,
            account: document.getElementById("account").value,
            details: document.getElementById("details").value
        }
        axios.patch(`${URL}/purchasedetail/dopayment`, params).then((res) => {
            if (res?.data?.status === 200) {
                toast.success("Payment Updated")
                setCreatePaymentModal(false)
                axios.get(`${URL}/purchasedetail/get`).then((res) => {
                    setAllProduct(res?.data?.data)
                })
            }
        })
    }
    return (
        <Modal
            title="Create Payment"
            style={{ top: 20 }}
            open={createPaymentModal}
            onOk={() => setCreatePaymentModal(false)}
            onCancel={() => setCreatePaymentModal(false)}
            width={600}
            footer={[
                <div>
                    <Button key="cancel" onClick={() => setCreatePaymentModal(false)}>Cancel</Button>
                    <Button key="ok" type="primary" onClick={fn_submit}>Create</Button>
                </div>
            ]}
        >
            <hr />
            <div className="row">
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Date*</label>
                    <input type="date" className="productCreateInput" id="paymentdate" required />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Payment Amount(PKR)*</label>
                    <input type="text" className="productCreateInput" id="paymentAmount" required defaultValue={singlePurchase?.due} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Payment Choice*</label>
                    <select className="productCreateInput" id="paymentChoice">
                        <option selected value={""}>Select Payment Choise</option>
                        {allPayment && allPayment?.map((item) => (
                            <option value={item?._id}>{item?.title}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Account*</label>
                    <select className="productCreateInput" id="account">
                        <option selected value={""}>Select Account</option>
                        <option value={"Global Account"}>Global Account</option>
                    </select>
                </div>
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Please Prove any Details*</label>
                    <textarea type="number" className="productCreateTextArea" id="details" required />
                </div>
            </div>
        </Modal>
    )
}

export default CreatePayment
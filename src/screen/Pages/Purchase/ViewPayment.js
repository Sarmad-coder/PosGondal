import React, { useEffect, useState } from "react"


const ViewPayment = ({ Modal, Button, viewPaymentModal, setViewPaymentModal, URL, toast, singlePurchase, allSupplier, allWarehouse }) => {
    const [supplier, setSupplier] = useState()
    const [warehouse, setWarehouse] = useState()
    useEffect(() => {
        setSupplier(allSupplier?.filter(i => i?._id === singlePurchase?.supplier)?.[0])
        setWarehouse(allWarehouse?.filter(i => i?._id === singlePurchase?.wh)?.[0])
    }, [singlePurchase])
    return (
        <Modal
            title="Detail Purchase"
            style={{ top: 20 }}
            open={viewPaymentModal}
            onOk={() => setViewPaymentModal(false)}
            onCancel={() => setViewPaymentModal(false)}
            width={600}
            footer={[
                <div>
                    <Button key="cancel" onClick={() => setViewPaymentModal(false)}>Cancel</Button>
                    <Button key="ok" type="primary">Create</Button>
                </div>
            ]}
        >
            <hr />
            <div className="row">
                <div className="col-md-6">
                    <h5 className="mb-3">Supplier Info</h5>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.name}</p>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.email}</p>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.phone}</p>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.city}</p>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.country}</p>
                    <p style={{ margin: "0", padding: "0" }}>{supplier?.address}</p>
                </div>
                <div className="col-md-6">
                    <h5 className="mb-3">Warehouse Info</h5>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.name}</p>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.email}</p>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.phone}</p>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.city}</p>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.country}</p>
                    <p style={{ margin: "0", padding: "0" }}>{warehouse?.zipCode}</p>
                </div>
            </div>
        </Modal>
    )
}

export default ViewPayment
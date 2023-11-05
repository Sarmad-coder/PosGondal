import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai"

const SmsTemplate = () => {
    return (
        <div>
            <p className='dashboadHeading' >SMS Templates</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <p className="fs-5 mb-4">Notification Client</p>
                <button className="productSubmitBtn ms-0"><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
        </div>
    )
}

export default SmsTemplate
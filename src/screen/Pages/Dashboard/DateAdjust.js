import React, { useState } from "react";

const DateAdjust = () => {
    const [storeDate, setStoreDate] = useState(localStorage?.getItem("dateSet"))
    const fn_submit = () => {
        const currentDate = new Date();
        const monthAbbreviation = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        localStorage.setItem("dateSet", currentDate?.getDate() + "-" + monthAbbreviation[currentDate?.getMonth()] + "-" + currentDate?.getFullYear())
        setStoreDate(currentDate?.getDate() + "-" + monthAbbreviation[currentDate?.getMonth()] + "-" + currentDate?.getFullYear())
    }
    return (
        <div className="row">
            {storeDate ? (
                <div className="mb-4">
                    <div className="dashboardSectionBox mx-4 p-4 d-flex flex-row align-items-center gap-5">
                        {/* <div className="d-flex gap-2">
                        <div>
                            <label className="productCreateTxt">Date*</label><br />
                            <select className="productCreateInput" id="dateSet">
                                {dates.map((date, index) => (
                                    <option key={index} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                            &nbsp;&nbsp;-
                        </div>
                        <div>
                            <label className="productCreateTxt">Month*</label><br />
                            <select className="productCreateInput" id="monthSet">
                                {months.map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            &nbsp;&nbsp;-
                        </div>
                        <div>
                            <label className="productCreateTxt">Year*</label><br />
                            <input className="productCreateInput" type="number" defaultValue={2023} id="yearSet" max={4} />
                        </div>
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="btn btn-info btn-md ms-3" style={{ width: "100px" }} onClick={fn_submit}>
                            Set
                        </button>
                        {storeDate && (
                            <>
                                <label className="ms-3 productCreateTxt">Adjusted Date is : </label>
                                <label className="productCreateTxt fw-bold ms-2">{storeDate}</label>
                            </>
                        )}
                    </div> */}
                        <>
                            <label className="ms-3 productCreateTxt">Adjusted Date is : </label>
                            <label className="productCreateTxt fw-bold ms-2">{storeDate}</label>
                        </>
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <div className="dashboardSectionBox mx-4 p-4 d-flex flex-row align-items-center gap-5">
                        <button type="submit" className="btn btn-info btn-md ms-3" onClick={fn_submit}>
                            Click to Start Day
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DateAdjust
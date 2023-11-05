import React, { useEffect, useState } from 'react'
import './date.css'

const DateComponent = ({ from, to, setDateFilterRes, dataArray }) => {
    const [date, setDate] = useState({ from: "", to: "" })


    function fn_onDateChange() {
        const data = dataArray?.filter(item => {
            console.log(date);

            var itemDate = new Date(item.createdAt).toLocaleDateString()
            console.log(itemDate);
            return itemDate >= date.from && itemDate <= date.to

        })
        setDateFilterRes(data)
        console.log(data);
    }
    useEffect(() => {
        if (date.from && date.to) {
            fn_onDateChange()
        }
    }, [date.from, date.to])

    return (
        <div className="date_wrapper">
            <div>
                <label>{from}:</label>
                <input type='date' onChange={(e) => setDate({ ...date, from: new Date(e.target.value)?.toLocaleDateString() })} />
            </div>
            <div>
                <label>{to}:</label>
                <input type='date' onChange={(e) => setDate({ ...date, to: new Date(e.target.value)?.toLocaleDateString() })} />
            </div>
        </div>
    )
}

export default DateComponent
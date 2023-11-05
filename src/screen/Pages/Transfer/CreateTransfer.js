import React, { useEffect, useState } from "react";
import BetweenWarehouse from "./BetweenWarehouse";
import axios from "axios";
import URL from "../../Url";
import { Oval } from 'react-loader-spinner';

const CreateTransfer = () => {
    const [allWarehouse, setAllWarehouse] = useState([])
    useEffect(() => {
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
    }, [])
    return (
        <div>
            <p className='dashboadHeading' >Create Transfer</p>
            <hr className='dashboardLine' />
            <BetweenWarehouse URL={URL} allWarehouse={allWarehouse} Oval={Oval} />
        </div>
    )
}

export default CreateTransfer
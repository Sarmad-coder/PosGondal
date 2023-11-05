import { Button, Input, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import URL from '../../../Url';
import { toast } from 'react-toastify';

const UpdateUnit = ({ updateUnit, setUpdateUnit,setAllUnit, modal1Open, setModal1Open,allUnit }) => {
    const [unitD,setUnitD] = useState({})
    useEffect(()=>{
        setUnitD({
            title: updateUnit?.title,
            shortName:updateUnit?.shortName
        })

    },[updateUnit])

    const change = (e)=>{
        const {name,value} = e.target;
        setUnitD((pre)=>({...pre, [name]:value}) )
    }
    const fn_Update = (id)=>{
        axios.patch(`${URL}/unit/${id}`,unitD).then((res)=>{
            if(res?.data?.status===200){
                toast.success("Updated");
                setModal1Open(false)
                axios.get(`${URL}/unit`).then((res) => {
                    setAllUnit(res?.data?.data?.reverse())
                })
            }
            else{
                toast.error("Not Updated")
            }
        })
    }
    return (
        <>

            <Modal
                title="Update Unit"
                style={{ top: 20 }}
                open={modal1Open}
                // onOk={() => setModal1Open(false)}
                // onCancel={() => setModal1Open(false)}
                footer={[
                    <Button key={'cancel'} onClick={() => { setModal1Open(false) }}>Cancel</Button>,
                    <Button key={'ok'} type='primary' onClick={() => { console.log(unitD) ; fn_Update(updateUnit?._id) }}>Update</Button>

                ]}
            >
                <label htmlFor="title" className='my-2'>Name</label>
                <Input type='text' name='title' value={unitD?.title} onChange={(e)=>{change(e)}} />

                <label htmlFor="shortName" className='my-2'>Short Name</label>
                <Input type='text' name='shortName' value={unitD?.shortName} onChange={(e)=>change(e)} />
            </Modal>

        </>
    );
}

export default UpdateUnit;

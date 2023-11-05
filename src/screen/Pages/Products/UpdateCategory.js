import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import URL from '../../Url';
import { toast } from 'react-toastify';
const UpdateCategory = ({ groupDetail, modalUpdate, setModalUpdate, setGroupDetail, setDate }) => {
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  useEffect(() => {
    setCode(groupDetail?.grpCode)
    setName(groupDetail?.grpName)
    setId(groupDetail?._id)
  }, [groupDetail])
  console.log(groupDetail)
  const detail = {
    grpCode: code,
    grpName: name
  }
  const submit = () => {
    console.log(detail)
    axios.patch(`${URL}/group/${id}`, detail).then((res) => {
      if (res?.data?.status === 200) {
        toast.success("Group Updated")
        setModalUpdate(false)
        axios.get(`${URL}/group`).then((res) => {
          setDate(res?.data?.data?.reverse())
        })
      }
    })
  }
  return (
    <div>
      <Modal
        title="Update Category"
        style={{ top: 20 }}
        open={modalUpdate}
        onOk={() => { setModalUpdate(false) }}
        onCancel={() => { setModalUpdate(false) }}
        width={500}
        footer={[
          <Button key="primary" onClick={() => {
            setModalUpdate(false)
            setGroupDetail({})
          }}>  Cancel </Button>,
          <Button key="ok" type="primary" onClick={submit}>  Update</Button>
        ]}
      >

        <hr />
        <div className="row">
          <div className="d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Update Code of category*</label>
            <input type="text" name="code" defaultValue={code} onChange={(e) => { setCode(e?.target?.value) }} className="productCreateInput" placeholder="Enter category code" required />
          </div>
          <div className="d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Update Name of category</label>
            <input type="text" name="name" defaultValue={name} onChange={(e) => { setName(e?.target?.value) }} className="productCreateInput" placeholder="Enter category name" required />
          </div>
        </div>


      </Modal>
    </div>
  );
}

export default UpdateCategory;

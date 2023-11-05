import axios from "axios";
import React, { useEffect, useState } from "react";
// import { toast } from 'react-toastify';

const UpdateUser = ({ Modal, Button, modalOpen, setModalOpen, URL, toast, setAllUsers, userDetail }) => {
  const [allWarehouse, setAllWarehouse] = useState([]);
  const [user, SetUser] = useState({})
  useEffect(() => {
    axios.get(`${URL}/Warehouse`).then((res) => {
      setAllWarehouse(res?.data?.data);
    });
    SetUser({
      ...user, fullName: userDetail?.fullName,
      email: userDetail?.email,
      status: userDetail?.status,
      role: userDetail?.role,
      // imageUrl: userDetail?.imageUrl,
      warehouseId: userDetail?.warehouseId
    })
  }, [userDetail?.fullName]);

  const fn_handleUpdate = (id) => {

    // Get form input values
    // const fullName = document.getElementById("fullName").value;
    // const emailAddress = document.getElementById("emailAddress").value;
    // const status = document.getElementById("status").value;
    // const role = document.getElementById("role").value;
    // const image = document.getElementById("image").files[0];
    // const warehouseId = document.getElementById("warehouse").value;


    // Form validation
    // if (!fullName || !emailAddress || !status || !role || !image || !warehouseId) {
    //   return toast.error("Please fill in all required fields.");
    // }

    // Create form data
    const formData = new FormData();
    formData.append("fullName", user?.fullName);
    formData.append("email", user?.email);
    formData.append("status", user?.status);
    formData.append("role", user?.role);
    if (document.getElementById("image")?.files[0]) {

      formData.append("imageUrl", document.getElementById("image").files[0]);
    }
    formData.append("warehouseId", user?.warehouseId);
    // console.log("FormData",formData?.fullName)
    // Send axios request to update user
    axios.patch(`${URL}/user/${id}`, formData).then((response) => {
      // if (response?.data?.status === 200) {
      setModalOpen(false);
      toast.success("Updated");
      window.location.reload()
      // axios.get(`${URL}/user`).then((res) => {
      //   setAllUsers(res?.data?.data.reverse())
      // })

      // }
      // else {
      // console.error("Error in update")
      // }
    })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Error updating user. Please try again later.");
      });
  };

  const changeData = (e) => {
    // const [value , name] = e.target
    const value = e?.target?.value;
    const name = e?.target?.name
    const files = e?.target?.files

    SetUser((prevUser) => ({
      ...prevUser,
      [name]: name === 'imageUrl' ? files[0] : value,
    }));


  }

  return (
    <Modal
      title="Update User"
      style={{ top: 20 }}
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      width={600}
      footer={[
        <Button key="cancel" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={() => { fn_handleUpdate(userDetail?._id) }}>
          Update
        </Button>,
      ]}
    >
      <hr />
      <div className="row">
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Full Name*</label>
          <input type="text" name="fullName" defaultValue={user?.fullName} onChange={(e) => { changeData(e) }} className="productCreateInput" placeholder="Enter Full Name" id="fullName" required />
        </div>
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Email Address*</label>
          <input type="text" defaultValue={user?.email} name="email" onChange={(e) => { changeData(e) }} className="productCreateInput" placeholder="Enter Email Address" id="emailAddress" required />
        </div>
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Status*</label>
          {/* <select className="productCreateInput" name="status" onChange={(e) => { changeData(e) }} defaultValue={user?.status} id="status" required>
            <option value={"Active"} selected={user?.status === "Active" ? true : false}>Active</option>
            <option value={"Inactive"} selected={user?.status === "Inactive" ? true : false}>Inactive</option>
          </select> */}
          <select
            className="productCreateInput"
            name="status"
            value={user.status}
            onChange={(e) => changeData(e)}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt" defaultValue={user?.role}>Role*</label>
          <select className="productCreateInput" name="role" defaultValue={user?.role} onChange={(e) => { changeData(e) }} id="role" required>
            <option value={""}>---Choose Role---</option>
            {/* <option value={"Super Admin"} selected={user?.role === "Super Admin" ? true : false}>Super Admin</option> */}
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Choose Avatar*</label>
          <input type="file" name="imageUrl" className="productCreateInput" onChange={(e) => { changeData(e) }} placeholder="" id="image" required style={{ paddingTop: "2.5px" }} />
        </div>
        <hr />
        <div className="d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Choose Warehouse*</label>
          {/* <select className="productCreateInput"  id="warehouse" name="warehouse" onChange={(e)=>{changeData(e)}} required>
                        <option value={""} >---Choose Warehouse---</option>
                        {allWarehouse && allWarehouse?.map((item) => (
                            <option value={item?._id} select={userDetail?.warehouseId === item?._id ? true : false}>{item?.name}</option>
                        ))}
                    </select> */}
          <select className="productCreateInput" id="warehouse" name="warehouse" defaultValue={user?.warehouseId} onChange={(e) => { changeData(e) }} required>
            <option value={""} >---Choose Warehouse---</option>
            {allWarehouse && allWarehouse?.map((item) => (
              <option key={item?._id} value={item?._id} selected={user?.warehouseId === item?._id ? true : false}>{item?.name}</option>
            ))}
          </select>

        </div>
      </div>
    </Modal >
  )
}

export default UpdateUser
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import URL from '../../../Url'
import { toast } from 'react-toastify';
import { AiOutlineCheckCircle } from "react-icons/ai"
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function Permissions() {
  const [loader, setLoader] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [allObject, setAllObject] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${URL}/user`).then((res) => {
      setAllUsers(res?.data?.data)
    })
  }, [])
  const fn_handleCheck = (e) => {
    if (e?.target?.checked) {
      setAllObject((prevObject) => ({
        ...prevObject,
        [e?.target?.name]: e?.target?.value,
      }));
    } else {
      const updatedObject = { ...allObject };
      delete updatedObject[e?.target?.name];
      setAllObject(updatedObject);
    }
  }
  const fn_handleMultipleCheck = (e) => {
    if (e?.target?.checked) {
      setAllObject((prevObject) => ({
        ...prevObject,
        [e?.target?.id]: {
          ...prevObject[e?.target?.id],
          [e?.target?.name]: e?.target?.value,
        },
      }));
    } else {
      const updatedObject = { ...allObject };
      delete updatedObject?.[e?.target?.id][e?.target?.name];
      setAllObject(updatedObject);
    }
  }
  const fn_handleCreatePermission = (e) => {
    e.preventDefault()
    try {
      const params = {
        userId: document.getElementById("userId").value,
        userRole: document.getElementById("roleName").value,
        description: document.getElementById("description").value,
        allObject: allObject
      }
      setLoader(true)
      axios.post(`${URL}/permissions`, params).then((res) => {
        if (res?.data?.status === 200) {
          setLoader(false)
          toast.success("Permission Addedd")
          navigate("/roles")
        } else {
          toast.error(res?.data?.message)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="content-section p-2" >
        <p className='dashboadHeading' >Create Permissions</p>
        <hr className='dashboardLine' />
        <div className="row" id="section_Permission_Create">
          <div className="col-lg-12 mb-3">
            <div className="card">
              <form>
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="pHEedIUoQkdpXBGdTxadbyjaTWW73Zh8ZL733n9Z"
                />{" "}
                <div className="card-body">
                  <div className="row">
                    <div className="d-flex flex-column px-3 mb-3">
                      <label className="productCreateTxt">Select User*</label>
                      <select className="productCreateInput" id="userId" required>
                        <option selected value={""}>---Choose User---</option>
                        {allUsers && allUsers?.map((item) => (
                          <option value={item?._id}>{item?.fullName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                      <label className="productCreateTxt">Role Name*</label>
                      <select id="roleName" className="productCreateInput" >
                        <option value={""}>---Choose Role---</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                      {/* <input type="text" className="productCreateInput" placeholder="Enter Role Name" id="roleName" required /> */}
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                      <label className="productCreateTxt">Description*</label>
                      <input type="text" className="productCreateInput" placeholder="Description" id="description" required />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <table className="table table-bordered table_permissions">
                          <tbody>
                            <tr>
                              <th>Dashboard</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100 ">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="dashboard"
                                    >
                                      <input
                                        type="checkbox"
                                        name="dashboard"
                                        id="dashboard"
                                        value="dashboard"
                                        onChange={(e) => fn_handleCheck(e)}
                                      />
                                      <span
                                        className="CrPermCh"
                                      >Dashboard</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Users</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="user_view"
                                    >
                                      <input
                                        type="checkbox"
                                        name="viewUser"
                                        id="user"
                                        value="viewUser"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">View user</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="user_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addUser"
                                        id="user"
                                        value="addUser"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add user</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="user_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editUser"
                                        id="user"
                                        value="editUser"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit user</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="user_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deleteUser"
                                        id="user"
                                        value="deleteUser"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete user</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Roles</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="group_permission"
                                    >
                                      <input
                                        type="checkbox"
                                        name="roles"
                                        id="group_permission"
                                        value="roles"
                                        onChange={(e) => fn_handleCheck(e)}
                                      />
                                      <span className="CrPermCh">Roles</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Products</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="products_view"
                                    >
                                      <input
                                        type="checkbox"
                                        name="productView"
                                        id="product"
                                        value="productView"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">View Product</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="products_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addProduct"
                                        id="product"
                                        value="addProduct"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Product</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="products_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editProduct"
                                        id="product"
                                        value="editProduct"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Product</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="products_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deleteProduct"
                                        id="product"
                                        value="deleteProduct"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Product</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>

                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Category</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="category"
                                    >
                                      <input
                                        type="checkbox"
                                        name="category"
                                        id="category"
                                        value="category"
                                        onChange={(e) => fn_handleCheck(e)}
                                      />
                                      <span className="CrPermCh">Category</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Brand</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="brand"
                                    >
                                      <input
                                        type="checkbox"
                                        name="brand"
                                        id="brand"
                                        value="brand"
                                        onChange={(e) => fn_handleCheck(e)}
                                      />
                                      <span className="CrPermCh">Brand</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Unit</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="unit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="unit"
                                        id="unit"
                                        value="unit"
                                        onChange={(e) => fn_handleCheck(e)}
                                      />
                                      <span className="CrPermCh">Unit</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Warehouse</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="warehouse"
                                    >
                                      <input
                                        type="checkbox"
                                        name="warehouse"
                                        id="warehouse"
                                        value="warehouse"
                                        onChange={(e) => fn_handleCheck(e)}
                                      />
                                      <span className="CrPermCh">Warehouse</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <th>Transfers</th>
                              <td>
                                <div className="pt-3">
                                  <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewTransfer"
                                      id='transfer'
                                      value="viewAllTransfer"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View all Transfers</span>
                                    <span className="checkmark" />
                                  </label>
                                  {/* <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewTransfer"
                                      id='transfer'
                                      value="viewOwnTransfer"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View own Transfers</span>
                                    <span className="checkmark" />
                                  </label> */}
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="transfer_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addTransfer"
                                        id="transfer"
                                        value="addTransfer"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Transfer</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="transfer_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editTransfer"
                                        id="transfer"
                                        value="editTransfer"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Transfer</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="transfer_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deleteTransfer"
                                        id="transfer"
                                        value="deleteTransfer"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Transfer</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Sales</th>
                              <td>
                                <div className="pt-3">
                                  <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewSale"
                                      id='sale'
                                      value="viewAllSale"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View all Sales</span>
                                    <span className="checkmark" />
                                  </label>
                                  {/* <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewSale"
                                      id='sale'
                                      value="viewOwnSale"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View own Sales</span>
                                    <span className="checkmark" />
                                  </label> */}
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="sales_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addSale"
                                        id="sale"
                                        value="addSale"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Sell</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="sales_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editSale"
                                        id="sale"
                                        value="editSale"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Sell</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="sales_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deleteSale"
                                        id="sale"
                                        value="deleteSale"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Sell</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="sales_details"
                                    >
                                      <input
                                        type="checkbox"
                                        name="saleDetail"
                                        id="sale"
                                        value="saleDetail"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Sell details</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="pos"
                                    >
                                      <input
                                        type="checkbox"
                                        name="pos"
                                        id="sale"
                                        value="pos"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">POS</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Purchases</th>
                              <td>
                                <div className="pt-3">
                                  <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewPurchase"
                                      id="purchase"
                                      value="viewAllPurchase"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View all Purchases</span>
                                    <span className="checkmark" />
                                  </label>
                                  {/* <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewPurchase"
                                      id="purchase"
                                      value="viewOwnPurchase"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View own Purchases</span>
                                    <span className="checkmark" />
                                  </label> */}
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="purchases_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addPurchase"
                                        id="purchase"
                                        value="addPurchase"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Purchase</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="purchases_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editPurchase"
                                        id="purchase"
                                        value="editPurchase"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Purchase</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="purchases_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deletePurchase"
                                        id="purchase"
                                        value="deletePurchase"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Purchase</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="purchases_details"
                                    >
                                      <input
                                        type="checkbox"
                                        name="detailPurchase"
                                        id="purchase"
                                        value="detailPurchase"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Purchase details</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Sales Return</th>
                              <td>
                                <div className="pt-3">
                                  <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewSellReturn"
                                      id="sellReturn"
                                      value="viewAllSellReturn"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View all Sell Return</span>
                                    <span className="checkmark" />
                                  </label>
                                  {/* <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewSellReturn"
                                      id="sellReturn"
                                      value="viewOwnSellReturn"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View own Sell Return</span>
                                    <span className="checkmark" />
                                  </label> */}
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="sale_returns_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addSellReturn"
                                        id="sellReturn"
                                        value="addSellReturn"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Sell Return</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="sale_returns_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editSellReturn"
                                        id="sellReturn"
                                        value="editSellReturn"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Sell Return</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="sale_returns_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deleteSellReturn"
                                        id="sellReturn"
                                        value="deleteSellReturn"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Sell Return</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Purchases Return</th>
                              <td>
                                <div className="pt-3">
                                  <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="ViewPurchaseReturn"
                                      id='purchaseReturn'
                                      value="ViewAllPruchaseReturn"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View all Purchase Return</span>
                                    <span className="checkmark" />
                                  </label>
                                  {/* <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="ViewPurchaseReturn"
                                      id='purchaseReturn'
                                      value="ViewOwnPruchaseReturn"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View own Purchase Return</span>
                                    <span className="checkmark" />
                                  </label> */}
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="purchase_returns_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addPurchaseReturn"
                                        id="purchaseReturn"
                                        value="addPurchaseReturn"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Purchase Return</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="purchase_returns_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editPurchaseReturn"
                                        id="purchaseReturn"
                                        value="editPurchaseReturn"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Purchase Return</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="purchase_returns_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deletePurchaseReturn"
                                        id="purchaseReturn"
                                        value="deletePurchaseReturn"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Purchase Return</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Sell Payment</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_sales_view"
                                    >
                                      <input
                                        type="checkbox"
                                        name="viewSellPayment"
                                        id="sellPayment"
                                        value="viewSellPayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">View Sell Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_sales_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addSellPayment"
                                        id="sellPayment"
                                        value="sellPayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Sell Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_sales_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editSellPayment"
                                        id="sellPayment"
                                        value="editSellPayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Sell Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_sales_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deleteSellPayment"
                                        id="sellPayment"
                                        value="deleteSellPayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Sell Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Purchase Payment</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_purchases_view"
                                    >
                                      <input
                                        type="checkbox"
                                        name="viewPurchasePayment"
                                        id="purchasePayment"
                                        value="viewPurchasePayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">View Purchase Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_purchases_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addPurchasePayment"
                                        id="purchasePayment"
                                        value="addPurchasePayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Purchase Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_purchases_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editPurchasePayment"
                                        id="purchasePayment"
                                        value="editPurchasePayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Purchase Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_purchases_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deletePurchasePayment"
                                        id="purchasePayment"
                                        value="deletePurchasePayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Purchase Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Sell Return Payment</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_sell_returns_view"
                                    >
                                      <input
                                        type="checkbox"
                                        name="viewSellReturnPayment"
                                        id="sellReturnPayment"
                                        value="viewSellReturnPayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">View Sell Return Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_sell_returns_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addSellReturnPayment"
                                        id="sellReturnPayment"
                                        value="addSellReturnPayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Sell Return Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_sell_returns_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editSellReturnPayment"
                                        id="sellReturnPayment"
                                        value="editSellReturnPayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Sell Return Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_sell_returns_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deleteSellReturnPayment"
                                        id="sellReturnPayment"
                                        value="deleteSellReturnPayment"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Sell Return Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Purchase Return Payment</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_purchase_returns_view"
                                    >
                                      <input
                                        type="checkbox"
                                        name="viewPurchaseReturn"
                                        id="purchaseReturnPayment"
                                        value="viewPurchaseReturn"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">View Purchase Return Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_purchase_returns_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addPurchaseReturn"
                                        id="purchaseReturnPayment"
                                        value="addPurchaseReturn"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Purchase Return Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_purchase_returns_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editPurchaseReturn"
                                        id="purchaseReturnPayment"
                                        value="editPurchaseReturn"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Purchase Return Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_purchase_returns_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editPurchaseReturn"
                                        id="purchaseReturnPayment"
                                        value="editPurchaseReturn"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Purchase Return Payment</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Client</th>
                              <td>
                                <div className="pt-3">
                                  <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewClient"
                                      id="client"
                                      value="viewAllClient"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View all Clients</span>
                                    <span className="checkmark" />
                                  </label>
                                  {/* <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewClient"
                                      id="client"
                                      value="viewOwnClient"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View own Clients</span>
                                    <span className="checkmark" />
                                  </label> */}
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="client_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addClient"
                                        id="client"
                                        value="addClient"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Client</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="client_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editClient"
                                        id="client"
                                        value="editClient"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Client</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="client_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deleteClient"
                                        id="client"
                                        value="deleteClient"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Client</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="client_details"
                                    >
                                      <input
                                        type="checkbox"
                                        name="detailClient"
                                        id="client"
                                        value="detailClient"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Client Details</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="pay_sale_due"
                                    >
                                      <input
                                        type="checkbox"
                                        name="paySaleDue"
                                        id="client"
                                        value="paySaleDue"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Pay all sell due at a time</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="pay_sale_return_due"
                                    >
                                      <input
                                        type="checkbox"
                                        name="payAllSaleDueTime"
                                        id="client"
                                        value="payAllSaleDueTime"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Pay all sell return due at a time</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Supplier</th>
                              <td>
                                <div className="pt-3">
                                  <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewSupplier"
                                      id="supplier"
                                      value="viewAllSupplier"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View all Suppliers</span>
                                    <span className="checkmark" />
                                  </label>
                                  {/* <label className="radio radio-primary">
                                    <input
                                      type="radio"
                                      name="viewSupplier"
                                      id="supplier"
                                      value="viewOwnSupplier"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">View own Suppliers</span>
                                    <span className="checkmark" />
                                  </label> */}
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="suppliers_add"
                                    >
                                      <input
                                        type="checkbox"
                                        name="addSupplier"
                                        id="supplier"
                                        value="addSupplier"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Add Supplier</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="suppliers_edit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="editSupplier"
                                        id="supplier"
                                        value="editSupplier"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Edit Supplier</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="suppliers_delete"
                                    >
                                      <input
                                        type="checkbox"
                                        name="deleteSupplier"
                                        id="supplier"
                                        value="deleteSupplier"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Delete Supplier</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="supplier_details"
                                    >
                                      <input
                                        type="checkbox"
                                        name="detailSupplier"
                                        id="supplier"
                                        value="detailSupplier"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Supplier Details</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="pay_purchase_due"
                                    >
                                      <input
                                        type="checkbox"
                                        name="purchaseDue"
                                        id="supplier"
                                        value="purchaseDue"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Pay all purchase due at a time</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="pay_purchase_return_due"
                                    >
                                      <input
                                        type="checkbox"
                                        name="purchaseDueTime"
                                        id="supplier"
                                        value="purchaseDueTime"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">
                                        Pay all purchase return due at a time
                                      </span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th>Payment Methods</th>
                              <td>
                                <div className="form-check form-check-inline w-100">
                                  <label
                                    className="checkbox checkbox-primary"
                                    htmlFor="pay_purchase_return_due"
                                  >
                                    <input
                                      type="checkbox"
                                      name="methods"
                                      id="supplier"
                                      value="methods"
                                      onChange={(e) => fn_handleMultipleCheck(e)}
                                    />
                                    <span className="CrPermCh">
                                      Payment Methods
                                    </span>
                                    <span className="checkmark" />
                                  </label>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <th>Reports</th>
                              <td>
                                <div className="pt-3">
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="report_inventaire"
                                    >
                                      <input
                                        type="checkbox"
                                        name="inventoryReport"
                                        id="report"
                                        value="inventoryReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Stock Report</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  {/* <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="report_products"
                                    >
                                      <input
                                        type="checkbox"
                                        name="productReport"
                                        id="report"
                                        value="productReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Product Report</span>
                                      <span className="checkmark" />
                                    </label> 
                                  </div>*/}
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="report_profit"
                                    >
                                      <input
                                        type="checkbox"
                                        name="profitLoss"
                                        id="report"
                                        value="profitLoss"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Profit &amp; Loss</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  {/* <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="report_clients"
                                    >
                                      <input
                                        type="checkbox"
                                        name="clientReport"
                                        id="report"
                                        value="clientReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Client Report</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="report_fournisseurs"
                                    >
                                      <input
                                        type="checkbox"
                                        name="supplierReport"
                                        id="report"
                                        value="supplierReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Supplier Report</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div> */}
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="purchase_reports"
                                    >
                                      <input
                                        type="checkbox"
                                        name="purchaseReport"
                                        id="report"
                                        value="purchaseReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Purchase Report</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="sale_reports"
                                    >
                                      <input
                                        type="checkbox"
                                        name="saleReport"
                                        id="report"
                                        value="saleReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Sale Report</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  {/* <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_sale_reports"
                                    >
                                      <input
                                        type="checkbox"
                                        name="paymentSaleReport"
                                        id="report"
                                        value="paymentSaleReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Sell Payments</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div> 
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_purchase_reports"
                                    >
                                      <input
                                        type="checkbox"
                                        name="paymentPurchaseReport"
                                        id="report"
                                        value="paymentPurchaseReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Purchase Payments</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>*/}
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_return_sale_reports"
                                    >
                                      <input
                                        type="checkbox"
                                        name="sellReturnSaleReport"
                                        id="report"
                                        value="sellReturnSaleReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Sale Return Report</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="payment_return_purchase_reports"
                                    >
                                      <input
                                        type="checkbox"
                                        name="purchaseReturnReport"
                                        id="report"
                                        value="purchaseReturnReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Purchase Return Report</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                  {/* <div className="form-check form-check-inline w-100">
                                    <label
                                      className="checkbox checkbox-primary"
                                      htmlFor="reports_alert_qty"
                                    >
                                      <input
                                        type="checkbox"
                                        name="qtyAlertReport"
                                        id="report"
                                        value="qtyAlertReport"
                                        onChange={(e) => fn_handleMultipleCheck(e)}
                                      />
                                      <span className="CrPermCh">Quantity Alerts Report</span>
                                      <span className="checkmark" />
                                    </label>
                                  </div> */}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className='d-flex gap-3'>
                      <button className="btn btn-info btn-md ms-3" style={{ width: "120px" }} onClick={fn_handleCreatePermission}>
                        <AiOutlineCheckCircle className="submitProductIcon text-dark" />Submit
                      </button>
                      {loader === true && (
                        <Oval
                          height={33}
                          width={33}
                          color="#0F5ABB"
                          visible={true}
                          secondaryColor="#B2C4FF"
                          strokeWidth={6}
                          strokeWidthSecondary={7}
                          style={{
                            display: 'block',
                            margin: '0 auto',
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </form>
              {/* end::form */}
            </div>
          </div>
        </div>
      </div>



    </>


  )
}

export default Permissions
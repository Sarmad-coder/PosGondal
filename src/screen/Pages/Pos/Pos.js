/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import React, { useEffect, useState, useContext } from "react";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./POS.css";
import axios from "axios";
import URL, { imgURL } from "../../Url";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../../components/context";
// Create your invoice! Easy!


const Pos = () => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [allProduct, setAllProduct] = useState([]);
  const [filterPro, setFilterPro] = useState(null);
  const [filterByGroup, setFilterByGroup] = useState(null);
  const [allCustomer, setAllCustomer] = useState([]);
  const [allWarehouse, setAllWarehouse] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [itemAdded, setItemAdded] = useState(false);
  const [data, setDate] = useState([]);
  const [allBrand, setAllBrand] = useState([])
  const [shipCost, setShipCost] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [editProduct, setEditProduct] = useState({})
  let [loading, setLoading] = useState(false)
  const { invoiceData, setInvoiceData } = useContext(MyContext);
  const editId = useParams().id
  useEffect(() => {

    axios.get(`${URL}/customer`).then((res) => {
      setAllCustomer(res.data?.data);
    });
    axios.get(`${URL}/warehouse`).then((res) => {
      setAllWarehouse(res.data?.data);
    });

    axios
      .get(`${URL}/group`)
      .then((res) => {
        setDate(res?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data : ", error);
      });

    axios.get(`${URL}/category/getAll`).then((res) => {
      setAllBrand(res?.data?.data)
    })
    if (editId) {

      axios.get(`${URL}/customerorder/${editId}`).then((res) => {
        console.log(res.data)
        // res.data.data.customer=allCustomer.find((item)=>{
        //  return item._id==res.data.data.customerId
        // })
        setCartProduct(res.data.data.productDetail);
        setItemAdded(true)
        setShipCost(res.data.data.shipping)
        setDiscount(res.data.data.discount)
        setSelectedCustomer(res.data.data.customerId)
        setSelectedWarehouse(res.data.data.warehouseId)
        setEditProduct(res.data.data)

      })
    }
  }, []);
  useEffect(() => {
    axios
      // .get(`${URL}/product/getwhproduct/${selectedWarehouse}`)
      .get(`${URL}/product`)
      .then((res) => {
        setAllProduct(res?.data?.data);
        console.log(res?.data?.data, "ooooooooooooooooooooooooooo");
      });
  }, [selectedWarehouse]);

  // const fn_addToCart = (item) => {
  //   setCartProduct((prevCart) => [...prevCart, { ...item, cartQty: 1 }]);
  //   setItemAdded(true);
  // };

  const handleDecrement = (item) => {
    if (item?.cartQty === 1) {
      return;
    }
    const allProduct = [...cartProduct];
    const findItem = allProduct?.find((i) => i?._id === item?._id);
    findItem.cartQty -= 1;
    const index = allProduct?.findIndex((i) => i?._id === item?._id);
    allProduct[index] = findItem;
    setCartProduct(allProduct);
  };
  const handleIncrement = (item) => {
    if (item?.cartQty === item?.whQty) {
      return;
    }
    if (editId) {
      const allProduct1 = [...cartProduct];
      const findItem = allProduct1?.find((i) => i?._id === item?._id);
      const actualItem = allProduct?.find((i) => i?._id === item?._id)
      const editItem = editProduct.productDetail.find((i) => i?._id === item?._id)
      findItem.quantity = actualItem.quantity;
      if (findItem.cartQty < actualItem.quantity) {
        findItem.cartQty += 1;
        const index = allProduct1?.findIndex((i) => i?._id === item?._id);
        allProduct1[index] = findItem;
        setCartProduct(allProduct1);
      } else {
        toast.error("This product quantity cannot be greater than stock available")
      }
    } else {
      const allProduct = [...cartProduct];
      const findItem = allProduct?.find((i) => i?._id === item?._id);
      if (findItem.cartQty < findItem.quantity) {
        findItem.cartQty += 1;
        const index = allProduct?.findIndex((i) => i?._id === item?._id);
        allProduct[index] = findItem;
        setCartProduct(allProduct);
      } else {
        toast.error("This product quantity cannot be greater than stock available")
      }
    }


  };
  const fn_deleteToCart = (id) => {
    console.log(id);
    const a = cartProduct?.filter((item) => item?._id !== id);
    setCartProduct(a);
  };

  const fn_addToCart = (item) => {
    // Check if the product is already in the cart
    const productInCart = cartProduct.find((cartItem) => cartItem._id === item._id);
    const findItem = allProduct?.find((i) => i?._id === item?._id);
    if (productInCart) {
      const updatedCartProduct = cartProduct.map((cartItem) => {
        if (cartItem._id === item._id) {
          cartItem.cartQty = cartItem.cartQty + 1, item.whQty;
        }
        return cartItem;
      });
      if (updatedCartProduct[0].cartQty <= findItem.quantity) {

        setCartProduct(updatedCartProduct);
      } else {
        toast.error("This product quantity cannot be greater than stock available")
      }
    } else {
      // If the product is not in the cart, add it with an order quantity of 1
      if (findItem.quantity > 0) {
        setCartProduct((prevCart) => [...prevCart, { ...item, cartQty: 1 }]);
      } else {
        toast.error("This product quantity is 0 in the Stock")
      }

    }
    setItemAdded(true);
  };

  const fn_submit = async () => {
    setLoading(true)
    let shippingCost = ""
    let grandTotal = ""
    if (selectedCustomer === "") {
      setLoading(false);
      return toast.error("Select Customer");
    } else if (selectedWarehouse === "") {
      setLoading(false);
      return toast.error("Select Warehouse");
    } else if (cartProduct?.length === 0) {
      setLoading(false);
      return toast.error("Select Product");
    } else if (!localStorage.getItem("dateSet")) {
      setLoading(false);
      return toast.error("First Set Date");
    } else {
      shippingCost = parseInt(document.getElementById("cartShippingAmount").value); // Get shipping cost
      grandTotal = cartProduct?.reduce((acc, i) => {
        return i?.cartQty * i?.productPrice + acc;
      }, 0) + shippingCost - discount; // Calculate grand total with shipping cost

      const params = {
        setDate: localStorage.getItem("dateSet"),
        customerId: selectedCustomer,
        warehouseId: selectedWarehouse,
        productDetail: cartProduct,
        shipping: shippingCost,
        discount: discount, // Add shipping cost to the params
        grandTotal: grandTotal, // Set the grand total with shipping cost
        productCost: cartProduct?.reduce((acc, i) => {
          return i?.cartQty * i?.productCost + acc;
        }, 0),
      };
      if (editId) {
        axios.patch(`${URL}/customerorder/previousOrder/${editProduct._id}`, params).then((res) => {
          if (res?.data?.status === 200) {
            invoiceData.invoiceNo = res.data?.data.invoiceNo
  
  
  
            const currentCustomer = allCustomer.find((item) => {
              return item._id == selectedCustomer
            })
  
            const products = []
  
  
  
            cartProduct.forEach((product, index) => {
              let data = {}
  
              data = {
                "name": product.productName,
                "quantity": product.cartQty,
                "price": product.productPrice,
                "totalPrice": product.productPrice * product.cartQty
  
              }
  
  
  
  
              products.push({ ...data })
            })
            invoiceData.customer = currentCustomer
            invoiceData.products = products
            invoiceData.shippingCost = shippingCost
            invoiceData.discount = discount
            invoiceData.grandTotal = grandTotal
  
            setInvoiceData({ ...invoiceData })
            navigate("/invoice")
          } else {
            toast.error(res?.data?.message);
            return
          }
        });
      } else {
        axios.post(`${URL}/customerorder`, params).then((res) => {
          if (res?.data?.status === 200) {
            invoiceData.invoiceNo = res.data?.data.invoiceNo
  
  
  
            const currentCustomer = allCustomer.find((item) => {
              return item._id == selectedCustomer
            })
  
            const products = []
  
  
  
            cartProduct.forEach((product, index) => {
              let data = {}
  
              data = {
                "name": product.productName,
                "quantity": product.cartQty,
                "price": product.productPrice,
                "totalPrice": product.productPrice * product.cartQty
  
              }
  
  
  
  
              products.push({ ...data })
            })
            invoiceData.customer = currentCustomer
            invoiceData.products = products
            invoiceData.shippingCost = shippingCost
            invoiceData.discount = discount
            invoiceData.grandTotal = grandTotal
  
            setInvoiceData({ ...invoiceData })
            navigate("/invoice")
          } else {
            toast.error(res?.data?.message);
            return
          }
        });
      }
      
    }




  };
  function handleFilterData(id) {
    setFilterByGroup(null)
    if (id === 'all') {
      return setFilterPro(allProduct)
    }
    const filterData = allProduct.filter((item) => item.category === id)
    setFilterPro(filterData)
  }
  function handleFilterByGroup(id) {
    setFilterPro(null)
    if (id === 'all') {
      return setFilterByGroup(allProduct)
    }
    const filterData = allProduct.filter((item) => item.group === id)
    setFilterByGroup(filterData)
  }
  return (
    <div>
      {/* Search Bar */}
      <div className="d-flex flex-column px-3 my-5">
        <Space.Compact
          size="large"
          style={{ backgroundColor: "rgba(40, 129, 201, 0.055)" }}
        >
          <Input
            addonBefore={<SearchOutlined />}
            placeholder="Search Product by Code or Name"
          />
        </Space.Compact>
      </div>
      <div className="row mx-3">
        {/* POS Left SideBar */}
        <div className="col-md-4 sideBarPOS">
          <div className="d-flex flex-column px-3 my-3">
            <label className="productCreateTxt">Customer*</label>
            <select
              className="productCreateInput"
              value={editId ? editProduct.customerId : selectedCustomer}
              onChange={(e) => setSelectedCustomer(e?.target?.value)}
            >
              <option selected value={""}>
                ---Choose Customer---
              </option>
              {allCustomer &&
                allCustomer?.map((item) => (
                  <>
                    <option value={item?._id}>{item?.name}</option>
                  </>
                ))}
            </select>
          </div>
          <div className="d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Warehouse*</label>
            <select
              className="productCreateInput"
              value={editId ? editProduct.warehouseId : selectedWarehouse}
              selectedWarehouse
              onChange={(e) => setSelectedWarehouse(e?.target?.value)}
            >
              <option selected value={""}>
                ---Choose Warehouse---
              </option>
              {allWarehouse &&
                allWarehouse?.map((item) => (
                  <>
                    <option value={item?._id}>{item?.name}</option>
                  </>
                ))}
            </select>
          </div>
          <div className="d-flex flex-column px-3 mb-3 cartPOSBox">
            <label className="productCreateTxt">Cart</label>
            <div className="addToCartMain m-3">
              {itemAdded === true &&
                cartProduct?.map((item) => (
                  <div className="d-flex gap-3">
                    <div>
                      <img
                        src={`${imgURL}/${item?.imageUrl}`}
                        height={"70px"}
                      />
                    </div>
                    <div className="d-flex justify-content-between w-100">
                      <div>
                        <span className="productCreateTxt">
                          {item?.productName}
                        </span>
                        <br />
                        <span className="productCreateTxt">
                          PKR{item?.productPrice}
                        </span>
                      </div>
                      <div className="text-end">
                        <button
                          className="cartCross btn btn-sm btn-info me-1 mb-1"
                          style={{ lineHeight: "0.8rem" }}
                          onClick={() => fn_deleteToCart(item?._id)}
                        >
                          x
                        </button>
                        <br />
                        <button
                          className="btn btn-sm btn-info me-1"
                          style={{ lineHeight: "1rem" }}
                          onClick={() => handleDecrement(item)}
                        >
                          -
                        </button>
                        <span>{item?.cartQty}</span>
                        <button
                          className="btn btn-sm btn-info ms-1"
                          style={{ lineHeight: "1rem" }}
                          onClick={() => handleIncrement(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="">
              <label className="productCreateTxt">Shipping</label>
              <Space.Compact
                style={{
                  backgroundColor: "rgba(40, 129, 201, 0.055)",
                  margin: "0.3rem 0",
                  width: "100%",
                }}
              >
                <Input
                  type="number"
                  addonBefore={"PKR"}
                  placeholder="0"
                  value={shipCost}
                  id="cartShippingAmount"
                  onChange={(e) => setShipCost(e.target?.value)}
                />
              </Space.Compact>
            </div>

            <div className="mt-3">
              <label className="productCreateTxt">Discount</label>
              <Space.Compact
                style={{
                  backgroundColor: "rgba(40, 129, 201, 0.055)",
                  margin: "0.3rem 0",
                  width: "100%",
                }}
              >
                <Input
                  type="number"
                  addonBefore={"PKR"}
                  placeholder="0"

                  value={discount}
                  id="cartShippingAmount"
                  onChange={(e) => setDiscount(e.target?.value)}
                />
              </Space.Compact>
            </div>
            <div className="m-1 d-flex justify-content-between">
              <label className="productCreateTxt fw-semibold fs-5 text-dark">
                Grand Total
              </label>
              <label className="productCreateTxt fw-semibold fs-5 text-dark">
                PKR
                {cartProduct?.reduce((acc, i) => {
                  return i?.cartQty * i?.productPrice + acc;
                }, 0) + (parseInt(shipCost) || 0) - (parseInt(discount) || 0)}
              </label>
            </div>
            {editId ? <div className="mt-2">
              {loading ? <button className="btn btn-info w-100" disabled onClick={fn_submit}>
                Update Order

                <div class="spinner-border text-dark" style={{
                  "width": "22px",
                  "height": "22px",
                  "margin-left": "10px"
                }} role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </button> :
                <button className="btn btn-info w-100" onClick={fn_submit}>
                  Update Order
                </button>}
            </div> :
              <div className="mt-2">
                {loading ? <button className="btn btn-info w-100" disabled onClick={fn_submit}>
                  Order Now

                  <div class="spinner-border text-dark" style={{
                    "width": "22px",
                    "height": "22px",
                    "margin-left": "10px"
                  }} role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </button> :
                  <button className="btn btn-info w-100" onClick={fn_submit}>
                    Order Now
                  </button>}
              </div>}
          </div>
        </div>
        {/* POS Mid Content */}
        {!editId ? <div className="col-md-5 row">
          {(filterByGroup ?? filterPro ?? allProduct) &&
            (selectedWarehouse
              ? (filterByGroup ?? filterPro ?? allProduct)?.filter(item => item.warehouse.includes(selectedWarehouse))
              : []
            )
              .map((item) => (
                <div
                  className="col-sm-6"
                  onClick={() => fn_addToCart(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="productBoxPOS">
                    <div className="productTotalPOS">
                      {
                        item?.warehouse[0]?.productIds?.filter(
                          (i) => i?.proId === item?._id
                        )[0]?.qty
                      }{" "}
                      {item?.unitProduct}
                    </div>
                    <div>
                      <img
                        src={`${imgURL}/${item?.imageUrl}`}
                        width={"100%"}
                        className="productImgPos"
                      />
                      <hr />
                      <p className="productCreateTxt ps-2">{item?.productName}</p>
                      <p className="productCreateTxt ps-2">
                        PKR{item?.productPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          {/* {(!filterByGroup?.length && filterPro?.length) && <h4>No Product Exist</h4>} */}
        </div> : null}

        {/* POS Right SideBar */}
        {!editId ? <div className="col-md-3 sideBarPOS">
          <div className="posAllCategory">
            <div className="posHeadingSideBar">Category</div>
            <div className="posContentSideBar" onClick={() => handleFilterData('all')}>All</div>

            {allBrand?.map((item, i) => (
              <div className="posContentSideBar" onClick={() => handleFilterData(item._id)}>{item?.name}</div>
            ))}


          </div>
          <div className="posAllCategory">
            <div className="posHeadingSideBar">Groups</div>
            <div className="posContentSideBar" onClick={() => handleFilterByGroup('all')}>All</div>

            {data?.map((item, i) => {
              return (
                <>
                  <div className="posContentSideBar" onClick={() => handleFilterByGroup(item?._id)}>{item.grpName}</div>
                </>
              )

            }

            )}
          </div>
        </div> : null}
      </div>
    </div>
  );
};

export default Pos;
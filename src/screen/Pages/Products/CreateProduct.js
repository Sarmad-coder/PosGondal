import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import "./Product.css"
import { AiOutlineCheckCircle } from "react-icons/ai"
import URL from "../../Url";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const [allGroup, setAllGroup] = useState([])
    // const [allWarehouse, setAllWarehouse] = useState([])
    // const [allSupplier, setAllSupplier] = useState([])
    const [allBrand, setAllBrand] = useState([])
    const [allUnit, setAllUnit] = useState([])
    const [allCate, setAllcate] = useState([])
    const [productType, setProductType] = useState("")

    const navigate = useNavigate()
    useEffect(() => {

        axios.get(`${URL}/category/getAll`).then((res) => {
            setAllcate(res.data.data)
        })
        // axios.get(`${URL}/warehouse`).then((res) => {
        //     setAllWarehouse(res?.data?.data)
        // })
        // axios.get(`${URL}/supplier`).then((res) => {
        //     setAllSupplier(res?.data?.data)
        // })
        axios.get(`${URL}/brand`).then((res) => {
            setAllBrand(res?.data?.data)
        })
        axios.get(`${URL}/unit`).then((res) => {
            setAllUnit(res?.data?.data)
        })
    }, [])
    useEffect(() => {
        let params = {
            type: productType
        }
        axios.post(`${URL}/group/byType`, params).then((res) => {
            setAllGroup(res?.data?.data)
        })
    }, [productType])
    // const arrWarehouse = []
    const fn_handleSubmitProduct = (e) => {

        e.preventDefault()
        // arrWarehouse?.push(document.getElementsByName("warehouse")?.[0].value)
        const params = new FormData()

        params.append('productName', document.getElementsByName("productName")?.[0].value)

        params.append('group', document.getElementsByName("productGroup")?.[0].value)
        params.append('brand', document.getElementsByName("productBrand")?.[0].value)
        params.append('imageUrl', document.getElementsByName("image")?.[0].files[0])
        params.append('category', document.getElementsByName("category")?.[0]?.value)
        // params.append('details', document.getElementsByName("productDetails")?.[0].value)
        params.append('productCost', document.getElementsByName("productCost")?.[0].value)
        params.append('basePrice', document.getElementsByName("basePrice")?.[0].value)
        if (productType == "percent") {
            let value = +document.getElementsByName("productPriceByPercent")?.[0].value
            let cost = +document.getElementsByName("productCost")?.[0].value
            let totalPrice = (cost / 100) * value
            totalPrice = +totalPrice + +cost
            params.append('productPrice', totalPrice)
        } else {

            params.append('productPrice', document.getElementsByName("productPrice")?.[0].value)
        }
        params.append('unitProduct', document.getElementsByName("unitProduct")?.[0].value)
        // params.append('unitSale', document.getElementsByName("unitSale")?.[0].value)
        // params.append('unitPurchase', document.getElementsByName("unitPurchase")?.[0].value)
        // params.append('quantity', document.getElementsByName("minSaleQty")?.[0].value)
        params.append('stockAlert', document.getElementsByName("stockAlert")?.[0].value)
        // params.append('warehouse', arrWarehouse)
        // params.append('supplier', document.getElementsByName("supplier")?.[0].value)
        // params.append('imeiNum', document.getElementsByName("imeiNum")?.[0].checked)
        // console.log(params?.get('warehouse'))

        if (productType == "price") {
            if (parseInt(document.getElementsByName("productCost")?.[0].value) > parseInt(document.getElementsByName("productPrice")?.[0].value)) {
                toast.error("sale price most be greater then cost price")
            } else {



                axios.post(`${URL}/product`, params).then((res) => {
                    if (res?.data?.status === 200) {
                        toast.success("Product Added")
                        navigate("/allproduct")
                    } else {
                        toast.error(res?.data?.message)
                    }
                })
            }
        } else {
            axios.post(`${URL}/product`, params).then((res) => {
                if (res?.data?.status === 200) {
                    toast.success("Product Added")
                    navigate("/allproduct")
                } else {
                    toast.error(res?.data?.message)
                }
            })
        }

    }
    return (
        <div>
            <p className='dashboadHeading' >Add Product</p >
            <hr className='dashboardLine' />
            <form onSubmit={fn_handleSubmitProduct}>
                {/* box-1 */}
                <div className="productMainBox">
                    <div className="row">

                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Product Type</label>
                            <select className="productCreateInput" name="" required onChange={(e) => {
                                setProductType(e.target.value);
                            }}>
                                <option selected value={""}>---Choose Type---</option>

                                <option value={"price"}>By Price</option>
                                <option value={"percent"}>By Percent</option>

                            </select>
                        </div>
                        {productType && <>

                            <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Product Name*</label>
                                <input type="text" className="productCreateInput" placeholder="Product Name" name="productName" required />
                            </div>

                            <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Group*</label>
                                <select className="productCreateInput" name="productGroup" required>
                                    <option selected value={""}>---Select Group---</option>
                                    {allGroup && allGroup?.map((item) => (
                                        <option value={item?._id}>{item?.grpName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Brand</label>
                                <select className="productCreateInput" name="productBrand" required>
                                    <option selected value={""}>---Choose Brand---</option>
                                    {allBrand && allBrand?.map((item) => (
                                        <option value={item?._id}>{item?.brandName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Product Image*</label>
                                <input type="file" className="productCreateInput" placeholder="Order Tax" name="image" style={{ paddingTop: "2.5px" }} />
                            </div>
                        </>}
                        {/* <div className="col-12 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Please Prove any Details*</label>
                            <textarea type="number" className="productCreateTextArea" name="productDetails" required />
                        </div> */}
                    </div>
                </div>
                {/* box-2 */}
                <div className="productMainBox">
                    {productType && <div className="row">
                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Product Category*</label>
                            <select className="productCreateInput" name="category" >
                                <option selected value={""}>---Select Product Category---</option>
                                {
                                    allCate.map((d, i) => {
                                        return <option key={d?._id} value={d?._id}>{d?.name}</option>

                                    })
                                }
                                {/* <option value={"Variable Product"}>Variable Product</option>
                                                <option value={"Service Product"}>Service Product</option> */}
                            </select>
                        </div>
                        {productType == "percent"&& <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Base Price*</label>
                            <input type="number" className="productCreateInput" placeholder="Product Cost" name="basePrice" required />
                        </div>}
                       {productType == "price"? <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Product Cost*</label>
                            <input type="number" className="productCreateInput" placeholder="Product Cost" name="productCost" required />
                        </div>:
                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Product Cost By Percent</label>
                        <input type="number" className="productCreateInput" placeholder="Product Cost By %" name="productCostByPercent" required onChange={()=>{
                            if (+document.getElementsByName("basePrice")?.[0].value) {
                                let value = +document.getElementsByName("basePrice")?.[0].value
                                let cost = +document.getElementsByName("productCostByPercent")?.[0].value
                                let totalPrice = (cost / 100) * value
                                totalPrice = +totalPrice + +value
                               document.getElementById("productCost").value = totalPrice
                            }else{
                                toast.error("First Enter Base Price")
                            }
                                    
                                }}/>
                    </div>}
                    {productType == "percent"&& <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Product Cost*</label>
                                <input id="productCost" disabled type="number" className="productCreateInput" placeholder="Product Price" name="productCost" required />
                            </div>}
                        {productType == "price" ? <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Product Price*</label>
                            <input type="number" className="productCreateInput" placeholder="Product Price" name="productPrice" required />
                        </div> :

                            <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Product Price by percent*</label>
                                <input type="number" className="productCreateInput" placeholder="Product Price By %" name="productPriceByPercent" required onChange={()=>{
                                     if (+document.getElementsByName("productCost")?.[0].value) {
                                        let value = +document.getElementsByName("productPriceByPercent")?.[0].value
                                        let cost = +document.getElementsByName("productCost")?.[0].value
                                        let totalPrice = (cost / 100) * value
                                        totalPrice = +totalPrice + +cost
                                       document.getElementById("showPrice").value = totalPrice
                                     }else{
                                        toast.error("Please First Enter Cost Price")
                                     }
                                    
                                }}/>
                            </div>}
                           {productType == "percent"&& <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                                <label className="productCreateTxt">Product Price*</label>
                                <input id="showPrice" disabled type="number" className="productCreateInput" placeholder="Product Price" name="productPriceByPercent" required />
                            </div>}
                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Product Unit</label>
                            <select className="productCreateInput" name="unitProduct" required>
                                <option selected value={""}>---Choose Product Unit---</option>
                                {allUnit && allUnit?.map((item => (
                                    <option value={item?.shortName}>{item?.title} ({item?.shortName})</option>
                                )))}
                            </select>
                        </div>
                        {/* <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Unit Sale*</label>
                            <select className="productCreateInput" name="unitSale" required>
                                <option selected value={""}>---Choose Sale Unit---</option>
                                <option value={"option1"}>Option 1</option>
                                <option value={"option2"}>Option 2</option>
                            </select>
                        </div> */}
                        {/* <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Unit Purchase*</label>
                            <select className="productCreateInput" name="unitPurchase" required>
                                <option selected value={""}>---Choose Purchase Unit---</option>
                                <option value={"option1"}>Option 1</option>
                                <option value={"option2"}>Option 2</option>
                            </select>
                        </div> */}
                        {/* <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Quantity</label>
                            <input type="number" className="productCreateInput" defaultValue={0} name="minSaleQty" required />
                        </div> */}
                        <div className="col-md-4 col-sm-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Stock Alert</label>
                            <input type="number" className="productCreateInput" defaultValue={0} name="stockAlert" required />
                        </div>
                    </div>}
                </div>
                {/* box-3 */}
                {/* <div className="productMainBox">
                    <div className="row">
                        <div className="col-md-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Choose Warehouse*</label>
                            <select className="productCreateInput" name="warehouse" required>
                                <option selected value={""}>---Choose Warehouse---</option>
                                {allWarehouse && allWarehouse?.map((item) => (
                                    <option value={item?._id}>{item?.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 d-flex flex-column px-3 mb-3">
                            <label className="productCreateTxt">Choose Supplier*</label>
                            <select className="productCreateInput" name="supplier" required>
                                <option selected value={""}>---Choose Supplier---</option>
                                {allSupplier && allSupplier?.map((item) => (
                                    <option value={item?._id}>{item?.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div> */}
                {/* <div className="productMainBox ps-5">
                    <input type="checkbox" name="imeiNum" />
                    <label className="ms-3 productCreateTxt">Product has Imei/Serial Number</label>
                </div> */}
                <button type="submit" className="btn btn-info btn-md ms-3" style={{ width: "120px" }}>
                    <AiOutlineCheckCircle className="submitProductIcon text-dark" />Submit
                </button>
            </form>
            <br /><br />
        </div>
    )
}

export default CreateProduct
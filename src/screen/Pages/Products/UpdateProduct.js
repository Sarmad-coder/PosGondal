import { Button, Modal, Form } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import URL from '../../Url';
import { useForm } from 'react-hook-form';
const UpdateProduct = ({ up, setUp, modal, setModal, setAllProduct, searchSelectedProduct }) => {
  const [group, setGroup] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [unit, setUnit] = useState([]);
  const [img, setImg] = useState(null);

  const { handleSubmit, reset, register } = useForm()

  const [data, setData] = useState({
    image: "",
    name: "", group: "", brand: "", productCost: "", price: "", stock: "", unit: ""
  })

  useEffect(() => {

    axios.get(`${URL}/group`).then((res) => {
      setGroup(res?.data?.data)

    })
    axios.get(`${URL}/brand`).then((res) => {
      setBrand(res?.data?.data)

    })
    axios.get(`${URL}/category/getAll`).then((res) => {
      setCategory(res?.data?.data)

    })
    axios.get(`${URL}/unit`).then((res) => {
      setUnit(res?.data?.data)

    })
    reset(up)
  }, [up]);



  // const datachange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "img" && files.length > 0) {
  //     setData((prev) => ({ ...prev, [name]: files[0] }));
  //   } else {
  //     setData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };



  const datachange = (e) => {
    const value = e?.target?.value;
    const name = e?.target?.name
    const files = e?.target?.files

    setData((prevUser) => ({
      ...prevUser,
      [name]: name === 'img' ? files[0] : value,
    }));
  }

  const updateData = (value) => {
    const body = new FormData();
    if (img) {

      body.append("imageUrl", img);
    }
    body.append("productName", value.productName);
    body.append("group", value.group);
    body.append("brand", value.brand);
    body.append("productCost", value.productCost);
    body.append("productPrice", value.productPrice);
    body.append("unitProduct", value.unitProduct);

    body.append("stockAlert", value.stockAlert);
    axios.patch(`${URL}/product/${up?._id}`, body).then((res) => {
      if (res?.status === 200) {
        toast.success("Updated")
        setModal(false)
        
      }
      else {
        toast.error("Failed to update")
      }
      setData({})
    })

  }



  return (
    <div>

      <Modal
        title="Update Product"
        style={{
          top: 20,
        }}
        width={600}
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        footer={[
          <Button key={"cancel"} onClick={() => { setModal(false) }} >Cancel</Button>,
          <Button key={"ok"}  >Update</Button>
        ]}
      >
        <form onSubmit={handleSubmit(updateData)}>
        <div className="row">
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="img">Image</label>
            <input type="file" className='productCreateInput' onChange={(e) => { setImg(e.target?.files[0]) }} accept="image/" name='img' placeholder='Pick Image' />
          </div>
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="name">Name</label>
            <input className='productCreateInput' name="productName" required {...register('productName')} type='text' />
          </div>



          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="group">Group</label>
            {/* <input className='productCreateInput'   onChange={(e)=>{datachange(e)}}  required  defaultValue={data?.group}  type='text' name='group' /> */}
            <select className="productCreateInput" id="group" name='productGroup' {...register('group')} required>
              <option defaultValue={""} >---Choose Group---</option>
              {group && group?.map((item) => (
                <option key={item?._id} value={item?._id} selected={data?.group === item?._id ? true : false}>{item?.grpName}</option>
              ))}
            </select>

          </div>
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="brand">Brand</label>
            {/* <input className='productCreateInput'  defaultValue={data?.brand} type='text' name='brand' /> */}
            <select className="productCreateInput" id="brand" name='productBrand' {...register('brand')} required>
              <option defaultValue={""} >---Choose Group---</option>
              {brand && brand?.map((item) => (
                <option key={item?._id} value={item?._id} selected={data?.brand === item?._id ? true : false}>{item?.brandName}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="productCost">Product Cost</label>
            <input type='text' className='productCreateInput' required {...register('productCost')} name='productCost' />
          </div>
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="price">Price</label>
            <input type='text' className='productCreateInput' required {...register('productPrice')} name='price' />
          </div>
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="stock">Stock Alert</label>
            <input type='text' className='productCreateInput' required {...register('stockAlert')} name='stock' />
          </div>


          {/*  NOTE ::::     ===>  Allow changing for updating ***unit and also for updating Total ***stock(Also need to add in Add Product)  
 and ***Category and ****Stock Alert*/}

          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="unit">Product Unit</label>

            <select className="productCreateInput" id="unit" name='unit' {...register('unitProduct')} required>
              <option defaultValue={""} >---Choose Product Unit---</option>
              {unit && unit?.map((item) => (
                <option key={item?._id} defaultValue={item?.shortName} selected={data?.unit === item?.shortName ? true : false}>{item?.shortName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='justify-content-end' style={{display:"flex"}}>
        <button type='submit' className='updateBtn'>Update</button>
        </div>
      </form>


    </Modal>
    </div >
  );
}

export default UpdateProduct;

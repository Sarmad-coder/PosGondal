import { Button, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import URL from '../../Url';

const UpdateProduct = ({ up, setUp, modal, setModal, setAllProduct, searchSelectedProduct }) => {
  const [group, setGroup] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [unit, setUnit] = useState([]);
  const [img, setImg] = useState(null);



  const [data, setData] = useState({
    image: "",
    name: "", group: "", brand: "", productCost: "", price: "", stock: ""
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

    setData({
      ...data,
      image: up?.imageUrl,
      name: up?.productName,
      group: up?.group,
      brand: up?.brand,
      productCost: up?.productCost,
      price: up?.productPrice,
      stock: up?.quantity
    });
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

  const updateData = (id) => {
    const body = new FormData();
    body.append("imageUrl", img);
    body.append("productName", data.name);
    body.append("group", data.group);
    body.append("brand", data.brand);
    body.append("productCost", data.productCost);
    body.append("price", data.price);
    body.append("unitProduct", data.unit);

    body.append("stock", data.stock);
    axios.patch(`${URL}/product/${id}`, body).then((res) => {
      if (res?.status === 200) {
        toast.success("Updated")
        setModal(false)
        setAllProduct(res?.data?.data)
        searchSelectedProduct(res?.data?.data)
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
          <Button key={"ok"} onClick={() => updateData(up?._id)}>Update</Button>
        ]}
      >

        <div className="row">
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="img">Image</label>
            <input type="file" className='productCreateInput' onChange={(e) => { setImg(e.target?.files[0]) }} required accept="image/" name='img' placeholder='Pick Image' />
          </div>
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="name">Name</label>
            <input className='productCreateInput' onChange={(e) => { datachange(e) }} required defaultValue={data?.name} type='text' name='name' />
          </div>



          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="group">Group</label>
            {/* <input className='productCreateInput'   onChange={(e)=>{datachange(e)}}  required  defaultValue={data?.group}  type='text' name='group' /> */}
            <select className="productCreateInput" id="group" name='group' defaultValue={data?.group} onChange={(e) => { datachange(e) }} required>
              <option defaultValue={""} >---Choose Group---</option>
              {group && group?.map((item) => (
                <option key={item?._id} value={item?._id} selected={data?.group === item?._id ? true : false}>{item?.grpName}</option>
              ))}
            </select>

          </div>
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="brand">Brand</label>
            {/* <input className='productCreateInput' onChange={(e) => { datachange(e) }}  defaultValue={data?.brand} type='text' name='brand' /> */}
            <select className="productCreateInput" id="brand" name='brand' defaultValue={data?.brand} onChange={(e) => { datachange(e) }} required>
              <option defaultValue={""} >---Choose Group---</option>
              {brand && brand?.map((item) => (
                <option key={item?._id} defaultValue={item?._id} selected={data?.brand === item?._id ? true : false}>{item?.brandName}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="productCost">Product Cost</label>
            <input type='text' className='productCreateInput' onChange={(e) => { datachange(e) }} required defaultValue={data?.productCost} name='productCost' />
          </div>
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="price">Price</label>
            <input type='text' className='productCreateInput' onChange={(e) => { datachange(e) }} required defaultValue={data?.price} name='price' />
          </div>
          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="stock">Stock</label>
            <input type='text' className='productCreateInput' onChange={(e) => { datachange(e) }} required defaultValue={data?.stock} name='stock' />
          </div>


          {/*  NOTE ::::     ===>  Allow changing for updating ***unit and also for updating Total ***stock(Also need to add in Add Product)  
 and ***Category and ****Stock Alert*/}

          <div className="col-md-6 d-flex flex-column px-2 mb-3">
            <label className="productCreateTxt" htmlFor="unit">Product Unit</label>

            <select className="productCreateInput" id="unit" name='unit' defaultValue={data?.unit} onChange={(e) => { datachange(e) }} required>
              <option defaultValue={""} >---Choose Product Unit---</option>
              {unit && unit?.map((item) => (
                <option key={item?._id} defaultValue={item?._id} selected={data?.unit === item?._id ? true : false}>{item?.shortName}</option>
              ))}
            </select>
          </div>
        </div>

      </Modal>

    </div>
  );
}

export default UpdateProduct;

import { FiDelete} from "react-icons/fi";

import { Button, Modal } from "antd";
import { useEffect } from "react";
import URL, { imgURL } from "../../../Url";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BsFillPencilFill } from "react-icons/bs";

function ProductCategory() {
  const [singleStock, setSingleStock] = useState({});
  const [updateCate, setupdateCate] = useState();
  const [newCategory, setNewCategory] = useState();
  useEffect(() => {
    axios.get(`${URL}/category/getAll`).then((res) => {
      setNewCategory(res?.data?.data);
    });
  }, []);


  const sendData = (values) => {
    const params = {
    name: values.categoryName.value
    }
 
   

    axios.post(`${URL}/category/create`, params)
        .then((res) => {
            console.log(res.data.status)
            if (res.data.status === 200) {
                toast.success('Category is Created')
                document.getElementById('inputData').value = null
                axios.get(`${URL}/category/getAll`).then((res) => {
                    setNewCategory(res?.data?.data);
                  });
            } else {
                toast.error("something went wrong")
            }
        })
        .catch((err) => {
            console.error("Error:", err);
        });
};

const updateData = (values) => {

  const params = {
    name: values.categoryName.value
    }

    axios.patch(`${URL}/category/update/${updateCate}`, params)
    .then((res) => {
        console.log(res.data.status)
        if (res.data.status === 200) {
          toast.success('Category is Update')

            axios.get(`${URL}/category/getAll`).then((res) => {
                setNewCategory(res?.data?.data);
            
              });
        } else {
            toast.error("something went wrong")
        }
    })
    .catch((err) => {
        console.error("Error:", err);
    });
}


const onDeleteStudent = (id) => {

  Modal.confirm({
    title: "are you sure you want to delete?",
    onOk: () => {
      // const params = {
      //   id:id,
      // };

      
      axios
        .delete(
          `${URL}/category/delete/`+id 
        )
        .then((res) => {
         axios.get(`${URL}/category/getAll`).then((res) => {
            setNewCategory(res?.data?.data);
          });

          toast.success('Category is deleted')
        });

    },
  });
};
  return (
    <>



<div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Category</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateData(e.target);
                  }}
                >
                  <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Category Name</label>
                    <input
                      type="text"
                      name="categoryName"
                      className="productCreateInput"
                      placeholder="Enter category code"
                      defaultValue={singleStock.name}
                      required
                      id="inputData"
                    />
                  </div>
           
                  <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary"  data-bs-dismiss="modal">Update</button>
              </div>
                </form>
      </div>
    
    </div>
  </div>
</div>



      <div className="content-section p-3">
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Create Category
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendData(e.target);
                  }}
                >
                  <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Category Name</label>
                    <input
                      type="text"
                      name="categoryName"
                      className="productCreateInput"
                      placeholder="Enter category code"
                      require
                      id="inputData"
                    />
                  </div>
           
                  <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary"  data-bs-dismiss="modal">Create</button>
              </div>
                </form>
              </div>
       
            </div>
          </div>
        </div>

        <div className="breadcrumb">
          <h5>Category</h5>
        </div>
        <div className="separator-breadcrumb border-top"></div>

        <div id="section_Warehouse_list" className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="text-end mb-3">
                  <button
                    className="new_Warehouse btn btn-outline-primary btn-md m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Create
                  </button>
                </div>
                <section
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
               
                 
                </section>
                <div className="table-responsive mt-3">
                  <table
                    id="warehouse_table"
                    className="display table dataTable no-footer"
                    aria-describedby="warehouse_table_info"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "105px" }}>Category Name</th>
                        <th style={{ width: "105px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newCategory?.map((item) => (
                        <tr>
                     
                          <td>{item?.name}</td>
                          <td>
                            <button type="button" className="btn"   onClick={() => {
                                              


                                              setupdateCate(item?._id)
                                              axios.get(`${URL}/category/getById/`+item?._id).then((res) => {
                                                setSingleStock(res.data?.data);
                                                console.log(res.data.data)
                                              });
                                                         
                                    
                                           }} >


                            <BsFillPencilFill  className="text-success " data-bs-toggle="modal" data-bs-target="#staticBackdrop1"/>
                            </button>
                           
                            &nbsp;
                            <FiDelete
                              className="text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={() => {

                                onDeleteStudent(item?._id);
                               
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="app-footer">
          <div className="row">
            <div className="col-md-9">
              <p>
                <strong>Gondal - POS With Ultimate Inventory</strong>
              </p>
              <div className="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
                <img
                  className="logo"
                  src="https://Gondal.getstocky.com/images/logo-default.svg"
                  alt=""
                />
                <div>
                  <p className="m-0">© 2023 Gondal v1.1</p>
                  <p className="m-0">All rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCategory;
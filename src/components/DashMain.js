import React, { useState } from "react";
import { Link } from "react-router-dom";
function ScrollableSection({ left, allRoles }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const isAdmin = allRoles?.role?.toLowerCase() === 'admin'
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <>
      <div id="sidebar_mobile" className="sidebar p-3 pt-3 " style={{ left: left, backgroundColor: "#2B3445" }}>
        <div>
          {/* <img
            src={require("../assets/images/logo-default.png")}
            width="100px"
            height=""
            alt=""
            style={{ marginLeft: "5px" }}
          /> */}

          <h1 className=" text-center pt-0 text-primary">Gondal</h1>
        </div>
        <ul className="pb-5 mt-5 ps-0">
          <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <Link to="/dashboard" className="fw-semi-bold nav-link active pt-0" onClick={() => handleTabClick('dashboard')}>
              <i class="fa-solid fa-table-cells-large"></i>Dashboard
            </Link>
          </li>
          {(isAdmin || allRoles?.user?.viewUser || allRoles?.roles) && <div className="accordion accordion-flush mt-3" id="accordionFlushExample5">
            <div className="accordion-item" style={{ backgroundColor: "#2B3445" }}>
              <h2 class={`accordion-header nav-item py-1 ps-0 ${activeTab === 'user' ? 'active' : ''}`} id="flush-headingTwo">
                <button
                  className="accordion-button collapsed p-0 pe-3 onfocus-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive1"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive1"
                  onClick={() => handleTabClick('user')}
                >
                  <li className={`nav-item  sidenav`}  >
                    <Link to="#" className="fw-semi-bold pt-0 nav-link " >
                      <i className="fa-solid fa-people-carry-box "></i>User Management
                    </Link>
                  </li>
                </button>
              </h2>
              <div
                id="flush-collapseFive1"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo1"
                data-bs-parent="#accordionFlushExample51"
              >
                <div class="accordion-body">
                  {(isAdmin || allRoles?.user?.viewUser) && <li className={`nav-item dot-before`}>
                    <Link to="/user" className={`fw-semi-bold nav-link pt-0 `} aria-current="page">
                      Users
                    </Link>
                  </li>}
                  {(isAdmin || allRoles?.roles) && <li className={`nav-item dot-before`}>
                    <Link to="/roles" className="fw-semi-bold nav-link pt-0" aria-current="page">
                      Roles
                    </Link>
                  </li>}
                </div>
              </div>
            </div>
          </div>
          }
          {(isAdmin || allRoles?.client?.viewClient || allRoles?.supplier?.viewSupplier) && <div class="accordion accordion-flush mt-3" id="accordionFlushExample52">
            <div class="accordion-item" style={{ backgroundColor: "#2B3445" }}>
              <h2 class={`accordion-header nav-item py-1 ps-0 ${activeTab === 'people' ? 'active' : ''}`} id="flush-headingTwo">
                <button
                  class="accordion-button collapsed p-0 pe-3 onfocus-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive2"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive2"
                  onClick={() => handleTabClick('people')}
                >
                  <li className={`nav-item`}>
                    <Link to="#" className="fw-semi-bold pt-0 nav-link" aria-current="page">
                      <i class="fa-solid fa-people-carry-box"></i>People
                    </Link>
                  </li>
                </button>
              </h2>
              <div
                id="flush-collapseFive2"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo2"
                data-bs-parent="#accordionFlushExample52"
              >
                <div class="accordion-body">
                  {(isAdmin || allRoles?.client?.viewClient) && <li className={`nav-item dot-before`}>
                    <Link to="/customer" className="fw-semi-bold nav-link pt-0" aria-current="page">
                      Customers
                    </Link>
                  </li>}
                  {(isAdmin || allRoles?.supplier?.viewSupplier) && <li className={`nav-item dot-before`}>
                    <Link to="/supplier" className="fw-semi-bold nav-link pt-0" aria-current="page">
                      Suppliers
                    </Link>
                  </li>}
                </div>
              </div>
            </div>
          </div>}
          {(
            isAdmin || allRoles?.product?.productView
            || allRoles?.category
            || allRoles?.unit
            || allRoles?.brand
            || allRoles?.warehouse) && <div className="accordion accordion-flush mt-3" id="accordionFlushExample53">
              <div className="accordion-item" style={{ backgroundColor: "#2B3445" }}>
                <h2 className={`accordion-header nav-item py-1 ps-0 ${activeTab === 'products' ? 'active' : ''}`} id="flush-headingTwo">
                  <button
                    className="accordion-button collapsed p-0 pe-3 onfocus-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive3"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive3"
                    onClick={() => handleTabClick('products')}
                  >
                    <li className="nav-item" >
                      <Link to="#" className="fw-semi-bold pt-0 nav-link" aria-current="page">
                        <i className="fa-solid fa-people-carry-box"></i>Products
                      </Link>
                    </li>
                  </button>
                </h2>
                <div
                  id="flush-collapseFive3"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo3"
                  data-bs-parent="#accordionFlushExample53"
                >
                  <div class="accordion-body">
                    {(isAdmin || allRoles?.product?.productView) && <li className={`nav-item dot-before`}>
                      <Link to="/allproduct" className="fw-semi-bold nav-link pt-0" aria-current="page">
                        All Products
                      </Link>
                    </li>}


                    {(isAdmin || allRoles?.category) && <li className={`nav-item dot-before`}>
                      <Link to="/group" className="fw-semi-bold nav-link pt-0" aria-current="page">
                        Group
                      </Link>
                    </li>}
                    {(isAdmin || allRoles?.unit) && <li className={`nav-item dot-before`}>
                      <Link to="/unit" className="fw-semi-bold nav-link  pt-0" aria-current="page">
                        Unit
                      </Link>
                    </li>}
                    {(isAdmin || allRoles?.brand) && <li className={`nav-item dot-before`}>
                      <Link to="/brand" className="fw-semi-bold nav-link  pt-0" aria-current="page">
                        Brand
                      </Link>
                    </li>}
                    {(isAdmin || allRoles?.warehouse) && <li className={`nav-item dot-before`}>
                      <Link to="/warehouse" className="fw-semi-bold nav-link  pt-0" aria-current="page">
                        Warehouse
                      </Link>
                    </li>}
                    {(isAdmin || allRoles?.category) && <li className={`nav-item dot-before`}>
                      <Link to="/productcategory" className="fw-semi-bold nav-link  pt-0" aria-current="page">
                        Category
                      </Link>
                    </li>}

                  </div>
                </div>
              </div>
            </div>}
          {(isAdmin || allRoles?.transfer) && <div class="accordion accordion-flush mt-3" id="accordionFlushExample55">
            <div class="accordion-item" style={{ backgroundColor: "#2B3445" }}>
              <h2 className={`accordion-header nav-item py-1 ps-0 ${activeTab === 'transfer' ? 'active' : ''}`} id="flush-headingTwo">
                <button
                  class="accordion-button collapsed p-0 pe-3 onfocus-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive5"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive5"
                  onClick={() => handleTabClick('transfer')}
                >
                  <li className="nav-item" >
                    <Link to="#" className="fw-semi-bold pt-0 nav-link active" aria-current="page">
                      <i class="fa-solid fa-people-carry-box"></i>Transfer
                    </Link>
                  </li>
                </button>
              </h2>
              <div
                id="flush-collapseFive5"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo5"
                data-bs-parent="#accordionFlushExample55"
              >
                <div class="accordion-body">
                  <li className={`nav-item dot-before`}>

                    <Link to="/alltransfer" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      All Transfer
                    </Link>
                  </li>

                </div>
              </div>
            </div>
          </div>}
          {(isAdmin || allRoles?.purchase?.viewPurchase) && <div class="accordion accordion-flush mt-3" id="accordionFlushExample57">
            <div class="accordion-item" style={{ backgroundColor: "#2B3445" }}>
              <h2 className={`accordion-header nav-item py-1 ps-0 ${activeTab === 'purchases' ? 'active' : ''}`} id="flush-headingTwo">
                <button
                  class="accordion-button collapsed p-0 pe-3 onfocus-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive7"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive7"
                  onClick={() => handleTabClick('purchases')}
                >
                  <li className="nav-item" >
                    <Link to="#" className="fw-semi-bold pt-0 nav-link active" aria-current="page">
                      <i class="fa-solid fa-people-carry-box"></i>Purchases
                    </Link>
                  </li>
                </button>
              </h2>
              <div
                id="flush-collapseFive7"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo7"
                data-bs-parent="#accordionFlushExample57"
              >
                <div class="accordion-body">
                  <li className={`nav-item dot-before`}>
                    <Link to="/allpurchase" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      All Purchases
                    </Link>
                  </li>

                </div>
              </div>
            </div>
          </div>}
          {(isAdmin || allRoles?.sale?.viewSale) && <div class="accordion accordion-flush mt-3" id="accordionFlushExample58">
            <div class="accordion-item" style={{ backgroundColor: "#2B3445" }}>
              <h2 className={`accordion-header nav-item py-1 ps-0 ${activeTab === 'sales' ? 'active' : ''}`} id="flush-headingTwo">
                <button
                  class="accordion-button collapsed p-0 pe-3 onfocus-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive8"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive8"
                  onClick={() => handleTabClick('sales')}
                >
                  <li className="nav-item" >
                    <Link to="#" className="fw-semi-bold pt-0 nav-link active" aria-current="page">
                      <i class="fa-solid fa-people-carry-box"></i>Sales
                    </Link>
                  </li>
                </button>
              </h2>
              <div
                id="flush-collapseFive8"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo8"
                data-bs-parent="#accordionFlushExample58"
              >
                <div class="accordion-body">
                  <li className={`nav-item dot-before`}>
                    <Link to="/allsales" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      All Sales
                    </Link>
                    {/* <Link to="/createsale" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Create Sales
                    </Link> */}
                  </li>
                </div>
              </div>
            </div>
          </div>}
          {(isAdmin || allRoles?.sellReturn?.viewSellReturn) && <li className={`nav-item ${activeTab === 'salesReturn' ? 'active' : ''}`}>
            <Link
              to="/salesreturn"
              className="fw-semi-bold nav-link active pt-0"
              aria-current="page"
              onClick={() => handleTabClick('salesReturn')}
            >
              <i class="fa-solid fa-table-cells-large"></i>Sales Return
            </Link>
          </li>}
          {(isAdmin || allRoles?.purchaseReturn?.ViewPurchaseReturn) && <li className={`nav-item ${activeTab === 'purchasesReturn' ? 'active' : ''}`}>
            <Link
              to="/purchasereturn"
              className="fw-semi-bold nav-link active pt-0"
              aria-current="page"
              onClick={() => handleTabClick('purchasesReturn')}
            >
              <i class="fa-solid fa-table-cells-large"></i>Purchases Return
            </Link>
          </li>}
          {(isAdmin || allRoles?.supplier?.methods) && <div class="accordion accordion-flush mt-3" id="accordionFlushExample59">
            <div class="accordion-item" style={{ backgroundColor: "#2B3445" }}>
              <h2 className={`accordion-header nav-item py-1 ps-0 ${activeTab === 'accounting' ? 'active' : ''}`} id="flush-headingTwo">
                <button
                  class="accordion-button collapsed p-0 pe-3 onfocus-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive9"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive9"
                  onClick={() => handleTabClick('accounting')}
                >
                  <li className="nav-item" >
                    <Link to="#" className="fw-semi-bold pt-0 nav-link active" aria-current="page">
                      <i class="fa-solid fa-people-carry-box"></i>Payment Methods
                    </Link>
                  </li>
                </button>
              </h2>
              <div
                id="flush-collapseFive9"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo9"
                data-bs-parent="#accordionFlushExample59"
              >
                <div class="accordion-body">

                  <li className={`nav-item dot-before`}>
                    <Link to="/paymentmethod" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      All Payment Methods
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </div>}

          {(isAdmin || allRoles?.report) && <div class="accordion accordion-flush mt-3" id="accordionFlushExample511">
            <div class="accordion-item" style={{ backgroundColor: "#2B3445" }}>
              <h2 className={`accordion-header nav-item py-1 ps-0 ${activeTab === 'reports' ? 'active' : ''}`} id="flush-headingTwo">
                <button
                  class="accordion-button collapsed p-0 pe-3 onfocus-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive11"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive11"
                  onClick={() => handleTabClick('reports')}
                >
                  <li className="nav-item" >
                    <Link to="#" className="fw-semi-bold pt-0 nav-link active" aria-current="page">
                      <i class="fa-solid fa-people-carry-box"></i>Reports
                    </Link>
                  </li>
                </button>
              </h2>
              <div
                id="flush-collapseFive11"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo11"
                data-bs-parent="#accordionFlushExample511"
              >
                <div class="accordion-body">
                  {(isAdmin || allRoles?.report?.saleReport) && <li className={`nav-item dot-before`}>
                    <Link to="/salereport" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Sale Report
                    </Link>
                  </li>}
                  {(isAdmin || allRoles?.report?.purchaseReport) && <li className={`nav-item dot-before`}>
                    <Link to="/purchasereport" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Purchase Report
                    </Link>
                  </li>}
                  {(isAdmin || allRoles?.report?.sellReturnSaleReport) && <li className={`nav-item dot-before`}>
                    <Link to="/paymentsalereturn" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Sale Return Report
                    </Link>
                  </li>}
                  {(isAdmin || allRoles?.report?.purchaseReturnReport) && <li className={`nav-item dot-before`}>
                    <Link to="/paymentpurchasereturn" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Purchase Return Report
                    </Link>
                  </li>}
                  {(isAdmin || allRoles?.report?.inventoryReport) && <li className={`nav-item dot-before`}>
                    <Link to="/stockreport" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Stock Report
                    </Link>
                  </li>}
                  {(isAdmin || allRoles?.report?.profitLoss) && <li className={`nav-item dot-before`}>
                    <Link to="/profitandloss" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      P/L Report
                    </Link>
                  </li>}
                </div>
              </div>
            </div>
          </div>}
        </ul>
      </div>
    </>
  );
}

export default ScrollableSection;

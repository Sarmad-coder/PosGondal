import "./App.css";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashin from "./components/Dashin";
import Dashboard from "./screen/Pages/Dashboard/Dashboard";
import Roles from "./screen/Pages/UserManagment/Roles/Roles";
import User from "./screen/Pages/UserManagment/User/User";
import ProftAndLoss from "./screen/Pages/Report/ProfiAndLoss";
import Customer from "./screen/Pages/People/Customer/Customer";
import Suplier from "./screen/Pages/People/Suplier/Suplier";
import AllProducts from "./screen/Pages/Products/AllProduct";
import Category from "./screen/Pages/Products/Category";
import Unit from "./screen/Pages/Products/Unit/Unit";
import Brands from "./screen/Pages/Products/Brand/Brand";
// import Adjustment from "./screen/Pages/Adjustment/AllAdjustment";
import AllTransfer from "./screen/Pages/Transfer/AllTransfer";
// import Qutation from "./screen/Pages/Qutations/AllQutatin";
import Purchase from "./screen/Pages/Purchase/AllPurchase";
import AllSale from "./screen/Pages/Sales/AllSale";
import SalesReturn from "./screen/Pages/SalesReturn/SalesReturn";
import PurchaseReturn from "./screen/Pages/PurchaseReturn/PurchaseReturn";
// import Account from "./screen/Pages/Accounting/Account";
// import Deposit from "./screen/Pages/Accounting/Deposit";
// import Expense from "./screen/Pages/Accounting/Expense";
// import ExpenseCategory from "./screen/Pages/Accounting/ExpenseCategory";
// import DepositCategory from "./screen/Pages/Accounting/DepositCategory";
import PaymentMethod from "./screen/Pages/Accounting/PaymentMethods";
import PrintLabels from "./screen/Pages/Products/PrintLebel";
import CreateProduct from "./screen/Pages/Products/CreateProduct";
import CreateAdjustment from "./screen/Pages/Adjustment/CreateAdjustment";
import CreateTransfer from "./screen/Pages/Transfer/CreateTransfer";
import CreateQuotation from "./screen/Pages/Qutations/AddQutation";
import CreatePurchase from "./screen/Pages/Purchase/CreatePurchase";
import CreateSale from "./screen/Pages/Sales/CreateSales";
// import SmsSettings from "./screen/Pages/Settings/SmsSettings";
// import SystemSettings from "./screen/Pages/Settings/SystemSettings";
// import PosSettings from "./screen/Pages/Settings/PosReceptSettings";
// import SmsTemplate from "./screen/Pages/Settings/SmsTemplate";
// import Curency from "./screen/Pages/Settings/Curency";
// import BackUp from "./screen/Pages/Settings/BackUp";
import SaleReport from "./screen/Pages/Report/SaleReport";
// import PurchaseReport from "./screen/Pages/Report/PurchaseReport";
import PurchaseReport from './screen/Pages/Report/Purchasereport/AllPurchase'
import InventoryReport from "./screen/Pages/Report/InventoryReport";
import ProductReport from "./screen/Pages/Report/ProductReport";
import CustomerReport from "./screen/Pages/Report/CustomerReport";
import SuplierReport from "./screen/Pages/Report/SupplierReport";
import PaymentSale from "./screen/Pages/Report/PaymentSale";
import PaymentPurchase from "./screen/Pages/Report/PaymentPurchase";
import PaymentSaleReturn from "./screen/Pages/Report/PaymentSaleReturn";
import PaymentPurchaseReturn from "./screen/Pages/Report/PaymentPurchaseReturn";
import ProductQuantityAlert from "./screen/Pages/Report/ProductQuantityAlert";
import Warehouse from "./screen/Pages/Products/Warehouse/Warehouse";
import Pos from "./screen/Pages/Pos/Pos";
import CreateCutomer from "./screen/Pages/People/Customer/CreateCustomer";
import Permissions from "./screen/Pages/UserManagment/Roles/Permissions";
import ViewSuplier from "./screen/Pages/People/Suplier/ViewSuplier";
import CreateSaleReturn from "./screen/Pages/SalesReturn/CreateSaleReturn";
import CreatePurchaseReturn from "./screen/Pages/PurchaseReturn/CreatePurchaseReturn";
import Login from "./screen/Pages/Auth/Login/Login";

import StockReport from "./screen/Pages/StockReport/StockReport";
import PurchaseReturnReport from "./screen/Pages/Report/PaymentPurchaseReturn";
import ProductCategory from "./screen/Pages/Products/ProductCategory/ProductCategory";
import { useState } from "react";
import Invoice from "./components/Invoice/invoice";
import { MyContext } from "./components/context";
// import PaymentSaleReturn from "./screen/Pages/Report/PaymentSaleReturn";


function App() {
  const [allRoles, setAllRoles] = useState({})
  const isAdmin = allRoles?.role?.toLowerCase() === 'admin'
  const [invoiceData, setInvoiceData] = useState({});

  return (
    <>
      <HashRouter>
        <MyContext.Provider value={{ invoiceData, setInvoiceData }}>
          <Routes>
            <Route path="/" element={<Login setAllRoles={setAllRoles} />} />
            {/* {!localStorage.getItem("login") ? (
            <Route path="/" element={<Login setAllRoles={setAllRoles} />} /> */}
            {/* ) : ( */}
            <Route element={<Dashin allRoles={allRoles} setAllRoles={setAllRoles} />} >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pos" element={(isAdmin || allRoles?.sale?.pos) ? <Pos /> : <Navigate to="/dashboard" replace />} />
              <Route path="/pos/:id" element={(isAdmin || allRoles?.sale?.pos) ? <Pos /> : <Navigate to="/dashboard" replace />} />
              {/* User Managment Pages */}
              <Route path="/user" element={(isAdmin || allRoles?.user?.viewUser) && <User allRoles={allRoles} />} />
              <Route path="/roles" element={(isAdmin || allRoles?.roles) ? <Roles /> : <Navigate to="/dashboard" replace />} />
              <Route path="/roles/permission" element={(isAdmin || allRoles?.roles) ? <Permissions /> : <Navigate to="/dashboard" replace />} />
              {/* People Pages */}
              {/* <Route path="/customer" element={(isAdmin || allRoles?.client?.viewClient) ? <Customer allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} /> */}
              <Route path="/customer" element={(isAdmin || allRoles?.client?.viewClient) && <Customer allRoles={allRoles} />} />
              <Route path="/customer/create" element={(isAdmin || allRoles?.client?.addClient) ? <CreateCutomer /> : <Navigate to="/dashboard" replace />} />
              <Route path="/supplier" element={(isAdmin || allRoles?.supplier?.viewSupplier) ? <Suplier allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} />
              <Route path="/viewsupplier/:id" element={(isAdmin || allRoles?.supplier?.viewSupplier) ? <ViewSuplier /> : <Navigate to="/dashboard" replace />} />
              {/* Product Pages */}
              <Route path="/allproduct" element={(isAdmin || allRoles?.product?.productView) ? <AllProducts allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} />
              <Route path="/createproduct" element={(isAdmin || allRoles?.product?.addProduct) ? <CreateProduct /> : <Navigate to="/dashboard" replace />} />
              {/* <Route path="/printlabel" element={<PrintLabels />} /> */}
              <Route path="/group" element={(isAdmin || allRoles?.category) ?
                <Category allRoles={allRoles} /> :
                <Navigate to="/dashboard" replace />}

              />
              <Route path="/unit" element={(isAdmin || allRoles?.unit) ? <Unit allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} />
              <Route path="/brand" element={(isAdmin || allRoles?.brand) ? <Brands allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} />
              <Route path="/warehouse" element={(isAdmin || allRoles?.warehouse) ? <Warehouse allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} />
              {/* Adjustment Pages */}
              {/* <Route path="/alladjutment" element={<Adjustment />} />
              <Route path="/createadjustment" element={<CreateAdjustment />} /> */}
              {/* Transfer Pages */}
              <Route path="/alltransfer" element={(isAdmin || allRoles?.transfer) ? <AllTransfer allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} />
              <Route path="/createtransfer" element={(isAdmin || allRoles?.transfer?.addTransfer) ? <CreateTransfer /> : <Navigate to="/dashboard" replace />} />
              {/* Quotations Pages */}
              {/* <Route path="/allquotation" element={<Qutation />} />
              <Route path="/addquotation" element={<CreateQuotation />} /> */}
              {/* Purchase Pages */}
              <Route path="/allpurchase" element={(isAdmin || allRoles?.purchase?.viewPurchase) ? <Purchase allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} />
              <Route path="/createpurchase" element={(isAdmin || allRoles?.purchase?.addPurchase) ? <CreatePurchase /> : <Navigate to="/dashboard" replace />} />
              {/* Sales Pages */}
              <Route path="/allsales" element={(isAdmin || allRoles?.sale?.viewSale) ? <AllSale allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} />
              <Route path="/createsale" element={(isAdmin || allRoles?.sale?.addSale) ? <CreateSale /> : <Navigate to="/dashboard" replace />} />
              {/* Sales Return Pages */}
              <Route path="/salesreturn" element={(isAdmin || allRoles?.sellReturn?.viewSellReturn) ? <SalesReturn allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} />
              <Route path="/createsalesreturn" element={(isAdmin || allRoles?.sellReturn?.addSellReturn) ? <CreateSaleReturn /> : <Navigate to="/dashboard" replace />} />
              {/* Purchase Return Pages */}
              <Route path="/purchasereturn" element={(isAdmin || allRoles?.purchaseReturn?.ViewPurchaseReturn) ? <PurchaseReturn allRoles={allRoles} /> : <Navigate to="/dashboard" replace />} />
              <Route path="/createpurchasereturn" element={(isAdmin || allRoles?.purchaseReturn?.addPurchaseReturn) ? <CreatePurchaseReturn /> : <Navigate to="/dashboard" replace />} />
              {/* Account Pages */}
              {/* <Route path="/account" element={<Account />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/expensecategory" element={<ExpenseCategory />} />
            <Route path="/depositcategory" element={<DepositCategory />} /> */}
              <Route path="/paymentmethod" element={(isAdmin || allRoles?.supplier?.methods) ? <PaymentMethod /> : <Navigate to="/dashboard" replace />} />
              {/* Settings Pages */}
              {/* <Route path="/systemsetting" element={<SystemSettings />} />
            <Route path="/posreceiptsetting" element={<PosSettings />} />
            <Route path="/smssetting" element={<SmsSettings />} />
            <Route path="/smstemplate" element={<SmsTemplate />} />
            <Route path="/currency" element={<Curency />} />
            <Route path="/backup" element={<BackUp />} /> */}
              {/* Report Pages */}
              <Route path="/profitandloss" element={(isAdmin || allRoles?.report?.profitLoss) ? <ProftAndLoss /> : <Navigate to="/dashboard" replace />} />
              <Route path="/salereport" element={(isAdmin || allRoles?.report?.saleReport) ? <SaleReport /> : <Navigate to="/dashboard" replace />} />
              <Route path="/purchasereport" element={(isAdmin || allRoles?.report?.purchaseReport) ? <PurchaseReport /> : <Navigate to="/dashboard" replace />} />
              <Route path="/createpurchase/:purchaseId" element={(isAdmin || allRoles?.purchase?.addPurchase) ? <CreatePurchase /> : <Navigate to="/dashboard" replace />} />
              {/* <Route path="/inventoryreport" element={(isAdmin || allRoles?.report) ? <InventoryReport /> : <Navigate to="/dashboard" replace />} /> */}
              {/* <Route path="/productreport" element={(isAdmin || allRoles?.report) ? <ProductReport /> : <Navigate to="/dashboard" replace />} /> */}
              {/* <Route path="/customerreport" element={(isAdmin || allRoles?.report) ? <CustomerReport /> : <Navigate to="/dashboard" replace />} /> */}
              {/* <Route path="/supplierreport" element={(isAdmin || allRoles?.report) ? <SuplierReport /> : <Navigate to="/dashboard" replace />} /> */}
              {/* <Route path="/paymentsale" element={(isAdmin || allRoles?.report) ? <PaymentSale /> : <Navigate to="/dashboard" replace />} /> */}
              {/* <Route path="/paymentpurchase" element={(isAdmin || allRoles?.report) ? <PaymentPurchase /> : <Navigate to="/dashboard" replace />} /> */}
              {/* <Route path="/paymentsalereturn" element={<PaymentSaleReturn />} /> */}
              {/* <Route path="/paymentpurchasereturn" element={<PaymentPurchaseReturn />} /> */}
              <Route path="/productquantityalert" element={<ProductQuantityAlert />} />
              {/* sellReturnSaleReport */}
              <Route path="/stockreport" element={(isAdmin || allRoles?.report?.inventoryReport) ? <StockReport /> : <Navigate to="/dashboard" replace />} />
              <Route path="/paymentsalereturn" element={(isAdmin || allRoles?.report?.sellReturnSaleReport) ? <PaymentSaleReturn /> : <Navigate to="/dashboard" replace />} />
              <Route path="/paymentpurchasereturn" element={(isAdmin || allRoles?.report?.purchaseReturnReport) ? <PurchaseReturnReport /> : <Navigate to="/dashboard" replace />} />
              <Route path="/productcategory" element={(isAdmin || allRoles?.report?.profitLoss) ? <ProductCategory /> : <Navigate to="/dashboard" replace />} />

            </Route>
            {/* )} */}
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </MyContext.Provider>
      </HashRouter>
    </>
  );
}

export default App;
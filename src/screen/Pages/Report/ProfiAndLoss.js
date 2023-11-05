import React, { useEffect, useState } from "react";

import { FiDelete, FiEye } from "react-icons/fi";
import URL from "../../Url";
import axios from "axios";
import DateComp from '../../../components/Date';
const ProftAndLoss = () => {
  const [newProfit, setNewProfit] = useState([]);
  const [dateFilterRes, setDateFilterRes] = useState(null)
  useEffect(() => {
    axios.get(`${URL}/customerOrder/profit/report`).then((res) => {
      setNewProfit(res?.data?.data);
      console.log(res?.data?.data)
    });
  }, []);

  return (
    <div class="content-section p-3">
      <div class="breadcrumb" >
        <h5>Profit and Loss</h5>
        {/* <input type="text" placeholder="Search Product Profit"  /> */}
      </div>
      {/* <DateComp
        from="Profit From"
        to="Profit upto"
        dataArray={newProfit}
        setDateFilterRes={setDateFilterRes}

      /> */}
      <div class="separator-breadcrumb border-top">
        <div className="table-responsive mt-3">
          <table
            id="warehouse_table"
            className="display table dataTable no-footer"
            aria-describedby="warehouse_table_info"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th style={{ width: "105px" }}>Sr</th>
                <th style={{ width: "105px" }}>Name</th>
                <th style={{ width: "105px" }}>Sold Quantity</th>
                <th style={{ width: "105px" }}>Total Sale</th>
                <th style={{ width: "105px" }}>Profit</th>
              </tr>
            </thead>
            <tbody>
              {(dateFilterRes ?? newProfit)?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item?.totalQty}</td>
                  <td>Rs {item?.totalSale}</td>
                  <td style={{ color: "green" }}>
                    Rs {item?.totalSale - item?.totalCost}
                  </td>
                </tr>
              ))}


            </tbody>
          </table>
          <h5 style={{ textAlign: "end", paddingRight: "1rem" }}><span style={{ color: "red", marginRight: "0.6rem" }}>Total Profit:</span>{newProfit?.reduce((acc, item) => {
            return acc + (item?.totalSale - item?.totalCost)
          }, 0)} Rs</h5>
        </div>
      </div>
    </div>
  );
};

export default ProftAndLoss;
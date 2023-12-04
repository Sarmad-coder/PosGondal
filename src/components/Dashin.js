import React, { useState } from "react";
import ScrollableSection from "./DashMain";
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import URL from '../../src/screen/Url'
function Dashin({ children, allRoles, setAllRoles }) {
  const [togg, setTogg] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const userId = localStorage.getItem("id")

  const changeTogg = () => {
    setTogg(!togg)
  }

  useEffect(() => {
    async function getUser() {

      const { data } = await axios.get(`${URL}/user/${userId}`)
      setAllRoles({
        ...data?.data?.permissionsId?.allObject,
        role: data?.data?.role
      });
    }
    !allRoles.role && getUser()
  }, [location?.pathname, allRoles?.role])
  useEffect(() => {
    const a = localStorage.getItem("dateSet")
    if (!a?.length && localStorage.getItem("login")) {
      toast.error("Please start your day first")
      navigate('/dashboard', { replace: true })

    }


  }, [location?.pathname])

  if (!localStorage.getItem("login")) {
    return <Navigate to="/" replace />
  }
  return (
    <>
      <div className="container-fluid p-0">
        <div className="">
          <div className="">
            <ScrollableSection left={togg ? '-100%' : '0'} allRoles={allRoles} />
          </div>

          <div className="" id="common_bar" style={{ marginLeft: togg ? '0px' : '250px' }} >
            <Nav press={changeTogg} left={togg ? '-100%' : '0'} allRoles={allRoles} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashin;

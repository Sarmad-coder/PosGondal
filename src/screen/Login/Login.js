import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ApiUrl from "../Pages/BaseUrl";
import axios from "axios";

function Login() {

  const navigation = useNavigate("")

  const [username, setUsername] = useState("")

  const [password, setPassword] = useState("")


  const handleSubmit = (values) => {


    if (values?.email?.value?.length === 0) {

      toast('Please Enter a email')

    } else if (values?.password?.value?.length === 0) {

      toast('Please Enter a password')

    } else {

      const params = {

        'email': username,

        'password': password

      }

      axios
        .post(`${ApiUrl}/embassador/login`, params)

        .then((res) => {

          console.log(res.data);

          if (res.data.status === 'fail') {
            toast.error("Invalid Email or Password");
          } else if (res.data.status === 'success') {
            toast('Ambassador Login successfully!')
            localStorage.setItem('ambassadorID', res.data.data._id);
            localStorage.setItem('country', res.data.data.country);
            localStorage.setItem('packageID', res.data.data.package);
            navigation('/dashboard')
          }
        }).catch((error) => {
          toast.error("Invalid Email or Password");
        });
    }

  }
  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-md-6">
            <div className="login3">
              <img
                src={require("../../assets/images/jack.jpeg")}
                style={{
                  width: "100%",
                  height: "100%",
                  width: "auto",
                  height: "auto",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <section className="login2">
              <div className="login">
                <h5 style={{ marginBottom: "20px" }}>Login</h5>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e.target);

                }} className="form">
                  <label style={{ fontSize: "12px" }}>Email</label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setUsername(e.target.value)}

                    class="form-control no-focus"
                    style={{
                      width: "95%",
                      marginBottom: "10px",
                      backgroundColor: "#fff",
                    }}
                    placeholder="Enter Your Email"
                  />

                  <label style={{ fontSize: "12px" }}>Password</label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    class="form-control no-focus"


                    style={{
                      width: "95%",
                      marginBottom: "30px",
                      backgroundColor: "#fff",
                    }}
                    placeholder="Enter your password"
                  />


                  <button
                    type="submit"
                    class="btn btn-success"
                    style={{
                      fontSize: "13px",
                      width: "95%",
                      backgroundColor: "#0E9F6E",
                      borderColor: "#0E9F6E",
                      marginTop: "-20px",
                    }}
                  >
                    Login
                  </button>
                  <hr style={{ marginTop: "27px", width: "95%" }} />

                  <a href="#" class="link btn btn-primary d-block text-center">
                    <i
                      class="fa-brands fa-facebook-f"
                      style={{ marginRight: "8px" }}
                    ></i>{" "}
                    login with Facebook
                  </a>

                  <a href="#" class="link btn btn-danger d-block text-center">
                    <i
                      class="fa-brands fa-google"
                      style={{ marginRight: "8px" }}
                    ></i>{" "}
                    login with Google
                  </a>

                  <a href="#" className="forgot-password">
                    Forgot your password
                  </a>
                  <br />

                  <a href="#" className="forgot-password">
                    Creat Account
                  </a>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

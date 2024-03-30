import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import image from "../../assets/User_Auth/login1.svg";
import brand from "../../assets/User_Auth/brand.png";
import axios from "axios";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import formContext from "../Context/FormContext";
const SignIn = () => {
  let {
    show,
    setShow,
    setProfile,
    setFirstName,
    setLastName,
    setMobileNumber,
    email,
    setEmail,
    password,
    setPassword,
    loader,
    setLoader,
  } = useContext(formContext);
  let navigate = useNavigate();
  //Password Show hide :
  let handleShow = () => {
    let password = document.getElementById("password");
    setShow(!show);
    {
      !show
        ? password.setAttribute("type", "text")
        : password.setAttribute("type", "password");
    }
  };
  //Login user submition:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    let data = {
      email,
      password,
    };
    try {
      axios
        .post("https://user-auth-with-jwt.onrender.com/auth/login", data)
        .then((response) => {
          const datas = JSON.stringify({
            token: response?.data?.token,
            id: response?.data?.id,
          });
          localStorage.setItem("datas", datas);

          let GetUserId = JSON.parse(localStorage.getItem("datas"));
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });

          setEmail("");
          setPassword("");
          setTimeout(() => {
            navigate(`/user/${GetUserId.id}`);
          }, 2000);
          setLoader(false);
        })
        .catch((error) => {
          setProfile(null);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setMobileNumber("");
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
          setLoader(false);
        });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      setLoader(false);
    }
  };
  return (
    <>
      <div className="signin_container">
        <ToastContainer
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="brand_logo">
          {/* <img src={brand} alt="brand" /> */}

          <p>User Authentication With JWT</p>

          <i
            className="bx bxl-sketch bx-burst bx-flip-horizontal"
            style={{ color: "#000" }}
          ></i>
        </div>
        <div className="box_container">
          <div className="left_image">
            <img src={image} alt="signup" />
          </div>
          <div className="right_form">
            <div className="form_title">
              <h4>Welcome Back!</h4>
              <p>Please enter login details below</p>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="form_group">
                <label htmlFor="email">
                  Email{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Eg : abc@gmail.com"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="icon">
                  <i className="bx bxs-envelope"></i>
                </div>
              </div>
              <div className="form_group">
                <label htmlFor="password">
                  Password{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="icon">
                  <i className="bx bxs-lock-open"></i>
                </div>
                <div className="show_pass" onClick={handleShow}>
                  {!show ? (
                    <i className="bx bx-low-vision"></i>
                  ) : (
                    <i className="bx bxs-show"></i>
                  )}
                </div>
              </div>
              <div className="forgot_password">
                <Link>
                  <p>Forget Password ?</p>
                </Link>
              </div>
              <div className="form_submit">
                <button type="submit">
                  Sign In{" "}
                  {loader ? (
                    <span className="loader"></span>
                  ) : (
                    <div className="rocket">
                      <i className="bx bx-log-in bx-flashing"></i>
                    </div>
                  )}
                </button>
              </div>
              <div className="or">
                <p>or &nbsp;&nbsp;&nbsp; Continue</p>
              </div>
            </form>

            <div className="signup_link">
              <p>
                Don't have an account ? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

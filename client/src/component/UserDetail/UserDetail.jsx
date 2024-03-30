import React, { useEffect, useState } from "react";
import "./UserDetail.scss";
import { useNavigate, Link } from "react-router-dom";
import signup from "../../assets/User_Auth/register3.jpg";
import brand from "../../assets/User_Auth/brand.png";
import illustration from "../../assets/Background/register_illustrator.svg";
import axios from "axios";
import profile_logo from "../../assets/User_Auth/profile.png";
import { convertToBase64 } from "../Helper/Convert";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import formContext from "../Context/FormContext";
const UserDetail = () => {
  let {
    UserDetails,
    setUserDetails,
    user,
    setUser,
    profileView,
    setProfileView,
    show,
    setShow,
    profile,
    setProfile,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    location,
    setLocation,
    mobileNumber,
    setMobileNumber,
    email,
    setEmail,
    password,
    setPassword,
    loader,
    setLoader,
  } = useContext(formContext);
  //Fetch userData
  // useEffect(() => {
  //   setLoader(true);
  //   let id = JSON.parse(localStorage.getItem("token"));

  //   axios
  //     .get(
  //       `http://localhost:3001/userData/${id.id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${id.token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       toast.success(res.data.message, {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Flip,
  //       });
  //       setUserDetails(res.data.getUserData);
  //       setFirstName(res.data.getUserData.firstName);
  //       setLastName(res.data.getUserData.lastName);
  //       setEmail(res.data.getUserData.email);
  //       setLocation(res.data.getUserData.location);
  //       setPassword(res.data.getUserData.password);
  //       setMobileNumber(res.data.getUserData.mobileNumber);
  //       setProfile(res.data.getUserData.profile);
  //       setLoader(false);
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message, {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Flip,
  //       });
  //       setLoader(false);
  //       console.log(error.message);
  //     });
  // }, []);
  let navigate = useNavigate();

  //Formik does not support file upload so we could create handler :
  const onUpload = async (e) => {
    let base64 = await convertToBase64(e.target.files[0]);

    setProfile(base64);
  };
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
  //Update UserDetail
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const token = JSON.parse(localStorage.getItem("token"));

      let data = {
        profile,
        firstName,
        lastName,
        email,
        password,
        location,
        mobileNumber,
      };
      axios
        .put(
          `http://localhost:3001/userData/${token.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message, {
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
        })
        .catch((error) => {
          console.log(error.message);
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
      console.log(error.message);
    }
  };
  //LogOut user
  let handleLogOut = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");

      toast.success("LogOut Sucessfully", {
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
      setTimeout(() => {
        setUser(null);
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error("LogOut Failed", {
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
    }
  };
  return (
    <>
      <div className="userdetail_container">
        <ToastContainer
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="brand_logo">
          <img src={brand} alt="brand" />

          <p>Virtual Card Creations</p>
          <i
            className="bx bxl-sketch bx-burst bx-flip-horizontal"
            style={{ color: "#58dec9" }}
          ></i>
        </div>
        <div className="box_container">
          <div className="right_form">
            <div className="form_title">
              {/* <h4>Welcome to AristosTech Digital Card Creator!</h4> */}
              <p>Update Your Account Details</p>
              <div className="profile">
                <label htmlFor="profile">
                  <img
                    src={profile ? profile : profile_logo}
                    alt="avatar"
                    id="profile_image"
                  />
                </label>
                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>
            </div>
            {/* <div className="illustration">
              <img src={illustration} alt="illustration" />
            </div> */}
            <form action="" onSubmit={handleSubmit}>
              {/* //First Name */}
              <div className="form_group">
                <label htmlFor="userName">
                  FirstName{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Eg: Jayakumar "
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <div className="icon">
                  <i className="bx bxs-user"></i>
                </div>
              </div>
              {/* //Last Name */}
              <div className="form_group">
                <label htmlFor="lastName">LastName </label>
                <input
                  type="text"
                  placeholder="Eg : Kumar or K"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <div className="icon">
                  <i className="bx bxs-user-pin"></i>
                </div>
              </div>
              {/* Email`` */}
              <div className="form_group">
                <label htmlFor="email">
                  Email{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="email"
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

              {/* //Location */}
              <div className="form_group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  placeholder="Eg : TamilNadu,Chennai"
                  name="location"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="icon">
                  <i className="bx bx-current-location bx-rotate-90"></i>
                </div>
              </div>
              {/* MobileNumber`` */}
              <div className="form_group">
                <label htmlFor="lastName">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Eg : +91 6576579679"
                  name="mobile"
                  id="mobile"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <div className="icon">
                  <i className="bx bx-mobile"></i>
                </div>
              </div>

              <div className="form_submit">
                <button type="submit">
                  Update Profile
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
                <p>or Continue</p>
              </div>
            </form>

            <div className="signup_link">
              <p>
                Get back later ? <Link onClick={handleLogOut}>Logout</Link>
              </p>
            </div>
          </div>
          <div className="right_image">
            <img className="login" src={signup} alt="signUp" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;

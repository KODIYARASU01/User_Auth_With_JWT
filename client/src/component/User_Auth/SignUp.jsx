import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import signup from "../../assets/User_Auth/register.svg";
import brand from "../../assets/User_Auth/brand.png";
import profile_logo from "../../assets/User_Auth/profile.png";
import illustration from "../../assets/User_Auth/register_illustrator.svg";
import axios from "axios";
import {convertToBase64 } from "../Helper/Convert.js";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formContext from "../Context/FormContext.jsx";

const SignUp = () => {
  let navigate = useNavigate();
  let {
    show,
    setShow,
    profile,
    setProfile,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    mobileNumber,
    setMobileNumber,
    email,
    setEmail,
    password,
    setPassword,
    loader,
    setLoader,

  } = useContext(formContext);
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
//Register user submition:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    let data = {
      profile,
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
    };
    try {
      axios
        .post("https://user-auth-with-jwt.onrender.com/auth/register", data)
        .then((response) => {
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
          setPassword('');
          setFirstName('');
          setLastName("");
          setEmail("");
          setPassword("");
          setMobileNumber("")
          setProfile(undefined)
          setTimeout(() => {
            navigate("/");
          }, 2000);
          setLoader(false);
        })
        .catch((error) => {

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
      <div className="signup_container">
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
          <div className="right_form">
            <div className="form_title">
              <h4>Welcome to My Application!</h4>
              <p>Create your new Account</p>
            </div>
            <div className="illustration">
              {/* <img src={illustration} alt="illustration" /> */}
            </div>

            <form action="" onSubmit={handleSubmit}>
              <div className="profile">
                <label htmlFor="profile">
                  <img
                    src={profile || profile_logo}
                    alt="avatar"
                    id="profile_image"
                  />
                  <i className="bx bxs-chevrons-left bx-flashing"></i>
                  <span>Upload your profile</span>
                </label>
                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>
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
              {/* Password`` */}
              <div className="form_group">
                <label htmlFor="email">
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
                  <i className="bx bxs-lock"></i>
                </div>

                <div className="show_pass" onClick={handleShow}>
                  {!show ? (
                    <i className="bx bx-low-vision"></i>
                  ) : (
                    <i className="bx bxs-show"></i>
                  )}
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
                  Register
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
                Already have an Account ? <Link to="/">Login</Link>
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

export default SignUp;

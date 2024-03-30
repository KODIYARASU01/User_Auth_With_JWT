import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import formContext from "./component/Context/FormContext";

let SignIn = lazy(() => import("./component/User_Auth/SignIn"));
let SignUp = lazy(() => import("./component/User_Auth/SignUp"));
let UserDetail = lazy(() => import("./component/UserDetail/UserDetail"));

const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  console.log(user);
  let [userToken, setUserToken] = useState("");
  let [loader3, setLoader3] = useState(false);
  // State to store user authentication
  let [UserDetails, setUserDetails] = useState([]);
  let [show, setShow] = useState(false);
  let [profile, setProfile] = useState();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [location, setLocation] = useState("");
  let [mobileNumber, setMobileNumber] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loader, setLoader] = useState(false);
  //Profile view toggle state:
  const [profileView, setProfileView] = useState(false);
  useEffect(() => {
    const Token = JSON.parse(localStorage.getItem("datas"));
    if (Token) {
      setUser(Token);
    }
  }, [navigate]); // Load user from localStorage on component mount
  return (
    <>
      <formContext.Provider
        value={{
          userToken,
          setUserToken,
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
        }}
      >
        <Suspense fallback={<h4>Loading.....</h4>}>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to={`/user/${user.id}`} /> : <SignIn />
              }
            />
            <Route path="/register" element={user ? <Navigate to={`/user/${user.id}`} /> :<SignUp />} />
            <Route path="user/:id" element={user ? <UserDetail /> :<Navigate to={"/"} />}/>
            {/* You can use your authRoutes with useAuthRoutes hook here if needed */}
          </Routes>
        </Suspense>
      </formContext.Provider>
    </>
  );
};

export default App;

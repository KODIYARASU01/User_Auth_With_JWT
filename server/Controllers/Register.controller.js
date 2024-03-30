import UserAuth from "../Models/Register.model.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
//Post data to mongodb -- > Register User  :
export const RegisterUser = async (req, res) => {
  try {
    //Get all those field data from body:
    let { profile, email, password, firstName, lastName, mobileNumber } =
      req.body;
    //if user doesn't fill all those fields error through:
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ message: "Fill all those * fields" });
    }
    //Find user Already Exist with this email or not
    let findUser = await UserAuth.findOne({ email: email });
    //If exist through on error
    if (findUser) {
      res.status(400).json({ message: "User Already Exist with this email" });
    } else {
      //Hashing password encrypt to secure clients passwords :
      let hashedPassword = await bcryptjs.hash(password, 10);
      let data = {
        profile,
        email,
        password: hashedPassword, //Password stored secure with hashing type
        firstName,
        lastName,
        mobileNumber,
      };
      //If doesn't exist created new user data to database:
      let createUser = await UserAuth.create(data);
      res.status(201).json({
        message: "User Registered Sucessfully",
        data: {
          email: createUser.email,
          id: createUser.id,
          firstName: createUser.firstName,
        },
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "User Registration Failed", error: error.message });
  }
};

//Login user:

export const LoginUser = async (req, res) => {
  try {
    //Get value from body:
    let { email, password } = req.body;
    //User required to fill all those fields:
    if (!email || !password) {
      res.status(400).json({ message: "Fill all those * fields" });
    }
    //Checking for already this email exist or not:
    let checkUser = await UserAuth.findOne({ email });
    if (!checkUser) {
      res.status(400).json({ message: "User Doesn't Exist" });
    } else {
      //Compare current password and already registered password with bcryptjs:
      let verifyPassword = await bcryptjs.compare(password, checkUser.password);
      if (!verifyPassword) {
        res.status(400).json({ message: "Wrong Credential " });
      } else {
        //Create token for specific user:
        let token = jwt.sign(
          { id: checkUser.id, email: checkUser.email }, //Token payload stored our  data
          process.env.SECRET_KEY,
          { expiresIn: "30d" }
        );
        //Token verify:
        if (!token) {
          res.status(400).json({ message: "Token not found " });
        }

        //Token Store to local Strorage:
        res
          .status(200)
          .json({ token: token, message: "User Login Sucessfully " });
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "User Login Failed", error: error.message });
  }
};

import RegisterUser from "../Models/Register.model.js";
import bcryptjs from "bcrypt";

//Post data to mongodb -- > Register User  :
export const CreateUser = async (req, res) => {
  try {
    //Get all those field data from body:
    let { profile, email, password, firstName, lastName, mobileNumber } =
      req.body;
    //if user doesn't fill all those fields error through:
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ message: "Fill all those * fields" });
    }
    //Find user Already Exist with this email or not
    let findUser = await RegisterUser.findOne({ email: email });
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
      let createUser = await RegisterUser.create(data);
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

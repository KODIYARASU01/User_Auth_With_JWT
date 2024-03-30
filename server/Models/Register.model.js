import mongoose from "mongoose";

let RegisterSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
      default:'https://cdn.vectorstock.com/i/1000x1000/51/87/student-avatar-user-profile-icon-vector-47025187.webp'
    },
    firstName: {
      type: String,
      required: [true, "FirstName is Required"],
    },
    lastName: {
      type: String,
      required: [true, "LastName is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    mobileNumber: {
      type: String,
    },
  },
  { timestamps: true }
);



let RegisterUser=mongoose.model('RegisterUser',RegisterSchema);

export default RegisterUser;
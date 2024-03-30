import mongoose from "mongoose";

let RegisterSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
      default:'https://img.freepik.com/free-vector/bearded-man-profile_24908-81067.jpg?t=st=1711814101~exp=1711817701~hmac=e843296aecd64185b4bb0ec5fd1bd4ce00769b401064146757a1f0286dd2b862&w=740'
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
    location:{
      type: String,
    }
  },
  { timestamps: true }
);



let UserAuth=mongoose.model('UserAuth',RegisterSchema);

export default UserAuth;
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

//Routes Importing:
import AuthRoutes from "./Routes/Register.route.js";
//Configire DotEnv Configuration :
dotenv.config();
//App initialized :s
let app = express();
//Accept json type data send to server:
app.use(express.json({ limit: "30mb" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//Initialize DotEnv Datas :
let PORT = process.env.PORT || 3000;
let mongodb_uri = process.env.MONGODB_CONNECTION_STRING;

//All Routes:
app.use("/auth", AuthRoutes);
//Home route for server side only for demo purpose:
app.get("/", (req, res) => {
  res.send("server is running Sucessfully");
});

//MongoDB Conncetion established:
mongoose
  .connect(mongodb_uri)
  .then(() => {
    console.log("MongoDb Connected Succesfully");
    try {
      //Application listening PORT Number
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Server Connection Failure");
    }
  })
  .catch((error) => {
    console.log("MongoDb Connection Failure");
  });

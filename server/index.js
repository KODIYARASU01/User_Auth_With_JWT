import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

let app = express();

let PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("server is running Sucessfully");
});

//Application listening PORT Number
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

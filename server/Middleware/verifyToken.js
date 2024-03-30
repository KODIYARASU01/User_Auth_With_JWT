import jwt from "jsonwebtoken";
import UserAuth from "../Models/Register.model.js";

export const verifyToken = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token;

      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decode);

      req.user = await UserAuth.findById(decode.id).select("password");
    } catch (error) {
      return res.status(401).json({ error: "Not Autherized ,Wrong Token" });
    }
  } else {
    if (!token) {
      return res.status(401).send("No Token Found");
    }
  }
};

"use strict";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET || "mysecretkey";

export const bearerAuth = async (req, res, next) => {
  try{
  if (!req.headers["authorization"]) {
    next("No Authorization info");
    return;
  }
  const basicHeaderParts = req.headers.authorization.split(" ");
  const token = basicHeaderParts.pop();
  const parsedToken = jwt.verify(token, SECRET); // {username: thaer ... }
  req.user= parsedToken
  next()
}catch{
  res.send("invalid token");
}
};
  
"use strict";
import bcrypt from "bcrypt";
import { userModel } from "../models/index.mjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "mysecretkey";

export const signin = async (req, res, next) => {
  try{
  const user = await userModel.findOne({
    where: { username: req.body.username },
  });
  const valid = await bcrypt.compare(
    req.body.password,
    user.dataValues.password
  );
  if (valid && user) {
    const token=jwt.sign({ userId: user.id, username: req.body.username}, SECRET);
    user.dataValues["token"] = token;
    return({token});
  } else {
    throw new Error("WORNG LOGIN!!!");
    // return("WORNG LOGIN!!!");
  }
}catch{
  throw new Error("Wrong!!!!!@!");
}

};

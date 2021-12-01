"use strict";
import bcrypt from "bcrypt";
import { userModel } from "../models/index.mjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "mysecretkey";

export const signup = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const record = await userModel.create({
      username: req.body.username,
      password: password,
    });
    const tokenTest = jwt.sign(
      { username: req.body.username, userId: record.dataValues.id },
      SECRET
    );
    record.dataValues["tokenTest"] = tokenTest;
    return record;
  } catch (e) {
    throw new Error("invalid signup");
  }
};

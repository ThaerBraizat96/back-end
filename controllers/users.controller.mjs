import { userModel } from "../models/index.mjs";

export const getAllUsers = async (req, res) => {
  const allRecords = await userModel.findAll({ raw: true });
  return allRecords;
};

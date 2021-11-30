import { userModel } from "../models/index.mjs";

export const getAllUsers = async (req, res) => {
  
    const id = parseInt(req.params.id);
    const allRecords = await userModel.findAll();
    res.json(allRecords);   
};



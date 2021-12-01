"use strict";
import express from "express";
import { signup } from "../controllers/signup.controller.mjs";
import { getAllUsers  } from "../controllers/users.controller.mjs";
import { signin } from "../controllers/signin.controller.mjs"

const router = express.Router();



router.get("/users",async (req, res) => {
      const allData = await getAllUsers();
      res.status(200).json(allData);
    
 });



router.post("/signup", async (req, res) => {
    try{
    const allData = await signup(req);
    res.status(200).json(allData);
    }catch{
    res.status(401).json("invalid signup")
    }
});



router.post("/login",async (req, res) => {
    try{
    const allData = await signin(req);
    res.status(200).json(allData);
    }catch{
    res.status(401).json("WORNG LOGIN!!!")
    }
});


export default router;















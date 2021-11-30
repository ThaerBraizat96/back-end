"use strict";
import express from "express";
import { signup } from "../controllers/signup.controller.mjs";
import { getAllUsers  } from "../controllers/users.controller.mjs";
import { signin } from "../controllers/signin.controller.mjs"

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/signup", signup);
router.post("/login",signin)

export default router;















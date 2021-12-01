"use strict";
import express from "express";
import {
  addPost,
  getAllPosts,
  getPostsByUserId,
  deletePost,
  updatePost,
} from "../controllers/posts.controller.mjs";
import { bearerAuth } from "../middleware/bearerAuth.mjs";

const router = express.Router();

router.post("/posts", bearerAuth,async (req, res) => {
  try {
    const allData = await addPost(req);
    res.status(200).json(allData);
  } catch {
    res.status(500).json("Cant add post");
  }
});

router.get("/posts", bearerAuth, async (req, res) => {
  
    const allData = await getAllPosts(req);
    res.status(200).json(allData);
 
});


router.get("/posts/:userId", bearerAuth, async (req, res) => {
    const allData = await getPostsByUserId(req);
    res.status(200).json(allData);
  
});

router.delete("/posts/:id", bearerAuth, async (req, res) => {
  try {
    const allData = await deletePost(req);
    res.status(200).json(allData);
  } catch {
    res.status(500).json("Cant delete");
  }
});

router.put("/posts/:id", bearerAuth , async (req, res) => {
  try {
    const allData = await updatePost(req);
    res.status(200).json(allData);
  } catch {
    res.status(500).json("Cant Update");
  }
});

export default router;

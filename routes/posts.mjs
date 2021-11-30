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

router.post("/posts", bearerAuth, addPost);
router.get("/posts", bearerAuth, getAllPosts);
router.get("/posts/:userId", bearerAuth, getPostsByUserId);
router.delete("/posts/:id", bearerAuth, deletePost);
router.put("/posts/:id", bearerAuth , updatePost);

export default router;

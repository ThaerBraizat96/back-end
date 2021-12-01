"use strict";
import express from "express";
import {
  addComment,
  getCommentsByPostId,
  getAllComments,
} from "../controllers/comments.controller.mjs";
import { bearerAuth } from "../middleware/bearerAuth.mjs";

const router = express.Router();
router.post("/comments/:postId", bearerAuth, async (req, res) => {
  try{
  const allData = await addComment(req);
  res.status(200).json(allData);
  }catch{
    res.status(500).json("Cant add comment");

  }
});
router.get("/comments/:postId", bearerAuth, async (req, res) => {
  try {
    const allData = await getCommentsByPostId(req);
    res.status(200).json(allData);
  } catch {
    res.status(500).json("cant get comments");
  }
});

router.get("/comments", bearerAuth, async (req, res) => {
  // try{
  const allData = await getAllComments();
  res.status(200).json(allData);
  // }catch{
  //   res.status(500).json(allData)
  // }
});

export default router;

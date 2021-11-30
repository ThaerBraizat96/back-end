"use strict";
import express from "express";
import {
    addComment,
    getCommentsByPostId,
    getAllComments,
  } from "../controllers/comments.controller.mjs";
import { bearerAuth } from "../middleware/bearerAuth.mjs";

const router = express.Router();
router.post("/comments/:postId", bearerAuth, addComment);
router.get("/comments/:postId", bearerAuth, getCommentsByPostId);
router.get("/comments", bearerAuth, getAllComments);


export default router;

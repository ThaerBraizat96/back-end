"use strict";
import express from "express";
import dotenv from "dotenv";
import postRoute from "./routes/posts.mjs";
import commentsRoute from "./routes/comments.mjs";
import userRoute from "./routes/user.mjs";

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json("Test WORKING FINE !!!! ");
});
app.use(postRoute);
app.use(commentsRoute);
app.use(userRoute);
app.listen(port)


export default app
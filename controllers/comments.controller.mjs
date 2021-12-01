import { commentsModel } from "../models/index.mjs";

export const addComment = async (req, res) => {
  // try {
    const postId = parseInt(req.params.postId);
    const comments = await commentsModel.create({
      name: req.body.name,
      email: req.body.email,
      body: req.body.body,
      postId: postId,
    });
  return(comments);
  // } catch {
  //  return("Cant add comment");
  // }
};

 export const getCommentsByPostId = async (req, res) => {
    const postId = parseInt(req.params.postId);
    const commentsByPostId = await commentsModel.findAll({
      where: { postId: postId },
    });
    return(commentsByPostId);
  };
export const getAllComments = async () => commentsModel.findAll();
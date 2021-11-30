import { postModel } from "../models/index.mjs";

export const addPost = async (req, res) => {
  try {
    const note = await postModel.create({
      body: req.body.body,
      title: req.body.title,
      userId: req.user.userId,
    });
    res.json(note);
  } catch {
    res.json("Cant add post");
  }
};

export const getAllPosts = async (req, res) => {
  const allData = await postModel.findAll();
  res.json(allData);
};

export const getPostsByUserId = async (req, res) => {
  const userId = req.params.userId;
  const notes = await postModel.findAll({ where: { userId: userId } });
  res.json(notes);
};

export const updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId  = req.user.userId;
  const updated = await postModel.update(
    {
      body: req.body.body,
      title: req.body.title,
      id: id,
      userId: userId,
    },
    {
      where: { id: id },
    }
  );
  if(updated[0]> 0){
  res.json("post updated !!");
  }else{
    res.json("cant find your post")
  }
 
};

export const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const valid = await postModel.findAll({ where: { id: id } });
  if (valid.length != 0) {
    await postModel.destroy({ where: { id: id } });
    res.json("post deleted !!");
  } else {
    res.json("Cant delete");
  }
};

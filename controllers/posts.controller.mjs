import { postModel } from "../models/index.mjs";

export const addPost = async (req, res) => {
    const note = await postModel.create({
      body: req.body.body,
      title: req.body.title,
      userId: req.user.userId,
    });
    return note;
};


export const getAllPosts = async (req, res) => {
  const allData = await postModel.findAll();
  return allData;
};

export const getPostsByUserId = async (req, res) => {
  const userId = req.params.userId;
  const notes = await postModel.findAll({ where: { userId: userId } });
  return notes
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
  return ("post updated !!");
  }else{
    throw new Error('failed')
  }
 
};

export const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const valid = await postModel.findOne({ where: { id: id } });
  if(!valid) throw new Error('failed')
  await postModel.destroy({ where: { id: id } });
  return "post deleted !!";
 
  
};

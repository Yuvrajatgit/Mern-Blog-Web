const fs = require('fs');
const Post = require('./../models/postModel');

exports.createPost = async (req,res,next) =>{
    try{
    const { title, summary, content, author } = req.body;
    const {originalname, path} = req.file; 
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;

    fs.renameSync(path, newPath);

    const newPost = await Post.create({
        title, summary, content, cover: newPath, author
    });

    res.status(201).json({
        status: 'success',
        message: 'Post created successfully',
        newPost
    });

    }catch(error){
        res.status(404).json({
            status: 'fail',
            error: error.message
            })
    }
};

exports.getAllPosts = async (req,res)=>{
   try{
     const posts = await Post.find().populate('author').sort({createdAt: -1}).limit(20);
     res.status(200).json({
        status: 'success',
        posts
     });

   }catch(error){
    res.status(500).json({
        status: 'fail',
        error: error.message
        })
   }
};

exports.getPostById = async (req,res)=>{
    try {
      const post = await Post.findById(req.params.postId).populate('author');
      if(!post){
        return res.status(404).json({
            status: 'fail',
            error: 'Post not found'
        })
       }   
      res.status(200).json({
        status: 'success',
        post})  
      }
    catch(error){
      res.status(500).json({
        status: 'fail',
        error: 'Internal Server Error'
      });
    }
};

exports.editPost = async (req, res) => {
  const { postId }= req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        error: 'Post Not Found'
      });
    }
    const userId = req.user.id.toString();

    if (!post?.author.equals(userId)) {
      return res.status(403).json({
        status: 'fail',
        error: 'Unauthorized'
      });
    }

    post.title = req.body.title || post.title;
    post.summary = req.body.summary || post.summary;
    post.content = req.body.content || post.content;

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;

      fs.renameSync(path, newPath);
      post.cover = newPath;
    }

    const updatedPost = await post.save();

    res.status(200).json({ status: 'success', message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

exports.deletePost = async(req, res)=>{
  const {postId} = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        error: 'Post Not Found'
      });
    }
    const userId = req.user.id.toString();
    if (!post?.author.equals(userId)) {
      return res.status(403).json({
        status: 'fail',
        error: 'Unauthorized'
      });
    }
    await post.deleteOne();
    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully',
    });
  } catch(error) {
    res.status(404).json({status: "fail", message: "Unable to delete post"});
  }
}
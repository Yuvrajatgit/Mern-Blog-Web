const express = require('express');
const multer = require('multer');
const authController = require('./../controllers/authController');
const postController = require('./../controllers/postController');
const postRouter = express.Router();

const upload = multer();

postRouter.post('/', upload.single('file'), postController.createPost);
postRouter.get('/', postController.getAllPosts);
postRouter.get('/:postId', postController.getPostById);
postRouter.put('/edit/:postId',authController.protect, postController.editPost);
postRouter.delete('/delete/:postId', authController.protect, postController.deletePost);

module.exports = postRouter;
const express = require('express');
const multer = require('multer');
const authController = require('./../controllers/authController');
const postController = require('./../controllers/postController');
const postRouter = express.Router();

const upload = multer({ dest: 'uploads/'});

postRouter.post('/', upload.single('file'), postController.createPost);
postRouter.get('/', postController.getAllPosts);
postRouter.get('/:postId', postController.getPostById);
postRouter.put('/edit/:postId',authController.protect,upload.single('file'), postController.editPost);
postRouter.delete('/delete/:postId', authController.protect, postController.deletePost);

module.exports = postRouter;
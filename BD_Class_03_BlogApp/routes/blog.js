const express = require('express');
const router = express.Router();

//import controller
const {createComment} = require('../controllers/comentController')
const {createPost, getAllPost}= require("../controllers/postController");
const {likePost,unlikePost}= require("../controllers/likeContrller");



// Define your routes here
router.post('/comment/create', createComment);
router.post('/post/create', createPost);
router.get('/post/get', getAllPost);
router.post('/likes/like' , likePost);
router.post('/likes/unlike' , unlikePost);

module.exports = router; // Make sure to export the router

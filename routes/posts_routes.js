const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  makePost,
  removePost,
  changePost,
  makeComment,
  userAuthenticated,
  verifyAdmin
} = require('../controllers/posts_controller');

// READ
// GET on '/posts'
// Returns all posts
router.get('/', getPosts);

// READ
// GET on '/posts/:id'
// Returns post with given id
router.get('/:id', getPost);

// For post, delete, put -require authenticated user
router.use(userAuthenticated);
// CREATE
// POST on '/posts'
// Creates a new post
router.post('/', verifyAdmin, makePost);

// CREATE
// POST on '/posts/comments/:postId'
// Adds a comment to a post with postId
router.post('/comments/:postId', makeComment);

// DELETE
// DELETE on '/posts/:id'
// Deletes a post with id
router.delete('/:id', verifyAdmin, removePost);

// UPDATE
// PUT on 'posts/:id'
// Updates a post with id
router.put('/:id', verifyAdmin, changePost);

module.exports = router;
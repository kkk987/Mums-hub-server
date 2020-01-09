const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  makePost,
  removePost,
  changePost,
  getComments,
  makeComment,
  removeComment,
  userAuthenticated,
  verifyAdmin,
  verifyOwner
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

// READ
// GET on '/posts/comments/:postId'
// Returns all of the comments for a post
// For now, requiring valid authenticated login to do this
router.get("/comments/:postId", getComments)

// CREATE
// POST on '/posts/comments/:postId'
// Adds a comment to a post with postId
router.post('/comments/:postId', makeComment);

// DELETE
// DELETE on '/posts/:id'
// Deletes a post with id
router.delete('/:id', verifyAdmin, removePost);

// DELETE
// DELETE on '/posts/:id'
// Deletes a post with id
router.delete("/comments/:id", verifyOwner, removeComment)

// UPDATE
// PUT on 'posts/:id'
// Updates a post with id
router.put('/:id', verifyAdmin, changePost);

module.exports = router;
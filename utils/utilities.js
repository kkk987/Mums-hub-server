const Post = require('../models/post');

// Exported functions

// get all posts
const getAllPosts = function (req) {
  return Post.find();
};

// get post by id
const getPostById = function (req) {
  return Post.findById(req.params.id);
};

// add post
const addPost = function (req) {
    let date = Date.now();
    req.body.create_date = date;
    req.body.modified_date = date;
    return new Post(req.body);
  };

// delete post
const deletePost = function (id) {
  return Post.findByIdAndRemove(id)
};

// update post
const updatePost = function (req) {
  req.body.modified_date = Date.now();
  return Post.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    {
      new: true
    }
  );
};

// Get all comments for a post
// returns a promise (because it is async)
const getAllComments = async function (req) {
  let post = await Post.findById(req.params.postId);

  return post.getAllComments();
};

// Add a comment to a post
// returns a promise (because it is async)
const addComment = async function (req) {
  let post = await Post.findById(req.params.postId);
  let date = Date.now()
  let newComment = {
      username: req.body.username,
      comment: req.body.comment,
      create_date: date,
      modified_date: date
  };
  post.comments.push(newComment);
  return Post.findByIdAndUpdate(req.params.postId, post, {
      new: true
  });
}

// update comment
const updateComment = async function (req) {
  let date = Date.now();
  console.log(`updated comment: ${req.body._id}`)
  return await Post.findOneAndUpdate({
      "_id": req.params.postId,
      "comments._id": req.body._id
  }, {
      $set: {
          'comments.$.comment': req.body.comment,
          'comments.$.modified_date': date          
      }
  }, {
      new: true
  });
};

// Deletes a comment from a post
// returns a promise (because it is async)
const deleteComment = async function (req) {
  return await Post.findOneAndUpdate({
      "comments._id": req.params.id
  }, {
      $pull: {
          comments: {
              _id: req.params.id
          }
      }
  }, {
      new: true
  });
};

// // These exported functions allow flexibility for testing
// const setDataFile = function (fileName) {
//   dataFile = fileName;
//   loadData();
// };

// const getDataFileRelativeToApp = function (file) {
//   // Remove the ../ from the dataFile path for writing
//   // because the writeFile looks for path relative to the app, not utilities.js
//   return file.substring(file.lastIndexOf('../') + 3, file.length);
// };

// // Local helper functions

// // Loads data from dataFile
// function loadData() {
//   blogPosts = require(dataFile);
// }


module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  deletePost,
  updatePost,
  getAllComments,
  addComment,
  updateComment,
  deleteComment
}
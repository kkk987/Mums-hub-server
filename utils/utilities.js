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

// These exported functions allow flexibility for testing
const setDataFile = function (fileName) {
  dataFile = fileName;
  loadData();
};

const getDataFileRelativeToApp = function (file) {
  // Remove the ../ from the dataFile path for writing
  // because the writeFile looks for path relative to the app, not utilities.js
  return file.substring(file.lastIndexOf('../') + 3, file.length);
};

// Local helper functions

// Loads data from dataFile
function loadData() {
  blogPosts = require(dataFile);
}


module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  deletePost,
  updatePost,
  setDataFile,
  getDataFileRelativeToApp
}
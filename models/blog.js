const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    snippet: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// this will create a collection 'blogs' in the database
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

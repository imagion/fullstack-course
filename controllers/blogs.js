const BlogsRouter = require('express').Router();
const Blog = require('../models/blog');

BlogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

BlogsRouter.post('/', (request, response) => {
  const body = new Blog(request.body);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = BlogsRouter;

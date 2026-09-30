const BlogsRouter = require('express').Router();
const Blog = require('../models/blog');

BlogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

BlogsRouter.post('/', (request, response) => {
  const body = new Blog(request.body);

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'The title or url is missing',
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
  });

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = BlogsRouter;

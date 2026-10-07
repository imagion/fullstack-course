const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/test_helper');
const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('testing blogs db', () => {
  const initialBlogs = [
    {
      title: 'React is fun',
      author: 'Jane Doe',
      url: 'https://example.com/react',
      likes: 10,
    },
    {
      title: 'Node is interesting',
      author: 'John Doe',
      url: 'https://example.com/node',
      likes: 7,
    },
  ];

  beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body[0];
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });

  test('successfully created a new blog post', async () => {
    const newBlog = {
      title: 'testing title',
      author: 'testing author',
      url: 'testing url',
      likes: 9,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, initialBlogs.length + 1);
  });

  test('likes defaults to 0 if missing', async () => {
    const newBlog = {
      title: 'testing title',
      author: 'testing author',
      url: 'testing url',
    };

    const response = await api.post('/api/blogs').send(newBlog).expect(201);

    assert.strictEqual(response.body.likes, 0);
  });

  test('400 if title or url are missing', async () => {
    await api.post('/api/blogs').send({ author: 'author' }).expect(400);
  });

  test('successfully created a new blog post', async () => {
    const newBlog = {
      title: 'testing title',
      author: 'testing author',
      url: 'testing url',
      likes: 9,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

after(async () => {
  await mongoose.connection.close();
});

const { test, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, 3);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const title = response.body.map((e) => e.title);
  assert.strictEqual(title.includes('new title'), true);
});

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];
  assert.ok(blog.id);
});

after(async () => {
  await mongoose.connection.close();
});

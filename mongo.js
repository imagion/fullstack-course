const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@cluster0.22egrmr.mongodb.net/?appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url, { family: 4 });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const blog = new Blog({
  title: 'new title',
  author: 'unknown',
  url: 'new url',
  likes: 8,
});

blog.save().then((result) => {
  console.log('blog saved!');
  mongoose.connection.close();
});

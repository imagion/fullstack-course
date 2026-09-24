const dummy = (blogs) => {
  Array.isArray(blogs) ? 1 : typeof blogs;
};

const totalLikes = (blogs) => {
  let likes = [];

  blogs.forEach((blog) => {
    likes.push(blog.likes);
  });

  return likes.reduce((acc, red) => acc + red, 0);
};

module.exports = {
  dummy,
  totalLikes,
};

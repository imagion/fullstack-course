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

const favourite = (blogs) => {
  return blogs.reduce((acc, red) => {
    return acc.likes >= red.likes ? acc : red;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favourite,
};

const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    return 1;
  } else {
    return typeof blogs;
  }
};

module.exports = {
  dummy,
};

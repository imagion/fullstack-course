import Blog from './Blog';

const BlogsList = ({ blogs, blogService }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} blogService={blogService} />
        ))}
    </div>
  );
};

export default BlogsList;

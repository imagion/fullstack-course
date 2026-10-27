import { Link } from 'react-router-dom';

const BlogsList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogsList;

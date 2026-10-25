import { Link } from 'react-router-dom';
import Blog from './Blog';

const BlogsList = ({ blogs, blogService }) => {
  return (
    <ul>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
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

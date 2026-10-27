import { useParams, useNavigate } from 'react-router-dom';

const Blog = ({ blogs, blogsLoaded, onLike, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((blog) => blog.id === id);

  if (!blogsLoaded) {
    return <p>Loading blog...</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  const handleLike = () => {
    onLike(blog.id);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );

    if (!confirmed) return;

    await onDelete(blog.id);
    navigate('/');
  };

  return (
    <div className='blog'>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <a href={blog.url}>{blog.url}</a>
      <p>likes: {blog.likes}</p>
      <button onClick={handleLike}>like</button>
      <p>{blog.user.name}</p>
      <button onClick={handleDelete}>remove</button>
    </div>
  );
};

export default Blog;

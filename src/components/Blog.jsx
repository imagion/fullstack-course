import { useState } from 'react';

const Blog = ({ blog, blogService }) => {
  const [isHidden, setIsHidden] = useState(true);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? 'view' : 'hide'}
        </button>
      </div>
      {!isHidden && (
        <div>
          {blog.url}
          <br />
          likes: {blog.likes} <button onClick={handleLike}>like</button>
          <br />
          {blog.user.name}
          <br />
          <button onClick={handleDelete}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;

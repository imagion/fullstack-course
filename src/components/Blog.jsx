import { useState } from 'react';

const Blog = ({ blog }) => {
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
        {blog.title}
        <button onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? 'view' : 'hide'}
        </button>
      </div>
      {!isHidden && (
        <div>
          {blog.url}
          <br />
          likes: {blog.likes}
          <br />
          {blog.author}
        </div>
      )}
    </div>
  );
};

export default Blog;

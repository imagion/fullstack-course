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

  const handleLike = () => {
    console.log('blog id:', blog.id);
    console.log('user id:', blog.user.id);
    console.log('likes:', blog.likes);
    blogService.update(`${blog.id}`, { ...blog, likes: blog.likes + 1 });
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
        </div>
      )}
    </div>
  );
};

export default Blog;

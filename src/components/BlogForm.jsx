import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogForm = ({ blogService, blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const addBlog = (e) => {
    e.preventDefault();

    // setNotification(`A new blog: ${title} by ${author} added`);
    // setTimeout(() => {
    //   setNotification(null);
    // }, 5000);

    blogService.create({ title, author, url }).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });

    navigate('/');
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>
            title:
            <input
              type='text'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <div>
          <button>create</button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;

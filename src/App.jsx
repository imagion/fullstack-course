import { useEffect, useState } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';
import { Error, Notification } from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  // const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((bloinitialBlogs) => setBlogs(bloinitialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch {
      setError('Wrong credentials');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
  };

  const addBlog = (e) => {
    e.preventDefault();

    setNotification(`A new blog: ${title} by ${author} added`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
    blogService.create({ title, author, url });
  };

  if (user === null) {
    return (
      <div>
        <Error error={error} />

        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type='text'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button>login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification notification={notification} />

      <div>
        Hello, {user.name}! <button onClick={handleLogout}>Logout</button>
      </div>

      <Togglable buttonLabel='create new blog'>
        <BlogForm
          addBlog={addBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

import { useEffect, useState } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      localStorage.setItem('loggedUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');

      console.log('Login: ', username, password);
      console.log('Login: ', user);
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

  if (user === null) {
    return (
      <div>
        <div error={error} />

        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button>login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>Hello, {user.name}!</div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

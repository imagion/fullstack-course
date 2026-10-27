import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import blogService from './services/blogs';
import loginService from './services/login';
import { Error, Notification } from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import BlogsList from './components/BlogsList';
import Home from './components/Home';
import Login from './components/Login';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [blogsLoaded, setBlogsLoaded] = useState(false);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
      setBlogsLoaded(true);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
  };

  const deleteBlog = async (id) => {
    await blogService.remove(id);
    setBlogs((previousBlogs) => previousBlogs.filter((blog) => blog.id !== id));
  };

  const likeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);

    if (!blog) return;

    const updatedBlog = await blogService.update(id, {
      ...blog,
      likes: blog.likes + 1,
    });

    setBlogs((previousBlogs) =>
      previousBlogs.map((item) => (item.id === id ? updatedBlog : item)),
    );
  };

  return (
    <Router>
      <div>
        <Link style={{ padding: '5px' }} to='/'>
          home
        </Link>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link style={{ padding: '5px' }} to='/login'>
            login
          </Link>
        )}
      </div>
      <Routes>
        <Route
          path='/blogs/:id'
          element={
            <Blog
              blogs={blogs}
              blogsLoaded={blogsLoaded}
              onLike={likeBlog}
              onDelete={deleteBlog}
            />
          }
        />
        <Route
          path='/login'
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path='/' element={<Home blogs={blogs} />} />
      </Routes>
    </Router>
  );
};

export default App;

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import blogService from './services/blogs';
import Home from './components/Home';
import Login from './components/Login';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import { Notification } from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [blogsLoaded, setBlogsLoaded] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => {
        setBlogs(initialBlogs);
        setBlogsLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to load blogs:', error);
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

  const showNotification = (text, type = 'success') => {
    setNotification({ text, type });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    blogService.setToken(null);
    setUser(null);
  };

  const deleteBlog = async (id) => {
    await blogService.remove(id);

    setBlogs((previousBlogs) => previousBlogs.filter((blog) => blog.id !== id));

    showNotification('Blog deleted', 'success');
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
      <AppBar position='static'>
        <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Bloglist
          </Typography>

          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>

          {user ? (
            <>
              <Button color='inherit' component={Link} to='/create'>
                New blog
              </Button>

              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth='md'>
        <Box sx={{ mt: 3 }}>
          <Notification notification={notification} />

          <Routes>
            <Route
              path='/'
              element={
                <Home
                  blogs={blogs}
                  blogsLoaded={blogsLoaded}
                  user={user}
                  blogService={blogService}
                  setBlogs={setBlogs}
                  showNotification={showNotification}
                />
              }
            />

            <Route path='/login' element={<Login setUser={setUser} />} />

            <Route
              path='/create'
              element={
                <BlogForm blogService={blogService} setBlogs={setBlogs} />
              }
            />

            <Route
              path='/blogs/:id'
              element={
                <Blog
                  blogs={blogs}
                  blogsLoaded={blogsLoaded}
                  user={user}
                  onLike={likeBlog}
                  onDelete={deleteBlog}
                />
              }
            />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;

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

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
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

  const handleLike = () => {
    blogService.update(`${blog.id}`, { ...blog, likes: blog.likes + 1 });
  };

  const handleDelete = () => {
    const confirmMessage = `Remove blog ${blog.title} by ${blog.author}`;
    if (confirm(confirmMessage)) {
      blogService.remove(blog.id);
    }
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
          element={<Blog blogs={blogs} blogService={blogService} />}
        />
        <Route
          path='/login'
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path='/' element={<Home blogs={blogs} />} />
      </Routes>
    </Router>
  );

  // if (user === null) {
  //   return (
  //     <div>
  //       <Error error={error} />

  //       <h2>Log in to application</h2>
  //       <form onSubmit={handleLogin}>
  //         <div>
  //           <label>
  //             username
  //             <input
  //               type='text'
  //               value={username}
  //               onChange={({ target }) => setUsername(target.value)}
  //             />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             password
  //             <input
  //               type='password'
  //               value={password}
  //               onChange={({ target }) => setPassword(target.value)}
  //             />
  //           </label>
  //         </div>
  //         <button>login</button>
  //       </form>
  //     </div>
  //   );
  // }

  // return (
  //   <>
  //     {blogs && (
  //       <div>
  //         <h2>Blogs</h2>
  //         <Notification notification={notification} />
  //         <div>
  //           Hello, {user.name}! <button onClick={handleLogout}>Logout</button>
  //         </div>
  //         <Togglable buttonLabel='create new blog'>
  //           <BlogForm
  //             blogService={blogService}
  //             setNotification={setNotification}
  //             blogs={blogs}
  //             setBlogs={setBlogs}
  //           />
  //         </Togglable>
  //         <BlogsList blogs={blogs} blogService={blogService} />
  //       </div>
  //     )}
  //   </>
  // );
};

export default App;

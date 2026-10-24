import { useState } from 'react';
import blogService from '../services/blogs';
import BlogsList from './BlogsList';

const Home = ({ blogs }) => {
  const [notification, setNotification] = useState(null);

  return (
    <>
      {blogs && (
        <div>
          <h2>Blogs</h2>
          {/* <Notification notification={notification} /> */}

          {/* <Togglable buttonLabel='create new blog'>
            <BlogForm
              blogService={blogService}
              setNotification={setNotification}
              blogs={blogs}
              setBlogs={setBlogs}
            />
          </Togglable> */}
          <BlogsList blogs={blogs} blogService={blogService} />
        </div>
      )}
    </>
  );
};

export default Home;

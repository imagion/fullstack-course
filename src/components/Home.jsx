import { Typography } from '@mui/material';
import BlogsList from './BlogsList';

const Home = ({ blogs }) => {
  return (
    <>
      {blogs && (
        <div>
          <Typography variant='h5' component='h2' sx={{ mb: 2 }}>
            Blogs
          </Typography>

          <BlogsList blogs={blogs} />
        </div>
      )}
    </>
  );
};

export default Home;

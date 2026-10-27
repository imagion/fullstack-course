import BlogsList from './BlogsList';

const Home = ({ blogs }) => {
  return (
    <>
      {blogs && (
        <div>
          <h2>Blogs</h2>

          <BlogsList blogs={blogs} />
        </div>
      )}
    </>
  );
};

export default Home;

const BlogForm = ({
  addBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
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

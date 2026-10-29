import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const BlogForm = ({ blogService, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const addBlog = async (e) => {
    e.preventDefault();

    try {
      const returnedBlog = await blogService.create({
        title,
        author,
        url,
      });

      setBlogs((previousBlogs) => previousBlogs.concat(returnedBlog));

      navigate('/');

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mt: 3 }}>
      <Typography variant='h5' component='h2' sx={{ mb: 2 }}>
        Create a new blog
      </Typography>

      <Box
        component='form'
        onSubmit={addBlog}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
          fullWidth
        />

        <TextField
          label='Author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          required
          fullWidth
        />

        <TextField
          label='URL'
          type='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          required
          fullWidth
        />

        <Button type='submit' variant='contained'>
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default BlogForm;

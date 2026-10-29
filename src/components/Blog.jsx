import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Button,
  Stack,
  Link as MuiLink,
} from '@mui/material';

const Blog = ({ blogs, blogsLoaded, user, onLike, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((blog) => blog.id === id);

  if (!blogsLoaded) {
    return <p>Loading blog...</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );

    if (!confirmed) return;

    try {
      await onDelete(blog.id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const isOwner = user.username === blog.user.username;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant='h4' component='h2' gutterBottom>
        {blog.title}
      </Typography>

      <Typography variant='subtitle1' color='text.secondary' gutterBottom>
        by {blog.author}
      </Typography>

      <Typography sx={{ mb: 2 }}>
        <MuiLink href={blog.url} target='_blank' rel='noreferrer'>
          {blog.url}
        </MuiLink>
      </Typography>

      <Stack direction='row' alignItems='center' spacing={2} sx={{ mb: 2 }}>
        <Typography>Likes: {blog.likes}</Typography>

        <Button variant='contained' onClick={() => onLike(blog.id)}>
          Like
        </Button>
      </Stack>

      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        Added by: {blog.user?.name ?? 'Unknown user'}
      </Typography>

      {isOwner && (
        <Button variant='outlined' color='error' onClick={handleDelete}>
          Remove
        </Button>
      )}
    </Paper>
  );
};

export default Blog;

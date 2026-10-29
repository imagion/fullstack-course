import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';

const BlogsList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <Paper sx={{ mt: 2 }}>
      <List disablePadding>
        {sortedBlogs.map((blog) => (
          <ListItem key={blog.id} disablePadding divider>
            <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
              <ListItemText primary={blog.title} secondary={blog.author} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default BlogsList;

import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { Error } from './Notification';
import { Box, Button, TextField, Typography } from '@mui/material';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch {
      setError('Wrong credentials');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mt: 4 }}>
      <Error error={error} />

      <Typography variant='h5' component='h2' sx={{ mb: 2 }}>
        Log in to application
      </Typography>

      <Box
        component='form'
        onSubmit={handleLogin}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label='Username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          fullWidth
        />

        <TextField
          label='Password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          fullWidth
        />

        <Button type='submit' variant='contained'>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

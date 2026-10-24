import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { Error } from './Notification';

const Login = (user, setUser) => {
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
    <div>
      <Error error={error} />

      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button>login</button>
      </form>
    </div>
  );
};

export default Login;

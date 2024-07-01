import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://webservice-cash-control-server.vercel.app/login', {
        usernameEmail: username,
        password: password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/wallets');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username | Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <h5>don't have an account ?<a href="Signup.jsx"> sign up here</a></h5>
    </div>
  );
};

export default Login;

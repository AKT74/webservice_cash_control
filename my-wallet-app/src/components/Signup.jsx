import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../styles/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://webservice-cash-control-server.vercel.app/registration', {
        user_name: username,
        email: email,
        password: password,
      });
      console.log(response.data);
      // Optionally, you can redirect the user to the login page or display a success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
      <h5>have an account ?<Link to="/"> Log in here</Link></h5>

    </div>
  );
};

export default Signup;

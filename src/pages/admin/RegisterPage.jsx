import { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER'); // Default role
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        username,
        email,
        password,
        role
      });
      console.log('User registered:', response.data);
      // Redirect or show a success message
      window.location.href = '/';
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="main-div">
      <div className="title">
        <h2>Create an Account</h2>
      </div>
      <hr />
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <select 
            id="role"
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="AUTHOR">Author</option>
          </select>
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;

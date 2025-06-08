import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To store error messages
  const [loading, setLoading] = useState(false); // To show loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state when starting login
    setError(null);    // Clear any previous errors
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, { email, password });
      console.log(response.data);
      const { token, role } = response.data;
      localStorage.setItem('token', token); // Store token on successful login
      localStorage.setItem('role', role); // Store the role
      // Check if role is passed correctly
    console.log('User role:', role);
      if (role === 'AUTHOR') {
        navigate('/dashboard'); // Redirect to admin dashboard
      } else {
        navigate('/posts'); // Redirect to post list for normal users
      }
    } catch (error) {
      setLoading(false);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='main-div'>
      <div className='title'>
        <h2>Welcome Back</h2>
      </div>
      <hr />
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;

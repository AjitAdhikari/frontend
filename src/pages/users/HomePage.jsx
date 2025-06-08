import { Link } from 'react-router-dom';
import '../styles/homePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to NikitaBlogs</h1>
        <p>Join our community of developers sharing knowledge and experiences. Sign in to start reading or create your own stories.</p>
        <div className="home-buttons">
          <Link to="/loginPage">
            <button className="login-button">Sign In</button>
          </Link>
          <Link to="/register">
            <button className="register-button">Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

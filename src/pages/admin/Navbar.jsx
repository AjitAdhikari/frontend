import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BiHomeAlt, BiLogOut, BiMenu } from 'react-icons/bi';
import { MdOutlineDashboard } from 'react-icons/md';
import { PiSquaresFour } from 'react-icons/pi';
import { useState } from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect to login page
    navigate('/');
  };

  // Array of routes where Navbar should be hidden
  const hiddenRoutes = ['/', '/loginPage', '/register'];

  // Check if current route is in the hiddenRoutes array
  const shouldHideNavbar = hiddenRoutes.includes(location.pathname);

  // If shouldHideNavbar is true, return null (don't render the navbar)
  if (shouldHideNavbar) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/posts" className="logo-text">
          <PiSquaresFour size={30} />
          <span>NikitaBlogs</span>
        </Link>
      </div>
      <button className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <BiMenu size={24} />
      </button>
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/posts" className="nav-link">
            <BiHomeAlt size={20} />
            <span>Blog</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="nav-link">
            <MdOutlineDashboard size={20} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="nav-link logout-button">
            <BiLogOut size={20} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section social-section">
          <div className="social-links">
            <a href="https://github.com/NikitaGhimire" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/nikita-ghimire-info" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://nikita.info.np" target="_blank" rel="noopener noreferrer">
              <CgWebsite />
            </a>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} My Blog by Nikita. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

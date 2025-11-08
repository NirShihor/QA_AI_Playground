import { Link, useLocation } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = () => {
  const location = useLocation();

  return (
    <nav className="menuBar">
      <div className="menuBarContainer">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/page1" className={location.pathname === '/page1' ? 'active' : ''}>
          Page 1
        </Link>
        <Link to="/page2" className={location.pathname === '/page2' ? 'active' : ''}>
          Page 2
        </Link>
        <Link to="/page3" className={location.pathname === '/page3' ? 'active' : ''}>
          Page 3
        </Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
          About Us
        </Link>
      </div>
    </nav>
  );
};

export default MenuBar;


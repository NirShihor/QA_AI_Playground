import { Link, useLocation } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = () => {
  const location = useLocation();

  return (
    <nav className="menuBar">
      <div className="menuBarContainer">
        <Link to="/page1" className={location.pathname === '/page1' || location.pathname === '/' ? 'active' : ''}>
          Page 1
        </Link>
        <Link to="/page2" className={location.pathname === '/page2' ? 'active' : ''}>
          Page 2
        </Link>
        <Link to="/page3" className={location.pathname === '/page3' ? 'active' : ''}>
          Page 3
        </Link>
      </div>
    </nav>
  );
};

export default MenuBar;


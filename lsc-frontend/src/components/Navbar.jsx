import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/collection">Collection</Link>
      <Link to="/missing-parts">Missing Parts</Link>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Smart Business</div>

      <ul>
        <li>
          <a href="#">Home</a>
        </li>

        <li>
          <a href="#">Features</a>
        </li>

        <li>
          <a href="#">About</a>
        </li>

        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      <Link className="login-btn" to="/login">
        Admin Login
      </Link>
    </nav>
  );
}

export default Navbar;

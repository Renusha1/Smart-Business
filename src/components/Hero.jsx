import { Link } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Smart Business Management System</h1>

        <p>
          A cloud-based solution to manage retailers, users, inventory, sales
          and reports in one place.
        </p>

        <div className="hero-buttons">
          <Link to="/login">Admin Login</Link>

          <Link to="/retailer-register">Retailer Register</Link>

          <Link to="/user-register">User Register</Link>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
          alt="Business"
        />
      </div>
    </section>
  );
}

export default Hero;

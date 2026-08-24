import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Smart Business</h2>
          <p>
            A modern business management system that helps retailers,
            administrators, and users manage products, sales, inventory, and
            reports efficiently.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📍 Kathmandu, Nepal</p>
          <p>📞 +977-9800000000</p>
          <p>✉ smartbusiness@gmail.com</p>
        </div>
      </div>

      <hr />

      <p className="copyright">
        © 2026 Smart Business Management System. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;

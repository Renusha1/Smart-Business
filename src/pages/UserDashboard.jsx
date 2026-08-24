import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Dashboard.css"; // We will create this stylesheet next

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Get the token from localStorage
    const token = localStorage.getItem("token");

    // 2. If no token exists, boot the user back to the login page
    if (!token) {
      alert("Unauthorized access! Please log in first.");
      navigate("/");
      return;
    }

    try {
      // 3. Optional: Decode token payload to display user data locally
      // Since JWT payload is Base64 encoded, we can parse it without an extra library
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );

      const decodedUserData = JSON.parse(jsonPayload);
      setUser(decodedUserData);
    } catch (error) {
      console.error("Failed to parse token:", error);
      // If token is corrupted or invalid, clear it and redirect
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear token and clear out memory session
    localStorage.removeItem("token");
    alert("Logged out successfully.");
    navigate("/"); // Redirect back to AuthPage
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>Smart Business</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="active">
            <Link to="/user-dashboard">📊 Overview</Link>
          </li>

          <li>
            <Link to="/profile">💼 My Profile</Link>
          </li>

          <li>
            <Link to="/analytics">📈 Analytics</Link>
          </li>

          <li>
            <Link to="/shop">🛒 Shop Products</Link>
          </li>

          <li>
            <Link to="/cart">🛍 My Cart</Link>
          </li>

          <li>
            <Link to="/orders">📦 My Orders</Link>
          </li>

          <li>
            <Link to="/settings">⚙️ Settings</Link>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="content-header">
          <h1>User Dashboard</h1>
          {user && (
            <div className="user-badge">
              Welcome back, <strong>User #{user.id}</strong> ({user.role})
            </div>
          )}
        </header>

        <hr />

        {/* Dummy Metrics / Widgets */}
        <section className="dashboard-widgets">
          <div className="widget-card">
            <h3>Recent Activities</h3>
            <p className="widget-value">12 Active</p>
          </div>
          <div className="widget-card">
            <h3>System Status</h3>
            <p className="widget-value status-good">Optimal</p>
          </div>
          <div className="widget-card">
            <h3>Notifications</h3>
            <p className="widget-value">3 New</p>
          </div>
        </section>

        {/* Content Placeholder */}
        <section className="dashboard-body">
          <div className="content-card">
            <h3>Welcome to your Workspace</h3>
            <p>
              This dashboard path is fully protected. If you attempt to access
              this URL directly without logging in or providing a valid security
              token, the application will automatically kick you back to the
              authorization portal.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;

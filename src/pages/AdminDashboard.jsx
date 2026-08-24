import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Smart Business</h2>

        <ul>
          <li>
            <Link to="/admin-dashboard">🏠 Dashboard</Link>
          </li>
          <li>
            <Link to="/users" className="btn btn-success">
    Add User
</Link>
          </li>
          
          <li>
            <Link to="/retailers">🏪 Retailers</Link>
          </li>
          <li>
            <Link to="/products">📦 Products</Link>
          </li>
          <li>
            <Link to="/inventory">📋 Inventory</Link>
          </li>
          <li>
            <Link to="/sales">💰 Sales</Link>
          </li>
          <li>
            <Link to="/reports">📊 Reports</Link>
          </li>
          <li>
            <Link to="/settings">⚙ Settings</Link>
          </li>
          <li>
            <Link to="/login">🚪 Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Admin Dashboard</h1>
          <p>Welcome, Admin 👋</p>
        </div>

        <div className="cards">
          <div className="card">
            <h2>120</h2>
            <p>Total Users</p>
          </div>

          <div className="card">
            <h2>45</h2>
            <p>Total Retailers</p>
          </div>

          <div className="card">
            <h2>320</h2>
            <p>Total Products</p>
          </div>

          <div className="card">
            <h2>Rs. 8,50,000</h2>
            <p>Total Sales</p>
          </div>
        </div>

        <div className="recent">
          <h2>Recent Activity</h2>

          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Ram</td>
                <td>Added Product</td>
                <td>Today</td>
              </tr>

              <tr>
                <td>Sita</td>
                <td>Completed Sale</td>
                <td>Today</td>
              </tr>

              <tr>
                <td>Hari</td>
                <td>Registered Retailer</td>
                <td>Yesterday</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

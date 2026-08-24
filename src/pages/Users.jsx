import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null); // Track which user is being edited

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // ================= LOAD USERS =================

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= INPUT =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD / UPDATE USER =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Update existing user
        const res = await axios.put(
          `http://localhost:5000/users/${editId}`,
          formData,
        );
        alert(res.data.message || "User updated successfully");
        setEditId(null);
      } else {
        // Register new user
        const res = await axios.post(
          "http://localhost:5000/register",
          formData,
        );
        alert(res.data.message || "Registration Successful");
      }

      // Reset Form State
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      fetchUsers();
    } catch (err) {
      console.log(err);
      alert(editId ? "Update Failed" : "Registration Failed");
    }
  };

  // ================= EDIT OPTION =================

  const handleEditClick = (user) => {
    setEditId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // Leave blank or fill if backend provides it
      role: user.role,
    });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  // ================= DELETE OPTION =================

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await axios.delete(`http://localhost:5000/users/${id}`);
        alert(res.data.message || "User deleted successfully");
        fetchUsers();
      } catch (err) {
        console.log(err);
        alert("Delete Failed");
      }
    }
  };

  // ================= SEARCH (LINEAR SEARCH) =================

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="users-container">
      {/* ================= ADD / EDIT USER FORM ================= */}

      <div className="users-card">
        <h2>{editId ? "Edit User" : "Add New User"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              {editId ? "Password (Leave blank if unchanged)" : "Password"}
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required={!editId} // Password optional during editing
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="retailer">Retailer</option>
            </select>
          </div>

          <button className="btn-save">
            {editId ? "Update User" : "Add User"}
          </button>
          {editId && (
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancelEdit}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* ================= USER LIST ================= */}

      <div className="users-card">
        <h2>Registered Users</h2>

        <input
          type="text"
          placeholder="Search by Name or Email..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(user)}
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No User Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function AuthPage() {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Register
  const [role, setRole] = useState("user"); // Toggle between user and admin (only matters for login)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      // ================= LOGIN LOGIC =================
      if (role === "admin") {
        // Temporary Admin Login
        if (
          formData.email === "admin@gmail.com" &&
          formData.password === "admin123"
        ) {
          alert("Admin Login Successful!");
          navigate("/admin-dashboard");
        } else {
          alert("Invalid Admin Email or Password");
        }
      } else {
        // User Login via Backend API
        try {
          const res = await axios.post("http://localhost:5000/login", {
            email: formData.email,
            password: formData.password,
          });
          alert(res.data.message || "User Login Successful!");

          // Save token or user details if your backend returns them
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
          }

          // ====================================================
          // FIXED: Changed from "/UserRegister" to "/user-dashboard"
          // ====================================================
          navigate("/UserDashboard");
        } catch (err) {
          console.error(err);
          const errorMessage = err.response?.data?.message || "";

          // Check if user is not found (Matches 404 status or specific error messages)
          if (
            err.response?.status === 404 ||
            errorMessage.toLowerCase().includes("not found")
          ) {
            alert("User not found. Redirecting to registration page...");
            setIsLoginMode(false); // Switch to Register Mode
          } else {
            alert(errorMessage || "User Login Failed");
          }
        }
      }
    } else {
      // ================= REGISTRATION LOGIC =================
      try {
        const res = await axios.post("http://localhost:5000/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "user", // Hardcoded as user for public signup
        });

        alert(res.data.message || "Registration Successful! Please Log In.");
        setIsLoginMode(true); // Switch back to login view after successful signup
        setRole("user");
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Registration Failed");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>
          {isLoginMode
            ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login`
            : "User Registration"}
        </h1>

        {/* Role Selection Tabs (Only show during Login Mode) */}
        {isLoginMode && (
          <div
            className="role-tabs"
            style={{ display: "flex", marginBottom: "20px", gap: "10px" }}
          >
            <button
              type="button"
              className={`tab-btn ${role === "user" ? "active" : ""}`}
              onClick={() => setRole("user")}
              style={{
                flex: 1,
                padding: "8px",
                fontWeight: role === "user" ? "bold" : "normal",
              }}
            >
              User Login
            </button>
            <button
              type="button"
              className={`tab-btn ${role === "admin" ? "active" : ""}`}
              onClick={() => setRole("admin")}
              style={{
                flex: 1,
                padding: "8px",
                fontWeight: role === "admin" ? "bold" : "normal",
              }}
            >
              Admin Login
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Show Name Field only during Registration */}
          {!isLoginMode && (
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">{isLoginMode ? "Login" : "Register"}</button>
        </form>

        {/* Toggle between Login and Register links */}
        <div
          className="toggle-mode"
          style={{ marginTop: "15px", textAlign: "center" }}
        >
          {isLoginMode ? (
            <p>
              Don't have an account?{" "}
              <span
                style={{
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setIsLoginMode(false)}
              >
                Register here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                style={{
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setIsLoginMode(true)}
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

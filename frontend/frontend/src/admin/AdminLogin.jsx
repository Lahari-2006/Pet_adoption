import { useState } from 'react';
import './admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');
    setLoading(true);

    if (!config.url) {
      setError("Backend URL is not defined in config.js");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending login request:", formData);
      const response = await axios.post(`${config.url}/admin/checkadminlogin`, formData);

      console.log("Backend response:", response);

      if (response.status === 200 && response.data) {
        setMessage("Login successful!");
        setIsAdminLoggedIn(true);
        navigate("/adminhome");
      } else {
        setError("Login failed. Check credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.data) {
        setError(error.response.data.message || "Invalid username or password");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="kingu-gif-section">
        <img src="kingu.gif" alt="Kingu" />
      </div>

      <div className="form-section">
        <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Admin Login</h3>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        {loading && <p style={{ color: "blue" }}>Logging in...</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

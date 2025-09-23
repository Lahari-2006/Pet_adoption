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

    try {
      const response = await axios.post(`${config.url}/admin/checkadminlogin`, formData);

      if (response.status === 200 && response.data) {
        // Set login state to true in context (also persisted in localStorage)
        setIsAdminLoggedIn(true);
        navigate("/adminhome"); // redirect to admin dashboard
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data); // show backend error (401 or 500)
      } else {
        setError("An unexpected error occurred.");
      }
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

          <button type="submit" className="button">Login</button>
        </form>
      </div>
    </div>
  );
}

import React from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/Login/Customer');
  };

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About the Pet Adoption Platform</h1>
        <p>
          Welcome to a heartfelt initiative aimed at bridging the gap between compassionate humans and
          animals longing for a loving home.
        </p>
      </div>

      <div className="mission-section">
        <h2>🌟 Our Mission</h2>
        <p>
          We believe every pet deserves a safe, loving environment. Our mission is to revolutionize pet
          adoption by making it seamless, transparent, and accessible for all.
        </p>
      </div>

      <div className="feature-section">
        <h2>🔍 Key Features</h2>
        <ul>
          <li>✔️ Easy browsing and searching of adoptable pets</li>
          <li>✔️ Separate dashboards for Admins, Pet Managers, and Customers</li>
          <li>✔️ Real-time updates on bookings and pet availability</li>
          <li>✔️ Profile management for adopters and pet caretakers</li>
        </ul>
      </div>

      <div className="impact-section">
        <h2>🐾 Making an Impact</h2>
        <p>
          With every successful adoption, we bring joy to both pets and their new families. Your
          participation supports rescue shelters and contributes to a greater cause.
        </p>
      </div>

      <div className="about-image">
        <img
          src="cat.jpeg"
          alt="Cute pet"
          className="react-icon"
        />
      </div>

      <div className="about-footer">
        <p>Join us in our mission to make pet adoption accessible and heartwarming for everyone.</p>
        <button className="explore-btn" onClick={handleExploreClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}

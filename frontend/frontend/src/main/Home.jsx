import React, { useState, useEffect } from 'react';
import './home.css';

export default function Home() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(true); // Preloader state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  const responses = {
    "hi": "hi",
    "how to adopt a pet": "To adopt a pet, you need to register and log in as a customer, then book your preferred pet.",
    "what are the available pets": "Visit the 'View Pets' section under the Pet Manager or Customer panel to see available pets.",
    "how can i contact a pet manager": "After logging in, use the booking or profile section to reach out to pet managers.",
    "can i cancel my booking": "Yes, you can view and manage your bookings in the 'View Booked Pets' section.",
    "what is the adoption process": "Register as a customer, login, choose your pet, book it, and wait for approval from the pet manager."
  };

  const getBotResponse = (input) => {
    const lowerCaseInput = input.toLowerCase().trim();
    return responses[lowerCaseInput] || "Hello, Welcome to pet Adoption, How can I help you?";
  };

  const handleSend = () => {
    if (userInput.trim() === '') return;
    const answer = getBotResponse(userInput);
    setChat(prev => [...prev, { question: userInput, answer }]);
    setUserInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {loading && (
        <div id="preloader">
          <img src="do.png" alt="Loading..." />
        </div>
      )}

      {!loading && (
        <div className="home-container">
          {/* Welcome Message */}
          <div className="welcome-message">
            Welcome to the <span className="highlight">Pet Adoption Platform</span>!
          </div>

          {/* Admin Section */}
          <div className="admin-section category-box">
            <div className="category-content">
              <img src="dog2.jpeg" alt="Admin" />
              <div>
                <h3>Admin</h3>
                <ul>
                  <li><span className="highlight">Admin Login</span></li>
                  <li><span className="highlight">Add Pet Manager</span></li>
                  <li>View/Delete Pet Managers</li>
                  <li><span className="highlight">View Customers</span></li>
                  <li>Delete/Block Customer</li>
                  <li><span className="highlight">View All Pets</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pet Manager Section */}
          <div className="manager-section category-box">
            <div className="category-content">
              <img src="https://cdn-icons-png.flaticon.com/512/219/219986.png" alt="Pet Manager" />
              <div>
                <h3>Pet Manager</h3>
                <ul>
                  <li><span className="highlight">Pet Manager Login</span></li>
                  <li>View/Update Profile</li>
                  <li><span className="highlight">Add New Pet</span></li>
                  <li>View Pets</li>
                  <li><span className="highlight">View Bookings</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Customer Section */}
          <div className="customer-section category-box">
            <div className="category-content">
              <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="Customer" />
              <div>
                <h3>Customer</h3>
                <ul>
                  <li><span className="highlight">Registration</span></li>
                  <li><span className="highlight">Customer Login</span></li>
                  <li>View/Update Profile</li>
                  <li><span className="highlight">Book a Pet</span></li>
                  <li><span className="highlight">View Booked Pets</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chatbot Toggle */}
          <button className="chatbot-toggle" onClick={() => setShowChatbot(!showChatbot)}>
            {showChatbot ? "Close Chat" : "Chat with us"}
          </button>

          {/* Chatbot UI */}
          {showChatbot && (
            <div className="chatbot-box">
              <div className="welcome-message">
                Welcome to <span className="highlight">Pet Adoption Platform</span>! How can I assist you today?
              </div>

              <h4>PetBot - Ask a question</h4>
              <div className="chat-history">
                {chat.map((c, index) => (
                  <div key={index} className="chat-pair">
                    <div className="user-question"><strong>You:</strong> {c.question}</div>
                    <div className="bot-answer"><strong>Bot:</strong> {c.answer}</div>
                  </div>
                ))}
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type your question..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend}>Send</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

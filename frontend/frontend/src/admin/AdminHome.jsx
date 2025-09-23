import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { FaUsers, FaUserTie, FaPaw } from 'react-icons/fa';
import './admin.css';
// <-- import your CSS here

export default function AdminHome() {
  const [customerCount, setCustomerCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const customerRes = await axios.get(`${config.url}/admin/customercount`);
        const managerRes = await axios.get(`${config.url}/admin/managercount`);
        const eventRes = await axios.get(`${config.url}/admin/eventcount`);

        setCustomerCount(customerRes.data);
        setManagerCount(managerRes.data);
        setEventCount(eventRes.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const cardData = [
    { title: 'Customers', count: customerCount, icon: <FaUsers size={40} color="#007bff" />, color: '#007bff' },
    { title: 'Pet Managers', count: managerCount, icon: <FaUserTie size={40} color="#28a745" />, color: '#28a745' },
    { title: 'Pets', count: eventCount, icon: <FaPaw size={40} color="#ff5722" />, color: '#ff5722' },
  ];

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-heading">Admin Dashboard</h1>

      <div className="dashboard-cards">
        {cardData.map((card, idx) => (
          <div key={idx} className="dashboard-card">
            <div className="card-icon">{card.icon}</div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-count" style={{ color: card.color }}>{card.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

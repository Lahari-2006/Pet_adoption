import { useState,useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './manager.css';
import ManagerHome from './ManagerHome';
import ManagerProfile from './ManagerProfile';
import ManagerLogin from './ManagerLogin';
import { useAuth } from '../contextapi/AuthContext';
import AddPet from './AddPet';
import ViewPetsByManager from './ViewPetsByManager';
import ViewBookings from './ViewBookings';

export default function ManagerNavBar() 
{
  const { setIsManagerLoggedIn } = useAuth(); 

  const handleLogout = () => 
 {
  setIsManagerLoggedIn(false);
  sessionStorage.clear()
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Pet Manager</div>
        <ul className="nav-links">
          <li><Link to="/managerhome">Home</Link></li>
          <li><Link to="/managerprofile">My Profile</Link></li>
          <li><Link to="/addpet">Add New Pet</Link></li>
          <li><Link to="/viewpetsbymanager">View Pets</Link></li>
          <li><Link to="/viewbookings">View Bookings</Link></li>
          <li><Link to="/managerlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/managerhome" element={<ManagerHome />} exact />
        <Route path="/managerprofile" element={<ManagerProfile/>} exact />
        <Route path="/addpet" element={<AddPet/>} exact />
        <Route path="/viewpetsbymanager" element={<ViewPetsByManager/>} exact />
        <Route path="/viewbookings" element={<ViewBookings/>} exact />
        <Route path="/managerlogin" element={<ManagerLogin/>} exact />
      </Routes>
    </div>
  );
}
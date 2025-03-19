import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import RegistrationList from './components/RegistrationList';
import RegistrationForm from './components/RegistrationForm';
import EventForm from './components/EventForm'; 
import Home from './components/Home'; 

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/events" element={<EventList />} /> 
        <Route path="/create-event" element={<EventForm />} /> 
        <Route path="/registrations" element={<RegistrationList />} />
        <Route path="/create-registration" element={<RegistrationForm />} />
      </Routes>
    </div>
  </Router>
);  

export default App;

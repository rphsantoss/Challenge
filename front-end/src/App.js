import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import RegistrationForm from './components/RegistrationForm';
import EventForm from './components/EventForm'; 

const App = () => (
  <Router>
    <div>
      <h1>Gerenciador de Eventos</h1>
      <Routes>
        {/*<Route path="/" element={<EventList />} /> */}
        <Route path="/create-registration" element={<RegistrationForm />} />
        <Route path="/create-event" element={<EventForm />} /> 
      </Routes>
    </div>
  </Router>
);  

export default App;

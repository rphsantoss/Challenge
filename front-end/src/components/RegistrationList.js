import React, { useEffect, useState } from 'react';
import { getRegistrations } from '../api';
import { useNavigate } from "react-router-dom";
import '../styles/RegistrationList.css'; 

const RegistrationList = () => {
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const registrationsData = await getRegistrations();
            setRegistrations(registrationsData);
        };
        fetchEvents();
    }, []);

    return (
        <>
            <h1>Lista de Inscritos</h1> 
            <div className="registration-list">
                <button className="registrationList-button" 
                    onClick={() => navigate("/create-registration")} >
                        Se-Inscrever
                </button>
                <ul>
                    {registrations.map((registration) => (
                        <li key={registration.id} className="registration-card">
                            {registration.name} - {registration.email} 
                        </li>
                    ))}
                </ul>
                
            </div>
        </>
    );
};

export default RegistrationList;

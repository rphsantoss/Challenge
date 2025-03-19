import React, { useEffect, useState } from 'react';
import { getRegistrations } from '../api';
import '../styles/RegistrationList.css'; 

const RegistrationList = () => {
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

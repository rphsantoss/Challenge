import React, { useEffect, useState } from 'react';
import { getEvents } from '../api';
import { useNavigate } from "react-router-dom";
import '../styles/EventList.css'; 

const EventList = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsData = await getEvents();
            setEvents(eventsData);
        };
        fetchEvents();
    }, []);

    return (
        <>
            <h1>Lista de Eventos</h1> 
            <div className="event-list">
            <button className="eventList-button"
                    onClick={() => navigate("/create-event")} >
                    Criar Evento
                </button>
                <ul>
                    {events.map((event) => (
                        <li key={event.id} className="event-card">
                            {event.title} - {new Date(event.date).toLocaleDateString()} ({event.capacity} vagas)
                        </li>
                    ))}
                </ul>

                
            </div>
        </>
    );
};

export default EventList;

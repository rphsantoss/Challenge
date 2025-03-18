import React, { useEffect, useState } from 'react';
import { getEvents } from '../api';
import '../styles/EventList.css'; 

const EventList = () => {
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
            <h1>Lista de Eventos</h1> {/* Agora está fora da div */}
            <div className="event-list">
                <ul>
                    {events.map((event) => (
                        <li key={event.id} className="event-card">
                            {event.title} - {event.date} - {event.capacity}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default EventList;

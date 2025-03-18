// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import { getEvents } from '../api';

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
        <div>
        <h2>Lista de Eventos</h2>
        <ul>
            {events.map((event) => (
            <li key={event.id}>
                {event.title} - {event.date}
            </li>
            ))}
        </ul>
        </div>
    );
};

export default EventList;

import React, { useEffect, useState } from 'react';
import { getEvents, deleteEvent } from '../api';
import { useNavigate } from "react-router-dom";
import '../styles/EventList.css'; 

const EventList = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const eventsData = await getEvents();

            const sortedEvents = eventsData.sort((a, b) => {//ordenando eventos por data
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB;
            });
            setEvents(sortedEvents);
            console.log("Eventos carregados:", sortedEvents);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        if (window.confirm("Tem certeza que deseja excluir este evento?")) {
            try {
                
                await deleteEvent(eventId);
                console.log("Evento deletado com sucesso!");
                fetchEvents();

                alert("Evento excluído com sucesso!");

            } catch (error) {
                
                console.error("Erro ao deletar evento:", error);
                console.error("Detalhes do erro:", error.response || error.message);

                alert("Erro ao excluir evento. Tente novamente.");
            }
        }
    };

    const handleUpdate = (eventId) => {
        navigate(`/update-event/${eventId}`);
    };


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
                        
                            <div className="event-buttons">
                                <button 
                                    className="update-button"
                                    onClick={() => handleUpdate(event.id)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="delete-button"
                                    onClick={() => handleDelete(event.id)}
                                >
                                    Deletar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default EventList;
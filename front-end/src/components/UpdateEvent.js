import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../api';
import '../styles/UpdateEvent.css';

const UpdateEvent = () => {

    const params = useParams();
    const eventId = params.eventId;
    const navigate = useNavigate();
    
    const [event, setEvent] = useState({
        title: '',
        date: '',
        capacity: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const fetchEvent = async () => {
        setLoading(true);
        setError(null);
        
        if (!eventId) {
            console.error("ID do evento não encontrado nos parâmetros da URL:", params);
            setError("ID do evento não fornecido na URL");
            setLoading(false);
            return;
        }
        
        try {
            const eventData = await getEventById(eventId);
            
            if (!eventData) {
                throw new Error("Dados do evento não encontrados");
            }
            
            console.log("Dados do evento recebidos:", eventData);
            
            const formattedDate = eventData.date ? new Date(eventData.date).toISOString().split('T')[0] : '';
            
            setEvent({
                ...eventData,
                date: formattedDate
            });
            
        } catch (error) {
            console.error("Erro ao carregar evento para edição:", error);
            setError(`Erro ao carregar dados do evento: ${error.message || 'Erro desconhecido'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [eventId]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSaveError(null);
        
        try {
            
            const eventToSave = {
                ...event,
                capacity: parseInt(event.capacity) 
            };
            
            const response = await updateEvent(eventId, eventToSave);
            console.log("Resposta da atualização:", response);
            
            alert("Evento atualizado com sucesso!");
            navigate('/events');
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
            
            let errorMessage = "Erro desconhecido ao salvar alterações.";
            
            if (error.response) {
                console.error("Resposta do servidor:", error.response.data);
                
                // Extrair mensagem detalhada do erro, se disponível
                if (error.response.data && error.response.data.details) {
                    errorMessage = `Erro: ${error.response.data.details}`;
                } else if (error.response.data && error.response.data.error) {
                    errorMessage = `Erro: ${error.response.data.error}`;
                } else {
                    errorMessage = `Erro do servidor (${error.response.status})`;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            setSaveError(errorMessage);
            alert(`Erro ao salvar as alterações: ${errorMessage}`);
        } finally {
            setSaving(false);
        }
    };
    if (loading) {
        return (
            <div className="loading-container">
                <p>Carregando dados do evento...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h3>Erro!</h3>
                <p>{error}</p>
                <button onClick={() => navigate('/events')}>Voltar para Lista de Eventos</button>
            </div>
        );
    }

    return (
        <div className="update-event-container">
            <h2>Editar Evento</h2>
            
            {saveError && (
                <div className="error-message">
                    <p>Erro ao salvar: {saveError}</p>
                </div>
            )}
            
            <form onSubmit={handleSave} className="update-event-form">
                <div className="form-group">
                    <label>Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Data:</label>
                    <input
                        type="date"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Capacidade:</label>
                    <input
                        type="number"
                        name="capacity"
                        value={event.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="save-btn" disabled={saving}>
                        {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button 
                        type="button" 
                        className="cancel-btn" 
                        onClick={() => navigate('/events')}
                        disabled={saving}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEvent;
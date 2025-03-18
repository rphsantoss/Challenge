import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },

    timeout: 10000
});

export const getEvents = async () => {
        try {
        const response = await api.get('/api/events');
        return response.data;
        } catch (error) {
        console.error('Erro ao listar eventos:', error);
        throw error;
        }
    };
    
export const createEvent = async (eventData) => {
    try {
        const response = await api.post('/api/create-event', eventData);
        return response.data;
        } catch (error) {
        console.error('Erro ao criar evento:', error.response?.data || error.message || error);
        throw error;
    }
};
    
export const editEvent = async (eventId, eventData) => {
    try {
        const response = await api.put(`/api/edit-event/${eventId}`, eventData);
        return response.data;
        } catch (error) {
        console.error('Erro ao editar evento:', error);
        throw error;
    }
};
    
export const deleteEvent = async (eventId) => {
    try {
        const response = await api.delete(`/api/delete-event/${eventId}`);
        return response.data;
        } catch (error) {
        console.error('Erro ao deletar evento:', error);
        throw error;
    }
};
    
export const getRegistrations = async (eventId) => {
    try {
        const response = await api.get(`/api/registrations?eventId=${eventId}`);
        return response.data;
        } catch (error) {
        console.error('Erro ao listar inscrições:', error);
        throw error;
    }
};
    
export const createRegistration = async (userData) => {
    try {
        const response = await api.post('/api/create-registration', userData);
        return response.data;
        } catch (error) {
        console.error('Erro ao inscrever usuário:', error);
        throw error;
    }   
};
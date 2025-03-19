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
    
export const getRegistrations = async () => {
    try {
        const response = await api.get(`/api/registrations`);
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

export const getRegistrationByEmail = async (email) => {
    try {
        const response = await api.get(`/api/registrations/by-email/${email}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.warn('Usuário não encontrado:', email);
            return null;
        }
        console.error('Erro ao buscar usuário por email:', error);
        throw error; 
    }
};

export const updateRegistrationStatus = async (id, status) => {
    try {
        const response = await api.patch(`/api/registrations/${id}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Erro ao alterar status do usuário:', error);
        throw error;
    }   
};

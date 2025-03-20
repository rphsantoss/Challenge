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

export const getEventById = async (eventId) => {
    try {
        console.log('Buscando evento com ID:', eventId);
        const response = await api.get(`/api/event/${eventId}`);
        console.log('Resposta da API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar evento por ID:', error);
        console.error('Resposta do servidor:', error.response?.data);
        console.error('URL da requisição:', `${API_URL}/api/event/${eventId}`);
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
    
export const updateEvent = async (eventId, eventData) => {
    try {
        // Log detalhado dos dados sendo enviados
        console.log('=== DADOS ENVIADOS PARA ATUALIZAÇÃO ===');
        console.log('ID do evento:', eventId);
        console.log('Tipo do ID:', typeof eventId);
        console.log('Dados do evento:', JSON.stringify(eventData, null, 2));
        console.log('Campos incluídos:', Object.keys(eventData));
        console.log('URL completa:', `${API_URL}/api/update-event/${eventId}`);
        
        // Garantir que temos todos os campos necessários
        if (!eventData.title || !eventData.date) {
            throw new Error('Dados incompletos: título e data são obrigatórios');
        }
        
        // Fazer uma cópia dos dados e garantir que os tipos estão corretos
        const cleanData = {
            title: eventData.title,
            date: eventData.date,
            capacity: Number(eventData.capacity)
        };
        
        console.log('Dados processados para envio:', cleanData);
        
        const response = await api.put(`/api/update-event/${eventId}`, cleanData);
        console.log('Resposta da atualização:', response.data);
        return response.data;
    } catch (error) {
        console.error('=== ERRO AO EDITAR EVENTO ===');
        console.error('Erro:', error.message);
        
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Resposta do servidor:', error.response.data);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('Requisição feita mas sem resposta');
        }
        
        throw error;
    }
};
    
    
export const deleteEvent = async (eventId) => {
    try {
        await api.delete(`/api/delete-event/${eventId}`);
        return true;
    } catch (error) {
        console.error('Erro ao deletar evento:', error);
        console.error('Detalhes do erro:', error.response?.data || 'Sem detalhes adicionais');
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

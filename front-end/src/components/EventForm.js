import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { createEvent } from '../api';
import '../styles/EventForm.css'; 

const EventForm = () => {
    const navigate = useNavigate();
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }, 
        reset 
    } = useForm({
        defaultValues: {
        title: '',
        date: '',
        capacity: 0,
        }
    });
    
    const [submitStatus, setSubmitStatus] = useState({
        success: false,
        error: null
    });

    const onSubmit = async (data) => {
        try {
        setSubmitStatus({ success: false, error: null });
        

        const formattedData = {
            ...data,
            date: new Date(data.date).toISOString(),
            capacity: parseInt(data.capacity, 10)
        };
        
        console.log('Enviando dados:', formattedData);
        
        const result = await createEvent(formattedData);
        console.log('Evento criado com sucesso:', result);
        
        setSubmitStatus({ success: true, error: null });
        reset(); 
        } catch (error) {
        console.error('Falha ao criar evento:', error);
        setSubmitStatus({ 
            success: false, 
            error: error.response?.data?.message || error.message || 'Erro de conexão com o servidor'
        });
        }
    };

    return (
        <>
        <h1>Criar Novo Evento</h1>
            <div className="event-form-container">
            
            {submitStatus.success && (
                <div className="success-message">
                Evento criado com sucesso!
                </div>
            )}

            
            {submitStatus.success && setTimeout(() => {
                setSubmitStatus((prevStatus) => ({ ...prevStatus, success: false }));
            }, 3000)} 
            
            {submitStatus.error && (
                <div className="error-message">
                {submitStatus.error}
                </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="event-form">
                <div className="form-group">
                <label htmlFor="title">Título do Evento</label>
                <input
                    id="title"
                    type="text"
                    {...register('title', { 
                    required: 'O título é obrigatório',
                    minLength: { value: 3, message: 'O título deve ter pelo menos 3 caracteres' }
                    })}
                />
                {errors.title && <span className="error">{errors.title.message}</span>}
                </div>
                
                <div className="form-group">
                <label htmlFor="date">Data do Evento</label>
                <input
                    id="date"
                    type="date"
                    {...register('date', { 
                    required: 'A data é obrigatória',
                    validate: value => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        return selectedDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0) //ignorando horas
                        || 'A data deve ser futura';
                    }
                    })}
                />
                {errors.date && <span className="error">{errors.date.message}</span>}
                </div>
                
                <div className="form-group">
                <label htmlFor="capacity">Capacidade Máxima</label>
                <input
                    id="capacity"
                    type="number"
                    {...register('capacity', { 
                    required: 'A capacidade é obrigatória',
                    min: { value: 1, message: 'A capacidade mínima é 1' },
                    max: { value: 1000, message: 'A capacidade máxima é 1000' }
                    })}
                />
                {errors.capacity && <span className="error">{errors.capacity.message}</span>}
                </div>
            
                <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
                >
                {isSubmitting ? 'Criando...' : 'Criar Evento'}
                </button>
            </form>
            
            </div>
            </>
        );
};

export default EventForm;

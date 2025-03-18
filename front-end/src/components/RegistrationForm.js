import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { createRegistration, getEvents } from '../api';

const RegistrationForm = () => {
    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            events: []
        }
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                setValue('events', response || []);  // Define eventos dentro do useForm
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
                setValue('events', []);
            }
        };

        fetchEvents();
    }, [setValue]);

    const onSubmit = async (data) => {
        await createRegistration(data);
        alert('Inscrição realizada com sucesso!');
    };

    const events = getValues('events');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>
            Nome:
            <input 
            type="text" 
            {...register('name', { required: 'Nome é obrigatório' })} 
            />
            {errors.name && <span>{errors.name.message}</span>}
        </label>

        <label>
            E-mail:
            <input 
            type="email" 
            {...register('email', { 
                required: 'E-mail é obrigatório',
                validate: (value) => validator.isEmail(value) || 'E-mail inválido'
            })} 
            />
            {errors.email && <span>{errors.email.message}</span>}
        </label>

        

    
        {/* Se não houver eventos, exibe a mensagem */}
        {events.length === 0 && <p>Nenhum evento disponível para inscrição.</p>}

{/* Campo para selecionar evento */}
{events.length > 0 && (
    <label>
        Selecione um evento:
        <select {...register('eventId', { required: 'Selecione um evento' })}>
            <option value="">-- Escolha um evento --</option>
            {events.map(event => (
                <option key={event.id} value={event.id}>
                    {event.title} - {new Date(event.date).toLocaleDateString()} ({event.capacity} vagas)
                </option>
            ))}
        </select>
        {errors.eventId && <span>{errors.eventId.message}</span>}
    </label>
)}

        <label>
            E-mail de quem te indicou:
            <input 
            type="email" 
            {...register('referralEmail', { 
                required: 'E-mail do indicante é obrigatório',
                validate: (value) => value !== watch('email') || 'Não é permitido usar o próprio e-mail'
            })} 
            />
            {errors.referralEmail && <span>{errors.referralEmail.message}</span>}
        </label>

        
        <button type="submit">Inscrição</button>
        </form>
    );
};

export default RegistrationForm;

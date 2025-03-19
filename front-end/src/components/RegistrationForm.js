import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { createRegistration, getEvents, getRegistrationByEmail } from '../api';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
    const { 
        register, 
        handleSubmit, 
        watch, 
        setValue, 
        getValues, 
        formState: { errors, isSubmitting } 
    } = useForm({
        defaultValues: {
            events: [],
        }
    });

    const [submitStatus, setSubmitStatus] = useState({
        success: false,
        error: null
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                setValue('events', response || []); 
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
                setValue('events', []);
                setSubmitStatus({
                    success: false,
                    error: "Erro ao buscar eventos. Tente novamente mais tarde."
                });
            }
        };

        fetchEvents();
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            setSubmitStatus({ success: false, error: null });
    
            let referredById = null;
    
            if (data.referralEmail) {
                console.log("Verificando email de referência:", data.referralEmail);
                try {
                    const referredUser = await getRegistrationByEmail(data.referralEmail);
                    console.log("Resposta da API para getRegistrationByEmail:", referredUser);
    
                    if (referredUser && referredUser.id !== null) {
                        referredById = referredUser.id;
                        console.log("ID do usuário que referiu encontrado:", referredById);
                    } else {
                        console.warn("Usuário não encontrado ou sem ID:", referredUser);
                        setSubmitStatus({
                            success: false,
                            error: 'O e-mail de quem te indicou não está cadastrado.'
                        });
                        return;
                    }
                } catch (refError) {
                    console.error("Erro ao verificar email de referência:", refError);
                    setSubmitStatus({
                        success: false,
                        error: 'Erro ao verificar o email de referência. Tente novamente mais tarde.'
                    });
                    return;
                }
            }
    
            const submissionData = {
                ...data,
                referredById,  
            };
    
            console.log("Dados para envio:", submissionData);
            await createRegistration(submissionData);
            setSubmitStatus({ success: true, error: null });
        } catch (error) {
            console.error('Falha ao realizar inscrição:', error);
            setSubmitStatus({
                success: false,
                error: error.response?.data?.message || error.message || 'Erro de conexão com o servidor'
            });
        }
    };

    const events = getValues('events');

    return (
        <>
            <h1>Formulário de Inscrição</h1>
            <div className="registration-form-container">
                {submitStatus.success && (
                    <div className="success-message">
                        Inscrição realizada com sucesso!
                    </div>
                )}

                {submitStatus.success && setTimeout(() => {
                    setSubmitStatus((prevStatus) => ({ ...prevStatus, success: false }));
                }, 3000)}

                {submitStatus.error && (
                    <div className="error-message-box">
                        {submitStatus.error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Nome é obrigatório' })}
                        />
                        {errors.name && <span className="error-message">{errors.name.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', {
                                required: 'E-mail é obrigatório',
                                validate: (value) => validator.isEmail(value) || 'E-mail inválido'
                            })}
                        />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>

                    {events.length === 0 ? (
                        <p className="error-message">Nenhum evento disponível para inscrição.</p>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="eventId">Selecione um evento</label>
                            <select
                                id="eventId"
                                {...register('eventId', { required: 'Selecione um evento' })}
                            >
                                <option value="">-- Escolha um evento --</option>
                                {events.map(event => (
                                    <option key={event.id} value={event.id}>
                                        {event.title} - {new Date(event.date).toLocaleDateString()} ({event.capacity} vagas)
                                    </option>
                                ))}
                            </select>
                            {errors.eventId && <span className="error-message">{errors.eventId.message}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="referralEmail">E-mail de quem te indicou</label>
                        <input
                            id="referralEmail"
                            type="email"
                            {...register('referralEmail', {
                                required: 'E-mail do indicante é obrigatório',
                                validate: (value) => value !== watch('email') || 'Não é permitido usar o próprio e-mail'
                            })}
                        />
                        {errors.referralEmail && <span className="error-message">{errors.referralEmail.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Inscrição'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default RegistrationForm;
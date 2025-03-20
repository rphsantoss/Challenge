import React, { useEffect, useState } from 'react';
import { getRegistrations, updateRegistrationStatus } from '../api';
import { useNavigate } from "react-router-dom";
import '../styles/RegistrationList.css';

const RegistrationList = () => {
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('PENDING');

    const fetchRegistrations = async () => {
        try {
            const registrationsData = await getRegistrations();
            const sortedRegistrations = registrationsData.sort((a, b) => {
                
                const dateA = new Date(a.createdAt || 0);
                const dateB = new Date(b.createdAt || 0);
                return dateB - dateA; 
            });

            setRegistrations(sortedRegistrations);
        } catch (error) {
            console.error('Erro ao buscar inscrições:', error);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateRegistrationStatus(id, status);
            fetchRegistrations(); 
        } catch (error) {
            console.error('Erro ao alterar status da inscrição:', error);
        }
    };

    const translateStatus = (status) => { //traduzindo pro português
        switch (status) {
            case "PENDING":
                return "Pendente";
            case "CONFIRMED":
                return "Confirmado";
            case "CANCELED":
                return "Cancelado";
            default:
                return status;
        }
    };

    const filteredRegistrations = registrations.filter(reg => {
        if (selectedStatus === null) return true;
        return reg.status === selectedStatus;
    });

    return (
        <>
            <h1>Lista de Inscritos</h1>

            <div className="registration-list">
                <button className="registrationList-button" onClick={() => navigate("/create-registration")}>
                    Nova Inscrição
                </button>

                <div className="filter-buttons-container">
                    <button 
                        className={`filter-button ${selectedStatus === 'PENDING' ? 'active' : ''}`} 
                        onClick={() => setSelectedStatus('PENDING')}
                    >
                        Ver Inscrições Pendentes
                    </button>

                    <button 
                        className={`filter-button ${selectedStatus === 'CONFIRMED' ? 'active' : ''}`} 
                        onClick={() => setSelectedStatus('CONFIRMED')}
                    >
                        Ver Inscrições Confirmadas
                    </button>

                    <button 
                        className={`filter-button ${selectedStatus === 'CANCELED' ? 'active' : ''}`} 
                        onClick={() => setSelectedStatus('CANCELED')}
                    >
                        Ver Inscrições Canceladas
                    </button>
                </div>

                {filteredRegistrations.length === 0 && (
                    <p>Não há inscrições {translateStatus(selectedStatus)} para exibir.</p>
                )}

                <ul>
                    {filteredRegistrations.map((registration) => (
                        <li key={registration.id} className="registration-card">
                            <span>
                                <strong>{registration.name}</strong> - {registration.email}
                            </span>

                            <div>
                                <strong>Evento:</strong> {registration.event.title}
                            </div>

                            <span>
                                <strong>({translateStatus(registration.status)})</strong>
                            </span>

                            <div className='buttons'>
                                {registration.status === 'PENDING' && (
                                    <>
                                        <button
                                            className="confirm-button"
                                            onClick={() => handleUpdateStatus(registration.id, 'CONFIRMED')}
                                        >
                                            Confirmar
                                        </button>
                                        <button
                                            className="cancel-button"
                                            onClick={() => handleUpdateStatus(registration.id, 'CANCELED')}
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                )}

                                {registration.status === 'CANCELED' && (
                                    <button
                                        className="confirm-button"
                                        onClick={() => handleUpdateStatus(registration.id, 'CONFIRMED')}
                                    >
                                        Confirmar
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default RegistrationList;

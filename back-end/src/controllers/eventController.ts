import { Request, Response } from 'express';
import prisma from '../prismaClient';

const eventController = {
    getAllEvents: async (req: Request, res: Response) => {
        try {
        const events = await prisma.event.findMany();
        res.json(events);
        } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
        }
    },
    
    getEventById: async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;
        
        if (!id || isNaN(parseInt(id))) {
            console.error('Invalid event ID:', id);
            return res.status(400).json({ error: 'ID inválido' });
        }
        
        try {
            const parsedId = parseInt(id);
            
            const event = await prisma.event.findUnique({
                where: { id: parsedId },
            });
            
            console.log('Event found:', event); 
            if (!event) {
                return res.status(404).json({ error: 'Evento não encontrado' });
            }
            
            res.json(event);
        } catch (error) {
            console.error('Erro ao buscar evento:', error); 
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ error: 'Erro ao buscar evento', details: errorMessage });
        }
    },

    createEvent: async (req: Request, res: Response) => {
        const { title, date, capacity } = req.body;
        try {
        const newEvent = await prisma.event.create({
            data: { title, date, capacity },
        });
        res.status(201).json(newEvent);
        } catch (error) {
        res.status(500).json({ error: 'Error creating event' });
        }
    },



    updateEvent: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, date, capacity } = req.body;
    
        try {
            
            const parsedDate = new Date(date);
            const numericCapacity = parseInt(capacity);
            
            if (isNaN(parsedDate.getTime())) {
                res.status(400).json({ error: 'Data inválida' });
            }
            
            if (isNaN(numericCapacity)) {
                res.status(400).json({ error: 'Capacidade inválida' });
            }
    
            const updatedEvent = await prisma.event.update({
                where: { id: parseInt(id) },
                data: {
                    title,
                    date: parsedDate,
                    capacity: numericCapacity,
                },
            });
            
            console.log('Evento atualizado com sucesso:', updatedEvent);
            res.json(updatedEvent); 
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ error: 'Error updating event', details: errorMessage });
        }
    },

    deleteEvent: async (req: Request, res: Response) => {
        const { id } = req.params; 
        const eventId = parseInt(id);
    
        try {
            
            await prisma.registration.deleteMany({// primeiro, excluindo todas as inscrições relacionadas a este evento
                where: { eventId: eventId }
            });
    
            await prisma.event.delete({
                where: { id: eventId }
            });
            
            res.status(204).send(); 
        } catch (error) {
            console.error(`Erro ao excluir evento ${id}:`, error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ error: 'Error deleting event', details: errorMessage });
        }
    },


};

export default eventController;
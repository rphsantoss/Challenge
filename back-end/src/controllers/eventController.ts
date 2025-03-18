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

    editEvent: async (req: Request, res: Response) => {
        const { id } = req.params; // id do evento a ser editado
        const { title, date, capacity } = req.body; // novos dados do evento

        try {
            const updatedEvent = await prisma.event.update({
                where: { id: parseInt(id) }, // encontrar o evento pelo ID
                data: {
                    title,
                    date,
                    capacity,
                },
            });
            res.json(updatedEvent); 
        } catch (error) {
            res.status(500).json({ error: 'Error updating event' });
        }
    },

    deleteEvent: async (req: Request, res: Response) => {
        const { id } = req.params; 

        try {
            await prisma.event.delete({
                where: { id: parseInt(id) }, 
            });
            res.status(204).send(); 
        } catch (error) {
            res.status(500).json({ error: 'Error deleting event' });
        }
    },


};

export default eventController;
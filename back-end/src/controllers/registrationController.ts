import { Request, Response } from 'express';
import prisma from '../prismaClient';  // Prisma Client importado

const registrationController = {

    getAllRegistrations: async (req: Request, res: Response) => {
        try {
        const registrations = await prisma.registration.findMany({
            include: {
            event: true, // inclui todos os dados do evento
            referredBy: true, // inclui o usuário que fez a indicação, se houver
            },
        });
        res.json(registrations);
        } catch (error) {
        res.status(500).json({ error: 'Error fetching registrations' });
        }
    },

    createRegistration: async (req: Request, res: Response) => {
        const { name, email, eventId, referredById, status } = req.body;
        try {
        const newRegistration = await prisma.registration.create({
            data: {
                name,
                email,
                eventId: parseInt(eventId),
                referredById: referredById? parseInt(referredById) : null,
                status: "CONFIRMED",
            },  
        });
        res.status(201).json(newRegistration);
        } catch (error) {
        res.status(500).json({ error: 'Error creating registration' });
        }
    },

    registrationByEmail: async (req: Request, res: Response): Promise<void> => {
        const { email } = req.params;
    
        try {
            const user = await prisma.registration.findUnique({
                where: { email: email.toLowerCase() }, 
                select: { id: true } 
            });
    
            if (!user) {
                res.json({ id: null }); 
                return;
            }
    
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
    }
}    
export default registrationController;

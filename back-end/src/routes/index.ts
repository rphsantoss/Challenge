import { Router } from 'express';
import eventController from '../controllers/eventController';
import registrationController from '../controllers/registrationController';

const router = Router();

// Rotas de evento
router.get('/events', eventController.getAllEvents);
router.get('/event/:id', eventController.getEventById);
router.post('/create-event', eventController.createEvent);
router.put('/update-event/:id', eventController.updateEvent);
router.delete('/delete-event/:id', eventController.deleteEvent);

// Rotas de inscrição
router.get('/registrations', registrationController.getAllRegistrations);
router.post('/create-registration', registrationController.createRegistration);
router.get('/registrations/by-email/:email', registrationController.getRegistrationByEmail);
router.patch('/registrations/:id/status', registrationController.updateRegistrationStatus);

export default router;
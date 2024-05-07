import express from 'express';
import { DonorController } from './controller/donor.controller';
import { ReservationController } from './controller/reservation.controller';
import {LocationController} from "./controller/location.controller";

export function getRouter() {
    const router = express.Router();

    const donorController = new DonorController();

    router.get('/donor', donorController.getAll);
    router.get('/donor/:id', donorController.getOne);
    router.post('/donor', donorController.create);
    router.put('/donor', donorController.update);
    router.delete('/donor/:id', donorController.delete);

    const locationController = new LocationController();

    router.get('/location', locationController.getAll);
    router.get('/location/:id', locationController.getOne);
    router.post('/location', locationController.create);
    router.put('/location', locationController.update);
    router.delete('/location/:id', locationController.delete);

    const reservationController = new ReservationController();

    router.get('/reservation', locationController.getAll);
    router.post('/reservation', reservationController.create);
    router.get('/reservation/:id', reservationController.getOne);
    router.put('/reservation', locationController.update);
    router.get('/reservation/of/donor/:donorId', reservationController.getReservationsOfDonor);
    router.get('/reservation/of/location/:locationId', reservationController.getReservationsOfLocation);
    router.delete('/reservation/:id', locationController.delete);
    return router;
}

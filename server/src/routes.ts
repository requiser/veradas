import express from 'express';
import { DonorController } from './controller/donor.controller';
import { DonationController } from './controller/donation.controller';
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

    const donationController = new DonationController();

    router.get('/donation', donationController.getAll);
    router.post('/donation', donationController.create);
    router.get('/donation/:id', donationController.getOne);
    router.put('/donation', donationController.update);
    router.get('/donation/of/donor/:donorId', donationController.getDonationsOfDonor);
    router.get('/donation/of/location/:locationId', donationController.getDonationsOfLocation);
    router.delete('/donation/:id', donationController.delete);
    return router;
}
